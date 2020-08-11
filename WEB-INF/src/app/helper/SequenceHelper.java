package app.helper;

import app.helper.ApplicationHelper;
import java.sql.SQLException;
import net.rails.active_record.exception.RecordNotFoundException;
import net.rails.ext.AbsGlobal;

/**
 * Sequence
 * <span></span>
 */
public class SequenceHelper extends ApplicationHelper {

	public SequenceHelper(AbsGlobal g) {
		super(g);
	}

	public SequenceHelper(AbsGlobal g,Object id)  throws SQLException, RecordNotFoundException {
		super(g,id);
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
	 * Setting Prefix
	 * @param prefix <span>Prefix(String)</span>
	 */
	public void setPrefix(String prefix) {
		put("prefix",prefix);
	}

	/**
	 *
	 * Getting Prefix
	 * @return <span>String</span>
	 */
	public String getPrefix() {
		return getString("prefix");
	}

	/**
	 *
	 * Setting Display Prefix
	 * @param displayPrefix <span>Display Prefix(Boolean)</span>
	 */
	public void setDisplayPrefix(Boolean displayPrefix) {
		put("display_prefix",displayPrefix);
	}

	/**
	 *
	 * Getting Display Prefix
	 * @return <span>Boolean</span>
	 */
	public Boolean isDisplayPrefix() {
		return getBoolean("display_prefix");
	}

	/**
	 *
	 * Setting Step
	 * @param step <span>Step(Integer)</span>
	 */
	public void setStep(Integer step) {
		put("step",step);
	}

	/**
	 *
	 * Getting Step
	 * @return <span>Integer</span>
	 */
	public Integer getStep() {
		return getInteger("step");
	}

	/**
	 *
	 * Setting Length
	 * @param len <span>Length(Integer)</span>
	 */
	public void setLen(Integer len) {
		put("len",len);
	}

	/**
	 *
	 * Getting Length
	 * @return <span>Integer</span>
	 */
	public Integer getLen() {
		return getInteger("len");
	}

	/**
	 *
	 * Setting Split
	 * @param splitChar <span>Split(String)</span>
	 */
	public void setSplitChar(String splitChar) {
		put("split_char",splitChar);
	}

	/**
	 *
	 * Getting Split
	 * @return <span>String</span>
	 */
	public String getSplitChar() {
		return getString("split_char");
	}

	/**
	 *
	 * Setting Current Value
	 * @param current <span>Current Value(Integer)</span>
	 */
	public void setCurrent(Integer current) {
		put("current",current);
	}

	/**
	 *
	 * Getting Current Value
	 * @return <span>Integer</span>
	 */
	public Integer getCurrent() {
		return getInteger("current");
	}

	/**
	 *
	 * Setting Time Format
	 * @param ftime <span>Time Format(String)</span>
	 */
	public void setFtime(String ftime) {
		put("ftime",ftime);
	}

	/**
	 *
	 * Getting Time Format
	 * @return <span>String</span>
	 */
	public String getFtime() {
		return getString("ftime");
	}

	/**
	 *
	 * Setting Clear Rule
	 * @param clearRule <span>Clear Rule(String)</span>
	 */
	public void setClearRule(String clearRule) {
		put("clear_rule",clearRule);
	}

	/**
	 *
	 * Getting Clear Rule
	 * @return <span>String</span>
	 */
	public String getClearRule() {
		return getString("clear_rule");
	}

	/**
	 *
	 * Setting Restore Time
	 * @param nextClearAt <span>Restore Time(java.sql.Timestamp)</span>
	 */
	public void setNextClearAt(java.sql.Timestamp nextClearAt) {
		put("next_clear_at",nextClearAt);
	}

	/**
	 *
	 * Getting Restore Time
	 * @return <span>java.sql.Timestamp</span>
	 */
	public java.sql.Timestamp getNextClearAt() {
		return getTimestamp("next_clear_at");
	}

	/**
	 *
	 * Setting Host Name
	 * @param ownerHostname <span>Host Name(String)</span>
	 */
	public void setOwnerHostname(String ownerHostname) {
		put("owner_hostname",ownerHostname);
	}

	/**
	 *
	 * Getting Host Name
	 * @return <span>String</span>
	 */
	public String getOwnerHostname() {
		return getString("owner_hostname");
	}

	/**
	 *
	 * Setting Note
	 * @param note <span>Note(String)</span>
	 */
	public void setNote(String note) {
		put("note",note);
	}

	/**
	 *
	 * Getting Note
	 * @return <span>String</span>
	 */
	public String getNote() {
		return getString("note");
	}

}