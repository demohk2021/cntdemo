package app.controller.www;

import app.controller.ApplicationController;
import app.controller.www.service.FlightBookingSeatService;

public class FlightBookingSeatProxy extends ActionProxy {
	
	public FlightBookingSeatProxy(ApplicationController contro) throws Exception {
		super(contro);
	}
	
	@Override
	protected FlightBookingSeatService getService(){
		return new FlightBookingSeatService(g);
	}
	
}