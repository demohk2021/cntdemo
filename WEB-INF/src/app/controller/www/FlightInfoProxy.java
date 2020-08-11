package app.controller.www;

import app.controller.ApplicationController;
import app.controller.www.service.FlightInfoService;

public class FlightInfoProxy extends ActionProxy {
	
	public FlightInfoProxy(ApplicationController contro) throws Exception {
		super(contro);
	}
	
	@Override
	protected FlightInfoService getService(){
		return new FlightInfoService(g);
	}
	
}