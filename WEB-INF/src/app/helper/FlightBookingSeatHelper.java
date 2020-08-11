package app.helper;

import app.helper.ApplicationHelper;
import java.sql.SQLException;
import net.rails.active_record.exception.RecordNotFoundException;
import net.rails.ext.AbsGlobal;

/**
 * Flight Booking Seat
 * <span></span>
 */
public class FlightBookingSeatHelper extends ApplicationHelper {

	public FlightBookingSeatHelper(AbsGlobal g) {
		super(g);
	}

	public FlightBookingSeatHelper(AbsGlobal g,Object id)  throws SQLException, RecordNotFoundException {
		super(g,id);
	}
	
	
	/**
	 *
	 * Setting Flight Booking
	 * @param flightBookingId <span>Flight Booking(String)</span>
	 */
	public void setFlightBookingId(String flightBookingId) {
		put("flight_booking_id",flightBookingId);
	}

	/**
	 *
	 * Getting Flight Booking
	 * @return <span>String</span>
	 */
	public String getFlightBookingId() {
		return getString("flight_booking_id");
	}

	/**
	 *
	 * Setting Ticket No
	 * @param ticketNo <span>Ticket No(String)</span>
	 */
	public void setTicketNo(String ticketNo) {
		put("ticket_no",ticketNo);
	}

	/**
	 *
	 * Getting Ticket No
	 * @return <span>String</span>
	 */
	public String getTicketNo() {
		return getString("ticket_no");
	}

	/**
	 *
	 * Setting Your Name
	 * @param passengerName <span>Your Name(String)</span>
	 */
	public void setPassengerName(String passengerName) {
		put("passenger_name",passengerName);
	}

	/**
	 *
	 * Getting Your Name
	 * @return <span>String</span>
	 */
	public String getPassengerName() {
		return getString("passenger_name");
	}

	/**
	 *
	 * Setting Passport No
	 * @param passportNo <span>Passport No(String)</span>
	 */
	public void setPassportNo(String passportNo) {
		put("passport_no",passportNo);
	}

	/**
	 *
	 * Getting Passport No
	 * @return <span>String</span>
	 */
	public String getPassportNo() {
		return getString("passport_no");
	}

	/**
	 *
	 * Setting Your Age
	 * @param age <span>Your Age(Integer)</span>
	 */
	public void setAge(Integer age) {
		put("age",age);
	}

	/**
	 *
	 * Getting Your Age
	 * @return <span>Integer</span>
	 */
	public Integer getAge() {
		return getInteger("age");
	}

	/**
	 *
	 * Setting Seat No
	 * @param seatNo <span>Seat No(String)</span>
	 */
	public void setSeatNo(String seatNo) {
		put("seat_no",seatNo);
	}

	/**
	 *
	 * Getting Seat No
	 * @return <span>String</span>
	 */
	public String getSeatNo() {
		return getString("seat_no");
	}

}