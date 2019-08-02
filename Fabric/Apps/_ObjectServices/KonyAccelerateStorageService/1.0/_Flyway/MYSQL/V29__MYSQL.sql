CREATE TABLE `user_notification`(
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`ks_id` VARCHAR(40),
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`notification_id` BIGINT NOT NULL AUTO_INCREMENT,
	`SoftDeleteFlag` BOOLEAN,
	`user_id` BIGINT,
	PRIMARY KEY(`notification_id`)
);
ALTER TABLE `user_notification`
	ADD CONSTRAINT `ccbdbefeb5b9fd55ac7f1687e37a64` UNIQUE KEY(`notification_id`);
