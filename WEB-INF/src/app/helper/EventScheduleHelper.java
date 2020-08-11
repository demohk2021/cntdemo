package app.helper;

import app.helper.ApplicationHelper;
import java.sql.SQLException;
import net.rails.active_record.exception.RecordNotFoundException;
import net.rails.ext.AbsGlobal;

/**
 * Event Schedule
 * <span></span>
 */
public class EventScheduleHelper extends ApplicationHelper {

	public EventScheduleHelper(AbsGlobal g) {
		super(g);
	}

	public EventScheduleHelper(AbsGlobal g,Object id)  throws SQLException, RecordNotFoundException {
		super(g,id);
	}
	
	
	/**
	 *
	 * Setting User
	 * @param userId <span>User(String)</span>
	 */
	public void setUserId(String userId) {
		put("user_id",userId);
	}

	/**
	 *
	 * Getting User
	 * @return <span>String</span>
	 */
	public String getUserId() {
		return getString("user_id");
	}

	/**
	 *
	 * Setting Title
	 * @param title <span>Title(String)</span>
	 */
	public void setTitle(String title) {
		put("title",title);
	}

	/**
	 *
	 * Getting Title
	 * @return <span>String</span>
	 */
	public String getTitle() {
		return getString("title");
	}

	/**
	 *
	 * Setting Start
	 * @param startAt <span>Start(java.sql.Timestamp)</span>
	 */
	public void setStartAt(java.sql.Timestamp startAt) {
		put("start_at",startAt);
	}

	/**
	 *
	 * Getting Start
	 * @return <span>java.sql.Timestamp</span>
	 */
	public java.sql.Timestamp getStartAt() {
		return getTimestamp("start_at");
	}

	/**
	 *
	 * Setting End
	 * @param endAt <span>End(java.sql.Timestamp)</span>
	 */
	public void setEndAt(java.sql.Timestamp endAt) {
		put("end_at",endAt);
	}

	/**
	 *
	 * Getting End
	 * @return <span>java.sql.Timestamp</span>
	 */
	public java.sql.Timestamp getEndAt() {
		return getTimestamp("end_at");
	}

	/**
	 *
	 * Setting Notes
	 * @param notes <span>Notes(String)</span>
	 */
	public void setNotes(String notes) {
		put("notes",notes);
	}

	/**
	 *
	 * Getting Notes
	 * @return <span>String</span>
	 */
	public String getNotes() {
		return getString("notes");
	}

	/**
	 *
	 * Setting Location
	 * @param location <span>Location(String)</span>
	 */
	public void setLocation(String location) {
		put("location",location);
	}

	/**
	 *
	 * Getting Location
	 * @return <span>String</span>
	 */
	public String getLocation() {
		return getString("location");
	}

	/**
	 *
	 * Setting Reminder
	 * @param reminder <span>Reminder(String)</span>
	 */
	public void setReminder(String reminder) {
		put("reminder",reminder);
	}

	/**
	 *
	 * Getting Reminder
	 * @return <span>String</span>
	 */
	public String getReminder() {
		return getString("reminder");
	}

	/**
	 *
	 * Setting Calendar
	 * @param calendarCode <span>Calendar(String)</span>
	 */
	public void setCalendarCode(String calendarCode) {
		put("calendar_code",calendarCode);
	}

	/**
	 *
	 * Getting Calendar
	 * @return <span>String</span>
	 */
	public String getCalendarCode() {
		return getString("calendar_code");
	}

	/**
	 *
	 * Setting Link
	 * @param webLink <span>Link(String)</span>
	 */
	public void setWebLink(String webLink) {
		put("web_link",webLink);
	}

	/**
	 *
	 * Getting Link
	 * @return <span>String</span>
	 */
	public String getWebLink() {
		return getString("web_link");
	}

	/**
	 *
	 * Setting All Day
	 * @param allDay <span>All Day(Boolean)</span>
	 */
	public void setAllDay(Boolean allDay) {
		put("all_day",allDay);
	}

	/**
	 *
	 * Getting All Day
	 * @return <span>Boolean</span>
	 */
	public Boolean isAllDay() {
		return getBoolean("all_day");
	}

}