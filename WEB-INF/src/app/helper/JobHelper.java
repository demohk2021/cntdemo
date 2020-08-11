package app.helper;

import app.helper.ApplicationHelper;
import java.sql.SQLException;
import net.rails.active_record.exception.RecordNotFoundException;
import net.rails.ext.AbsGlobal;

/**
 * Job
 * <span></span>
 */
public class JobHelper extends ApplicationHelper {

	public JobHelper(AbsGlobal g) {
		super(g);
	}

	public JobHelper(AbsGlobal g,Object id)  throws SQLException, RecordNotFoundException {
		super(g,id);
	}
	
	
	/**
	 *
	 * Setting Job Group
	 * @param jobGroup <span>Job Group(String)</span>
	 */
	public void setJobGroup(String jobGroup) {
		put("job_group",jobGroup);
	}

	/**
	 *
	 * Getting Job Group
	 * @return <span>String</span>
	 */
	public String getJobGroup() {
		return getString("job_group");
	}

	/**
	 *
	 * Setting Job Name
	 * @param jobName <span>Job Name(String)</span>
	 */
	public void setJobName(String jobName) {
		put("job_name",jobName);
	}

	/**
	 *
	 * Getting Job Name
	 * @return <span>String</span>
	 */
	public String getJobName() {
		return getString("job_name");
	}

	/**
	 *
	 * Setting Trigger Group
	 * @param triggerGroup <span>Trigger Group(String)</span>
	 */
	public void setTriggerGroup(String triggerGroup) {
		put("trigger_group",triggerGroup);
	}

	/**
	 *
	 * Getting Trigger Group
	 * @return <span>String</span>
	 */
	public String getTriggerGroup() {
		return getString("trigger_group");
	}

	/**
	 *
	 * Setting Trigger Name
	 * @param triggerName <span>Trigger Name(String)</span>
	 */
	public void setTriggerName(String triggerName) {
		put("trigger_name",triggerName);
	}

	/**
	 *
	 * Getting Trigger Name
	 * @return <span>String</span>
	 */
	public String getTriggerName() {
		return getString("trigger_name");
	}

	/**
	 *
	 * Setting Cron Expression
	 * @param cronExpression <span>Cron Expression(String)</span>
	 */
	public void setCronExpression(String cronExpression) {
		put("cron_expression",cronExpression);
	}

	/**
	 *
	 * Getting Cron Expression
	 * @return <span>String</span>
	 */
	public String getCronExpression() {
		return getString("cron_expression");
	}

	/**
	 *
	 * Setting Classify
	 * @param classify <span>Classify(String)</span>
	 */
	public void setClassify(String classify) {
		put("classify",classify);
	}

	/**
	 *
	 * Getting Classify
	 * @return <span>String</span>
	 */
	public String getClassify() {
		return getString("classify");
	}

	/**
	 *
	 * Setting Hostname
	 * @param hostnames <span>Hostname(String)</span>
	 */
	public void setHostnames(String hostnames) {
		put("hostnames",hostnames);
	}

	/**
	 *
	 * Getting Hostname
	 * @return <span>String</span>
	 */
	public String getHostnames() {
		return getString("hostnames");
	}

	/**
	 *
	 * Setting Comment
	 * @param comment <span>Comment(String)</span>
	 */
	public void setComment(String comment) {
		put("comment",comment);
	}

	/**
	 *
	 * Getting Comment
	 * @return <span>String</span>
	 */
	public String getComment() {
		return getString("comment");
	}

	/**
	 *
	 * Setting Pause Job
	 * @param pauseJob <span>Pause Job(Boolean)</span>
	 */
	public void setPauseJob(Boolean pauseJob) {
		put("pause_job",pauseJob);
	}

	/**
	 *
	 * Getting Pause Job
	 * @return <span>Boolean</span>
	 */
	public Boolean isPauseJob() {
		return getBoolean("pause_job");
	}

	/**
	 *
	 * Setting Paused At
	 * @param pausedAt <span>Paused At(java.sql.Timestamp)</span>
	 */
	public void setPausedAt(java.sql.Timestamp pausedAt) {
		put("paused_at",pausedAt);
	}

	/**
	 *
	 * Getting Paused At
	 * @return <span>java.sql.Timestamp</span>
	 */
	public java.sql.Timestamp getPausedAt() {
		return getTimestamp("paused_at");
	}

}