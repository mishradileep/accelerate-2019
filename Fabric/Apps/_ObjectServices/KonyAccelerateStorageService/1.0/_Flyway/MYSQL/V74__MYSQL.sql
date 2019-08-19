ALTER TABLE `quantum_quest`
	CHANGE `deeplink_url` `deeplink_url_android` VARCHAR(512),
	ADD `deeplink_url_ios` VARCHAR(10);
