package app.helper;

import app.helper.ApplicationHelper;
import java.sql.SQLException;
import net.rails.active_record.exception.RecordNotFoundException;
import net.rails.ext.AbsGlobal;

/**
 * User
 * <span></span>
 */
public class UserHelper extends ApplicationHelper {

	public UserHelper(AbsGlobal g) {
		super(g);
	}

	public UserHelper(AbsGlobal g,Object id)  throws SQLException, RecordNotFoundException {
		super(g,id);
	}
	
	
	/**
	 *
	 * Setting Role
	 * @param roleId <span>Role(String)</span>
	 */
	public void setRoleId(String roleId) {
		put("role_id",roleId);
	}

	/**
	 *
	 * Getting Role
	 * @return <span>String</span>
	 */
	public String getRoleId() {
		return getString("role_id");
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

	/**
	 *
	 * Setting User Name
	 * @param username <span>User Name(String)</span>
	 */
	public void setUsername(String username) {
		put("username",username);
	}

	/**
	 *
	 * Getting User Name
	 * @return <span>String</span>
	 */
	public String getUsername() {
		return getString("username");
	}

	/**
	 *
	 * Setting Email
	 * @param email <span>Email(String)</span>
	 */
	public void setEmail(String email) {
		put("email",email);
	}

	/**
	 *
	 * Getting Email
	 * @return <span>String</span>
	 */
	public String getEmail() {
		return getString("email");
	}

	/**
	 *
	 * Setting Password
	 * @param signInPassword <span>Password(String)</span>
	 */
	public void setSignInPassword(String signInPassword) {
		put("sign_in_password",signInPassword);
	}

	/**
	 *
	 * Getting Password
	 * @return <span>String</span>
	 */
	public String getSignInPassword() {
		return getString("sign_in_password");
	}

	/**
	 *
	 * Setting Session Token
	 * @param sessionToken <span>Session Token(String)</span>
	 */
	public void setSessionToken(String sessionToken) {
		put("session_token",sessionToken);
	}

	/**
	 *
	 * Getting Session Token
	 * @return <span>String</span>
	 */
	public String getSessionToken() {
		return getString("session_token");
	}

	/**
	 *
	 * Setting Active
	 * @param active <span>Active(Boolean)</span>
	 */
	public void setActive(Boolean active) {
		put("active",active);
	}

	/**
	 *
	 * Getting Active
	 * @return <span>Boolean</span>
	 */
	public Boolean isActive() {
		return getBoolean("active");
	}

}