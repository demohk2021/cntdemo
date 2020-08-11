package app.model;

import java.net.InetAddress;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Date;
import org.quartz.Trigger;
import org.slf4j.LoggerFactory;
import net.rails.active_record.exception.RecordNotFoundException;
import net.rails.ext.AbsGlobal;
import net.rails.log.LogPoint;
import net.rails.sql.query.Query;
import app.helper.JobProcessHelper;
import app.job.AppScheduleWorker;
import net.rails.support.Support;

public final class JobProcess extends JobProcessHelper {

	public JobProcess(AbsGlobal g) {
		super(g);
	}

	public JobProcess(AbsGlobal g, Object id) throws SQLException, RecordNotFoundException {
		super(g, id);
	}

	public static void recordState(AbsGlobal g, Trigger trigger, String state) {
		Date endTime = trigger.getEndTime();
		Date finalFireTime = trigger.getFinalFireTime();
		Date nextFireTime = trigger.getNextFireTime();
		Date previousFireTime = trigger.getPreviousFireTime();
		try {
			Query q = new Query(new Job(g));
			q.and("eq_trigger_name", trigger.getKey().getName());
			q.and("eq_trigger_group", trigger.getKey().getGroup());
			Job job = q.first();
			if (job != null) {
				q = new Query(new JobProcess(g));
				q.and("eq_job_id", job.getId());
				q.and("eq_hostname", getCurrentHostname());
				q.and("eq_deleted", 0);
				q.and("eq_state", state);
				JobProcess process = q.first();
				if (process == null) {
					process = new JobProcess(g);
				}
				process.setJobId(job.getId().toString());
				process.setHostname(getCurrentHostname());
				process.setEndTime(null);
				process.setFinalFireTime(null);
				process.setNextFireTime(null);
				process.setPreviousFireTime(null);
				if (endTime != null) {
					process.setEndTime(new Timestamp(endTime.getTime()));
				}
				if (finalFireTime != null) {
					process.setFinalFireTime(new Timestamp(finalFireTime.getTime()));
				}
				if (nextFireTime != null) {
					process.setNextFireTime(new Timestamp(nextFireTime.getTime()));
				}
				if (previousFireTime != null) {
					process.setPreviousFireTime(new Timestamp(previousFireTime.getTime()));
				}
				process.setState(state);
				process.setHostname(getCurrentHostname());
				process.save();
			}
		} catch (Exception e) {
			LoggerFactory.getLogger(JobProcess.class).error(e.getMessage(), e);
		}
	}

	public static String getCurrentHostname() {
		return Support.env().getHostname();
	}

}
