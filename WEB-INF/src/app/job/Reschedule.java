package app.job;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.quartz.CronScheduleBuilder;
import org.quartz.Job;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.JobKey;
import org.quartz.JobListener;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.Trigger.TriggerState;
import org.quartz.TriggerBuilder;
import org.quartz.TriggerKey;
import org.quartz.TriggerListener;
import org.quartz.impl.DirectSchedulerFactory;
import org.quartz.impl.matchers.GroupMatcher;
import org.quartz.simpl.RAMJobStore;
import org.quartz.simpl.SimpleThreadPool;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.rails.ext.AbsGlobal;
import net.rails.log.LogPoint;
import net.rails.sql.query.Query;
import net.rails.support.Support;
import net.rails.support.job.worker.JobObject;

public class Reschedule implements Job {

	public static String APP_SCHEDULE = "APP_SCHEDULE";

	private static Logger log = LoggerFactory.getLogger(Reschedule.class);
	private AbsGlobal g;
	private AppScheduleWorker scheduleWorker;
	private static DirectSchedulerFactory factory;
	private static Scheduler scheduler;

	static {
		factory = DirectSchedulerFactory.getInstance();
		SimpleThreadPool threadPool = new SimpleThreadPool();
		threadPool.setThreadCount(Support.env().getOrDefault("quartz.app_thread_count", 10));
		threadPool.setThreadPriority(Thread.NORM_PRIORITY);
		threadPool.setThreadNamePrefix(APP_SCHEDULE);
		try {
			threadPool.initialize();
			factory.createScheduler(APP_SCHEDULE, APP_SCHEDULE, threadPool, new RAMJobStore());
			scheduler = factory.getScheduler(APP_SCHEDULE);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
	}

	public Reschedule() throws SchedulerException {
		super();
		LogPoint.markJobSystem();
	}

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		log.debug("Executeig job {}", this.getClass().getName());
		g = (AbsGlobal) context.getJobDetail().getJobDataMap().get("AbsGlobal");
		scheduleWorker = new AppScheduleWorker(g);
		deleteJob(context);
		addJob(context);
		pauseJob(context);
		addOnceJob(context);
	}

	private void pauseJob(JobExecutionContext context) {
		Query q = new Query(new app.model.Job(g));
		q.cache(true);
		q.cache(0);
		q.and("eq_pause_job", 1);
		q.and("eq_job_group", APP_SCHEDULE);
		q.and("eq_deleted", 0);
		q.or("in_job_name", getRunningJobName());
		q.or("eq_cron_expression", "once");
		q.order("created_at", "ASC");
		List<app.model.Job> jobs = null;
		try {
			jobs = q.find();
			if (jobs.size() > 0) {
				for (app.model.Job job : jobs) {
					JobKey jobKey = JobKey.jobKey(job.getJobName(), job.getJobGroup());
					boolean exists = false;
					if (job.getCronExpression().equals("once")) {
						exists = scheduleWorker.getJobObject(job.getJobGroup(), job.getJobName()) != null;
						if (!exists) {
							continue;
						}
						scheduleWorker.deleteJobObject(job.getJobGroup(), job.getJobName());
					} else {
						exists = scheduler.checkExists(jobKey);
						if (!exists) {
							continue;
						}
						log.debug("Schedule job {}", job.getJobName());
						String jobName = job.getJobName();
						String jobClass = job.getClassify();
						String cronExpression = job.getCronExpression();
						log.debug("Starting: {}", jobName);
						log.debug("Class: {}", jobClass);
						log.debug("Cron Expression: {}", cronExpression);

						TriggerKey triggerKey = TriggerKey.triggerKey(job.getTriggerName(), job.getTriggerGroup());
						scheduler.pauseTrigger(triggerKey);
						scheduler.unscheduleJob(triggerKey);
						scheduler.deleteJob(jobKey);
						scheduleWorker.deleteJobObject(job.getJobGroup(), jobName);
					}
				}
			}
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
	}

	private void deleteJob(JobExecutionContext context) {
		List<String> runningJobs = getRunningJobName();
		if (runningJobs.size() > 0) {
			Query q = new Query(new app.model.Job(g));
			q.cache(true);
			q.cache(0);
			q.and("eq_job_group", APP_SCHEDULE);
			q.and("eq_deleted", 1);
			q.order("created_at", "ASC");

			q.or("in_job_name", runningJobs);
			q.or("eq_cron_expression", "once");

			List<app.model.Job> jobs = null;
			try {
				jobs = q.find();
				if (jobs.size() > 0) {
					for (app.model.Job job : jobs) {
						JobKey jobKey = JobKey.jobKey(job.getJobName(), job.getJobGroup());
						boolean exists = false;
						if (job.getCronExpression().equals("once")) {
							exists = scheduleWorker.getJobObject(job.getJobGroup(), job.getJobName()) != null;
							if (!exists) {
								continue;
							}
							scheduleWorker.deleteJobObject(job.getJobGroup(), job.getJobName());
						} else {
							exists = scheduler.checkExists(jobKey);
							if (!exists) {
								continue;
							}
							log.debug("Schedule job {}", job.getJobName());
							String jobName = job.getJobName();
							String jobClass = job.getClassify();
							String cronExpression = job.getCronExpression();
							log.debug("Starting: {}", jobName);
							log.debug("Class: {}", jobClass);
							log.debug("Cron Expression: {}", cronExpression);
							TriggerKey triggerKey = TriggerKey.triggerKey(job.getTriggerName(), job.getTriggerGroup());
							scheduler.pauseTrigger(triggerKey);
							scheduler.unscheduleJob(triggerKey);

							scheduler.deleteJob(jobKey);
							scheduleWorker.deleteJobObject(job.getJobGroup(), jobName);
						}
					}
				}
			} catch (Exception e) {
				log.error(e.getMessage(), e);
			}
		}
	}

	private void addOnceJob(JobExecutionContext context) {
		Query q = new Query(new app.model.Job(g));
		q.cache(true);
		q.cache(0);
		q.and("eq_pause_job", 0);
		q.and("eq_job_group", APP_SCHEDULE);
		q.and("eq_cron_expression", "once");
		q.and("eq_deleted", 0);
		q.and("ni_job_name", scheduleWorker.getOnceScheduleJobs());
		q.order("created_at", "ASC");
		List<app.model.Job> jobs = null;
		try {
			jobs = q.find();
			for (app.model.Job job : jobs) {
				JobObject jobObject = new JobObject();
				jobObject.setClassify(job.getClassify());
				jobObject.setCronExpression(job.getCronExpression());
				jobObject.setJobGroup(job.getJobGroup());
				jobObject.setJobName(job.getJobName());
				jobObject.setTriggerGroup(job.getTriggerGroup());
				jobObject.setTriggerName(job.getTriggerName());
				jobObject.setHostnames(job.getHostnames());

				boolean exists = scheduleWorker.getJobObject(job.getJobGroup(), job.getJobName()) != null;
				if (exists) {
					continue;
				}

				String jobName = jobObject.getJobName();
				String jobClass = jobObject.getClassify();
				String cronExpression = jobObject.getCronExpression();
				log.debug("Starting: {}", jobName);
				log.debug("Class: {}", jobClass);
				log.debug("Cron Expression: {}", cronExpression);

				org.quartz.Job quartzJob = (org.quartz.Job) Class.forName(jobClass).newInstance();
				JobDetail jobDetail = JobBuilder.newJob(quartzJob.getClass())
						.withIdentity(jobName, jobObject.getJobGroup()).build();
				jobDetail.getJobDataMap().put("AbsGlobal", g);
				Trigger trigger = TriggerBuilder.newTrigger()
						.withIdentity(jobObject.getTriggerName(), jobObject.getTriggerGroup()).startNow().build();

				TriggerState ts = context.getScheduler().getTriggerState(trigger.getKey());
				scheduleWorker.addJobObject(jobObject);
				JobListener jobListener = scheduleWorker.getJobListener();
				TriggerListener triggerListener = scheduleWorker.getTriggerListener();
				if (jobListener != null) {
					scheduler.getListenerManager().addJobListener(scheduleWorker.getJobListener());
				}
				if (triggerListener != null) {
					scheduler.getListenerManager().addTriggerListener(scheduleWorker.getTriggerListener());
				}
				scheduler.scheduleJob(jobDetail, trigger);
				scheduler.start();
			}
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
	}

	private void addJob(JobExecutionContext context) {
		Query q = new Query(new app.model.Job(g));
		q.cache(true);
		q.cache(0);
		q.and("eq_pause_job", 0);
		q.and("eq_job_group", APP_SCHEDULE);
		q.and("ne_cron_expression", "once");
		q.and("eq_deleted", 0);
		q.and("ni_job_name", getRunningJobName());
		q.order("created_at", "ASC");
		List<app.model.Job> jobs = null;
		try {
			jobs = q.find();
			if (jobs.size() > 0) {
				for (app.model.Job job : jobs) {
					JobObject jobObject = new JobObject();
					jobObject.setClassify(job.getClassify());
					jobObject.setCronExpression(job.getCronExpression());
					jobObject.setJobGroup(job.getJobGroup());
					jobObject.setJobName(job.getJobName());
					jobObject.setTriggerGroup(job.getTriggerGroup());
					jobObject.setTriggerName(job.getTriggerName());
					jobObject.setHostnames(job.getHostnames());

					JobKey jobKey = JobKey.jobKey(job.getJobName(), job.getJobGroup());
					if (scheduler != null) {
						boolean exists = scheduler.checkExists(jobKey);
						if (exists) {
							continue;
						}
					}
					String jobName = jobObject.getJobName();
					String jobClass = jobObject.getClassify();
					String cronExpression = jobObject.getCronExpression();
					log.debug("Starting: {}", jobName);
					log.debug("Class: {}", jobClass);
					log.debug("Cron Expression: {}", cronExpression);

					org.quartz.Job quartzJob = (org.quartz.Job) Class.forName(jobClass).newInstance();
					JobDetail jobDetail = JobBuilder.newJob(quartzJob.getClass())
							.withIdentity(jobName, jobObject.getJobGroup()).build();
					jobDetail.getJobDataMap().put("AbsGlobal", g);
					Trigger trigger = TriggerBuilder.newTrigger()
							.withIdentity(jobObject.getTriggerName(), jobObject.getTriggerGroup())
							.withSchedule(CronScheduleBuilder.cronSchedule(jobObject.getCronExpression())).build();

					TriggerState ts = context.getScheduler().getTriggerState(trigger.getKey());
					scheduleWorker.addJobObject(jobObject);

					JobListener jobListener = scheduleWorker.getJobListener();
					TriggerListener triggerListener = scheduleWorker.getTriggerListener();
					if (jobListener != null) {
						scheduler.getListenerManager().addJobListener(scheduleWorker.getJobListener());
					}
					if (triggerListener != null) {
						scheduler.getListenerManager().addTriggerListener(scheduleWorker.getTriggerListener());
					}
					scheduler.scheduleJob(jobDetail, trigger);
					scheduler.start();
				}
			}
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
	}

	private List<String> getRunningJobName() {
		List<String> list = new ArrayList<String>();
		try {
			if(scheduler == null || scheduler.isShutdown()){
				return list;
			}			
			Set<JobKey> jobKeys = scheduler.getJobKeys(GroupMatcher.jobGroupEquals(APP_SCHEDULE));
			for (JobKey jobKey : jobKeys) {
				list.add(jobKey.getName());
			}
			return list;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			return list;
		}
	}

}
