package app.controller.www;

import app.controller.ApplicationController;
import app.controller.www.service.UserService;

public class UserProxy extends ActionProxy {
	
	public UserProxy(ApplicationController contro) throws Exception {
		super(contro);
	}
	
	@Override
	protected UserService getService(){
		return new UserService(g);
	}
	
}