package app.controller.www;

import app.controller.ApplicationController;
import app.controller.ApplicationProxy;
import net.rails.tpl.TplCache;
import java.io.IOException;
import java.util.Date;
import net.rails.cache.Cache;
import java.util.Map;
import app.controller.www.service.HomeService;
import net.rails.ext.Json;
import app.model.User;
import app.global.Global;
import net.rails.support.Support;
import net.rails.ciphertext.exception.CiphertextException;
import app.model.SecurityCode;
import java.util.HashMap;
import net.rails.web.QueryString;

public class HomeProxy extends ApplicationProxy {

    protected HomeService service;
    
	public HomeProxy(ApplicationController contro) {
		super(contro);
		service = getService();
	}
	
	public void indexAction() throws IOException {
		text(new TplCache(0,"Home","index") {
			@Override
			protected String execution() {
				try {
					return htmlTpl();
				} catch (Exception e) {
					log.error(e.getMessage(), e);
					return null;
				}
			}
		}.toString());
	}	
	
	public void signInAction() throws IOException {
	    g.options.put("params",params);
		text(new TplCache(0,"Home","signIn") {
			@Override
			protected String execution() {
				try {
					return htmlTpl();
				} catch (Exception e) {
					log.error(e.getMessage(), e);
					return null;
				}
			}
		}.toString());
	}

	public void completeAction() throws IOException {
	    Json json = new Json();
		String token = contro.parseString("token","");
		try {
			int status = service.completeWaiter(token);
			switch (status) {
			case 1:
                json.put("status", 1);
                json.put("msg", g.t("common", "active_completed"));
				break;
		    case 2:
				json.put("status", 2);
				json.put("msg", g.t("common", "invalid_complete_link"));
				break;
		    case 3:
				json.put("status", 3);
				json.put("msg", g.t("common", "invalid_sign_up"));
				break;		
		    case 4:
				json.put("status", 4);
				json.put("msg", g.t("common", "invalid_active"));
				break;					
			default:
				json.put("status", 0);
				json.put("msg", g.t("common", "unknown_status"));
				break;
			}
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			json.put("status", 0);
			json.put("msg", g.t("common", "unknown_status"));
		}
        QueryString qs = new QueryString(json);
        qs.put("_t",new Date().getTime());
        contro.redirect("signIn", qs);
	}
	
	public void cancelAction() throws IOException {
	    Json json = new Json();
		String token = contro.parseString("token","");
		try {
			int status = service.cancelWaiter(token);
			switch (status) {
			case 1:
                json.put("status", 1);
                json.put("msg", g.t("common", "user_canceled"));
				break;
		    case 2:
				json.put("status", 2);
				json.put("msg", g.t("common", "invalid_cancel_link"));
				break;
		    case 3:
				json.put("status", 3);
				json.put("msg", g.t("common", "invalid_sign_up"));
				break;	
		    case 4:
				json.put("status", 4);
				json.put("msg", g.t("common", "invalid_cancel"));
				break;					
			default:
				json.put("status", 0);
				json.put("msg", g.t("common", "unknown_status"));
				break;
			}
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			json.put("status", 0);
			json.put("msg", g.t("common", "unknown_status"));
		}
        QueryString qs = new QueryString(json);
        qs.put("_t",new Date().getTime());
        contro.redirect("signIn", qs);
	}	
	
	public void checkUsernameAction() throws IOException {
	    Json json = new Json();
		String username = contro.parseString("username","");
		try {
			int status = service.checkUsernameWaiter(username);
			switch (status) {
			case 1:
                json.put("status", 1);
				break;
		    case 2:
				json.put("status", 2);
				json.put("msg", g.t("common", "invalid_length_username"));
				break;
			case 3:
				json.put("status", 3);
				json.put("msg", g.t("common", "invalid_format_username"));
				break;
			case 4:
				json.put("status", 4);
				json.put("msg", g.t("common", "exists_username"));
				break;				
			default:
				json.put("status", 0);
				json.put("msg", g.t("common", "unknown_status"));
				break;
			}
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			json.put("status", 0);
			json.put("msg", g.t("common", "unknown_status"));
		}
		text(json.toString());
	}	
	
	public void checkEmailAction() throws IOException {
	    Json json = new Json();
		String email = contro.parseString("email");
		try {
			int status = service.checkEmailWaiter(email);
			switch (status) {
			case 1:
                json.put("status", 1);
				break;
		    case 2:
				json.put("status", 2);
				json.put("msg", g.t("common", "invalid_length_email"));
				break;
		    case 3:
				json.put("status", 3);
				json.put("msg", g.t("common", "invalid_format_email"));
				break;	
		    case 4:
				json.put("status", 4);
				json.put("msg", g.t("common", "exists_email"));
				break;				
			default:
				json.put("status", 0);
				json.put("msg", g.t("common", "unknown_status"));
				break;
			}
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			json.put("status", 0);
			json.put("msg", g.t("common", "unknown_status"));
		}
		text(json.toString());
	}	
	
	public void changePasswordAction() throws IOException{
	    Json json = new Json();
	    String token = contro.parseString("token","");
	    String newPassword = contro.parseString("new_password","");
	    try{
    	    int status = service.changePasswordWaiter(token,newPassword);
    	    switch(status){
    	        case 1:
    				json.put("status", 1);
    				break;
    	        case 2:
    				json.put("status", 2);
    				json.put("msg", g.t("common", "invalid_security_code"));
    				break;   
    	        case 3:
    				json.put("status", 3);
    				json.put("msg", g.t("common", "expired_security_code"));
    				break;   
    	        case 4:
    				json.put("status", 4);
    				json.put("msg", g.t("common", "invalid_client_ip"));
    				break;   
    	        case 5:
    				json.put("status", 5);
    				json.put("msg", g.t("common", "invalid_password"));
    				break;
    			default:
    				json.put("status", 0);
			        json.put("msg", g.t("common", "unknown_status"));
    			    break;
    	    }
	    }catch(Exception e){
			log.warn(e.getMessage(), e);
			json.put("status", 0);
			json.put("msg", g.t("common", "unknown_status"));
	    }
	    text(json.toString());
	}

	public void checkPasswordAction() throws IOException {
	    Json json = new Json();
		String password = contro.parseString("password");
		try {
			int status = service.checkPasswordWaiter(password);
			switch (status) {
			case 1:
                json.put("status", 1);
				break;
			case 2:
                json.put("status", 2);
                json.put("msg", g.t("common", "invalid_length_password"));
				break;
			case 3:
                json.put("status", 3);
                json.put("msg", g.t("common", "invalid_format_password"));
				break;				
			default:
				json.put("status", 0);
				json.put("msg", g.t("common", "unknown_status"));
				break;
			}
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			json.put("status", 0);
			json.put("msg", g.t("common", "unknown_status"));
		}
		text(json.toString());
	}	
	
	public void signUpAction() throws IOException {
	    Json json = new Json();
		User formUser = new User(g);
		formUser.putAll(contro.form("Home"));
		String username = formUser.getUsername();
		String email = formUser.getEmail(); 
		String password = formUser.getSignInPassword();

		try {
		    int checkUsernameStatus = service.checkUsernameWaiter(username);
		    switch (checkUsernameStatus) {
			case 1:
				break;
		    case 2:
				json.put("username_msg", g.t("common", "invalid_length_username"));
				break;
			case 3:
				json.put("username_msg", g.t("common", "invalid_format_username"));
				break;
			case 4:
				json.put("username_msg", g.t("common", "exists_username"));
				break;				
			default:
				json.put("msg", g.t("common", "unknown_status"));
				break;
			}
			
		    int checkEmailStatus = service.checkEmailWaiter(email);
		    switch (checkEmailStatus) {		    
			case 1:
				break;
		    case 2:
				json.put("email_msg", g.t("common", "invalid_length_email"));
				break;
		    case 3:
				json.put("email_msg", g.t("common", "invalid_format_email"));
				break;	
		    case 4:
				json.put("email_msg", g.t("common", "exists_email"));
				break;				
			default:
				json.put("email_msg", g.t("common", "unknown_status"));
				break;
			}
			
		    int checkPasswordStatus = service.checkPasswordWaiter(password);
		    switch (checkPasswordStatus) {		    
			case 1:
				break;
			case 2:
                json.put("password_msg", g.t("common", "invalid_length_password"));
				break;
			case 3:
                json.put("password_msg", g.t("common", "invalid_format_password"));
				break;				
			default:
				json.put("password_msg", g.t("common", "unknown_status"));
				break;
			}		    
		    if(checkUsernameStatus == 1 && checkEmailStatus == 1 && checkPasswordStatus == 1){
    			int status = service.signUpWaiter(username,email,password);
    			switch (status) {
    			case 1:
    				//g.setUserId(service.getStatement());
                    json.put("status", 1);
    				break;
    			default:
    				json.put("status", 0);
    				json.put("msg", g.t("common", "invalid_register"));
    				break;
    			}
		    }else{
		        json.put("status", 2);
		    }
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			json.put("status", 0);
			json.put("msg", g.t("common", "unknown_status"));
		}
		text(json.toString());
	}	

    public void toChangePasswordAction() throws IOException {
		String token = contro.parseString("token", "");
		try{
    		if (!Support.string(token).blank()) {
    			String decryptText = Global.decrypt(token);
    			String[] keys = decryptText.split(";");
    			String securityCodeId = keys[0];
    			String code = keys[1];
    			String email = keys[2];
    			g.options.put("email", email);
    			g.options.put("token", token);
    		}   
		}catch(CiphertextException e){
		    log.warn(e.getMessage(),e);
		}
		text(new TplCache(0,"Home","toChangePassword") {
			@Override
			protected String execution() {
				try {
					return htmlTpl();
				} catch (Exception e) {
					log.error(e.getMessage(), e);
					return null;
				}
			}
		}.toString());
	}
	
    public void resetPasswordAction() throws IOException {
		String token = contro.parseString("token", "");
		try{
    		if (!Support.string(token).blank()) {
    			String decryptText = Global.decrypt(token);
    			String[] keys = decryptText.split(";");
    			
    			String securityCodeId = keys[0];
        		String userEmail = keys[1];
        		String ip = keys[2];

    			g.options.put("email", userEmail);
    			g.options.put("token", token);
    		}   
		}catch(CiphertextException e){
		    log.warn(e.getMessage(),e);
		}
		text(new TplCache(0,"Home","resetPassword") {
			@Override
			protected String execution() {
				try {
					return htmlTpl();
				} catch (Exception e) {
					log.error(e.getMessage(), e);
					return null;
				}
			}
		}.toString());
	}
	
	public void checkEmailForResetPasswordAction() throws IOException {
	    Json json = new Json();
		String email = contro.parseString("email");
		try {
			int status = service.checkEmailForResetPasswordWaiter(email);
			switch (status) {
			case 1:
                json.put("status", 1);
				break;
		    case 2:
				json.put("status", 2);
				json.put("msg", g.t("common", "invalid_length_email"));
				break;
		    case 3:
				json.put("status", 3);
				json.put("msg", g.t("common", "invalid_format_email"));
				break;	
		    case 4:
				json.put("status", 4);
				json.put("msg", g.t("common", "no_exists_email"));
				break;				
			default:
				json.put("status", 0);
				json.put("msg", g.t("common", "unknown_status"));
				break;
			}
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			json.put("status", 0);
			json.put("msg", g.t("common", "unknown_status"));
		}
		text(json.toString());
	}
	
	public void sendSecurityCodeAction() throws IOException {
	    Json json = new Json();
		String email = contro.parseString("email","");
		String requestAction = contro.parseString("requestAction");
		try {
		    int checkEmailStatus = service.checkEmailForResetPasswordWaiter(email);
			switch (checkEmailStatus) {
			case 1:
				break;
		    case 2:
				json.put("email_msg", g.t("common", "invalid_length_email"));
				break;
		    case 3:
				json.put("email_msg", g.t("common", "invalid_format_email"));
				break;	
		    case 4:
				json.put("email_msg", g.t("common", "no_exists_email"));
				break;				
			default:
				json.put("email_msg", g.t("common", "unknown_status"));
				break;
			}
			if(checkEmailStatus == 1){
    			int status = service.sendSecurityCodeWaiter(requestAction,email); 
    			switch (status) {
    			case 1:
                    json.put("status", 1);
                    json.put("data",service.getStatement());
    				break;
    			case 2:
                    json.put("status", 2);
                    json.put("msg", g.t("common", "busy_handle_for_your_request"));
    				break;  
    			case 3:
                    json.put("status", 3);
                    json.put("msg", g.t("common", "no_exists_email"));
    				break;     				
    			default:
    				json.put("status", 0);
    				json.put("msg", g.t("common", "unknown_status"));
    				break;
    			}   
			}else{
			    json.put("status", 3);
			}
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			json.put("status", 0);
			json.put("msg", g.t("common", "unknown_status"));
		}
		text(json.toString());
	}
	
	public void submitSecurityCodeAction() throws IOException{
	    Json json = new Json();
	    String code = contro.parseString("code","").toUpperCase();
	    String token = contro.parseString("token","");
	    try{
    	    int status = service.submitSecurityCodeWaiter(token,code);
    	    switch(status){
    	        case 1:
    				json.put("status", 1);
    				Map<String,String> data = new HashMap<String,String>();
    				data.put("token",token);
    				json.put("data",data);
    				break;
    	        case 2:
    				json.put("status", 2);
    				json.put("msg", g.t("common", "validated_security_code"));
    				break;       				
    	        case 3:
    				json.put("status", 3);
    				json.put("msg", g.t("common", "expired_security_code"));
    				break;    	
    	        case 4:
    				json.put("status", 4);
    				json.put("msg", g.t("common", "invalid_security_code"));
    				break;     	
    	        case 5:
    				json.put("status", 5);
    				json.put("msg", g.t("common", "invalid_client_ip"));
    				break;     				
    			default:
    				json.put("status", 0);
			        json.put("msg", g.t("common", "unknown_status"));
    			    break;
    	    }
	    }catch(Exception e){
			log.warn(e.getMessage(), e);
			json.put("status", 0);
			json.put("msg", g.t("common", "unknown_status"));
	    }
	    text(json.toString());
	}
	
    
	public void loginAction() throws IOException {
	    Json<String, Object> json = new Json<String, Object>();
	    Map<String,Object> userMap = (Map<String,Object>)contro.form("Home");
        String username = (String)userMap.get("username");
        String password = (String)userMap.get("password");
        try{
            int status = service.loginWaiter(username,password);
            switch(status){
				case 0:
					json.put("status", 0);
					json.put("msg",g.t("common","login_failure"));
					break;
				case 1:
				    User user = (User)service.getStatement();
					json.put("status", 1);
					g.setUserId(user.getId());
					break;
				case 2:
					json.put("status", 2);
					json.put("msg",g.t("common","user_not_active"));
					break;				
				default: 
					json.put("status",0);
					json.put("msg",g.t("common","unknown_status"));
					break;
			}
			text(json.toString());
        }catch(Exception e){
			log.error(e.getMessage(), e);
			json.put("status", 0);
			json.put("msg",g.t("common","unknown_status"));
			text(json.toString());
        }
	}

	public void logoutAction() throws Exception {
		g.setUserId(null);
		redirectRoute("signIn",null);
	}
	
    protected HomeService getService(){
		return new HomeService(g);
	}	
}