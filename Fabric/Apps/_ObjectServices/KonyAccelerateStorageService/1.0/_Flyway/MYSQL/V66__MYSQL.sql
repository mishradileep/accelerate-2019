ALTER TABLE `speakers_master`
	MODIFY `speaker_bio` VARCHAR(512),
	MODIFY `speaker_profile_pic` VARCHAR(512),
	ADD `speaker_title` VARCHAR(256);
