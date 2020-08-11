package app.controller.www.service;

import app.controller.www.service.ActionService;
import net.rails.ext.AbsGlobal;
import app.model.User;
import app.controller.www.service.HomeService;
import net.rails.sql.query.Query;
import net.rails.support.Support;
import net.rails.support.worker.CodeWorker;
import java.sql.SQLException;
import javax.servlet.http.HttpServletRequest;
import app.model.SecurityCode;
import java.sql.Timestamp;
import net.rails.active_record.validate.exception.ValidateException;
import net.rails.active_record.validate.exception.ConfigurException;
import net.rails.active_record.validate.TypeException;
import java.util.Calendar;
import app.model.EmailSchedule;
import net.rails.ext.Json;
import app.global.Global;
import net.rails.support.worker.EnvWorker;
import net.rails.ciphertext.exception.CiphertextException;
import java.util.Date;
import java.util.Map;
import java.util.HashMap;
import app.model.Role;
import net.rails.web.QueryString;
import net.rails.sql.worker.UpdateWorker;

public class HomeService extends ActionService {

	public HomeService(AbsGlobal g) {
		super(g);
	}
	
	public int completeWaiter(String token){
	    try{
	        String[] tokenArray = Global.decrypt(token).split(";");
	        String act = tokenArray[0];
	        String userId = tokenArray[1];
	        Long signUpLongtime = Long.parseLong(tokenArray[2]);
	        if(!act.equals("complete")){
	            return 2;
	        }
	        Query q = new Query(new User(g));
	        q.and("eq_deleted",0);
	        q.and("eq_id",userId);
	        User user = q.first();
	        if(user == null){
	            return 3;
	        }
	        if(user.isActive()){
	            return 4;
	        }else{
	            user.setActive(true);
	            user.save();
	            return 1;
	        }
	    }catch(Exception e){
	        log.warn(e.getMessage(),e);
	        return 0;
	    }
	}
	
	public int cancelWaiter(String token){
	    try{
	        String[] tokenArray = Global.decrypt(token).split(";");
	        String act = tokenArray[0];
	        String userId = tokenArray[1];
	        Long signUpLongtime = Long.parseLong(tokenArray[2]);
	        if(!act.equals("cancel")){
	            return 2;
	        }
	        Query q = new Query(new User(g));
	        q.and("eq_deleted",0);
	        q.and("eq_id",userId);
	        User user = q.first();
	        if(user == null){
	            return 3;
	        }
	        if(user.isActive()){
	            return 4;
	        }else{
	            user.delete();
	            return 1;
	        }
	    }catch(Exception e){
	        log.warn(e.getMessage(),e);
	        return 0;
	    }
	}	
	
	public int loginWaiter(String username,String password) {
	    try{
    	    Query q = new Query(new User(g));
    	    q.or("eq_username",username);
    	    q.or("eq_email",username);
    	    q.and("eq_deleted",0);
    	    q.and("eq_sign_in_password",Support.code().md5(password).toUpperCase());
    	    User user = q.first();
    	    if(user == null){
    	        return 0;
    	    }else if(!user.isActive()){
    	        return 2;
    	    }else{
    	        user.remove("sign_in_password");
    	        setStatement(user);
    	        return 1;
    	    }
	    }catch(Exception e){
	        log.error(e.getMessage(),e);
	        return 0;
	    }
	}

	public int checkUsernameWaiter(String username) throws SQLException {
		boolean overLen = username.length() < 4 || username.length() > 20;
		if (overLen) {
			return 2;
		}
		String regex = Support.config().getModels().gets("User", "attributes", "username", "validates_format_of",
				"with");
		boolean formatPass = !username.matches(regex);
		if (formatPass) {
			return 3;
		}
		Query q = new Query(new User(g));
		q.and("eq_username", username);
		q.and("eq_deleted", 0);
		User user = q.first();
		boolean exist = (user != null);
		if (exist) {
			return 4;
		}
		return 1;
	}
	
	public int checkEmailWaiter(String email) throws SQLException {
		boolean overLen = email.length() < 5 || email.length() > 30;
		if (overLen) {
			return 2;
		}
		String regex = Support.config().getModels().gets("User", "attributes", "email", "validates_format_of", "with");
		boolean formatPass = !email.matches(regex);
		if (formatPass) {
			return 3;
		}
		Query q = new Query(new User(g));
		q.and("eq_email", email);
		q.and("eq_deleted", 0);
		User user = q.first();
		boolean exist = (user != null);
		if (exist) {
			return 4;
		}
		return 1;
	}	

	public int changePasswordWaiter(String token,String newPassword) throws Exception {
	    String[] keys = Global.decrypt(token).split(";");
		String securityCodeId = keys[0];
		String userEmail = keys[1];
		String ip = keys[2];
        String clientIp = ((Global)g).getClientIpAddr();
        SecurityCode securityCode = new SecurityCode(g,securityCodeId);
        Timestamp expiredAt = securityCode.getExpiredAt();
        String code = securityCode.getCode();
        String status = securityCode.getStatus();
        if(!status.equals("Validated")){
            return 2;
        }        
        if(expiredAt.getTime() < new Date().getTime()){
            return 3;
        }
        if(!ip.equals(clientIp)){
            return 4;
        }
        if(checkPasswordWaiter(newPassword) != 1){
            return 5;
        }
        securityCode.setStatus("Used");
        securityCode.save();
        Query q = new Query(new User(g));
        q.and("eq_deleted",0);
        q.and("eq_email",userEmail);
        User user = q.first();

        Map<String,Object> params = new HashMap<String,Object>();
        params.put("id",user.getId());
        params.put("session_token",null);
        params.put("sign_in_password",Support.code().md5(newPassword).toUpperCase());
        UpdateWorker uw = new UpdateWorker(new User(g),params);
        uw.wheres().add("id = :id");
        uw.execute();
                
	    return 1;
	}
	
	public int checkPasswordWaiter(String password) {
		boolean overLen = password.length() < 6 || password.length() > 20;
		if (overLen) {
			return 2;
		}
		String regex = "^.*(?=.*[a-zA-Z]).*(?=.*[0-9]).*$";
		boolean formatPass = !password.matches(regex);
		if (formatPass) {
			return 3;
		}
		return 1;
	}
	
	public int signUpWaiter(String username, String email, String password) {
		try {
		    Query q = new Query(new Role(g));
		    q.and("eq_code","Member");
		    q.and("eq_deleted",0);
		    Role role = q.first();
		    
		    User user = new User(g);
			user.setRoleId(role.getId().toString());
			user.setUsername(username);
			user.setSignInPassword(Support.code().md5(password).toUpperCase());
			user.setEmail(email);
			user.setActive(false);
			user.save();
			Calendar currentAt = Calendar.getInstance();
            String completeTokenStr = String.format("%s;%s;%s","complete",user.getId(),currentAt.getTimeInMillis());
            String completeToken = Global.encrypt(completeTokenStr);
            String cancelTokenStr = String.format("%s;%s;%s","cancel",user.getId(),currentAt.getTimeInMillis());
            String cancelToken = Global.encrypt(cancelTokenStr);
			QueryString qs = new QueryString();
			qs.put("token",completeToken);
			String completeUrl = String.format("%s/complete?%s",Support.env().getString("website_root_url"),qs.toString());
			qs = new QueryString();
			qs.put("token",cancelToken);
			String cancelUrl = String.format("%s/cancel?%s",Support.env().getString("website_root_url"),qs.toString());
			
	        EmailSchedule emailSchedule = new EmailSchedule(g);
	        emailSchedule.setSubject("Sign up service");
	        StringBuffer message = new StringBuffer();
	        message.append(String.format("<a href='%s' target='_blank'>Complete link</a>",completeUrl));
	        message.append("<br/>");
	        message.append("<br/>");
	        message.append(String.format("<a href='%s' target='_blank'>Cancel link</a>",cancelUrl));
	        message.append("<br/>");
	        
	        emailSchedule.setMessage(message.toString());
	        emailSchedule.setToList(email);
	        emailSchedule.setProcessHost(Support.env().getHostname());
	        emailSchedule.setAction("SIGN_UP");
	        emailSchedule.setUserId((String)user.getId());
	        emailSchedule.setStatus("New");
	        emailSchedule.save();

			return 1;
		} catch (Exception e) {
			log.warn(e.getMessage(), e);
			return 0;
		}
	}	
	public int checkEmailForResetPasswordWaiter(String email) throws SQLException {
		boolean overLen = email.length() < 5 || email.length() > 30;
		if (overLen) {
			return 2;
		}
		String regex = Support.config().getModels().gets("User", "attributes", "email", "validates_format_of", "with");
		boolean formatPass = !email.matches(regex);
		if (formatPass) {
			return 3;
		}
		Query q = new Query(new User(g));
		q.and("eq_email", email);
		q.and("eq_deleted", 0);
		User user = q.first();
		boolean exist = (user != null);
		if (exist) {
			return 1;
		}
		return 4;
	}
	
	public int submitSecurityCodeWaiter(String token,String submitCode) throws Exception{
	    String[] keys = Global.decrypt(token).split(";");
		String securityCodeId = keys[0];
		String userEmail = keys[1];
		String ip = keys[2];
        String clientIp = ((Global)g).getClientIpAddr();
        SecurityCode securityCode = new SecurityCode(g,securityCodeId);
        Timestamp expiredAt = securityCode.getExpiredAt();
        String code = securityCode.getCode().toUpperCase();
        String status = securityCode.getStatus();
        if(!status.equals("New")){
            return 2;
        }        
        if(expiredAt.getTime() < new Date().getTime()){
            return 3;
        }
        if(!code.equals(submitCode)){
            return 4;
        }
        if(!ip.equals(clientIp)){
            return 5;
        }
        securityCode.setStatus("Validated");
        securityCode.save();
	    return 1;
	}
	
	public int sendSecurityCodeWaiter(String requestAction, String email) throws Exception {
	    try{
	        Query q = new Query(new User(g));
	        q.and("eq_email",email);
	        q.and("eq_deleted",0);
	        User user = q.first();
	        if(user != null){
    	        q = new Query(new EmailSchedule(g));
    	        q.and("eq_deleted",0);
    	        q.and("eq_action",requestAction);
    	        q.and("eq_user_id",user.getId());
    	        q.and("in_status",new String[]{"New","Sending"});
    	        EmailSchedule emailSchedule = q.first();
    	        if(emailSchedule != null){
    	            return 2;
    	        }
    	        SecurityCode securityCode = new SecurityCode(g);
    	        securityCode.setAction(requestAction);
    	        securityCode.setCode(Support.code().id(6).toUpperCase());
    	        securityCode.setStatus("New");

    	        securityCode.setUserId((String)user.getId());
    	        Calendar current = Calendar.getInstance();
    	        current.add(Calendar.MINUTE,20);
    	        securityCode.setExpiredAt(new Timestamp(current.getTimeInMillis()));
    	        securityCode.save();
    	        EmailSchedule newEmailSchedule = new EmailSchedule(g);
    	        newEmailSchedule.setSubject("Security code of reset password");
    	        StringBuffer message = new StringBuffer();
    	        message.append(String.format("<div>Security Code: %s</div>",securityCode.getCode()));
    	        String expiredAtStr = g.timestamp2text(securityCode.getExpiredAt());
    	        message.append(String.format("<div>Expired At: %s</div>",expiredAtStr));
    	        newEmailSchedule.setMessage(message.toString());
    	        newEmailSchedule.setToList(email);
    	        newEmailSchedule.setProcessHost(Support.env().getHostname());
    	        newEmailSchedule.setAction("RESET_PASSWORD");
    	        newEmailSchedule.setUserId((String)user.getId());
    	        newEmailSchedule.setStatus("New");
    	        newEmailSchedule.save();
    			Json data = new Json();
    			String securityCodeId = (String)securityCode.getId();
    			String userEmail = newEmailSchedule.getToList();
    			String ip = ((Global)g).getClientIpAddr();
    			String token = Global.encrypt(String.format("%s;%s;%s",securityCodeId,userEmail,ip));
    			data.put("token",token);
    			setStatement(data);    	        
    	        return 1;
	        }else{
	            return 3;
	        }
	    }catch(Exception e){
	        log.warn(e.getMessage(), e);
	        return 0;
	    }
	}
	
}