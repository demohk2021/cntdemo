package app.controller.www;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import app.controller.ApplicationController;
import app.controller.www.service.JobService;
import app.helper.ApplicationHelper;
import app.model.Job;
import net.rails.active_record.ActiveRecord;
import net.rails.ext.Json;

public class JobProxy extends ActionProxy {
	
	private JobService service;
	
	public JobProxy(ApplicationController contro) throws Exception {
		super(contro);
		service = getService();
	}
	
	@Override
	protected JobService getService(){
		return new JobService(g);
	}
	
	public void updateAction() throws IOException {
		Json<String, Object> json = new Json<String, Object>();
		final String name = route.getController();
		final Map<String, Object> attrs = form(name);
		try {
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
				case 2:
					json.put("status", status);
					json.put("msg",g.t("common","start_failure"));
					break;
				case 998:
					json = service.getNoPermission();
					break;
				default: 
					json.put("status",status);
					json.put("msg",g.a("common","unknown_status"));
					break;
			}
			text(json.toString());
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			text(error(e).toString());
		}
	}
	
	public void testAction() throws IOException, InterruptedException {
		Json<String, Object> json = new Json<String, Object>();
		final String name = route.getController();
		final Map<String, Object> attrs = form(name);
		try {
			ApplicationHelper ar = (ApplicationHelper) ActiveRecord.eval(g,name, attrs.get("id"));
			ar.putAll(attrs);
			int status = service.testWaiter(ar);
			switch(status){
				case 0:
					json.put("status", status);
					json.put("msg",g.t("common","test_failure"));
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
	
}