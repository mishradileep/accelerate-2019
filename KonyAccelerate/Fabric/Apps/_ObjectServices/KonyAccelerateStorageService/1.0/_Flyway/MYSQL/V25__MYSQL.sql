ALTER TABLE `event_inner_location`
	DROP FOREIGN KEY `3458debc9af439a827f9cc28753b62`;
ALTER TABLE `event_inner_location`
	ADD CONSTRAINT `3458debc9af439a827f9cc28753b62` FOREIGN KEY(`event_id`) REFERENCES `event`(`event_id`) ON DELETE CASCADE;
