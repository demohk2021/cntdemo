package app.model;

import java.sql.SQLException;
import net.rails.active_record.exception.RecordNotFoundException;
import net.rails.ext.AbsGlobal;
import app.helper.FlightBookingSeatHelper;

public final class FlightBookingSeat extends FlightBookingSeatHelper {
	
	public FlightBookingSeat(AbsGlobal g) {
		super(g);
	}

	public FlightBookingSeat(AbsGlobal g, Object id) throws SQLException,
			RecordNotFoundException {
		super(g, id);
	}
	
	
	@Override
	protected  boolean beforeCreate(){
	    put("ticket_no",app.model.Sequence.generate(g,"FlightBookingSeat"));   
	    return true;
	}
	
	@Override
	protected  boolean beforeUpdate(){
	    return true;
	}	

}
