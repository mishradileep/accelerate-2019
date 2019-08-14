ALTER TABLE `user_event_session`
	ADD CONSTRAINT `0be398e6c528c9dfc3389ed96a2473` FOREIGN KEY(`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE;
