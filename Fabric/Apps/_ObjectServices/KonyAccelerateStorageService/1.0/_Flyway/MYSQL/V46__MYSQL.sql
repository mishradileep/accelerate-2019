ALTER TABLE `presenter`
	ADD CONSTRAINT `2a9d4aea53009432257fec0964fc6a` FOREIGN KEY(`master_speaker_id`) REFERENCES `speakers_master`(`speaker_id`);
