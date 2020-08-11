package app.helper;

import app.helper.ApplicationHelper;
import java.sql.SQLException;
import net.rails.active_record.exception.RecordNotFoundException;
import net.rails.ext.AbsGlobal;

/**
 * Security Code
 * <span></span>
 */
public class SecurityCodeHelper extends ApplicationHelper {

	public SecurityCodeHelper(AbsGlobal g) {
		super(g);
	}

	public SecurityCodeHelper(AbsGlobal g,Object id)  throws SQLException, RecordNotFoundException {
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
	 * Setting Code
	 * @param code <span>Code(String)</span>
	 */
	public void setCode(String code) {
		put("code",code);
	}

	/**
	 *
	 * Getting Code
	 * @return <span>String</span>
	 */
	public String getCode() {
		return getString("code");
	}

	/**
	 *
	 * Setting Expired At
	 * @param expiredAt <span>Expired At(java.sql.Timestamp)</span>
	 */
	public void setExpiredAt(java.sql.Timestamp expiredAt) {
		put("expired_at",expiredAt);
	}

	/**
	 *
	 * Getting Expired At
	 * @return <span>java.sql.Timestamp</span>
	 */
	public java.sql.Timestamp getExpiredAt() {
		return getTimestamp("expired_at");
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

}