package app.controller.www;

import app.controller.ApplicationController;
import app.controller.www.service.EventScheduleService;

public class EventScheduleProxy extends ActionProxy {
	
	public EventScheduleProxy(ApplicationController contro) throws Exception {
		super(contro);
	}
	
	@Override
	protected EventScheduleService getService(){
		return new EventScheduleService(g);
	}
	
}