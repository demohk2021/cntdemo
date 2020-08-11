package app.job;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import net.rails.ext.AbsGlobal;
import app.model.EmailSchedule;
import net.rails.sql.query.Query;
import java.io.File;
import java.util.List;
import org.apache.commons.io.FileUtils;
import net.rails.support.Support;
import java.util.regex.Pattern;
import java.util.Arrays;
import org.slf4j.LoggerFactory;
import java.util.Map;
import java.util.regex.Matcher;
import net.rails.support.worker.EnvWorker;

public class EmailSenderJob implements Job {
	
	private final static Logger log = LoggerFactory.getLogger(EmailSenderJob.class);;
	private AbsGlobal g;
	
	public EmailSenderJob() {
		super();
	}

	public void execute(JobExecutionContext context) throws JobExecutionException {
	    g = (AbsGlobal) context.getJobDetail().getJobDataMap().get("AbsGlobal");
        processingSendEmail(g);
	}
	
	private void processingSendEmail(AbsGlobal g) {
	    EmailSchedule emailSchedule = null;
		Query q = null;
		try {
			q = new Query(new EmailSchedule(g));
			q.cache(true);
			q.cache(0);
			q.and("eq_deleted",0);
			q.and("eq_status","New");
			emailSchedule = q.first();
            if(emailSchedule != null){
                emailSchedule.setStatus("Sending");
                emailSchedule.save();
				String to = emailSchedule.getToList();
				String cc = emailSchedule.getCcList();
				String bcc = emailSchedule.getBccList();
				String subject = emailSchedule.getSubject();
				String content = emailSchedule.getMessage();
				Object[] response = sendEmail("register", to,cc,bcc, subject, content, null);
				Integer responseCode = (Integer) response[0];
				String responseMessage = (String) response[1];    
				if (response[0].equals(200)) {
                    emailSchedule.setStatus("Sent");
                    emailSchedule.setResponseMsg(null);
                    emailSchedule.setResponseCode(responseCode);
                    emailSchedule.save();
				}else{
                    emailSchedule.setStatus("Error");
                    emailSchedule.setResponseMsg(responseMessage);
					emailSchedule.setResponseCode(responseCode);
                    emailSchedule.save();
				}
            }
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			try{
                emailSchedule.setStatus("Error");
                emailSchedule.setResponseMsg(e.getMessage());
				emailSchedule.setResponseCode(0);                
                emailSchedule.save();			
			}catch(Exception e1){
			    log.error(e1.getMessage(), e1);
			}
		}

	}

	private Object[] sendEmail(String senderType, String to,String cc,String bcc, String subject, String content,
			List<File> attachments) throws Exception {
		File outFile = null;
		File messageFile = null;
		StringBuffer attach = new StringBuffer("");
		try {
			String scriptPath = Support.env().getString("plugin_path");
			Map<String, Object> emailConfig = Support.env().gets("email_sender." + senderType);
			String user = (String) emailConfig.get("user");
			String password = (String) emailConfig.get("password");
			String smtp = (String) emailConfig.get("smtp");
			String from = (String) emailConfig.get("from");
			if(Support.string(bcc).blank()){
			   bcc = (String) emailConfig.get("bcc");
			}
// 			String[] addressPersonal = parseEmailAddress(from);
// 			String fromPersonal = addressPersonal[0];
// 			String fromAddress = addressPersonal[1];
			messageFile = File.createTempFile("email_message", ".tmp");
			FileUtils.writeStringToFile(messageFile, content, "UTF-8");
			String subjectBase64 = Support.base64().encodeString(subject);
			if(attachments != null){
    			for(File file : attachments){
    			    attach.append(file.getPath());
    			    attach.append(" ");
    			}
			}
			outFile = File.createTempFile("email_result", ".tmp");
			List shellParams = Arrays.asList(JobUtil.parseShellParam("message_file", messageFile.getAbsolutePath()),
					JobUtil.parseShellParam("from", from), JobUtil.parseShellParam("smtp", smtp),
					JobUtil.parseShellParam("user", user), JobUtil.parseShellParam("password", password),
					JobUtil.parseShellParam("subject", subjectBase64), JobUtil.parseShellParam("to", to),
					JobUtil.parseShellParam("cc", cc),JobUtil.parseShellParam("bcc", bcc),
					JobUtil.parseShellParam("attach", attach.toString()),
					JobUtil.parseShellParam("out_file", outFile.getAbsolutePath()));
			String shellParamsStr = Support.array(shellParams).join("");
			String[] cmd = new String[] { "bash", "-c",
					String.format("%s/%s %s '%s'", scriptPath, "EmailSender.sh", "send", shellParamsStr), };
			Runtime run = Runtime.getRuntime();
			Process process = null;
			process = run.exec(cmd);
			int exitValue = process.waitFor();
			Integer responseCode = 200;
			String responseMessage = null;
			if (exitValue == 0) {
				responseCode = 200;
				responseMessage = FileUtils.readFileToString(outFile).trim();
			} else {
				responseMessage = FileUtils.readFileToString(outFile).trim();
				String regex = "Received:[^\\S]+([0-9]{3})[^\\S]+";
				Matcher matcher = Pattern.compile(regex, Pattern.MULTILINE | Pattern.UNIX_LINES | Pattern.DOTALL)
						.matcher(responseMessage);
				if (matcher.find()) {
					responseCode = Integer.parseInt(matcher.group(0).trim());
				}else{
				    responseCode = 0;
				}
			}
			return new Object[] { responseCode, responseMessage };
		} finally {
			if (outFile != null) {
				outFile.delete();
			}
			if (messageFile != null) {
				messageFile.delete();
			}
		}
	}
	
	private String[] parseEmailAddress(String emailAddress) throws IllegalStateException, IndexOutOfBoundsException {
		Pattern p = Pattern.compile("^(.*)<(.*)>$");
		Matcher m = p.matcher(emailAddress);
		String personal = null;
		String address = null;
		if (m.find()) {
			personal = m.group(1);
			address = m.group(2);
		}
		if (address == null) {
			address = emailAddress;
		}
		if (Support.string(personal).blank()) {
			personal = address.split("@")[0];
			personal = Support.inflect(personal).titlecase();
		}
		return new String[] { personal.trim(), address.trim() };
	}	
	
}