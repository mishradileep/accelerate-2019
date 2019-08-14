CREATE TABLE `event_banners`(
	`banner_url` VARCHAR(256),
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`event_banner_id` BIGINT NOT NULL AUTO_INCREMENT,
	`event_id` BIGINT NOT NULL,
	`img_name` VARCHAR(200),
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`SoftDeleteFlag` BOOLEAN,
	PRIMARY KEY(`event_banner_id`)
);
CREATE TABLE `event_registration`(
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`event_id` BIGINT NOT NULL,
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`registration_id` BIGINT NOT NULL AUTO_INCREMENT,
	`SoftDeleteFlag` BOOLEAN,
	`user_id` BIGINT NOT NULL,
	PRIMARY KEY(`registration_id`)
);
CREATE TABLE `opinions`(
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`event_id` BIGINT,
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`opinion_id` BIGINT NOT NULL AUTO_INCREMENT,
	`opinion_status` BOOLEAN,
	`opinion_type` BIGINT,
	`session_id` BIGINT,
	`SoftDeleteFlag` BOOLEAN,
	`title` VARCHAR(100),
	PRIMARY KEY(`opinion_id`)
);
ALTER TABLE `opinions`
	ADD CONSTRAINT `916a584d3f2d53fd19f679f105ca59` UNIQUE KEY(`opinion_id`);
CREATE TABLE `opinion_answers`(
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`opinion_answer_id` BIGINT NOT NULL AUTO_INCREMENT,
	`opinion_option_id` BIGINT,
	`opinion_question_id` BIGINT,
	`SoftDeleteFlag` BOOLEAN,
	`user_id` BIGINT,
	PRIMARY KEY(`opinion_answer_id`)
);
ALTER TABLE `opinion_answers`
	ADD CONSTRAINT `e1ae829c727359a137c7b1bbf16d34` UNIQUE KEY(`opinion_answer_id`);
CREATE TABLE `event_sessions`(
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`event_id` BIGINT NOT NULL,
	`event_session_id` BIGINT NOT NULL AUTO_INCREMENT,
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`session_code` VARCHAR(10),
	`session_desc` VARCHAR(256),
	`session_end_date` DATETIME(3),
	`session_long_desc` VARCHAR(512),
	`session_name` VARCHAR(256),
	`session_start_date` DATETIME(3),
	`SoftDeleteFlag` BOOLEAN,
	PRIMARY KEY(`event_session_id`)
);
CREATE TABLE `presenter`(
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`designation` VARCHAR(256),
	`event_id` BIGINT,
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`linkedin_link` VARCHAR(256),
	`name` VARCHAR(256),
	`presenter_id` BIGINT NOT NULL AUTO_INCREMENT,
	`profile_url` VARCHAR(256),
	`session_id` BIGINT,
	`SoftDeleteFlag` BOOLEAN,
	PRIMARY KEY(`presenter_id`)
);
CREATE TABLE `opinion_questions`(
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`opinion_id` BIGINT,
	`opinion_question_id` BIGINT NOT NULL AUTO_INCREMENT,
	`question` VARCHAR(512),
	`question_type` BIGINT,
	`SoftDeleteFlag` BOOLEAN,
	PRIMARY KEY(`opinion_question_id`)
);
ALTER TABLE `opinion_questions`
	ADD CONSTRAINT `6b234beaa3257cc7c93bd882752d55` UNIQUE KEY(`opinion_question_id`);
CREATE TABLE `opinion_options`(
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`opinion_option_id` BIGINT NOT NULL AUTO_INCREMENT,
	`opinion_question_id` BIGINT,
	`option_name` VARCHAR(512),
	`SoftDeleteFlag` BOOLEAN,
	PRIMARY KEY(`opinion_option_id`)
);
ALTER TABLE `opinion_options`
	ADD CONSTRAINT `110504f79e78193575cca2f10ce0e2` UNIQUE KEY(`opinion_option_id`);
CREATE TABLE `event_type`(
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`event_type` VARCHAR(128),
	`evet_type_id` BIGINT NOT NULL AUTO_INCREMENT,
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`SoftDeleteFlag` BOOLEAN,
	PRIMARY KEY(`evet_type_id`)
);
CREATE TABLE `location`(
	`addressLine1` VARCHAR(200),
	`cityname` VARCHAR(200),
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`event_id` BIGINT NOT NULL,
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`latitude` VARCHAR(45),
	`location` VARCHAR(2000),
	`location_id` BIGINT NOT NULL AUTO_INCREMENT,
	`longitude` VARCHAR(45),
	`SoftDeleteFlag` BOOLEAN,
	PRIMARY KEY(`location_id`)
);
CREATE TABLE `event_category`(
	`category_name` VARCHAR(256),
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`evet_cat_id` BIGINT NOT NULL,
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`SoftDeleteFlag` BOOLEAN,
	PRIMARY KEY(`evet_cat_id`)
);
CREATE TABLE `event_images`(
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`event_id` BIGINT NOT NULL,
	`event_image_id` BIGINT NOT NULL AUTO_INCREMENT,
	`image_url` VARCHAR(256),
	`img_name` VARCHAR(200),
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`SoftDeleteFlag` BOOLEAN,
	PRIMARY KEY(`event_image_id`)
);
CREATE TABLE `forum`(
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`description` VARCHAR(200),
	`event_id` BIGINT,
	`forum_id` BIGINT NOT NULL AUTO_INCREMENT,
	`forum_status` BOOLEAN,
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`question` VARCHAR(200),
	`session_id` BIGINT,
	`SoftDeleteFlag` BOOLEAN,
	`user_id` BIGINT,
	PRIMARY KEY(`forum_id`)
);
ALTER TABLE `forum`
	ADD CONSTRAINT `26ea4036e97070322071d003760237` UNIQUE KEY(`forum_id`);
CREATE TABLE `event_metrics`(
	`action` VARCHAR(32),
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`event_id` BIGINT NOT NULL,
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`metric_id` BIGINT NOT NULL AUTO_INCREMENT,
	`SoftDeleteFlag` BOOLEAN,
	PRIMARY KEY(`metric_id`)
);
CREATE TABLE `event`(
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`end_date` DATETIME(3),
	`event_category` BIGINT NOT NULL,
	`event_id` BIGINT NOT NULL AUTO_INCREMENT,
	`event_type` BIGINT NOT NULL,
	`isdisabled` BIGINT,
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`long_desc` VARCHAR(2000),
	`name` VARCHAR(256),
	`short_desc` VARCHAR(256),
	`SoftDeleteFlag` BOOLEAN,
	`start_date` DATETIME(3),
	PRIMARY KEY(`event_id`)
);
CREATE TABLE `forum_discussion`(
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`description` VARCHAR(256),
	`forum_dis_id` BIGINT NOT NULL AUTO_INCREMENT,
	`forum_id` BIGINT,
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`SoftDeleteFlag` BOOLEAN,
	`user_id` BIGINT,
	PRIMARY KEY(`forum_dis_id`)
);
ALTER TABLE `forum_discussion`
	ADD CONSTRAINT `91ef748401505dd630522a485dae97` UNIQUE KEY(`forum_dis_id`);
CREATE TABLE `opinion_type_master`(
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`opinion_type_id` BIGINT NOT NULL AUTO_INCREMENT,
	`opinion_type_name` VARCHAR(10),
	`SoftDeleteFlag` BOOLEAN,
	PRIMARY KEY(`opinion_type_id`)
);
ALTER TABLE `opinion_type_master`
	ADD CONSTRAINT `d9f58a58811be04862a53e4645a9b9` UNIQUE KEY(`opinion_type_id`);
CREATE TABLE `question_type_master`(
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`question_type_id` BIGINT NOT NULL AUTO_INCREMENT,
	`question_type_name` VARCHAR(20),
	`SoftDeleteFlag` BOOLEAN,
	PRIMARY KEY(`question_type_id`)
);
ALTER TABLE `question_type_master`
	ADD CONSTRAINT `5e5c91909ecafa11b0291ee2d8cd7c` UNIQUE KEY(`question_type_id`);
CREATE TABLE `users`(
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`first_name` VARCHAR(256),
	`last_name` VARCHAR(256),
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`login_mode` BIGINT,
	`mail` VARCHAR(128),
	`profile` VARCHAR(256),
	`SoftDeleteFlag` BOOLEAN,
	`user_id` BIGINT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY(`user_id`)
);
ALTER TABLE `users`
	ADD CONSTRAINT `511bd1bb90191c21a7284389769950` UNIQUE KEY(`user_id`);
CREATE TABLE `login_mode`(
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`login_mode_id` BIGINT NOT NULL AUTO_INCREMENT,
	`loginmode` VARCHAR(128),
	`SoftDeleteFlag` BOOLEAN,
	PRIMARY KEY(`login_mode_id`)
);
CREATE TABLE `participation`(
	`check_in_time` DATETIME(3),
	`check_out_time` DATETIME(3),
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`event_id` BIGINT,
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`participation_id` BIGINT NOT NULL AUTO_INCREMENT,
	`session_id` BIGINT,
	`SoftDeleteFlag` BOOLEAN,
	`status` BOOLEAN,
	`user_id` VARCHAR(10),
	PRIMARY KEY(`participation_id`)
);
ALTER TABLE `participation`
	ADD CONSTRAINT `fbb172d569bf607436446f2224462b` UNIQUE KEY(`participation_id`);
ALTER TABLE `opinion_questions`
	ADD CONSTRAINT `eddb481c0574fc95e9ab9e82ef6013` FOREIGN KEY(`opinion_id`) REFERENCES `opinions`(`opinion_id`) ON DELETE CASCADE;
ALTER TABLE `forum`
	ADD CONSTRAINT `012b9f3d108cf46e950ba776fd3025` FOREIGN KEY(`session_id`) REFERENCES `event_sessions`(`event_session_id`) ON DELETE CASCADE;
ALTER TABLE `opinions`
	ADD CONSTRAINT `21f4930a15a74e5baa07965eb8bc9b` FOREIGN KEY(`session_id`) REFERENCES `event_sessions`(`event_session_id`) ON DELETE CASCADE;
ALTER TABLE `participation`
	ADD CONSTRAINT `c9a23bdd66604ac03fdc979382b171` FOREIGN KEY(`session_id`) REFERENCES `event_sessions`(`event_session_id`) ON DELETE CASCADE;
ALTER TABLE `presenter`
	ADD CONSTRAINT `3dc388eba285b533bd8db1a006facb` FOREIGN KEY(`session_id`) REFERENCES `event_sessions`(`event_session_id`) ON DELETE CASCADE;
ALTER TABLE `opinion_answers`
	ADD CONSTRAINT `539ba43a58db6de5895da8a1dbf56c` FOREIGN KEY(`opinion_question_id`) REFERENCES `opinion_questions`(`opinion_question_id`) ON DELETE CASCADE;
ALTER TABLE `opinion_options`
	ADD CONSTRAINT `72181298d8f08c63006d39c7e75d9b` FOREIGN KEY(`opinion_question_id`) REFERENCES `opinion_questions`(`opinion_question_id`) ON DELETE CASCADE;
ALTER TABLE `opinion_answers`
	ADD CONSTRAINT `9df3473cde687c7725c860149e5f53` FOREIGN KEY(`opinion_option_id`) REFERENCES `opinion_options`(`opinion_option_id`) ON DELETE CASCADE;
ALTER TABLE `forum_discussion`
	ADD CONSTRAINT `065b20399eb5cc4f5923bed59adf01` FOREIGN KEY(`forum_id`) REFERENCES `forum`(`forum_id`) ON DELETE CASCADE;
ALTER TABLE `event_banners`
	ADD CONSTRAINT `c66ac6f3aa7f3b5acfdfa4ea41357f` FOREIGN KEY(`event_id`) REFERENCES `event`(`event_id`) ON DELETE CASCADE;
ALTER TABLE `event_images`
	ADD CONSTRAINT `81220cfe7fbbf6ea505c4c99c3f233` FOREIGN KEY(`event_id`) REFERENCES `event`(`event_id`) ON DELETE CASCADE;
ALTER TABLE `event_metrics`
	ADD CONSTRAINT `937d88d0b32286cadf6f945b739d57` FOREIGN KEY(`event_id`) REFERENCES `event`(`event_id`) ON DELETE CASCADE;
ALTER TABLE `event_registration`
	ADD CONSTRAINT `9fd2e011babd893118fac29c0c69b3` FOREIGN KEY(`event_id`) REFERENCES `event`(`event_id`) ON DELETE CASCADE;
ALTER TABLE `event_sessions`
	ADD CONSTRAINT `e7132dea8ebd37d4d8a74cdffdda6e` FOREIGN KEY(`event_id`) REFERENCES `event`(`event_id`);
ALTER TABLE `forum`
	ADD CONSTRAINT `992f5f7e4506ceb93e94515861c10b` FOREIGN KEY(`event_id`) REFERENCES `event`(`event_id`) ON DELETE CASCADE;
ALTER TABLE `location`
	ADD CONSTRAINT `78d3f7af61bb7f3245fd36cbf0d0a1` FOREIGN KEY(`event_id`) REFERENCES `event`(`event_id`) ON DELETE CASCADE;
ALTER TABLE `opinions`
	ADD CONSTRAINT `144d1be6f50dfa257efe81cd4edb55` FOREIGN KEY(`event_id`) REFERENCES `event`(`event_id`) ON DELETE CASCADE;
ALTER TABLE `participation`
	ADD CONSTRAINT `eeedba0fdd8076e56c0a864756f442` FOREIGN KEY(`event_id`) REFERENCES `event`(`event_id`) ON DELETE CASCADE;
ALTER TABLE `presenter`
	ADD CONSTRAINT `32477833d3987eec79db2c5b251b67` FOREIGN KEY(`event_id`) REFERENCES `event`(`event_id`) ON DELETE CASCADE;
ALTER TABLE `opinions`
	ADD CONSTRAINT `3cc01c885200478e539e7cfd6dfebb` FOREIGN KEY(`opinion_type`) REFERENCES `opinion_type_master`(`opinion_type_id`) ON DELETE CASCADE;
ALTER TABLE `opinion_questions`
	ADD CONSTRAINT `8b96e0e775fcac3a021e710d637fee` FOREIGN KEY(`question_type`) REFERENCES `question_type_master`(`question_type_id`) ON DELETE CASCADE;
ALTER TABLE `forum`
	ADD CONSTRAINT `7cbccad924eab3b0bedbf74156cce9` FOREIGN KEY(`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE;
ALTER TABLE `forum_discussion`
	ADD CONSTRAINT `55724d37ca7a08ba77dd6d06f51da3` FOREIGN KEY(`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE;
ALTER TABLE `opinion_answers`
	ADD CONSTRAINT `a008b84a367a7861ee598e2f989e4c` FOREIGN KEY(`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE;
