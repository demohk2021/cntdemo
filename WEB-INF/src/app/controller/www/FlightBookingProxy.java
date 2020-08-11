package app.controller.www;

import app.controller.ApplicationController;
import app.controller.www.service.FlightBookingService;

public class FlightBookingProxy extends ActionProxy {
	
	public FlightBookingProxy(ApplicationController contro) throws Exception {
		super(contro);
	}
	
	@Override
	protected FlightBookingService getService(){
		return new FlightBookingService(g);
	}
	
}