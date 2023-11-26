LOCK TABLES `test_db`.`employees` WRITE;
INSERT INTO `test_db`.`employees` VALUES 
(1,'Samantha Mackenzie','EMP97',80000),
(2,'Layla Benn','EMP91',92000),
(3,'Luis Alberto','EMP99',84000),
(4,'Rishaan','EMP70',85000);
UNLOCK TABLES;