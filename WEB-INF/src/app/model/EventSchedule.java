package app.model;

import java.sql.SQLException;
import net.rails.active_record.exception.RecordNotFoundException;
import net.rails.ext.AbsGlobal;
import app.helper.EventScheduleHelper;

public final class EventSchedule extends EventScheduleHelper {
	
	public EventSchedule(AbsGlobal g) {
		super(g);
	}

	public EventSchedule(AbsGlobal g, Object id) throws SQLException,
			RecordNotFoundException {
		super(g, id);
	}
	
	
	@Override
	protected  boolean beforeCreate(){
	    return true;
	}
	
	@Override
	protected  boolean beforeUpdate(){
	    return true;
	}	

}
