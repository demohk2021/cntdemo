package app.controller.www;

import app.controller.ApplicationController;
import app.controller.www.service.AirportService;

public class AirportProxy extends ActionProxy {
	
	public AirportProxy(ApplicationController contro) throws Exception {
		super(contro);
	}
	
	@Override
	protected AirportService getService(){
		return new AirportService(g);
	}
	
}