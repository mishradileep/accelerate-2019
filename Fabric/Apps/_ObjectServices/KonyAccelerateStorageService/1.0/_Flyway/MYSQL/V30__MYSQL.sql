ALTER TABLE `user_notification`
	ADD CONSTRAINT `21ab9cb7ec4f57c39eb1821b8212a3` FOREIGN KEY(`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE;
