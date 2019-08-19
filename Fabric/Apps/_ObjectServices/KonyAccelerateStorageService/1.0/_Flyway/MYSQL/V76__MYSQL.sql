ALTER TABLE `quantum_quest`
	ADD `andrdoid_scheme` VARCHAR(512),
	ADD `android_host` VARCHAR(512),
	ADD `bundle_identifier` VARCHAR(512),
	ADD `ios_scheme` VARCHAR(512),
	CHANGE `is_disabled` `status` BOOLEAN;
