package app.controller.www.service;

import app.global.Global;
import app.helper.ApplicationHelper;
import net.rails.ext.AbsGlobal;
import net.rails.sql.worker.FindWorker;
import java.util.List;
import net.rails.sql.query.Query;
import net.rails.active_record.ActiveRecord;
import java.util.Map;

public class UserService extends ActionService {

	public UserService(AbsGlobal g) {
		super(g);
	}
	@Override
	protected boolean beforeUpdate(ApplicationHelper ar) throws Exception {
	    ar.remove("session_token");
	    return super.beforeUpdate(ar);
	}	

	@Override
	protected FindWorker makeWorker(FindWorker worker){

	    worker.joins().add("LEFT JOIN role AS role_id_table ON role_id_table.id = user.role_id");
	    worker.selects().add("role_id_table.name AS as_user_role_id_display");  
	    worker.joins().add("LEFT JOIN member AS member_id_table ON member_id_table.id = user.member_id");
	    worker.selects().add("member_id_table.name AS as_user_member_id_display");  
	    return worker;
	}
	
	@Override
	protected boolean beforeBoxList(Query q,String query) {
	    q.and("any_email",query);
		return true;
	}
	
	@Override
	protected Map<String,Object> formatRecord(ActiveRecord src){
	    if(src.containsKey("as_user_sign_in_password")){
	        src.put("as_user_sign_in_password","********************************");
	    }
	    if(src.containsKey("sign_in_password")){
	        src.put("sign_in_password","********************************");
	    }	    
	    if(src.containsKey("as_user_session_token")){
	        src.remove("as_user_session_token");
	    }
	    if(src.containsKey("session_token")){
	        src.remove("session_token");
	    }
       return super.formatRecord(src);
	}
	
}
