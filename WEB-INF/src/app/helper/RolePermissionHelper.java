package app.helper;

import app.helper.ApplicationHelper;
import java.sql.SQLException;
import net.rails.active_record.exception.RecordNotFoundException;
import net.rails.ext.AbsGlobal;

/**
 * Role Permission
 * <span></span>
 */
public class RolePermissionHelper extends ApplicationHelper {

	public RolePermissionHelper(AbsGlobal g) {
		super(g);
	}

	public RolePermissionHelper(AbsGlobal g,Object id)  throws SQLException, RecordNotFoundException {
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
	 * Setting Model
	 * @param model <span>Model(String)</span>
	 */
	public void setModel(String model) {
		put("model",model);
	}

	/**
	 *
	 * Getting Model
	 * @return <span>String</span>
	 */
	public String getModel() {
		return getString("model");
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

}