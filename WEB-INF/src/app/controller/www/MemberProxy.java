package app.controller.www;

import app.controller.ApplicationController;
import app.controller.www.service.MemberService;

public class MemberProxy extends ActionProxy {
	
	public MemberProxy(ApplicationController contro) throws Exception {
		super(contro);
	}
	
	@Override
	protected MemberService getService(){
		return new MemberService(g);
	}
	
}