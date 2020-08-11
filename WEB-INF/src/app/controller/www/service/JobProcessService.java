package app.controller.www.service;

import app.global.Global;
import app.helper.ApplicationHelper;
import net.rails.ext.AbsGlobal;
import net.rails.sql.worker.FindWorker;
import java.util.List;
import net.rails.sql.query.Query;
import net.rails.active_record.ActiveRecord;
import java.util.Map;

public class JobProcessService extends ActionService {

	public JobProcessService(AbsGlobal g) {
		super(g);
	}

	@Override
	protected FindWorker makeWorker(FindWorker worker){

	    worker.joins().add("LEFT JOIN job AS job_id_table ON job_id_table.id = job_process.job_id");
	    worker.selects().add("job_id_table.job_name AS as_job_process_job_id_display");  
	    return worker;
	}
	
	@Override
	protected boolean beforeBoxList(Query q,String query) {
	    q.and("any_hostname",query);
		return true;
	}
	
	@Override
	protected Map<String,Object> formatRecord(ActiveRecord src){
       return super.formatRecord(src);
	}
	
}
