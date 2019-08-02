CREATE TABLE `event_inner_location`(
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`event_id` BIGINT,
	`event_inner_location_id` BIGINT NOT NULL AUTO_INCREMENT,
	`inner_location` VARCHAR(512),
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`name` VARCHAR(256),
	`SoftDeleteFlag` BOOLEAN,
	PRIMARY KEY(`event_inner_location_id`)
);
ALTER TABLE `event_inner_location`
	ADD CONSTRAINT `91b4a7eb5f639f4a83449994feac7a` UNIQUE KEY(`event_inner_location_id`);
