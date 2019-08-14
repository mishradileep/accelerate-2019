CREATE TABLE `user_event_session`(
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`event_id` BIGINT,
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`session_id` BIGINT,
	`SoftDeleteFlag` BOOLEAN,
	`user_event_session_id` BIGINT NOT NULL AUTO_INCREMENT,
	`user_id` BIGINT,
	PRIMARY KEY(`user_event_session_id`)
);
ALTER TABLE `user_event_session`
	ADD CONSTRAINT `ca30b3bdf37e36e54a5427f44c2e64` UNIQUE KEY(`user_event_session_id`);
