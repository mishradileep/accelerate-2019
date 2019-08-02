CREATE TABLE `session_track_master`(
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`SoftDeleteFlag` BOOLEAN,
	`trackId` BIGINT NOT NULL,
	`trackName` VARCHAR(20),
	PRIMARY KEY(`trackId`)
);
ALTER TABLE `session_track_master`
	ADD CONSTRAINT `05c04ec2dec1a38bd0617dcd5bda87` UNIQUE KEY(`trackId`);
