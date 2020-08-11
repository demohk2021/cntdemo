package app.controller.www;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import net.rails.active_record.ActiveRecord;
import net.rails.active_record.Attribute;
import net.rails.active_record.exception.MessagesException;
import net.rails.active_record.validate.UniquenessValidate;
import net.rails.ext.Json;
import net.rails.support.Support;
import net.rails.tpl.TplCache;
import app.controller.ApplicationController;
import app.controller.ApplicationProxy;
import app.controller.www.exception.NoPermissionException;
import app.controller.www.service.ActionService;
import app.helper.ApplicationHelper;
import net.rails.web.ClientFile;
import java.io.InputStream;
import java.io.File;
import java.io.FileInputStream;
import java.net.URLDecoder;
import java.util.regex.Pattern;
import net.rails.sql.query.Query;
import app.model.User;
import app.model.RolePermission;

public class ActionProxy extends ApplicationProxy {

	protected ActionService service;

	public ActionProxy(ApplicationController contro) throws Exception {
		super(contro);
		service = getService();
		String action = route.getAction();
		String controller = route.getController();
// 		if(!action.equals("include")){
// 		    checkSession();
// 		}
	}

	private void checkSession() throws Exception {
		String action = route.getAction();
		Object userId = g.getUserId();
		if (userId == null) {
			Json<String, Object> json = new Json<String, Object>();
			try {
				if (contro.isAjax()) {
					if (Pattern.compile("[L|l]ist$").matcher(action).find()) {
						json.put("total", 0);
						json.put("data", new Object[] {});
					} else {
						json.put("status", 999);
						json.put("msg", g.locale("common", "invalid_session").toString());
					}
					text(json.toString());
				} else if (action.equals("include")) {
					text("toLogout();");
				} else {
					redirectRoute("signIn", null);
				}
			} catch (Exception e) {
				log.error(e.getMessage(), e);
				route.setActive(false);
			}
		}
	}
	
	private void checkRolePermission() throws Exception {
	    /**
	    String action = route.getAction();
		String controller = route.getController();
        boolean pass = checkRolePermission(controller,action);
        if(!pass){
            throw new NoPermissionException("No Permission!");
        }
        **/
	}	
	
	private boolean checkRolePermission(String controller,String action) {
	    /**
	    try{
            Object userId = g.getUserId();
            if(userId == null){
                return false;
            }else{
                Query q = new Query(new User(g));
                q.cache(10);
                q.and("eq_deleted",0);
                q.and("eq_id",userId);
                User user = q.first();
                q = new Query(new RolePermission(g));
                q.cache(10);
                q.and("eq_deleted",0);
                q.and("eq_role_id",user.getRoleId());
                q.and("eq_model",controller);
                q.and("eq_action",action);
                RolePermission perm = q.first();
                return perm != null;
            }
	    }catch(Exception e){
	        log.warn(e.getMessage(),e);
	        return false;
	    }
	    **/
	    return true;
	}
	
	public void uploadAction() throws IOException {
		Json<String, Object> json = new Json<String, Object>();
		final String name = route.getController();
		String filename = contro.parseString("filename");
		String field = contro.parseString("field");
		String model = contro.parseString("model");
        ClientFile clientFile = (ClientFile) contro.getParams().get("data");
		try {
            int status = service.uploadWaiter(filename,model,field,clientFile);
			switch(status){
				case 0:
					json.put("success", false);
					json.put("msg",g.t("common","upload_failure"));
					break;
				case 1:
					json.put("success", true);
					json.put("filename", service.getStatement());
					break;
				default: 
					json.put("success",false);
					json.put("msg",g.t("common","unknown_status"));
					break;
			}
			text(json.toString());
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			json.put("success", false);
			json.put("msg",g.t("common","unknown_status"));
			text(json.toString());
		}
	}	

	public void downloadAction() throws IOException {
		try {
    		String filename = URLDecoder.decode(contro.parseString("filename"));
    		String field = contro.parseString("field");
    		String model = contro.parseString("model");
			File downloadFile = service.downloadWaiter(filename,model,field);
			if(downloadFile != null){
    			InputStream is = new FileInputStream(downloadFile);
    			contro.file(is,downloadFile.getName());
			}else{
                text(g.t("common","file_not_exist"));
            }
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			text(g.t("common","unknown_status"));
		}
	}
	
	public void rmFileAction() throws IOException {
	    Json<String, Object> json = new Json<String, Object>();
		try {
		    String filename = contro.parseString("filename");
    		String field = contro.parseString("field");
    		String model = contro.parseString("model");
            int status = service.rmFileWaiter(filename,model,field);
			switch(status){
				case 0:
					json.put("status", 0);
					json.put("msg",g.t("common","file_not_exist"));
					break;
				case 1:
					json.put("status", 1);
					json.put("filename", service.getStatement());
					break;
				default: 
					json.put("status",status);
					json.put("msg",g.t("common","unknown_status"));
					break;
			}
			text(json.toString());
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			json.put("status", 0);
			json.put("msg",g.t("common","unknown_status"));
			text(json.toString());
		}
	}	
	
	public void newPasswordAction() throws IOException {
	    Json<String, Object> json = new Json<String, Object>(); 
		try {
		    String id = contro.parseString("id");
		    String oldPassword = contro.parseString("old_password");
		    String newPassword = contro.parseString("new_password");
    		String field = contro.parseString("field");
    		String model = contro.parseString("model");
            int status = service.newPasswordWaiter(model,field,id,oldPassword,newPassword);
			switch(status){
				case 0:
					json.put("status", 0);
					json.put("msg",g.t("common","update_failure"));
					break;
				case 1:
					json.put("status", 1);
					json.put("md5_password",service.getStatement());
					break;
				case 2:
					json.put("status", 2);
					json.put("msg",g.t("common","old_password_error"));
					break;					
				default: 
					json.put("status",status);
					json.put("msg",g.t("common","unknown_status"));
					break;
			}
			text(json.toString());
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			json.put("status", 0);
			json.put("msg",g.t("common","unknown_status"));
			text(json.toString());
		}
	}	

	public void uniquenessValidateAction() throws IOException {
		final Json<String, Object> result = new Json<String, Object>();
		String field = parseString("field");
		try {
			ActiveRecord ar = ActiveRecord.eval(g, route.getController());
			ar.putAll(parseJson("validates"));
			if (!Support.object(ar.getId()).blank()) {
				ar.setSaveAction(ActiveRecord.ON_UPDATE);
			}
			UniquenessValidate v = new UniquenessValidate(new Attribute(ar,
					field), ar);
			v.pass(ar.get(field));
			if (v.getMessage() != null) {
				List<String> msgs = new ArrayList<String>();
				msgs.add(v.getMessage());
				throw new MessagesException(msgs);
			}
			result.put("status", 1);
			text(result.toString());
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			text(error(e).toString());
		}
	}

	public void queryAction() throws IOException, SQLException {
		Json<String, Object> json = new Json<String, Object>();
		String fun = parseString("fun", "first");
		String from = route.getController();
		String first = parseString("first");
		String last = parseString("last");
		Map<String, Object> ands = parseJson("ands", "{}");
		Map<String, Object> ors = parseJson("ors", "{}");
		Map<String, Object> otherParams = parseJson("otherParams", "{}");
		List<Object> selects = parseJsonArray("selects", "[]");
		List<Object> as = parseJsonArray("alias", "[]");
		List<Object> lefts = parseJsonArray("lefts", "[]");
		List<Object> inners = parseJsonArray("inners", "[]");
		List<Object> rights = parseJsonArray("rights", "[]");
		List<Object> counts = parseJsonArray("counts", "[]");
		boolean disc = parseBoolean("disc", false);
		boolean select = parseBoolean("select", false);
		boolean join = parseBoolean("join", false);
		boolean group = parseBoolean("group", false);
		boolean skipnil = parseBoolean("skipnil", false);
		try {
			Integer limit = parseNumber("limit", 300).intValue();
			Integer offset = parseNumber("offset", 0).intValue();
			int status = service.queryWaiter(fun, from, first, last, ands, ors,
					otherParams, selects, as, lefts, inners, rights, counts,
					disc, select, join, group, skipnil, limit, offset);
			switch(status){
				case 0:
					json.put("status", status);
					json.put("msg",g.t("common","query_failure"));
					break;
				case 1:
					json = service.getStatement();
					break;
				case 998:
					json = service.getNoPermission();
					break;
				default: 
					json.put("status",status);
					json.put("msg",g.t("common","unknown_status"));
					break;
			}
			text(json.toString());
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			text(error(e).toString());
		}
	}

	public void createAction() throws IOException {
		Json<String, Object> json = new Json<String, Object>();
		final String name = route.getController();
		final Map<String, Object> attrs = form(name);
		attrs.remove("id");
		try {
		    checkRolePermission();
			ApplicationHelper ar = (ApplicationHelper) ActiveRecord.eval(g,name);
			ar.putAll(attrs);
			int status = service.createWaiter(ar);
			switch(status){
				case 0:
					json.put("status", status);
					json.put("msg",g.t("common","create_failure"));
					break;
				case 1:
					json.put("status", status);
					json.put("data", service.getStatement());
					break;
				case 998:
					json = service.getNoPermission();
					break;
				default: 
					json.put("status",status);
					json.put("msg",g.t("common","unknown_status"));
					break;
			}
			text(json.toString());
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			text(error(e).toString());
		}
	}

	public void updateAction() throws IOException, InterruptedException {
		Json<String, Object> json = new Json<String, Object>();
		final String name = route.getController();
		final Map<String, Object> attrs = form(name);
		try {
		    checkRolePermission();
			ApplicationHelper ar = (ApplicationHelper) ActiveRecord.eval(g,name, attrs.get("id"));
			ar.putAll(attrs);
			int status = service.updateWaiter(ar);
			switch(status){
				case 0:
					json.put("status", status);
					json.put("msg",g.t("common","update_failure"));
					break;
				case 1:
					json.put("status", status);
					json.put("data", service.getStatement());
					break;
				case 998:
					json = service.getNoPermission();
					break;
				default: 
					json.put("status",status);
					json.put("msg",g.t("common","unknown_status"));
					break;
			}
			text(json.toString());
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			text(error(e).toString());
		}
	}

	public void removeAction() throws IOException {
		Json<String, Object> json = new Json<String, Object>();
		final String name = route.getController();
		final Map<String, Object> attrs = form(name);
		try {
		    checkRolePermission();
			ApplicationHelper ar = (ApplicationHelper) ActiveRecord.eval(g,name, attrs.get("id"));
			int status = service.removeWaiter(ar);
			switch(status){
				case 0:
					json.put("status", status);
					json.put("msg",g.t("common","remove_failure"));
					break;
				case 1:
					json.put("status", status);
					json.put("data", service.getStatement());
					break;
				case 998:
					json = service.getNoPermission();
					break;
				default: 
					json.put("status",status);
					json.put("msg",g.t("common","unknown_status"));
					break;
			}
			text(json.toString());
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			text(error(e).toString());
		}
	}


	public void boxListAction() throws IOException {
		Json<String, Object> json = new Json<String, Object>();
		try {
			int limit = parseNumber("limit", 25).intValue();
			int offset = parseNumber("start", 0).intValue();
			Map<String, Object> and = parseJson("and");
			Map<String, Object> or = parseJson("or");
			String query = parseString("query");
			int status = service.boxListWaiter(and, or,limit, offset,query);
			switch(status){
				case 0:
					json.put("total", 0);
					json.put("data", new Object[]{});
					break;
				case 1:
					json = service.getStatement();
					break;
				case 998:
					json.put("total", 0);
					json.put("data", new Object[]{});
					break;
				default: 
					json.put("total", 0);
					json.put("data", new Object[]{});
					break;
			}
			text(json.toString());
		} catch (Exception e) {
			log.error( e.getMessage(), e);
			json.put("total", 0);
			json.put("data", new Object[] {});
			text(json.toString());
		}
	}

	public void listAction() throws IOException {
		Json<String, Object> json = new Json<String, Object>();
		try {
		    checkRolePermission();
			int limit = parseNumber("limit", 25).intValue();
			int offset = parseNumber("start", 0).intValue();
			Map<String, Object> and = form("and");
			Map<String, Object> or = form("or");
			Map<String, Object> extraAnd = parseJson("extraAnd", "{}");
			Map<String, Object> extraOr = parseJson("extraOr", "{}");
			List<Object> sorts = parseJsonArray("sort","[{property:'',direction:''}]");
			Map<String, String> sort = (Map<String, String>) sorts.get(0);
			String sortProp = sort.get("property").toString();
			String sortDire = sort.get("direction").toString();
			int status = service.listWaiter(and, or, extraAnd, extraOr, limit, offset, sortProp, sortDire);
			switch(status){
				case 0:
					json.put("total", 0);
					json.put("data", new Object[]{});
					break;
				case 1:
					json = service.getStatement();
					break;
				case 998:
					json.put("total", 0);
					json.put("data", new Object[]{});
					break;
				default: 
					json.put("total", 0);
					json.put("data", new Object[]{});
					break;
			}
			text(json.toString());
		} catch (Exception e) {
			log.error( e.getMessage(), e);
			json.put("total", 0);
			json.put("data", new Object[] {});
			text(json.toString());
		}
	}

	public void belongsToAction() throws IOException {
		Json<String, Object> json = new Json<String, Object>();
		try{
			ApplicationHelper ar = (ApplicationHelper) ActiveRecord.eval(g, route.getController());
			ar.putAll(form(route.getController()));
			String belongName = parseString("belongName");
			int status = service.belongsToWaiter(ar, belongName);
			switch(status){
				case 0:
					json.put("status", 0);
					json.put("msg",g.t("common","query_failure"));
					break;
				case 1:
					json = service.getStatement();
					break;
				case 998:
					json = service.getNoPermission();
					break;
				default:
					json.put("status", status);
					json.put("msg",g.t("common","unknown_status"));
					break;
			}
			text(json.toString());
		}catch(Exception e){
			log.error(e.getMessage(),e);
			text(error(e).toString());
		}
	}
	
	public void hasOneAction() throws IOException {
		Json<String, Object> json = new Json<String, Object>();
		try{
			ApplicationHelper ar = (ApplicationHelper) ActiveRecord.eval(g, route.getController());
			ar.putAll(form(route.getController()));
			String hasName = parseString("hasName");
			int status = service.hasOneWaiter(ar, hasName);
			switch(status){
				case 0:
					json.put("status", 0);
					json.put("msg",g.t("common","query_failure"));
					break;
				case 1:
					json = service.getStatement();
					break;				
				case 998:
					json = service.getNoPermission();
					break;
				default:
					json.put("status", status);
					json.put("msg",g.t("common","unknown_status"));
					break;
			}
			text(json.toString());
		}catch(Exception e){
			log.error(e.getMessage(),e);
			text(error(e).toString());
		}
	}
	
	public void hasManyAction() throws IOException {
		Json<String, Object> json = new Json<String, Object>();
		try{
			ApplicationHelper ar = (ApplicationHelper) ActiveRecord.eval(g, route.getController());
			ar.putAll(form(route.getController()));
			String hasName = parseString("hasName");
			int status = service.hasManyWaiter(ar, hasName);
			switch(status){
				case 0:
					json.put("status", 0);
					json.put("msg",g.t("common","query_failure"));
					break;
				case 1:
					json.put("status", 1);
					json.put("data",service.getStatement());
					break;				
				case 998:
					json = service.getNoPermission();
					break;
				default:
					json.put("status", status);
					json.put("msg",g.t("common","unknown_status"));
					break;
			}
			text(json.toString());
		}catch(Exception e){
			log.error(e.getMessage(),e);
			text(error(e).toString());
		}
	}

	protected Json<String, Object> error(Exception e) {
		final Json<String, Object> json = new Json<String, Object>();
		if (e instanceof MessagesException) {
			List<String> msgs = ((MessagesException) e).getMessages();
			return json.append("status", 2).append("msg",
					Support.array(msgs).join("<br/>"));
		} else if (e instanceof NoPermissionException) {
			return service.getNoPermission();
		} else
			return json.append("status", 0).append("msg", e.getMessage());
	}

	protected ActionService getService() {
		return new ActionService(g);
	}

}
