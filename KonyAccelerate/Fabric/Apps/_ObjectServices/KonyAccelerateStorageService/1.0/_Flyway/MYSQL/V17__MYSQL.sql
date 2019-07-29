ALTER TABLE `location`
	ADD CONSTRAINT `f42cd5c221cc629c4eef0ff401fd7d` FOREIGN KEY(`session_id`) REFERENCES `event_sessions`(`event_session_id`) ON DELETE CASCADE;
