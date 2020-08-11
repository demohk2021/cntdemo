package app.controller.www.service;

import app.global.Global;
import app.helper.ApplicationHelper;
import net.rails.ext.AbsGlobal;
import net.rails.sql.worker.FindWorker;
import java.util.List;
import net.rails.sql.query.Query;
import net.rails.active_record.ActiveRecord;
import java.util.Map;

public class RolePermissionService extends ActionService {

	public RolePermissionService(AbsGlobal g) {
		super(g);
	}

	@Override
	protected FindWorker makeWorker(FindWorker worker){

	    worker.joins().add("LEFT JOIN role AS role_id_table ON role_id_table.id = role_permission.role_id");
	    worker.selects().add("role_id_table.name AS as_role_permission_role_id_display");  
	    return worker;
	}
	
	@Override
	protected boolean beforeBoxList(Query q,String query) {
	    q.and("any_model",query);
		return true;
	}
	
	@Override
	protected Map<String,Object> formatRecord(ActiveRecord src){
       return super.formatRecord(src);
	}
	
}
