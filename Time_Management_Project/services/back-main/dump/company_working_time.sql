-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: company
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `working_time`
--

DROP TABLE IF EXISTS `working_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `working_time` (
  `working_time_id` int NOT NULL AUTO_INCREMENT,
  `start_time` timestamp NOT NULL,
  `working_time_comment` varchar(500) DEFAULT NULL,
  `working_time_status` int NOT NULL DEFAULT '0',
  `end_time` timestamp NULL DEFAULT NULL,
  `developer_id` int NOT NULL,
  `task_id` int NOT NULL,
  PRIMARY KEY (`working_time_id`),
  KEY `developer_id` (`developer_id`),
  KEY `task_id` (`task_id`),
  CONSTRAINT `working_time_ibfk_1` FOREIGN KEY (`developer_id`) REFERENCES `developers` (`developer_id`) ON DELETE CASCADE,
  CONSTRAINT `working_time_ibfk_2` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `working_time`
--

LOCK TABLES `working_time` WRITE;
/*!40000 ALTER TABLE `working_time` DISABLE KEYS */;
INSERT INTO `working_time` VALUES (1,'2020-10-20 09:00:01',NULL,0,'2020-10-20 13:20:01',1,1),(2,'2020-11-01 13:00:05',NULL,0,'2020-11-01 21:30:20',2,3),(3,'2020-11-15 07:00:35',NULL,0,'2020-11-15 10:30:00',2,3);
/*!40000 ALTER TABLE `working_time` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `ach_trigger` AFTER INSERT ON `working_time` FOR EACH ROW BEGIN
		declare insertingDiff integer;
        declare commonDiff integer;
        declare isExists10Ach integer;
        declare isExists1000Ach integer;
        declare isExists10000Ach integer;
        
        select	sum(timestampdiff(hour,  wt.start_time, wt.end_time)) into commonDiff
		  from 	working_time wt
		 where wt.developer_id = new.developer_id
		group by wt.developer_id
		;	
        
        select	count(*) into isExists10Ach
          from 	developer_achievements da
		 where	da.developer_id = new.developer_id and
				da.achievement_id = 1
		;
        select	count(*) into isExists1000Ach
          from 	developer_achievements da
		 where	da.developer_id = new.developer_id and
				da.achievement_id = 2
		;
        select	count(*) into isExists10000Ach
          from 	developer_achievements da
		 where	da.developer_id = new.developer_id and
				da.achievement_id = 3
		;
        
        if(commonDiff >= 10 and isExists10Ach = 0)
			then
				insert into developer_achievements (
					developer_id,
                    achievement_id
                ) values (new.developer_id, 1);							
		end if;
        
         if(commonDiff >= 1000 and isExists1000Ach = 0)
			then
				insert into developer_achievements (
					developer_id,
                    achievement_id
                ) values (new.developer_id, 2);							
		end if;
        
         if(commonDiff >= 10000 and isExists10000Ach = 0)
			then
				insert into developer_achievements (
					developer_id,
                    achievement_id
                ) values (new.developer_id, 3);							
		end if;
    END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-21  2:15:58
