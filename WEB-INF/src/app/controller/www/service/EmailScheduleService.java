package app.controller.www.service;

import app.global.Global;
import app.helper.ApplicationHelper;
import net.rails.ext.AbsGlobal;
import net.rails.sql.worker.FindWorker;
import java.util.List;
import net.rails.sql.query.Query;
import net.rails.active_record.ActiveRecord;
import java.util.Map;

public class EmailScheduleService extends ActionService {

	public EmailScheduleService(AbsGlobal g) {
		super(g);
	}

	@Override
	protected FindWorker makeWorker(FindWorker worker){

	    worker.joins().add("LEFT JOIN user AS user_id_table ON user_id_table.id = email_schedule.user_id");
	    worker.selects().add("user_id_table.email AS as_email_schedule_user_id_display");  
	    return worker;
	}
	
	@Override
	protected boolean beforeBoxList(Query q,String query) {
	    q.and("any_subject",query);
		return true;
	}
	
	@Override
	protected Map<String,Object> formatRecord(ActiveRecord src){
       return super.formatRecord(src);
	}
	
}
