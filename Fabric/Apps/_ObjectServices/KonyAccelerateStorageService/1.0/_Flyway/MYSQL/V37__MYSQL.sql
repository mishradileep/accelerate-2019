ALTER TABLE `users`
	ADD `linkedin_user_id` VARCHAR(25) NOT NULL,
	ADD CONSTRAINT `976e1a95872d014fa06e02efde4a35` UNIQUE KEY(`linkedin_user_id`);
