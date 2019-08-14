ALTER TABLE `event_sessions`
	ADD CONSTRAINT `14487aabc07aca266beede2459cbf7` FOREIGN KEY(`session_track_id`) REFERENCES `session_track_master`(`trackId`) ON DELETE CASCADE;
