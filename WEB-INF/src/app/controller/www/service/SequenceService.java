package app.controller.www.service;

import app.global.Global;
import app.helper.ApplicationHelper;
import net.rails.ext.AbsGlobal;
import net.rails.sql.worker.FindWorker;
import java.util.List;
import net.rails.sql.query.Query;
import net.rails.active_record.ActiveRecord;
import java.util.Map;

public class SequenceService extends ActionService {

	public SequenceService(AbsGlobal g) {
		super(g);
	}

	@Override
	protected FindWorker makeWorker(FindWorker worker){

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
