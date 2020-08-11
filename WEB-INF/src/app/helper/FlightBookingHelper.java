package app.helper;

import app.helper.ApplicationHelper;
import java.sql.SQLException;
import net.rails.active_record.exception.RecordNotFoundException;
import net.rails.ext.AbsGlobal;

/**
 * Flight Booking
 * <span></span>
 */
public class FlightBookingHelper extends ApplicationHelper {

	public FlightBookingHelper(AbsGlobal g) {
		super(g);
	}

	public FlightBookingHelper(AbsGlobal g,Object id)  throws SQLException, RecordNotFoundException {
		super(g,id);
	}
	
	
	/**
	 *
	 * Setting Flight Info
	 * @param flightInfoId <span>Flight Info(String)</span>
	 */
	public void setFlightInfoId(String flightInfoId) {
		put("flight_info_id",flightInfoId);
	}

	/**
	 *
	 * Getting Flight Info
	 * @return <span>String</span>
	 */
	public String getFlightInfoId() {
		return getString("flight_info_id");
	}

	/**
	 *
	 * Setting Order No
	 * @param orderNo <span>Order No(String)</span>
	 */
	public void setOrderNo(String orderNo) {
		put("order_no",orderNo);
	}

	/**
	 *
	 * Getting Order No
	 * @return <span>String</span>
	 */
	public String getOrderNo() {
		return getString("order_no");
	}

	/**
	 *
	 * Setting Member
	 * @param memberId <span>Member(String)</span>
	 */
	public void setMemberId(String memberId) {
		put("member_id",memberId);
	}

	/**
	 *
	 * Getting Member
	 * @return <span>String</span>
	 */
	public String getMemberId() {
		return getString("member_id");
	}

}