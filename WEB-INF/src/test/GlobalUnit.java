package test;

import net.rails.Define;
import net.rails.ext.AbsGlobal;
import net.rails.support.worker.AbsConfigWorker;

public class GlobalUnit extends AbsGlobal {
	
	static{
		Define.CONFIG_PATH = "/src/app/WEB-INF/config";
		Define.VIEW_PATH = "/src/app/WEB-INF/view";
	}
	
	private Object userId;
	
	public GlobalUnit(){
		super();
	}

	@Override
	public void setUserId(Object userId) {
		this.userId = userId;
	}
	@Override
	public void setSessionId(Object sessionId) {

	}
	@Override
	public Object getUserId() {
		return userId;
	}
	@Override
	public Object getSessionId() {
		return "MySessionId";
	}

	@Override
	public String getRealPath() {
		return "/src/app/";
	}

}
