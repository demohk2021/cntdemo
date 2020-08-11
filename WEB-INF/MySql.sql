DROP TABLE IF EXISTS `email_schedule`;
CREATE TABLE `email_schedule`
(
`id` CHAR(16) NOT NULL,
`to_list` VARCHAR(1000) COMMENT 'TO',
`cc_list` VARCHAR(1000) COMMENT 'CC',
`bcc_list` VARCHAR(1000) COMMENT 'BCC',
`subject` VARCHAR(100) COMMENT 'Subject',
`message` LONGTEXT COMMENT 'Message',
`response_msg` VARCHAR(500) COMMENT 'Respone Message',
`status` VARCHAR(100) COMMENT 'Status',
`action` VARCHAR(100) COMMENT 'Action',
`response_code` INT COMMENT 'Response Code',
`process_host` VARCHAR(100) COMMENT 'Process Host',
`user_id` CHAR(16) COMMENT 'User',
`attachement` VARCHAR(255) COMMENT 'Attachement',
`created_user_id` CHAR(16),
`updated_user_id` CHAR(16),
`deleted_user_id` CHAR(16),
`created_at` DATETIME,
`updated_at` DATETIME,
`deleted_at` DATETIME,
`deleted` TINYINT(1),
PRIMARY KEY (`id`)
);
ALTER TABLE `email_schedule` COMMENT 'Email Schedule';

DROP TABLE IF EXISTS `job_process`;
CREATE TABLE `job_process`
(
`id` CHAR(16) NOT NULL,
`job_id` CHAR(16) COMMENT 'Job',
`hostname` VARCHAR(100) COMMENT 'Hostname',
`end_time` DATETIME COMMENT 'End Time',
`final_fire_time` DATETIME COMMENT 'Final Fire Time',
`next_fire_time` DATETIME COMMENT 'Next Fire Time',
`previous_fire_time` DATETIME COMMENT 'Previous Fire Time',
`state` VARCHAR(100) COMMENT 'State',
`created_user_id` CHAR(16),
`updated_user_id` CHAR(16),
`deleted_user_id` CHAR(16),
`created_at` DATETIME,
`updated_at` DATETIME,
`deleted_at` DATETIME,
`deleted` TINYINT(1),
PRIMARY KEY (`id`)
);
ALTER TABLE `job_process` COMMENT 'Job Process';

DROP TABLE IF EXISTS `member`;
CREATE TABLE `member`
(
`id` CHAR(16) NOT NULL,
`name` VARCHAR(100) COMMENT 'Name',
`phone` VARCHAR(100) COMMENT 'Phone',
`passport` VARCHAR(100) COMMENT 'Passport',
`credit_card_no` VARCHAR(100) COMMENT 'Credit Card No',
`expiry_date` VARCHAR(100) COMMENT 'Expiry Date',
`holder_name` VARCHAR(100) COMMENT 'Holder Name',
`created_user_id` CHAR(16),
`updated_user_id` CHAR(16),
`deleted_user_id` CHAR(16),
`created_at` DATETIME,
`updated_at` DATETIME,
`deleted_at` DATETIME,
`deleted` TINYINT(1),
PRIMARY KEY (`id`)
);
ALTER TABLE `member` COMMENT 'Member';

DROP TABLE IF EXISTS `event_schedule`;
CREATE TABLE `event_schedule`
(
`id` CHAR(16) NOT NULL,
`user_id` CHAR(16) COMMENT 'User',
`title` VARCHAR(100) COMMENT 'Title',
`start_at` DATETIME COMMENT 'Start',
`end_at` DATETIME COMMENT 'End',
`notes` VARCHAR(500) COMMENT 'Notes',
`location` VARCHAR(100) COMMENT 'Location',
`reminder` VARCHAR(100) COMMENT 'Reminder',
`calendar_code` VARCHAR(100) COMMENT 'Calendar',
`web_link` VARCHAR(200) COMMENT 'Link',
`all_day` TINYINT(1) COMMENT 'All Day',
`created_user_id` CHAR(16),
`updated_user_id` CHAR(16),
`deleted_user_id` CHAR(16),
`created_at` DATETIME,
`updated_at` DATETIME,
`deleted_at` DATETIME,
`deleted` TINYINT(1),
PRIMARY KEY (`id`)
);
ALTER TABLE `event_schedule` COMMENT 'Event Schedule';

DROP TABLE IF EXISTS `flight_booking_seat`;
CREATE TABLE `flight_booking_seat`
(
`id` CHAR(16) NOT NULL,
`flight_booking_id` CHAR(16) COMMENT 'Flight Booking',
`ticket_no` VARCHAR(255) COMMENT 'Ticket No',
`passenger_name` VARCHAR(200) COMMENT 'Your Name',
`passport_no` VARCHAR(100) COMMENT 'Passport No',
`age` INT COMMENT 'Your Age',
`seat_no` VARCHAR(100) COMMENT 'Seat No',
`created_user_id` CHAR(16),
`updated_user_id` CHAR(16),
`deleted_user_id` CHAR(16),
`created_at` DATETIME,
`updated_at` DATETIME,
`deleted_at` DATETIME,
`deleted` TINYINT(1),
PRIMARY KEY (`id`)
);
ALTER TABLE `flight_booking_seat` COMMENT 'Flight Booking Seat';

DROP TABLE IF EXISTS `role_permission`;
CREATE TABLE `role_permission`
(
`id` CHAR(16) NOT NULL,
`role_id` CHAR(16) COMMENT 'Role',
`model` VARCHAR(100) COMMENT 'Model',
`action` VARCHAR(100) COMMENT 'Action',
`created_user_id` CHAR(16),
`updated_user_id` CHAR(16),
`deleted_user_id` CHAR(16),
`created_at` DATETIME,
`updated_at` DATETIME,
`deleted_at` DATETIME,
`deleted` TINYINT(1),
PRIMARY KEY (`id`)
);
ALTER TABLE `role_permission` COMMENT 'Role Permission';

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`
(
`id` CHAR(16) NOT NULL,
`role_id` CHAR(16) COMMENT 'Role',
`member_id` CHAR(16) COMMENT 'Member',
`username` VARCHAR(100) COMMENT 'User Name',
`email` VARCHAR(100) COMMENT 'Email',
`sign_in_password` CHAR(32) COMMENT 'Password',
`session_token` VARCHAR(256) COMMENT 'Session Token',
`active` TINYINT(1) COMMENT 'Active',
`created_user_id` CHAR(16),
`updated_user_id` CHAR(16),
`deleted_user_id` CHAR(16),
`created_at` DATETIME,
`updated_at` DATETIME,
`deleted_at` DATETIME,
`deleted` TINYINT(1),
PRIMARY KEY (`id`)
);
ALTER TABLE `user` COMMENT 'User';

DROP TABLE IF EXISTS `security_code`;
CREATE TABLE `security_code`
(
`id` CHAR(16) NOT NULL,
`user_id` CHAR(16) COMMENT 'User',
`code` VARCHAR(100) COMMENT 'Code',
`expired_at` DATETIME COMMENT 'Expired At',
`action` VARCHAR(100) COMMENT 'Action',
`status` VARCHAR(100) COMMENT 'Status',
`created_user_id` CHAR(16),
`updated_user_id` CHAR(16),
`deleted_user_id` CHAR(16),
`created_at` DATETIME,
`updated_at` DATETIME,
`deleted_at` DATETIME,
`deleted` TINYINT(1),
PRIMARY KEY (`id`)
);
ALTER TABLE `security_code` COMMENT 'Security Code';

DROP TABLE IF EXISTS `sequence`;
CREATE TABLE `sequence`
(
`id` CHAR(16) NOT NULL,
`model` VARCHAR(100) COMMENT 'Model',
`prefix` VARCHAR(100) COMMENT 'Prefix',
`display_prefix` TINYINT(1) COMMENT 'Display Prefix',
`step` INT COMMENT 'Step',
`len` INT COMMENT 'Length',
`split_char` VARCHAR(20) COMMENT 'Split',
`current` INT COMMENT 'Current Value',
`ftime` VARCHAR(50) COMMENT 'Time Format',
`clear_rule` VARCHAR(100) COMMENT 'Clear Rule',
`next_clear_at` DATETIME COMMENT 'Restore Time',
`owner_hostname` VARCHAR(255) COMMENT 'Host Name',
`note` VARCHAR(255) COMMENT 'Note',
`created_user_id` CHAR(16),
`updated_user_id` CHAR(16),
`deleted_user_id` CHAR(16),
`created_at` DATETIME,
`updated_at` DATETIME,
`deleted_at` DATETIME,
`deleted` TINYINT(1),
PRIMARY KEY (`id`)
);
ALTER TABLE `sequence` COMMENT 'Sequence';

DROP TABLE IF EXISTS `flight_info`;
CREATE TABLE `flight_info`
(
`id` CHAR(16) NOT NULL,
`flight_no` VARCHAR(100) COMMENT 'Flight No',
`schedule_date` DATE COMMENT 'Schedule Date',
`schedule_time` VARCHAR(100) COMMENT 'Schedule Time',
`arrival_time` VARCHAR(100) COMMENT 'Arrival Time',
`beyond_the_day` VARCHAR(100) COMMENT 'Beyond the day',
`origin_airport_id` CHAR(16) COMMENT 'Origin',
`destination_airport_id` CHAR(16) COMMENT 'Destination',
`price` VARCHAR(100) COMMENT 'Price',
`airline_name` VARCHAR(100) COMMENT 'Airline',
`icon_css` VARCHAR(100) COMMENT 'ICON CSS',
`flight_duration` VARCHAR(100) COMMENT 'Flight Duration',
`flight_note` VARCHAR(100) COMMENT 'Flight Note',
`created_user_id` CHAR(16),
`updated_user_id` CHAR(16),
`deleted_user_id` CHAR(16),
`created_at` DATETIME,
`updated_at` DATETIME,
`deleted_at` DATETIME,
`deleted` TINYINT(1),
PRIMARY KEY (`id`)
);
ALTER TABLE `flight_info` COMMENT 'Flight Info';

DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`
(
`id` CHAR(16) NOT NULL,
`name` VARCHAR(100) COMMENT 'Name',
`code` VARCHAR(100) COMMENT 'Code',
`created_user_id` CHAR(16),
`updated_user_id` CHAR(16),
`deleted_user_id` CHAR(16),
`created_at` DATETIME,
`updated_at` DATETIME,
`deleted_at` DATETIME,
`deleted` TINYINT(1),
PRIMARY KEY (`id`)
);
ALTER TABLE `role` COMMENT 'Role';

DROP TABLE IF EXISTS `job`;
CREATE TABLE `job`
(
`id` CHAR(16) NOT NULL,
`job_group` VARCHAR(100) COMMENT 'Job Group',
`job_name` VARCHAR(100) COMMENT 'Job Name',
`trigger_group` VARCHAR(100) COMMENT 'Trigger Group',
`trigger_name` VARCHAR(100) COMMENT 'Trigger Name',
`cron_expression` VARCHAR(100) COMMENT 'Cron Expression',
`classify` VARCHAR(100) COMMENT 'Classify',
`hostnames` VARCHAR(100) COMMENT 'Hostname',
`comment` VARCHAR(100) COMMENT 'Comment',
`pause_job` TINYINT(1) COMMENT 'Pause Job',
`paused_at` DATETIME COMMENT 'Paused At',
`created_user_id` CHAR(16),
`updated_user_id` CHAR(16),
`deleted_user_id` CHAR(16),
`created_at` DATETIME,
`updated_at` DATETIME,
`deleted_at` DATETIME,
`deleted` TINYINT(1),
PRIMARY KEY (`id`)
);
ALTER TABLE `job` COMMENT 'Job';

DROP TABLE IF EXISTS `airport`;
CREATE TABLE `airport`
(
`id` CHAR(16) NOT NULL,
`code` VARCHAR(100) COMMENT 'Code',
`name` VARCHAR(100) COMMENT 'Name',
`search_keywords` VARCHAR(500) COMMENT 'Search Keywords',
`created_user_id` CHAR(16),
`updated_user_id` CHAR(16),
`deleted_user_id` CHAR(16),
`created_at` DATETIME,
`updated_at` DATETIME,
`deleted_at` DATETIME,
`deleted` TINYINT(1),
PRIMARY KEY (`id`)
);
ALTER TABLE `airport` COMMENT 'Airport';

DROP TABLE IF EXISTS `flight_booking`;
CREATE TABLE `flight_booking`
(
`id` CHAR(16) NOT NULL,
`flight_info_id` CHAR(16) COMMENT 'Flight Info',
`order_no` VARCHAR(255) COMMENT 'Order No',
`member_id` CHAR(16) COMMENT 'Member',
`created_user_id` CHAR(16),
`updated_user_id` CHAR(16),
`deleted_user_id` CHAR(16),
`created_at` DATETIME,
`updated_at` DATETIME,
`deleted_at` DATETIME,
`deleted` TINYINT(1),
PRIMARY KEY (`id`)
);
ALTER TABLE `flight_booking` COMMENT 'Flight Booking';




/*Create Indexs at Thu Jul 30 13:21:51 HKT 2020*/
CREATE INDEX `idx_email_schedule_subject` ON `email_schedule` (`subject`); 
CREATE INDEX `idx_email_schedule_user_id` ON `email_schedule` (`user_id`); 
CREATE INDEX `idx_job_process_job_id` ON `job_process` (`job_id`); 
CREATE INDEX `idx_job_process_hostname` ON `job_process` (`hostname`); 
CREATE INDEX `idx_member_name` ON `member` (`name`); 
CREATE INDEX `idx_event_schedule_user_id` ON `event_schedule` (`user_id`); 
CREATE INDEX `idx_flight_booking_seat_flight_booking_id` ON `flight_booking_seat` (`flight_booking_id`); 
CREATE INDEX `idx_flight_booking_seat_passenger_name` ON `flight_booking_seat` (`passenger_name`); 
CREATE INDEX `idx_role_permission_role_id` ON `role_permission` (`role_id`); 
CREATE INDEX `idx_role_permission_model` ON `role_permission` (`model`); 
CREATE INDEX `idx_user_role_id` ON `user` (`role_id`); 
CREATE INDEX `idx_user_member_id` ON `user` (`member_id`); 
CREATE INDEX `idx_user_email` ON `user` (`email`); 
CREATE INDEX `idx_security_code_user_id` ON `security_code` (`user_id`); 
CREATE INDEX `idx_sequence_model` ON `sequence` (`model`); 
CREATE INDEX `idx_flight_info_flight_no` ON `flight_info` (`flight_no`); 
CREATE INDEX `idx_flight_info_origin_airport_id` ON `flight_info` (`origin_airport_id`); 
CREATE INDEX `idx_flight_info_destination_airport_id` ON `flight_info` (`destination_airport_id`); 
CREATE INDEX `idx_role_name` ON `role` (`name`); 
CREATE INDEX `idx_job_job_name` ON `job` (`job_name`); 
CREATE INDEX `idx_airport_name` ON `airport` (`name`); 
CREATE INDEX `idx_flight_booking_flight_info_id` ON `flight_booking` (`flight_info_id`); 
CREATE INDEX `idx_flight_booking_order_no` ON `flight_booking` (`order_no`); 
CREATE INDEX `idx_flight_booking_member_id` ON `flight_booking` (`member_id`); 

/*Create Sequence Records at Thu Jul 30 13:21:51 HKT 2020*/
INSERT INTO `sequence`(`id`,`model`,`prefix`,`display_prefix`,`step`,`len`,`split_char`,`current`,`ftime`,`clear_rule`,`next_clear_at`,`owner_hostname`,`note`,`created_user_id`,`updated_user_id`,`deleted_user_id`,`created_at`,`updated_at`,`deleted_at`,`deleted`) 
VALUES ('brfea3w3u4k8v6yu','FlightBookingSeat','FlightBookingSeat',1,1,6,'-',0,'yyMM','Month',SYSDATE(),'*',NULL,NULL,NULL,NULL,SYSDATE(),SYSDATE(),NULL,0);
INSERT INTO `sequence`(`id`,`model`,`prefix`,`display_prefix`,`step`,`len`,`split_char`,`current`,`ftime`,`clear_rule`,`next_clear_at`,`owner_hostname`,`note`,`created_user_id`,`updated_user_id`,`deleted_user_id`,`created_at`,`updated_at`,`deleted_at`,`deleted`) 
VALUES ('rxej5smxf57zzaa4','FlightBooking','FlightBooking',1,1,6,'-',0,'yyMM','Month',SYSDATE(),'*',NULL,NULL,NULL,NULL,SYSDATE(),SYSDATE(),NULL,0);

INSERT INTO `role` (`id`,`code`,`name`,`created_at`,`deleted`) VALUES ('11qjs3myx3ry1vcp','Admin','Admin',SYSDATE(),0);
INSERT INTO `user` (`id`,`role_id`,`username`,`email`,`sign_in_password`,`created_at`,`active`,`deleted`) VALUES ('u6r800c8wvg199we','11qjs3myx3ry1vcp','Admin','Admin@yourdomain.com',MD5('password'),SYSDATE(),1,0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('xv7qlecsup7n78in','11qjs3myx3ry1vcp','Sequence','menu',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('gxkrn0dy8a6dshh5','11qjs3myx3ry1vcp','Sequence','list',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('fvk8o5z56pqybbvi','11qjs3myx3ry1vcp','Sequence','create',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('uacoedq9antj9nvy','11qjs3myx3ry1vcp','Sequence','edit',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('7rrlsunp563b2fnd','11qjs3myx3ry1vcp','Sequence','update',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('a44g08c3wulwqyjn','11qjs3myx3ry1vcp','Sequence','remove',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('i19auc06lgxozqg3','11qjs3myx3ry1vcp','Sequence','import',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('n3m1jj159ujgy4fv','11qjs3myx3ry1vcp','Sequence','export',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('613js7wlzxj03uz1','11qjs3myx3ry1vcp','EventSchedule','menu',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('yrvhz6m8ntmpto5u','11qjs3myx3ry1vcp','EventSchedule','list',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('xrk9ehsgqmp2pzul','11qjs3myx3ry1vcp','EventSchedule','create',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('nsc8d48gxe2dnoyk','11qjs3myx3ry1vcp','EventSchedule','edit',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('q332of976ro7yc1c','11qjs3myx3ry1vcp','EventSchedule','update',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('w3cztm0c22y7g2qo','11qjs3myx3ry1vcp','EventSchedule','remove',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('vy7s9enr2hnwie78','11qjs3myx3ry1vcp','EventSchedule','import',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('qk5lyoyoommmna0y','11qjs3myx3ry1vcp','EventSchedule','export',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('a5praj7o9b93bjol','11qjs3myx3ry1vcp','User','menu',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('78b6cicrtfckloqf','11qjs3myx3ry1vcp','User','list',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('d5on4ue5o0odtsgf','11qjs3myx3ry1vcp','User','create',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('349li49vfpbv5pbq','11qjs3myx3ry1vcp','User','edit',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('px0s21jacfi01mqn','11qjs3myx3ry1vcp','User','update',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('gulsd8b6yi2e2acy','11qjs3myx3ry1vcp','User','remove',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('2vfbzh9q1dikizk5','11qjs3myx3ry1vcp','User','import',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('mip4d21iaeq5c1k6','11qjs3myx3ry1vcp','User','export',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('bl7xl28ypr2xbw6u','11qjs3myx3ry1vcp','EmailSchedule','menu',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('xrh1yhgc5wgsbwdz','11qjs3myx3ry1vcp','EmailSchedule','list',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('1xpexy0bfncogvrd','11qjs3myx3ry1vcp','EmailSchedule','create',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('d8hl2pw9at6nbiv0','11qjs3myx3ry1vcp','EmailSchedule','edit',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('5evzv9dxvmrepk6o','11qjs3myx3ry1vcp','EmailSchedule','update',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('56bqm213v8yk3xlt','11qjs3myx3ry1vcp','EmailSchedule','remove',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('5mzs1svbzbsw96sb','11qjs3myx3ry1vcp','EmailSchedule','import',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('gyx3318dh2xvuigo','11qjs3myx3ry1vcp','EmailSchedule','export',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('ex0imet7urwig2cw','11qjs3myx3ry1vcp','Job','menu',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('k3swooquphb128kg','11qjs3myx3ry1vcp','Job','list',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('1im7k2mszu2du3ed','11qjs3myx3ry1vcp','Job','create',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('cjdvyp2fzcoqq1gm','11qjs3myx3ry1vcp','Job','edit',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('ookwfzm67isaz8h7','11qjs3myx3ry1vcp','Job','update',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('o244x392xle3jdxa','11qjs3myx3ry1vcp','Job','remove',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('guab4zy6juhag8ne','11qjs3myx3ry1vcp','Job','import',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('4gfdawxbbpldf1hr','11qjs3myx3ry1vcp','Job','export',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('qzgzfd0ri62qhd09','11qjs3myx3ry1vcp','Role','menu',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('6hbiqs29jtx19gxf','11qjs3myx3ry1vcp','Role','list',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('d0xm50axhzqj0m5k','11qjs3myx3ry1vcp','Role','create',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('z7404wr99j9gam7h','11qjs3myx3ry1vcp','Role','edit',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('r8s1b6jo3jtcydii','11qjs3myx3ry1vcp','Role','update',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('fhkca3j38zfx5cr1','11qjs3myx3ry1vcp','Role','remove',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('incmc6qgu5uhmyqv','11qjs3myx3ry1vcp','Role','import',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('goa8xhkrmtvr31na','11qjs3myx3ry1vcp','Role','export',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('kq9uk52eiop19hsf','11qjs3myx3ry1vcp','RolePermission','menu',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('l1gei9vrh2867khx','11qjs3myx3ry1vcp','RolePermission','list',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('ticek7nlngeyoyzq','11qjs3myx3ry1vcp','RolePermission','create',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('n2kc872kilk2wjgv','11qjs3myx3ry1vcp','RolePermission','edit',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('y3vp3zu6cmn8ze87','11qjs3myx3ry1vcp','RolePermission','update',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('vobrcw6zg68j0u8e','11qjs3myx3ry1vcp','RolePermission','remove',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('tqvq4jzuduhasbty','11qjs3myx3ry1vcp','RolePermission','import',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('kt338p1me3yrecyu','11qjs3myx3ry1vcp','RolePermission','export',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('pyql8ldobvjglsa1','11qjs3myx3ry1vcp','SecurityCode','menu',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('crje0cr8xirdx02x','11qjs3myx3ry1vcp','SecurityCode','list',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('9t5u0d8gw552jbv6','11qjs3myx3ry1vcp','SecurityCode','create',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('kxgx8qklfv5wtj8v','11qjs3myx3ry1vcp','SecurityCode','edit',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('tktf20kd3qcsolvs','11qjs3myx3ry1vcp','SecurityCode','update',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('xi40l71lkh1p1afk','11qjs3myx3ry1vcp','SecurityCode','remove',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('jsrktjyk8tz6986l','11qjs3myx3ry1vcp','SecurityCode','import',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('ww9ailwt4hmqhtmi','11qjs3myx3ry1vcp','SecurityCode','export',SYSDATE(),0);

INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('lgn1h47jr93f6r2a','11qjs3myx3ry1vcp','Member','menu',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('izmq77wp6td6drqr','11qjs3myx3ry1vcp','Member','list',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('hsm23z1jy9bg2wdc','11qjs3myx3ry1vcp','Member','create',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('5k2jmyqlq5t3tn2v','11qjs3myx3ry1vcp','Member','edit',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('nfk5kh0zy9d4qr1l','11qjs3myx3ry1vcp','Member','update',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('lj2jd2ijvr9xzdp6','11qjs3myx3ry1vcp','Member','remove',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('k5nf1hrdy6lpt3vw','11qjs3myx3ry1vcp','Member','import',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('bx5vdn145y7amt3a','11qjs3myx3ry1vcp','Member','export',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('i18ttf5ok961x12o','11qjs3myx3ry1vcp','FlightInfo','menu',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('lpry4h3xourp0rpt','11qjs3myx3ry1vcp','FlightInfo','list',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('l5m7irccpw8dln5q','11qjs3myx3ry1vcp','FlightInfo','create',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('alrxolaix9iabdhm','11qjs3myx3ry1vcp','FlightInfo','edit',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('91eiu39z6x4173x2','11qjs3myx3ry1vcp','FlightInfo','update',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('n15st9r7tu4s35e3','11qjs3myx3ry1vcp','FlightInfo','remove',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('nidce7tr5s5y2s0l','11qjs3myx3ry1vcp','FlightInfo','import',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('gi1dpk4oq5a0h36z','11qjs3myx3ry1vcp','FlightInfo','export',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('ngoyj34uw7s8x169','11qjs3myx3ry1vcp','FlightBooking','menu',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('x921yvzn6astlnwp','11qjs3myx3ry1vcp','FlightBooking','list',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('5dlbm4cztknhjti2','11qjs3myx3ry1vcp','FlightBooking','create',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('1viu4pkmei5a2uod','11qjs3myx3ry1vcp','FlightBooking','edit',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('q9guegjhsk453h9x','11qjs3myx3ry1vcp','FlightBooking','update',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('kz66yvxhq02kmfho','11qjs3myx3ry1vcp','FlightBooking','remove',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('ei7rq2jqqt5ugnx9','11qjs3myx3ry1vcp','FlightBooking','import',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('tkj3z9wy9aj3azul','11qjs3myx3ry1vcp','FlightBooking','export',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('n1a9rdpdr5wh66o1','11qjs3myx3ry1vcp','Airport','menu',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('ohegax3rvx3kiy4s','11qjs3myx3ry1vcp','Airport','list',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('uy9jhwus10kdg8n4','11qjs3myx3ry1vcp','Airport','create',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('knyclz24wsvty3ub','11qjs3myx3ry1vcp','Airport','edit',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('171fue9ugwb6jhm0','11qjs3myx3ry1vcp','Airport','update',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('glfjgfp9zl9kfu3z','11qjs3myx3ry1vcp','Airport','remove',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('xm8ur1n1e26ozggf','11qjs3myx3ry1vcp','Airport','import',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('uev2jxrtxhqd2p24','11qjs3myx3ry1vcp','Airport','export',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('6f251dnlshqewzdi','11qjs3myx3ry1vcp','FlightBookingSeat','menu',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('j6uprolyuly1fazc','11qjs3myx3ry1vcp','FlightBookingSeat','list',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('70egcj8cdrighrjb','11qjs3myx3ry1vcp','FlightBookingSeat','create',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('w94d7vu7la2uuyve','11qjs3myx3ry1vcp','FlightBookingSeat','edit',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('is007pj053x68w19','11qjs3myx3ry1vcp','FlightBookingSeat','update',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('bxkprwc76v8m2m8g','11qjs3myx3ry1vcp','FlightBookingSeat','remove',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('zodmwu5clfd7foy9','11qjs3myx3ry1vcp','FlightBookingSeat','import',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('krmkl270a4jtpz0m','11qjs3myx3ry1vcp','FlightBookingSeat','export',SYSDATE(),0);

INSERT INTO `role` (`id`,`code`,`name`,`created_at`,`deleted`) VALUES ('kr0gnbadaa7zyf12','Member','Member',SYSDATE(),0);
INSERT INTO `user` (`id`,`role_id`,`username`,`email`,`sign_in_password`,`created_at`,`active`,`deleted`) VALUES ('zu5rxycovz7060i7','kr0gnbadaa7zyf12','Member','Member@yourdomain.com',MD5('password'),SYSDATE(),1,0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('sureflgo3e0mf0u9','kr0gnbadaa7zyf12','Member','menu',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('pbnl19u2tt3dsa7q','kr0gnbadaa7zyf12','Member','list',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('3yssn5kl7onbq0us','kr0gnbadaa7zyf12','Member','create',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('urmdsfj71eewkr19','kr0gnbadaa7zyf12','Member','edit',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('unwazpznm2fuxymp','kr0gnbadaa7zyf12','Member','update',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('n3wlb5yatnxwpzm6','kr0gnbadaa7zyf12','Member','remove',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('sfa47pzcfa1qzbsk','kr0gnbadaa7zyf12','Member','import',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('m7rwk188qn04lbzg','kr0gnbadaa7zyf12','Member','export',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('twjw4sahsb77vmmr','kr0gnbadaa7zyf12','FlightInfo','menu',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('gvztpdi027ljf823','kr0gnbadaa7zyf12','FlightInfo','list',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('ncsb3t6wh37u31vo','kr0gnbadaa7zyf12','FlightInfo','create',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('7wj1ab20ep265q5g','kr0gnbadaa7zyf12','FlightInfo','edit',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('7jmcf02vbujiteg2','kr0gnbadaa7zyf12','FlightInfo','update',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('wd7zdovoj1iuth1n','kr0gnbadaa7zyf12','FlightInfo','remove',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('uerxtr9y26t7jwvv','kr0gnbadaa7zyf12','FlightInfo','import',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('tsqjdqxjif3bbq6x','kr0gnbadaa7zyf12','FlightInfo','export',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('av3nktm7r17s93e5','kr0gnbadaa7zyf12','FlightBooking','menu',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('z9bvxx4u8ei3y74l','kr0gnbadaa7zyf12','FlightBooking','list',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('6fejrkyokffssawg','kr0gnbadaa7zyf12','FlightBooking','create',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('mfbcwexyrlntjlcs','kr0gnbadaa7zyf12','FlightBooking','edit',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('cy5462pw66f6a9wi','kr0gnbadaa7zyf12','FlightBooking','update',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('n99fbswnd02o1vly','kr0gnbadaa7zyf12','FlightBooking','remove',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('385nmwb67iau86hc','kr0gnbadaa7zyf12','FlightBooking','import',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('r2v6ph3kkgbq38k3','kr0gnbadaa7zyf12','FlightBooking','export',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('pnynuccrz7myussz','kr0gnbadaa7zyf12','Airport','menu',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('326rvuebemz3dzds','kr0gnbadaa7zyf12','Airport','list',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('jhialf9lmyleglhi','kr0gnbadaa7zyf12','Airport','create',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('3ctlgwkjethbvzsb','kr0gnbadaa7zyf12','Airport','edit',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('14e7tdbjyhpg4it4','kr0gnbadaa7zyf12','Airport','update',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('fa30bf8e66v2sro6','kr0gnbadaa7zyf12','Airport','remove',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('l7izya0kq33afxd0','kr0gnbadaa7zyf12','Airport','import',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('nsg0fy3ebq1cqh3d','kr0gnbadaa7zyf12','Airport','export',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('u8mbu80dkk6dy5dk','kr0gnbadaa7zyf12','FlightBookingSeat','menu',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('r0th10mir0ajyvyv','kr0gnbadaa7zyf12','FlightBookingSeat','list',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('yw4tnyuth3d91utj','kr0gnbadaa7zyf12','FlightBookingSeat','create',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('g0rz0rk8vi47i0bh','kr0gnbadaa7zyf12','FlightBookingSeat','edit',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('l3qpkmkyabvdix6d','kr0gnbadaa7zyf12','FlightBookingSeat','update',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('zy1eqywwaiso3vdt','kr0gnbadaa7zyf12','FlightBookingSeat','remove',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('lympn53scd77o9bk','kr0gnbadaa7zyf12','FlightBookingSeat','import',SYSDATE(),0);
INSERT INTO `role_permission` (`id`,`role_id`,`model`,`action`,`created_at`,`deleted`) VALUES ('mjoyb8s3k7ngacv7','kr0gnbadaa7zyf12','FlightBookingSeat','export',SYSDATE(),0);






INSERT INTO `job`(`id`,`job_group`,`job_name`,`trigger_group`,`trigger_name`,`cron_expression`,`classify`,`hostnames`,`comment`,`pause_job`,`paused_at`,`created_user_id`,`updated_user_id`,`deleted_user_id`,`created_at`,`updated_at`,`deleted_at`,`deleted`) VALUES('t3762qm4psbt5r4y','SYSTEM_SCHEDULE','Reschedule','SYSTEM_TRIGGER','RescheduleTrigger','0/10 * * * * ?','app.job.Reschedule','%','System Default Setting(Cat not change)',0,null,null,null,null,SYSDATE(),null,null,0);
INSERT INTO `job`(`id`,`job_group`,`job_name`,`trigger_group`,`trigger_name`,`cron_expression`,`classify`,`hostnames`,`comment`,`pause_job`,`paused_at`,`created_user_id`,`updated_user_id`,`deleted_user_id`,`created_at`,`updated_at`,`deleted_at`,`deleted`) VALUES('oiinn1zzwdmf2mv8','APP_SCHEDULE','EmailSenderJob','APP_TRIGGER','EmailSenderJobTrigger','0/10 * * * * ?','app.job.EmailSenderJob','%','System Default Setting(Cat not delete)',0,null,null,null,null,SYSDATE(),null,null,0);
