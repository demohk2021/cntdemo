package app.global;

import javax.servlet.FilterConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import net.rails.ext.AbsGlobal;
import net.rails.support.worker.UserAgentWorker;
import net.rails.web.Controller;
import net.rails.web.Route;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import net.rails.ciphertext.Ciphertext.RSAWorker;
import net.rails.ciphertext.Ciphertext.RSAWorker.RSATool;
import java.security.Key;
import net.rails.ciphertext.Ciphertext.Base64Worker;
import net.rails.ciphertext.exception.CiphertextException;
import java.util.Date;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import app.model.User;
import java.sql.SQLException;
import net.rails.active_record.validate.exception.ValidateException;
import net.rails.active_record.validate.exception.ConfigurException;
import net.rails.active_record.validate.TypeException;
import java.util.regex.PatternSyntaxException;
import net.rails.sql.query.Query;
import java.util.Map;

public class Global extends AbsGlobal {
	
	private final static Logger log = LoggerFactory.getLogger(Global.class);
	private final static String RSA_KEY = "nj9idno2wen6m1xah3z88mrzgkdq8ofj";
	private HttpSession session;
	private FilterConfig config;
	private HttpServletRequest request;
	private HttpServletResponse response;	
	private Route route;
	private UserAgentWorker ua;
	
	public Global(Controller controller){
		super();
		this.config = controller.getConfig();
		this.request = controller.getRequest();
		this.response = controller.getResponse();
		this.session = request.getSession();		
		this.route = controller.getRoute();
		this.ua = controller.getUserAgent();
		this.options.put("protocol", request.getScheme());
		this.options.put("domain",request.getServerName());
		this.options.put("port", request.getLocalPort());
		this.options.put("path", request.getContextPath());
		this.options.put("controller",route.getController());
		this.options.put("action",route.getAction());
		this.options.put("_ARGS",controller.getParams().get("_ARGS"));
		String domainRoot = "";
		String domain = this.options.get("domain").toString();
		String protocol = this.options.get("protocol").toString().toLowerCase();
		int port = (Integer)this.options.get("port");
		String path = this.options.get("path").toString();		
		this.options.put("domainRoot", domainRoot);	
		this.options.put("domainUrl", domainRoot + path);		
		this.options.put("os-family", ua.os().getFamily());
		this.options.put("os-name", ua.os().getName());
		this.options.put("os-version", ua.os().getVersion());
		this.options.put("browser-family",ua.browser().getFamily());
		this.options.put("browser-name",ua.browser().getName());
		this.options.put("browser-engine",ua.engine().getName());
		this.options.put("browser-version",ua.engine().getVersion());
	}

	@Override
	public void setUserId(Object userId) {
	    try{
	        if(userId == null){
	           throw new NullPointerException("User ID is null!");
	        }
    		long loginAt = (new Date().getTime()/1000)*1000;
    		String token = String.format("%s;%s",userId,loginAt);
    		String sessionToken = encrypt(token);
    		User user = new User(this,userId);
    		user.setSessionToken(sessionToken);
    		user.save();
    	    Cookie tokenCookie = new Cookie("token",sessionToken);
            tokenCookie.setMaxAge(Integer.MAX_VALUE);
            tokenCookie.setPath("/");
    	    response.addCookie(tokenCookie); 
	    }catch(Exception e){
	        log.warn(e.getMessage(),e);
	        Cookie noneCookie = new Cookie("token","");
            noneCookie.setMaxAge(0);
            noneCookie.setPath("/");
            response.addCookie(noneCookie); 
	    }
	}
	
	@Override
	public void setSessionId(Object sessionId) {

	}
	
	@Override
	public Object getUserId() {
	    try{
    		String sessionToken = getCookie("token");
    		String token = decrypt(sessionToken);
    		Query q = new Query(new User(this));
    		q.cache(120);
    		q.and("eq_deleted",0);
    		q.and("eq_session_token",sessionToken);
    		User user = q.first();
    		if(user == null){
    		    return null;
    		}else{
    		    return user.getId();
    		}
	    }catch(Exception e){
	        log.warn(e.getMessage(),e);
	        Cookie noneCookie = new Cookie("token","");
            noneCookie.setMaxAge(0);
            noneCookie.setPath("/");
            response.addCookie(noneCookie); 	        
	        return null;
	    }
	}
	
	@Override
	public Object getSessionId() {
		return session.getId();
	}

	@Override
	public String getRealPath() {
		return config.getServletContext().getRealPath("/");
	}

	public static String encrypt(String text) throws CiphertextException {
		RSAWorker rsa = new RSAWorker();
		RSATool tool = new RSATool(RSA_KEY.getBytes());
		Key priKey = tool.getPrivateKey();
		byte[] bytes = rsa.encrypt(priKey, text.getBytes());
		if (bytes == null) {
			return null;
		} else {
			return Base64Worker.encode(bytes);
		}
	}

	public static String decrypt(String base64Text) throws CiphertextException {
		RSAWorker rsa = new RSAWorker();
		RSATool tool = new RSATool(RSA_KEY.getBytes());
		Key pubKey = tool.getPublicKey();
		byte[] bytes = rsa.decrypt(pubKey, Base64Worker.decode(base64Text));
		if (bytes == null) {
			return null;
		} else {
			return new String(bytes);
		}
	}

    public String getCookie(String key){
        Cookie[] cookies = request.getCookies();
    	if(cookies != null){
    	    for(Cookie cookie : cookies){
    	        String name = cookie.getName();
    	        if(name.equals(key)){
    	            return cookie.getValue();
    	        }
    	    }
    	}
    	return null;
    }
    
    public String getClientIpAddr() {  
        String ip = request.getHeader("X-Forwarded-For");  
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
            ip = request.getHeader("X-Real-IP");  
        }  
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
            ip = request.getHeader("Proxy-Client-IP");  
        }  
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
            ip = request.getHeader("WL-Proxy-Client-IP");  
        }  
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
            ip = request.getHeader("HTTP_CLIENT_IP");  
        }  
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");  
        }  
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
            ip = request.getRemoteAddr();  
        }  
        return ip;  
    }       
    
}
