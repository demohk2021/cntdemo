package app.controller.www;

import app.controller.ApplicationController;
import app.controller.www.service.JobProcessService;

public class JobProcessProxy extends ActionProxy {
	
	public JobProcessProxy(ApplicationController contro) throws Exception {
		super(contro);
	}
	
	@Override
	protected JobProcessService getService(){
		return new JobProcessService(g);
	}
	
}