CREATE TABLE `sponsor_category_master`(
	`categoryName` VARCHAR(50),
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`SoftDeleteFlag` BOOLEAN,
	`sponsorCategoryId` BIGINT NOT NULL,
	PRIMARY KEY(`sponsorCategoryId`)
);
ALTER TABLE `sponsor_category_master`
	ADD CONSTRAINT `a84216012b49664dd21ad1142497ea` UNIQUE KEY(`sponsorCategoryId`);
