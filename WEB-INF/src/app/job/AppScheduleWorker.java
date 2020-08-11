package app.job;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import org.quartz.JobExecutionContext;
import org.quartz.JobListener;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.TriggerListener;
import org.quartz.Trigger.CompletedExecutionInstruction;
import org.quartz.Trigger.TriggerState;

import app.model.Job;
import app.model.JobProcess;
import net.rails.ext.AbsGlobal;
import net.rails.sql.query.Query;
import net.rails.support.job.worker.DefaultScheduleWorker;
import net.rails.support.job.worker.JobObject;

public class AppScheduleWorker extends DefaultScheduleWorker {

	private final static List<JobObject> SCHEDULE_JOBS = new ArrayList<JobObject>();
	
	public AppScheduleWorker(AbsGlobal g) {
		super(g);
	}

	@Override
	public JobListener getJobListener() {
		return null;
	}
	
	public void deleteJobObject(String JobGroup,String jobName){
		List<JobObject> newScheduleJobs = new ArrayList<JobObject>();
		for(JobObject jobObject : SCHEDULE_JOBS){
			if(!(jobObject.getJobName().equals(jobName) && jobObject.getJobGroup().equals(JobGroup))){
				newScheduleJobs.add(jobObject);
			}
		}
		SCHEDULE_JOBS.clear();
		SCHEDULE_JOBS.addAll(newScheduleJobs);
	}
	
	public void updateJobObject(JobObject updateJobObject){
		Iterator<JobObject> its = SCHEDULE_JOBS.iterator();
		List<JobObject> newScheduleJobs = new ArrayList<JobObject>();
		for (Iterator<JobObject> iterator = its; iterator.hasNext();) {
			JobObject jobObject = iterator.next();
			if(jobObject.getJobName().equals(updateJobObject.getJobName()) && jobObject.getJobGroup().equals(updateJobObject.getJobGroup())){
				newScheduleJobs.add(updateJobObject);
			}else{
				newScheduleJobs.add(jobObject);
			}
		}
		SCHEDULE_JOBS.clear();
		SCHEDULE_JOBS.addAll(newScheduleJobs);
	}
	
	public JobObject getJobObject(String jobGroup,String jobName){
		Iterator<JobObject> its = SCHEDULE_JOBS.iterator();
		for (Iterator<JobObject> iterator = its; iterator.hasNext();) {
			JobObject jobObject = iterator.next();
			if(jobObject.getJobName().equals(jobName) && jobObject.getJobGroup().equals(jobGroup)){
				return jobObject;
			}
		}
		return null;
	}
	
	public void addJobObject(JobObject addJobObject){
		SCHEDULE_JOBS.add(addJobObject);
	}

	@Override
	public List<JobObject> getScheduleJobs() {
		JobObject jobObject = null;
		try{
			Query q = new Query(new Job(g));
			q.and("eq_job_name","Reschedule");
			q.and("eq_pause_job",0);
			q.and("eq_deleted",0);
			q.order("created_at","ASC");
			List<Job> jobs = q.find();
			for (Job job : jobs) {
				String hostnames = job.getHostnames() == null ? "%" : job.getHostnames();
				jobObject = new JobObject();
				jobObject.setClassify(job.getClassify());
				jobObject.setCronExpression(job.getCronExpression());
				jobObject.setJobGroup(job.getJobGroup());
				jobObject.setJobName(job.getJobName());
				jobObject.setTriggerGroup(job.getTriggerGroup());
				jobObject.setTriggerName(job.getTriggerName());
				jobObject.setHostnames(hostnames);
				SCHEDULE_JOBS.add(jobObject);
			}
			return SCHEDULE_JOBS;
		}catch(Exception e){
			log.error(e.getMessage(),e);
			return null;
		}
	}
	
	public List<String> getOnceScheduleJobs() {
		List<String> runningJobs = new ArrayList<String>();
		try{
			List<JobObject> jobs = SCHEDULE_JOBS;
			for (JobObject job : jobs) {
				String hostname = job.getHostnames();
				String cron = job.getCronExpression();
				if(cron.equals("once") && (hostname.equals("%") || hostname.equals(JobUtil.getHostname()))){
					runningJobs.add(job.getJobName());
				}
			}
			return runningJobs;
		}catch(Exception e){
			log.error(e.getMessage(),e);
			return null;
		}
	}

	@Override
	public TriggerListener getTriggerListener() {
		return new TriggerListener() {
			private boolean veto = false;
			@Override
			public boolean vetoJobExecution(Trigger trigger, JobExecutionContext context) {
				String local = null;
				String currentTriggerName = null;
				String currentTriggerGroup = null;
				for (Iterator<JobObject> iterator = SCHEDULE_JOBS.iterator(); iterator.hasNext();) {
					JobObject jobObject = iterator.next();
					List<String> hosts = Arrays.asList(jobObject.getHostnames().split(","));
					local = getHostname();
					currentTriggerGroup = trigger.getKey().getGroup();
					currentTriggerName = trigger.getKey().getName();
					log.debug("TriggerName: {}, Hostnames: {} , Local: {}.",currentTriggerName,hosts,local);
					if (currentTriggerGroup.equals(jobObject.getTriggerGroup()) && currentTriggerName.equals(jobObject.getTriggerName())) {
						if (hosts.contains("%") || hosts.contains(local)) {
							veto = false;
						} else {
							veto = true;
						}
						log.debug(String.format("Job %s(%s.%s) veto status: %s", local,currentTriggerGroup,currentTriggerName, veto));
					}
				}
				return veto;
			}

			@Override
			public void triggerMisfired(Trigger trigger) {
				if(!veto){
				  JobProcess.recordState(g,trigger,"Misfired");
				}
			}

			@Override
			public void triggerFired(Trigger trigger, JobExecutionContext context) {
			}

			@Override
			public void triggerComplete(Trigger trigger, JobExecutionContext context,
					CompletedExecutionInstruction triggerInstructionCode) {
				if(!veto){
					TriggerState ts;
					try {
						ts = context.getScheduler().getTriggerState(trigger.getKey());
						JobProcess.recordState(g,trigger,ts.name());
					} catch (SchedulerException e) {
						log.error(e.getMessage(),e);
					}
				}
			}

			@Override
			public String getName() {
				return "AppScheduleWorker-TriggerListener";
			}
		};
	}
	
}
