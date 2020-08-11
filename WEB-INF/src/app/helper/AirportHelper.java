package app.helper;

import app.helper.ApplicationHelper;
import java.sql.SQLException;
import net.rails.active_record.exception.RecordNotFoundException;
import net.rails.ext.AbsGlobal;

/**
 * Airport
 * <span></span>
 */
public class AirportHelper extends ApplicationHelper {

	public AirportHelper(AbsGlobal g) {
		super(g);
	}

	public AirportHelper(AbsGlobal g,Object id)  throws SQLException, RecordNotFoundException {
		super(g,id);
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
	 * Setting Search Keywords
	 * @param searchKeywords <span>Search Keywords(String)</span>
	 */
	public void setSearchKeywords(String searchKeywords) {
		put("search_keywords",searchKeywords);
	}

	/**
	 *
	 * Getting Search Keywords
	 * @return <span>String</span>
	 */
	public String getSearchKeywords() {
		return getString("search_keywords");
	}

}