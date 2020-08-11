package app.controller.www.service;

import app.global.Global;
import app.helper.ApplicationHelper;
import net.rails.ext.AbsGlobal;
import net.rails.sql.worker.FindWorker;
import java.util.List;
import net.rails.sql.query.Query;
import net.rails.active_record.ActiveRecord;
import java.util.Map;

public class FlightBookingService extends ActionService {

	public FlightBookingService(AbsGlobal g) {
		super(g);
	}

	@Override
	protected FindWorker makeWorker(FindWorker worker){

	    worker.joins().add("LEFT JOIN flight_info AS flight_info_id_table ON flight_info_id_table.id = flight_booking.flight_info_id");
	    worker.selects().add("flight_info_id_table.flight_no AS as_flight_booking_flight_info_id_display");  
	    worker.joins().add("LEFT JOIN member AS member_id_table ON member_id_table.id = flight_booking.member_id");
	    worker.selects().add("member_id_table.name AS as_flight_booking_member_id_display");  
	    return worker;
	}
	
	@Override
	protected boolean beforeBoxList(Query q,String query) {
	    q.and("any_order_no",query);
		return true;
	}
	
	@Override
	protected Map<String,Object> formatRecord(ActiveRecord src){
       return super.formatRecord(src);
	}
	
}
