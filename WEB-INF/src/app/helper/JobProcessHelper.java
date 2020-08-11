package app.helper;

import app.helper.ApplicationHelper;
import java.sql.SQLException;
import net.rails.active_record.exception.RecordNotFoundException;
import net.rails.ext.AbsGlobal;

/**
 * Job Process
 * <span></span>
 */
public class JobProcessHelper extends ApplicationHelper {

	public JobProcessHelper(AbsGlobal g) {
		super(g);
	}

	public JobProcessHelper(AbsGlobal g,Object id)  throws SQLException, RecordNotFoundException {
		super(g,id);
	}
	
	
	/**
	 *
	 * Setting Job
	 * @param jobId <span>Job(String)</span>
	 */
	public void setJobId(String jobId) {
		put("job_id",jobId);
	}

	/**
	 *
	 * Getting Job
	 * @return <span>String</span>
	 */
	public String getJobId() {
		return getString("job_id");
	}

	/**
	 *
	 * Setting Hostname
	 * @param hostname <span>Hostname(String)</span>
	 */
	public void setHostname(String hostname) {
		put("hostname",hostname);
	}

	/**
	 *
	 * Getting Hostname
	 * @return <span>String</span>
	 */
	public String getHostname() {
		return getString("hostname");
	}

	/**
	 *
	 * Setting End Time
	 * @param endTime <span>End Time(java.sql.Timestamp)</span>
	 */
	public void setEndTime(java.sql.Timestamp endTime) {
		put("end_time",endTime);
	}

	/**
	 *
	 * Getting End Time
	 * @return <span>java.sql.Timestamp</span>
	 */
	public java.sql.Timestamp getEndTime() {
		return getTimestamp("end_time");
	}

	/**
	 *
	 * Setting Final Fire Time
	 * @param finalFireTime <span>Final Fire Time(java.sql.Timestamp)</span>
	 */
	public void setFinalFireTime(java.sql.Timestamp finalFireTime) {
		put("final_fire_time",finalFireTime);
	}

	/**
	 *
	 * Getting Final Fire Time
	 * @return <span>java.sql.Timestamp</span>
	 */
	public java.sql.Timestamp getFinalFireTime() {
		return getTimestamp("final_fire_time");
	}

	/**
	 *
	 * Setting Next Fire Time
	 * @param nextFireTime <span>Next Fire Time(java.sql.Timestamp)</span>
	 */
	public void setNextFireTime(java.sql.Timestamp nextFireTime) {
		put("next_fire_time",nextFireTime);
	}

	/**
	 *
	 * Getting Next Fire Time
	 * @return <span>java.sql.Timestamp</span>
	 */
	public java.sql.Timestamp getNextFireTime() {
		return getTimestamp("next_fire_time");
	}

	/**
	 *
	 * Setting Previous Fire Time
	 * @param previousFireTime <span>Previous Fire Time(java.sql.Timestamp)</span>
	 */
	public void setPreviousFireTime(java.sql.Timestamp previousFireTime) {
		put("previous_fire_time",previousFireTime);
	}

	/**
	 *
	 * Getting Previous Fire Time
	 * @return <span>java.sql.Timestamp</span>
	 */
	public java.sql.Timestamp getPreviousFireTime() {
		return getTimestamp("previous_fire_time");
	}

	/**
	 *
	 * Setting State
	 * @param state <span>State(String)</span>
	 */
	public void setState(String state) {
		put("state",state);
	}

	/**
	 *
	 * Getting State
	 * @return <span>String</span>
	 */
	public String getState() {
		return getString("state");
	}

}