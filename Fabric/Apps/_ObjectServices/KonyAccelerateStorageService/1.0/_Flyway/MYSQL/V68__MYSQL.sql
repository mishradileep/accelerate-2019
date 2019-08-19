CREATE TABLE `session_feedback`(
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`feedback_comments` VARCHAR(100),
	`feedback_id` BIGINT NOT NULL AUTO_INCREMENT,
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`rating` BOOLEAN,
	`SoftDeleteFlag` BOOLEAN,
	`speaker_id` BIGINT,
	PRIMARY KEY(`feedback_id`)
);
ALTER TABLE `session_feedback`
	ADD CONSTRAINT `0d9f29b371a8e71c8a02a6eac47f3e` UNIQUE KEY(`feedback_id`);
