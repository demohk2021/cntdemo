package app.helper;

import app.helper.ApplicationHelper;
import java.sql.SQLException;
import net.rails.active_record.exception.RecordNotFoundException;
import net.rails.ext.AbsGlobal;

/**
 * Member
 * <span></span>
 */
public class MemberHelper extends ApplicationHelper {

	public MemberHelper(AbsGlobal g) {
		super(g);
	}

	public MemberHelper(AbsGlobal g,Object id)  throws SQLException, RecordNotFoundException {
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
	 * Setting Phone
	 * @param phone <span>Phone(String)</span>
	 */
	public void setPhone(String phone) {
		put("phone",phone);
	}

	/**
	 *
	 * Getting Phone
	 * @return <span>String</span>
	 */
	public String getPhone() {
		return getString("phone");
	}

	/**
	 *
	 * Setting Passport
	 * @param passport <span>Passport(String)</span>
	 */
	public void setPassport(String passport) {
		put("passport",passport);
	}

	/**
	 *
	 * Getting Passport
	 * @return <span>String</span>
	 */
	public String getPassport() {
		return getString("passport");
	}

	/**
	 *
	 * Setting Credit Card No
	 * @param creditCardNo <span>Credit Card No(String)</span>
	 */
	public void setCreditCardNo(String creditCardNo) {
		put("credit_card_no",creditCardNo);
	}

	/**
	 *
	 * Getting Credit Card No
	 * @return <span>String</span>
	 */
	public String getCreditCardNo() {
		return getString("credit_card_no");
	}

	/**
	 *
	 * Setting Expiry Date
	 * @param expiryDate <span>Expiry Date(String)</span>
	 */
	public void setExpiryDate(String expiryDate) {
		put("expiry_date",expiryDate);
	}

	/**
	 *
	 * Getting Expiry Date
	 * @return <span>String</span>
	 */
	public String getExpiryDate() {
		return getString("expiry_date");
	}

	/**
	 *
	 * Setting Holder Name
	 * @param holderName <span>Holder Name(String)</span>
	 */
	public void setHolderName(String holderName) {
		put("holder_name",holderName);
	}

	/**
	 *
	 * Getting Holder Name
	 * @return <span>String</span>
	 */
	public String getHolderName() {
		return getString("holder_name");
	}

}