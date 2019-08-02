ALTER TABLE `session_material`
	ADD CONSTRAINT `35e7fb4765dc7e7e444b316a700128` FOREIGN KEY(`session_id`) REFERENCES `event_sessions`(`event_session_id`) ON DELETE CASCADE;
