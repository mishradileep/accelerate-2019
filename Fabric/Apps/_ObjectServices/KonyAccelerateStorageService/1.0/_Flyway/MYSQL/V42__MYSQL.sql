ALTER TABLE `speakers_master`
	DROP INDEX `b16b839aef19e7db9a117bc19e9af5`,
	MODIFY `speaker_id` BIGINT NOT NULL,
	ADD CONSTRAINT `b16b839aef19e7db9a117bc19e9af5` UNIQUE KEY(`speaker_id`),
	DROP PRIMARY KEY,
	ADD PRIMARY KEY(`speaker_id`);
