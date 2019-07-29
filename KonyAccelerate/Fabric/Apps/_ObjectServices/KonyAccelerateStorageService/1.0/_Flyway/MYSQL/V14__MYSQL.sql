ALTER TABLE `opinion_answers`
	ADD CONSTRAINT `fe3c44f240b358670ebf9de247776e` FOREIGN KEY(`opinion_id`) REFERENCES `opinions`(`opinion_id`) ON DELETE CASCADE;
