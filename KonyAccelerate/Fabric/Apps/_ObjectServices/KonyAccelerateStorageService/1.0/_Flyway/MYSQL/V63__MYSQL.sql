ALTER TABLE `event_inner_location`
	ADD CONSTRAINT `9064f9b06dc3468c6f26ff523bf93b` FOREIGN KEY(`session_id`) REFERENCES `event_sessions`(`event_session_id`) ON DELETE CASCADE;
