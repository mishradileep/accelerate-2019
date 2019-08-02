ALTER TABLE `sponsors`
	ADD CONSTRAINT `066b04f71045156eb9d5167ec0b7f3` FOREIGN KEY(`sponsorCategoryId`) REFERENCES `sponsor_category_master`(`sponsorCategoryId`) ON DELETE CASCADE;
