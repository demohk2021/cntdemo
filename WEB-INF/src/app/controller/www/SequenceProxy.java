package app.controller.www;

import app.controller.ApplicationController;
import app.controller.www.service.SequenceService;

public class SequenceProxy extends ActionProxy {
	
	public SequenceProxy(ApplicationController contro) throws Exception {
		super(contro);
	}
	
	@Override
	protected SequenceService getService(){
		return new SequenceService(g);
	}
	
}