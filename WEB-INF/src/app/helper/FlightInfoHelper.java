package app.helper;

import app.helper.ApplicationHelper;
import java.sql.SQLException;
import net.rails.active_record.exception.RecordNotFoundException;
import net.rails.ext.AbsGlobal;

/**
 * Flight Info
 * <span></span>
 */
public class FlightInfoHelper extends ApplicationHelper {

	public FlightInfoHelper(AbsGlobal g) {
		super(g);
	}

	public FlightInfoHelper(AbsGlobal g,Object id)  throws SQLException, RecordNotFoundException {
		super(g,id);
	}
	
	
	/**
	 *
	 * Setting Flight No
	 * @param flightNo <span>Flight No(String)</span>
	 */
	public void setFlightNo(String flightNo) {
		put("flight_no",flightNo);
	}

	/**
	 *
	 * Getting Flight No
	 * @return <span>String</span>
	 */
	public String getFlightNo() {
		return getString("flight_no");
	}

	/**
	 *
	 * Setting Schedule Date
	 * @param scheduleDate <span>Schedule Date(java.sql.Date)</span>
	 */
	public void setScheduleDate(java.sql.Date scheduleDate) {
		put("schedule_date",scheduleDate);
	}

	/**
	 *
	 * Getting Schedule Date
	 * @return <span>java.sql.Date</span>
	 */
	public java.sql.Date getScheduleDate() {
		return getDate("schedule_date");
	}

	/**
	 *
	 * Setting Schedule Time
	 * @param scheduleTime <span>Schedule Time(String)</span>
	 */
	public void setScheduleTime(String scheduleTime) {
		put("schedule_time",scheduleTime);
	}

	/**
	 *
	 * Getting Schedule Time
	 * @return <span>String</span>
	 */
	public String getScheduleTime() {
		return getString("schedule_time");
	}

	/**
	 *
	 * Setting Arrival Time
	 * @param arrivalTime <span>Arrival Time(String)</span>
	 */
	public void setArrivalTime(String arrivalTime) {
		put("arrival_time",arrivalTime);
	}

	/**
	 *
	 * Getting Arrival Time
	 * @return <span>String</span>
	 */
	public String getArrivalTime() {
		return getString("arrival_time");
	}

	/**
	 *
	 * Setting Beyond the day
	 * @param beyondTheDay <span>Beyond the day(String)</span>
	 */
	public void setBeyondTheDay(String beyondTheDay) {
		put("beyond_the_day",beyondTheDay);
	}

	/**
	 *
	 * Getting Beyond the day
	 * @return <span>String</span>
	 */
	public String getBeyondTheDay() {
		return getString("beyond_the_day");
	}

	/**
	 *
	 * Setting Origin
	 * @param originAirportId <span>Origin(String)</span>
	 */
	public void setOriginAirportId(String originAirportId) {
		put("origin_airport_id",originAirportId);
	}

	/**
	 *
	 * Getting Origin
	 * @return <span>String</span>
	 */
	public String getOriginAirportId() {
		return getString("origin_airport_id");
	}

	/**
	 *
	 * Setting Destination
	 * @param destinationAirportId <span>Destination(String)</span>
	 */
	public void setDestinationAirportId(String destinationAirportId) {
		put("destination_airport_id",destinationAirportId);
	}

	/**
	 *
	 * Getting Destination
	 * @return <span>String</span>
	 */
	public String getDestinationAirportId() {
		return getString("destination_airport_id");
	}

	/**
	 *
	 * Setting Price
	 * @param price <span>Price(String)</span>
	 */
	public void setPrice(String price) {
		put("price",price);
	}

	/**
	 *
	 * Getting Price
	 * @return <span>String</span>
	 */
	public String getPrice() {
		return getString("price");
	}

	/**
	 *
	 * Setting Airline
	 * @param airlineName <span>Airline(String)</span>
	 */
	public void setAirlineName(String airlineName) {
		put("airline_name",airlineName);
	}

	/**
	 *
	 * Getting Airline
	 * @return <span>String</span>
	 */
	public String getAirlineName() {
		return getString("airline_name");
	}

	/**
	 *
	 * Setting ICON CSS
	 * @param iconCss <span>ICON CSS(String)</span>
	 */
	public void setIconCss(String iconCss) {
		put("icon_css",iconCss);
	}

	/**
	 *
	 * Getting ICON CSS
	 * @return <span>String</span>
	 */
	public String getIconCss() {
		return getString("icon_css");
	}

	/**
	 *
	 * Setting Flight Duration
	 * @param flightDuration <span>Flight Duration(String)</span>
	 */
	public void setFlightDuration(String flightDuration) {
		put("flight_duration",flightDuration);
	}

	/**
	 *
	 * Getting Flight Duration
	 * @return <span>String</span>
	 */
	public String getFlightDuration() {
		return getString("flight_duration");
	}

	/**
	 *
	 * Setting Flight Note
	 * @param flightNote <span>Flight Note(String)</span>
	 */
	public void setFlightNote(String flightNote) {
		put("flight_note",flightNote);
	}

	/**
	 *
	 * Getting Flight Note
	 * @return <span>String</span>
	 */
	public String getFlightNote() {
		return getString("flight_note");
	}

}