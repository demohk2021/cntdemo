package app.controller.www.service;

import java.sql.Timestamp;
import java.util.Date;

import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.Trigger.CompletedExecutionInstruction;
import org.quartz.Trigger.TriggerState;
import org.quartz.TriggerBuilder;
import org.quartz.TriggerListener;
import org.quartz.impl.DirectSchedulerFactory;

import app.helper.ApplicationHelper;
import app.helper.JobHelper;
import app.job.Reschedule;
import app.model.JobProcess;
import net.rails.active_record.exception.MessagesException;
import net.rails.active_record.exception.RecordNotFoundException;
import net.rails.ext.AbsGlobal;
import net.rails.support.job.worker.JobObject;

public class JobService extends ActionService {

	public JobService(AbsGlobal g) {
		super(g);
	}
	
	@Override
	public int createWaiter(ApplicationHelper ar) throws MessagesException {
		boolean startAfterCreated = ar.getBoolean("start_after_created");
		JobHelper helper = (JobHelper)ar;
		helper.setPauseJob(!startAfterCreated);
		if(!startAfterCreated){
			helper.setPausedAt(new Timestamp(new Date().getTime()));
		}
		return super.createWaiter(ar);
	}
	
	@Override
	public int updateWaiter(ApplicationHelper ar) throws MessagesException {
		JobHelper helper = (JobHelper)ar;
		Long currentDate = new Date().getTime();
		Long lastPausedAt = helper.getPausedAt() == null ? 0L : helper.getPausedAt().getTime();
		Long gapTime = currentDate - lastPausedAt;
		
		if(!helper.isPauseJob() && gapTime < 20000){
			return 2;
		}else {
			return super.updateWaiter(ar);
		}	
		
	}
	
	public int testWaiter(ApplicationHelper ar) throws MessagesException {
		try{
			JobHelper job = (JobHelper)ar;
			job.refresh();
			
			DirectSchedulerFactory factory = DirectSchedulerFactory.getInstance();
			Scheduler scheduler = factory.getScheduler(Reschedule.APP_SCHEDULE);
			JobObject jobObject = new JobObject();
			jobObject.setClassify(job.getClassify());
			jobObject.setCronExpression(job.getCronExpression());
			jobObject.setJobGroup(job.getJobGroup());
			jobObject.setJobName(job.getJobName());
			jobObject.setTriggerGroup(job.getTriggerGroup());
			jobObject.setTriggerName(job.getTriggerName());
			jobObject.setHostnames(job.getHostnames());

			String jobName = jobObject.getJobName();
			String jobClass = jobObject.getClassify();
			log.debug("Starting: {}", jobName);
			log.debug("Class: {}", jobClass);

			org.quartz.Job quartzJob = (org.quartz.Job) Class.forName(jobClass).newInstance();
			JobDetail jobDetail = JobBuilder.newJob(quartzJob.getClass()).withIdentity(jobName,jobObject.getJobGroup()).build();
			jobDetail.getJobDataMap().put("AbsGlobal", g);
			Trigger trigger = TriggerBuilder.newTrigger().withIdentity(jobObject.getTriggerName(), jobObject.getTriggerGroup())
			 .startNow().build();
			
			scheduler.getListenerManager().addTriggerListener(new TriggerListener() {
				
				@Override
				public boolean vetoJobExecution(Trigger arg0, JobExecutionContext arg1) {
					return false;
				}
				
				@Override
				public void triggerMisfired(Trigger trigger) {
					JobProcess.recordState(g,trigger,"Misfired");
				}
				
				@Override
				public void triggerFired(Trigger arg0, JobExecutionContext arg1) {

				}
				
				@Override
				public void triggerComplete(Trigger trigger, JobExecutionContext context, CompletedExecutionInstruction arg2) {
					try {
						TriggerState ts = context.getScheduler().getTriggerState(trigger.getKey());
						JobProcess.recordState(g,trigger,ts.name());
					} catch (SchedulerException e) {
						log.error(e.getMessage(),e);
					}					
				}
				
				@Override
				public String getName() {
					return "TestScheduleWorker-TriggerListener";
				}
			});
			
			scheduler.scheduleJob(jobDetail, trigger);
		    scheduler.start();
			setStatement(job);
			return 1;
		}catch(Exception e){
			log.error(e.getMessage(),e);
			return 0;
		}
	}

}
