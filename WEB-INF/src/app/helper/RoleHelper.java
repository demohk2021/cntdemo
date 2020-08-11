package app.helper;

import app.helper.ApplicationHelper;
import java.sql.SQLException;
import net.rails.active_record.exception.RecordNotFoundException;
import net.rails.ext.AbsGlobal;

/**
 * Role
 * <span></span>
 */
public class RoleHelper extends ApplicationHelper {

	public RoleHelper(AbsGlobal g) {
		super(g);
	}

	public RoleHelper(AbsGlobal g,Object id)  throws SQLException, RecordNotFoundException {
		super(g,id);
	}
	
	
	/**
	 *
	 * Setting Name
	 * @param name <span>Name(String)</span>
	 */
	public void setName(String name) {
		put("name",name);
	}

	/**
	 *
	 * Getting Name
	 * @return <span>String</span>
	 */
	public String getName() {
		return getString("name");
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

}