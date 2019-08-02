CREATE TABLE `speakers_master`(
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`SoftDeleteFlag` BOOLEAN,
	`speaker_bio` VARCHAR(100),
	`speaker_id` VARCHAR(10) NOT NULL,
	`speaker_name` VARCHAR(50) NOT NULL,
	`speaker_profile_pic` VARCHAR(256),
	PRIMARY KEY(`speaker_id`)
);
ALTER TABLE `speakers_master`
	ADD CONSTRAINT `b16b839aef19e7db9a117bc19e9af5` UNIQUE KEY(`speaker_id`);
