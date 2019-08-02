CREATE TABLE `session_material`(
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`mimetype` VARCHAR(50),
	`name` VARCHAR(200),
	`session_id` VARCHAR(10),
	`session_material_id` BIGINT NOT NULL AUTO_INCREMENT,
	`SoftDeleteFlag` BOOLEAN,
	`url` VARCHAR(256),
	PRIMARY KEY(`session_material_id`)
);
ALTER TABLE `session_material`
	ADD CONSTRAINT `4386aa499e0a8c2e863ae4736ddcf3` UNIQUE KEY(`session_material_id`);
