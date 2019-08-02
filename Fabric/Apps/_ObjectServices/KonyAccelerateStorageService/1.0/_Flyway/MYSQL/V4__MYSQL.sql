ALTER TABLE `user_event_session`
	ADD CONSTRAINT `9c8f5fa4da892cefd2f6f79573ea58` FOREIGN KEY(`event_id`) REFERENCES `event`(`event_id`);
