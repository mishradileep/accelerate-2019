ALTER TABLE `user_event_session`
	ADD CONSTRAINT `f12364bc459051ae6e578e94e141be` FOREIGN KEY(`session_id`) REFERENCES `event_sessions`(`event_session_id`) ON DELETE CASCADE;
