package app.job;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.text.MessageFormat;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.Trigger.CompletedExecutionInstruction;
import org.quartz.Trigger.TriggerState;
import org.quartz.TriggerBuilder;
import org.quartz.TriggerListener;
import org.quartz.impl.DirectSchedulerFactory;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.rails.ext.AbsGlobal;
import net.rails.support.Support;
import app.model.Job;
import net.rails.support.job.worker.JobObject;
import app.model.JobProcess;

public final class JobUtil {
	
	private static Logger log = LoggerFactory.getLogger(JobUtil.class);

	public static String getResultText(InputStream input) throws IOException {
		if(input == null)
			return null;
		
		ByteArrayOutputStream output = new ByteArrayOutputStream(); 
		byte[] buff = new byte[1024];
		try{
			 int rc = 0;  
	         while ((rc = input.read(buff, 0, 100)) > 0) {  
	        	 output.write(buff, 0, rc);  
	         }  
	         byte[] bytes = output.toByteArray();  
	         return new String(new String(bytes).getBytes(),"UTF-8");
		}catch(IOException e){
			throw e;
		}finally{
			if(input != null)
				input.close();
			if(output != null)
				output.close();
		}
	}
	
	public static String getVersion(String path,String libName){
		Pattern p = Pattern.compile(libName + "([0-9a-z]+)");
		Matcher m = p.matcher(path);
		return m.find() ? m.group() : null;
	}
	
	public static String getImageVersion(String path){
		Pattern p = Pattern.compile("[_](?=[0-9a-z]+$)");
		Matcher m = p.matcher(path);
		return m.find() ? m.replaceFirst(":") : null;
	}
	
	public static String getHostname(){
	    return Support.env().getHostname();
	}
	
	public static String parseShellParam(String key,Object value){
		String parseValue = null;
		if(Support.object(value).blank()){
			parseValue = "\"\"";
		}else if(value instanceof Number){
			parseValue = value.toString();
		}else{
			parseValue = value.toString().replaceAll("\\\\", "\\\\\\\\\\\\\\\\").replaceAll("\"", "\\\\\"").replaceAll("\n","\\\\\\n");
		}
		return String.format("%s=\"%s\";",key,parseValue);
	}
	
// 	public static void callSolutionServer(String callCmd,Server server) throws Exception{
// 		Map<String,String[]> CALL_CMD_MAP = new HashMap<String,String[]>();
// 		CALL_CMD_MAP.put("start", new String[]{Server.STATUS_STARTING,Server.STATUS_STARTED});
// 		CALL_CMD_MAP.put("stop", new String[]{Server.STATUS_STOPING,Server.STATUS_STOPED});
// 		CALL_CMD_MAP.put("restart", new String[]{Server.STATUS_STARTING,Server.STATUS_STARTED});
// 		CALL_CMD_MAP.put("update", new String[]{Server.UPDATE_STATUS_UPDATING,Server.UPDATE_STATUS_UPDATED});
// 		if(CALL_CMD_MAP.get(callCmd) == null){
// 			throw new Exception("Call command was not found, This command is " + callCmd + ".");
// 		}
// 		String calling = CALL_CMD_MAP.get(callCmd)[0];
// 		String called = CALL_CMD_MAP.get(callCmd)[1];
// 		AbsGlobal g = server.getGlobal();
// 		Runtime run = Runtime.getRuntime();
// 		Process process = null;
// 		Solution solution = server.belongsTo(new Solution(g));
// 		String solutionPath = solution.getAppPathAndDataUri();
// 		ImageSource imageSource = solution.belongsTo(new ImageSource(g));
// 		String scriptPath = Support.config().getConfig().gets("setting","path","script");
// 		List shellParams = Arrays.asList(
// 				JobUtil.parseShellParam("solution_id",solution.getId()),
// 				JobUtil.parseShellParam("container_name",server.getContainerName()),
// 				JobUtil.parseShellParam("rule_pref",server.getRulePref()),
// 				JobUtil.parseShellParam("rule_lookup_table",server.getRuleLookupTable()),
// 				JobUtil.parseShellParam("hostname",server.getHostname()),
// 				JobUtil.parseShellParam("cpu",server.getCpu()),
// 				JobUtil.parseShellParam("menory",server.getMenory()),
// 				JobUtil.parseShellParam("spare_port",server.getSparePort()),
// 				JobUtil.parseShellParam("web_ssh_port",server.getWebSshPort()),
// 				JobUtil.parseShellParam("ssh_port",server.getSshPort()),
// 				JobUtil.parseShellParam("db_port",server.getDbPort()),
// 				JobUtil.parseShellParam("app_port",server.getAppPort()),
// 				JobUtil.parseShellParam("ssh_base_password",server.getSshBasePassword()),
// 				JobUtil.parseShellParam("ssh_admin_password",server.getSshAdminPassword()),
// 				JobUtil.parseShellParam("db_app_password",server.getDbAppPassword()),
// 				JobUtil.parseShellParam("db_admin_password",server.getDbAdminPassword()),
// 				JobUtil.parseShellParam("image_source_context_name",imageSource.getContext()),
// 				JobUtil.parseShellParam("image_source_version",imageSource.getVersion()),
// 				JobUtil.parseShellParam("ip_address",server.getIpAddress()),
// 				JobUtil.parseShellParam("netmask",server.getNetmask()),
// 				JobUtil.parseShellParam("gateway",server.getGateway()),
// 				JobUtil.parseShellParam("bandwidth",server.getBandwidth()),
// 				JobUtil.parseShellParam("bridge_interface_name",server.getBridgeInterfaceName()),
// 				JobUtil.parseShellParam("ftp_port",server.getFtpPort()),
// 				JobUtil.parseShellParam("ftp_user",server.getFtpUser()),
// 				JobUtil.parseShellParam("ftp_password",server.getFtpPassword())
// 		);
// 		String shellParamsStr = Support.array(shellParams).join("");
// 		String[] cmd = new String[]{
// 				"bash",
// 				"-c",
// 				String.format("%s/%s %s '%s'",
// 						scriptPath,
// 						"solution_container.sh",
// 						callCmd,
// 						shellParamsStr
// 						),
// 				};
// 		log.info("cmd: {}",Arrays.asList(cmd));
// 		process = run.exec(cmd);
// 		int exitValue = process.waitFor();
// 		String message = JobUtil.getResultText(process.getInputStream());
// 		String error = JobUtil.getResultText(process.getErrorStream());
// 		if(callCmd.equals("update")){
// 		    switch(exitValue){
//     			case 0:
//     				server.setUpdateStatus(called);
//     				break;
//     			default:
//     				server.setUpdateStatus(calling);
//     				break;
//     		}
// 		}else{
//     		switch(exitValue){
//     			case 0:
//     				server.setStatus(called);
//     				break;
//     			default:
//     				server.setStatus(calling);
//     				break;
//     		}
// 		}
// 		server.setOperationLog(String.format("%s\n%s",message,error).trim());
// 		solution.save();
// 	}
	
	public static void startJob(Job job) {
		try{
			AbsGlobal g = job.getGlobal();
			DirectSchedulerFactory factory = DirectSchedulerFactory.getInstance();
			Scheduler scheduler = factory.getScheduler(Reschedule.APP_SCHEDULE);
			JobObject jobObject = new JobObject();
			jobObject.setClassify(job.getClassify());
			jobObject.setCronExpression(job.getCronExpression());
			jobObject.setJobGroup(job.getJobGroup());
			jobObject.setJobName(job.getJobName());
			jobObject.setTriggerGroup(job.getTriggerGroup());
			jobObject.setTriggerName(job.getTriggerName());
			jobObject.setHostnames(job.getHostnames());

            String jobId = Support.code().id();
			String jobName = String.format("%s-%s",jobObject.getJobName(),jobId);
		    final String triggerName = String.format("%s-%s",job.getTriggerName(),jobId);
			
			String jobClass = jobObject.getClassify();
			log.debug("Starting: {}", jobName);
			log.debug("Class: {}", jobClass);
            
			org.quartz.Job quartzJob = (org.quartz.Job) Class.forName(jobClass).newInstance();
			JobDetail jobDetail = JobBuilder.newJob(quartzJob.getClass()).withIdentity(jobName,jobObject.getJobGroup()).build();
			jobDetail.getJobDataMap().put("AbsGlobal", g);
			Trigger trigger = TriggerBuilder.newTrigger().withIdentity(triggerName, jobObject.getTriggerGroup())
			 .startNow().build();
			scheduler.scheduleJob(jobDetail, trigger);
		    scheduler.start();
		}catch(Exception e){
			log.error(e.getMessage(),e);
		}
	}	

}
