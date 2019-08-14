ALTER TABLE `event_inner_location`
	ADD CONSTRAINT `2d54de03fdbe17fb7ed1d3b0791668` FOREIGN KEY(`event_inner_location_id`) REFERENCES `event`(`event_id`) ON DELETE CASCADE;
