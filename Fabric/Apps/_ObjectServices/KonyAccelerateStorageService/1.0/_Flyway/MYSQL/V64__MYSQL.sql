ALTER TABLE `event_sessions`
	DROP FOREIGN KEY `14487aabc07aca266beede2459cbf7`;
ALTER TABLE `session_track_master`
	DROP INDEX `05c04ec2dec1a38bd0617dcd5bda87`,
	MODIFY `trackId` BIGINT NOT NULL AUTO_INCREMENT,
	ADD CONSTRAINT `05c04ec2dec1a38bd0617dcd5bda87` UNIQUE KEY(`trackId`),
	MODIFY `trackName` VARCHAR(30),
	DROP PRIMARY KEY,
	ADD PRIMARY KEY(`trackId`);
ALTER TABLE `event_sessions`
	ADD CONSTRAINT `14487aabc07aca266beede2459cbf7` FOREIGN KEY(`session_track_id`) REFERENCES `session_track_master`(`trackId`) ON DELETE CASCADE;
