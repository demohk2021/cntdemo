package app.helper;

import app.helper.ApplicationHelper;
import java.sql.SQLException;
import net.rails.active_record.exception.RecordNotFoundException;
import net.rails.ext.AbsGlobal;

/**
 * Email Schedule
 * <span></span>
 */
public class EmailScheduleHelper extends ApplicationHelper {

	public EmailScheduleHelper(AbsGlobal g) {
		super(g);
	}

	public EmailScheduleHelper(AbsGlobal g,Object id)  throws SQLException, RecordNotFoundException {
		super(g,id);
	}
	
	
	/**
	 *
	 * Setting TO
	 * @param toList <span>TO(String)</span>
	 */
	public void setToList(String toList) {
		put("to_list",toList);
	}

	/**
	 *
	 * Getting TO
	 * @return <span>String</span>
	 */
	public String getToList() {
		return getString("to_list");
	}

	/**
	 *
	 * Setting CC
	 * @param ccList <span>CC(String)</span>
	 */
	public void setCcList(String ccList) {
		put("cc_list",ccList);
	}

	/**
	 *
	 * Getting CC
	 * @return <span>String</span>
	 */
	public String getCcList() {
		return getString("cc_list");
	}

	/**
	 *
	 * Setting BCC
	 * @param bccList <span>BCC(String)</span>
	 */
	public void setBccList(String bccList) {
		put("bcc_list",bccList);
	}

	/**
	 *
	 * Getting BCC
	 * @return <span>String</span>
	 */
	public String getBccList() {
		return getString("bcc_list");
	}

	/**
	 *
	 * Setting Subject
	 * @param subject <span>Subject(String)</span>
	 */
	public void setSubject(String subject) {
		put("subject",subject);
	}

	/**
	 *
	 * Getting Subject
	 * @return <span>String</span>
	 */
	public String getSubject() {
		return getString("subject");
	}

	/**
	 *
	 * Setting Message
	 * @param message <span>Message(String)</span>
	 */
	public void setMessage(String message) {
		put("message",message);
	}

	/**
	 *
	 * Getting Message
	 * @return <span>String</span>
	 */
	public String getMessage() {
		return getString("message");
	}

	/**
	 *
	 * Setting Respone Message
	 * @param responseMsg <span>Respone Message(String)</span>
	 */
	public void setResponseMsg(String responseMsg) {
		put("response_msg",responseMsg);
	}

	/**
	 *
	 * Getting Respone Message
	 * @return <span>String</span>
	 */
	public String getResponseMsg() {
		return getString("response_msg");
	}

	/**
	 *
	 * Setting Status
	 * @param status <span>Status(String)</span>
	 */
	public void setStatus(String status) {
		put("status",status);
	}

	/**
	 *
	 * Getting Status
	 * @return <span>String</span>
	 */
	public String getStatus() {
		return getString("status");
	}

	/**
	 *
	 * Setting Action
	 * @param action <span>Action(String)</span>
	 */
	public void setAction(String action) {
		put("action",action);
	}

	/**
	 *
	 * Getting Action
	 * @return <span>String</span>
	 */
	public String getAction() {
		return getString("action");
	}

	/**
	 *
	 * Setting Response Code
	 * @param responseCode <span>Response Code(Integer)</span>
	 */
	public void setResponseCode(Integer responseCode) {
		put("response_code",responseCode);
	}

	/**
	 *
	 * Getting Response Code
	 * @return <span>Integer</span>
	 */
	public Integer getResponseCode() {
		return getInteger("response_code");
	}

	/**
	 *
	 * Setting Process Host
	 * @param processHost <span>Process Host(String)</span>
	 */
	public void setProcessHost(String processHost) {
		put("process_host",processHost);
	}

	/**
	 *
	 * Getting Process Host
	 * @return <span>String</span>
	 */
	public String getProcessHost() {
		return getString("process_host");
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
	 * Setting Attachement
	 * @param attachement <span>Attachement(String)</span>
	 */
	public void setAttachement(String attachement) {
		put("attachement",attachement);
	}

	/**
	 *
	 * Getting Attachement
	 * @return <span>String</span>
	 */
	public String getAttachement() {
		return getString("attachement");
	}

}