ALTER TABLE `event_sessions`
	ADD CONSTRAINT `e7132dea8ebd37d4d8a74cdffdda6e` FOREIGN KEY(`event_id`) REFERENCES `event`(`event_id`) ON DELETE CASCADE;
