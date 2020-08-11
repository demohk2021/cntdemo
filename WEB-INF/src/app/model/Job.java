package app.model;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Date;

import net.rails.active_record.exception.RecordNotFoundException;
import net.rails.ext.AbsGlobal;
import app.helper.JobHelper;

public final class Job extends JobHelper {
	
	public Job(AbsGlobal g) {
		super(g);
	}

	public Job(AbsGlobal g, Object id) throws SQLException,
			RecordNotFoundException {
		super(g, id);
	}
	
	@Override
	public boolean beforeCreate(){
		setTriggerName(getJobName() + "Trigger");
		return true;
	}
	
	@Override
	public boolean beforeUpdate(){
		setTriggerName(getJobName() + "Trigger");
		return true;
	}

	@Override
	protected Object saveTrigger(String attr,Object newValue,Object oldValue){
		if(attr.equals("pause_job") && newValue.equals(true)){
			setPausedAt(new Timestamp(new Date().getTime()));
		}
		return super.updateTrigger(attr, newValue, oldValue);
	}

}
