package app.controller.www;

import app.controller.ApplicationController;
import app.controller.www.service.RolePermissionService;

public class RolePermissionProxy extends ActionProxy {
	
	public RolePermissionProxy(ApplicationController contro) throws Exception {
		super(contro);
	}
	
	@Override
	protected RolePermissionService getService(){
		return new RolePermissionService(g);
	}
	
}