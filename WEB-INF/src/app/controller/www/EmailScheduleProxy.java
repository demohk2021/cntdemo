package app.controller.www;

import app.controller.ApplicationController;
import app.controller.www.service.EmailScheduleService;

public class EmailScheduleProxy extends ActionProxy {
	
	public EmailScheduleProxy(ApplicationController contro) throws Exception {
		super(contro);
	}
	
	@Override
	protected EmailScheduleService getService(){
		return new EmailScheduleService(g);
	}
	
}