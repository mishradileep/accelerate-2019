ALTER TABLE `wifi_info`
	ADD CONSTRAINT `185d96879afe6fddf1f94642415c61` FOREIGN KEY(`event_id`) REFERENCES `event`(`event_id`) ON DELETE CASCADE;
