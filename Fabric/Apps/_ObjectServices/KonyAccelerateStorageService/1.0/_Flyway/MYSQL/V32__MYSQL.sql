ALTER TABLE `event_sessions`
	ADD `location` VARCHAR(256),
	ADD `room_no` VARCHAR(100),
	MODIFY `session_desc` VARCHAR(1024),
	MODIFY `session_long_desc` VARCHAR(2000);
