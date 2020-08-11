package app.model;

import java.sql.SQLException;
import net.rails.active_record.exception.RecordNotFoundException;
import net.rails.ext.AbsGlobal;
import app.helper.FlightBookingHelper;

public final class FlightBooking extends FlightBookingHelper {
	
	public FlightBooking(AbsGlobal g) {
		super(g);
	}

	public FlightBooking(AbsGlobal g, Object id) throws SQLException,
			RecordNotFoundException {
		super(g, id);
	}
	
	
	@Override
	protected  boolean beforeCreate(){
	    put("order_no",app.model.Sequence.generate(g,"FlightBooking"));   
	    return true;
	}
	
	@Override
	protected  boolean beforeUpdate(){
	    return true;
	}	

}
