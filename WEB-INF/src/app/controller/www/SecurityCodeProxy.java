package app.controller.www;

import app.controller.ApplicationController;
import app.controller.www.service.SecurityCodeService;

public class SecurityCodeProxy extends ActionProxy {
	
	public SecurityCodeProxy(ApplicationController contro) throws Exception {
		super(contro);
	}
	
	@Override
	protected SecurityCodeService getService(){
		return new SecurityCodeService(g);
	}
	
}