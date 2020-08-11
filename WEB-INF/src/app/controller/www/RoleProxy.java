package app.controller.www;

import app.controller.ApplicationController;
import app.controller.www.service.RoleService;

public class RoleProxy extends ActionProxy {
	
	public RoleProxy(ApplicationController contro) throws Exception {
		super(contro);
	}
	
	@Override
	protected RoleService getService(){
		return new RoleService(g);
	}
	
}