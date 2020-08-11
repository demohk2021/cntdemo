package app.model;

import app.helper.SequenceHelper;
import java.sql.SQLException;
import net.rails.active_record.exception.RecordNotFoundException;
import net.rails.ext.AbsGlobal;
import java.sql.Timestamp;
import net.rails.sql.query.Query;
import java.util.Calendar;
import java.text.SimpleDateFormat;
import java.text.MessageFormat;
import java.util.Date;
import net.rails.active_record.validate.exception.ValidateException;
import net.rails.active_record.validate.exception.ConfigurException;
import net.rails.active_record.validate.TypeException;
import java.net.InetAddress;
import java.io.File;
import org.apache.commons.io.FileUtils;
import net.rails.support.Support;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

public final class Sequence extends SequenceHelper {
    
    public static String CLEAR_RULE_YEAR = "Year";
	public static String CLEAR_RULE_MONTH = "Month";
	public static String CLEAR_RULE_DATE = "Date";
	
	public Sequence(AbsGlobal g) {
		super(g);
	}

	public Sequence(AbsGlobal g, Object id) throws SQLException,
			RecordNotFoundException {
		super(g, id);
	}
	
	public static boolean create(AbsGlobal g, String ownerHostname,String model ,String prefix, String splitChar, int len, String clearRule,
			boolean displayPrefix) throws SQLException, ValidateException, ConfigurException, TypeException {
		if (prefix == null || prefix.trim().equals(""))
			prefix = null;

		Sequence sn = new Sequence(g);
		sn.setModel(model);
		sn.setOwnerHostname(ownerHostname);
		sn.setPrefix(prefix);
		sn.setSplitChar(splitChar);
		sn.setStep(1);
		sn.setLen(len);
		sn.setDisplayPrefix(displayPrefix);
		if (clearRule == null)
			throw new NullPointerException("SN clear_rule can not is null");

		sn.setClearRule(clearRule);
		sn.setCurrent(0);
		Calendar curTime = Calendar.getInstance();
		if (clearRule.equals(CLEAR_RULE_YEAR)) {
			curTime.set(Calendar.YEAR, curTime.get(Calendar.YEAR) + 1);
			curTime.set(Calendar.MONTH, 0);
			curTime.set(Calendar.DATE, 1);
			curTime.set(Calendar.HOUR_OF_DAY, 0);
			curTime.set(Calendar.MINUTE, 0);
			curTime.set(Calendar.SECOND, 0);
			curTime.set(Calendar.MILLISECOND, 0);
			sn.setFtime("yy");
			sn.setNextClearAt(new Timestamp(curTime.getTimeInMillis()));
		} else if (clearRule.equals(CLEAR_RULE_MONTH)) {
			curTime.set(Calendar.YEAR, curTime.get(Calendar.YEAR));
			curTime.set(Calendar.MONTH, curTime.get(Calendar.MONTH) + 1);
			curTime.set(Calendar.DATE, 1);
			curTime.set(Calendar.HOUR_OF_DAY, 0);
			curTime.set(Calendar.MINUTE, 0);
			curTime.set(Calendar.SECOND, 0);
			curTime.set(Calendar.MILLISECOND, 0);
			sn.setFtime("yyMM");
			sn.setNextClearAt(new Timestamp(curTime.getTimeInMillis()));
		} else if (clearRule.equals(CLEAR_RULE_DATE)) {
			curTime.set(Calendar.YEAR, curTime.get(Calendar.YEAR));
			curTime.set(Calendar.MONTH, curTime.get(Calendar.MONTH));
			curTime.set(Calendar.DATE, curTime.get(Calendar.DATE) + 1);
			curTime.set(Calendar.HOUR_OF_DAY, 0);
			curTime.set(Calendar.MINUTE, 0);
			curTime.set(Calendar.SECOND, 0);
			curTime.set(Calendar.MILLISECOND, 0);
			sn.setFtime("yyMMdd");
			sn.setNextClearAt(new Timestamp(curTime.getTimeInMillis()));
		}
		return sn.save();
	}
	
	public static String getHostname() throws Exception {
	    return Support.env().getHostname();
	}

	public synchronized static String generate(AbsGlobal g, String model) {
		String prefixTxt = "";
		String seqTxt = "";
		String dateTxt = "";
		String clearRule = "";
		String valueTxt = "";
		Integer value = 0;
		Timestamp nextClearAt = null;
		try {
			Query q = new Query(new Sequence(g));
			q.skipnil(true);
			q.and("eq_deleted", 0);
			q.and("eq_model", model);
			q.or("eq_owner_hostname", getHostname());
			q.or("eq_owner_hostname-1","*");
			
			Sequence sn = q.first();
			if (sn.isDisplayPrefix()) {
			    prefixTxt = sn.getPrefix();
			    seqTxt = sn.getSplitChar() == null ? "" : sn.getSplitChar();
			}
			nextClearAt = sn.getNextClearAt();
			clearRule = sn.getClearRule();

			if (clearRule == null)
				throw new NullPointerException("SN clear_rule can not is null");

			Calendar curTime = Calendar.getInstance();
			if (curTime.getTimeInMillis() > nextClearAt.getTime()) {
				if (clearRule.equals(CLEAR_RULE_YEAR)) {
					curTime.set(Calendar.YEAR, curTime.get(Calendar.YEAR) + 1);
					curTime.set(Calendar.MONTH, 0);
					curTime.set(Calendar.DATE, 1);
					curTime.set(Calendar.HOUR_OF_DAY, 0);
					curTime.set(Calendar.MINUTE, 0);
					curTime.set(Calendar.SECOND, 0);
					curTime.set(Calendar.MILLISECOND, 0);
				} else if (clearRule.equals(CLEAR_RULE_MONTH)) {
					curTime.set(Calendar.YEAR, curTime.get(Calendar.YEAR));
					curTime.set(Calendar.MONTH, curTime.get(Calendar.MONTH) + 1);
					curTime.set(Calendar.DATE, 1);
					curTime.set(Calendar.HOUR_OF_DAY, 0);
					curTime.set(Calendar.MINUTE, 0);
					curTime.set(Calendar.SECOND, 0);
					curTime.set(Calendar.MILLISECOND, 0);
				} else if (clearRule.equals(CLEAR_RULE_DATE)) {
					curTime.set(Calendar.YEAR, curTime.get(Calendar.YEAR));
					curTime.set(Calendar.MONTH, curTime.get(Calendar.MONTH));
					curTime.set(Calendar.DATE, curTime.get(Calendar.DATE) + 1);
					curTime.set(Calendar.HOUR_OF_DAY, 0);
					curTime.set(Calendar.MINUTE, 0);
					curTime.set(Calendar.SECOND, 0);
					curTime.set(Calendar.MILLISECOND, 0);
				}
				nextClearAt = new Timestamp(curTime.getTimeInMillis());
				sn.setCurrent(0);
				sn.setNextClearAt(nextClearAt);
				sn.save();
				sn.refresh();
			}
			value = sn.getCurrent() + sn.getStep();
			int supplement = sn.getLen() - value.toString().length();
			for (int i = 0; i < supplement; i++) {
				valueTxt += "0";
			}
			valueTxt += value;
			sn.setCurrent(value);
			sn.save();
			if (sn.getFtime() != null) {
				SimpleDateFormat df = new SimpleDateFormat(sn.getFtime());
				dateTxt = df.format(new Date());
			}
			return MessageFormat.format("{0}{1}{2}{3}", prefixTxt, seqTxt, dateTxt, valueTxt);
		} catch (Exception e) {
            LoggerFactory.getLogger(Sequence.class).error(e.getMessage(),e);
			return null;
		}
	}	

}
