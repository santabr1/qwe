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
-- Table structure for table `developers`
--

DROP TABLE IF EXISTS `developers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `developers` (
  `developer_id` int NOT NULL AUTO_INCREMENT,
  `developer_name` varchar(50) NOT NULL,
  `developer_surname` varchar(50) NOT NULL,
  `developer_patronymic` varchar(50) DEFAULT NULL,
  `developer_email` varchar(50) NOT NULL,
  `developer_password` varchar(150) NOT NULL,
  `developer_is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `developer_position` int DEFAULT '1',
  `developer_specialty` int DEFAULT '1',
  `developer_birth` date NOT NULL,
  `developer_avatar_url` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`developer_id`),
  UNIQUE KEY `developer_email` (`developer_email`),
  KEY `developer_position` (`developer_position`),
  KEY `developer_specialty` (`developer_specialty`),
  CONSTRAINT `developers_ibfk_1` FOREIGN KEY (`developer_position`) REFERENCES `developers_position` (`position_id`),
  CONSTRAINT `developers_ibfk_2` FOREIGN KEY (`developer_specialty`) REFERENCES `developers_specialty` (`specialty_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `developers`
--

LOCK TABLES `developers` WRITE;
/*!40000 ALTER TABLE `developers` DISABLE KEYS */;
INSERT INTO `developers` VALUES (1,'Даша','Колигова','Ивановна','dkol@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,2,3,'1997-05-23',NULL),(2,'Иван','Костюшин','Константинович','ivkos@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,1,1,'1998-11-25',NULL),(3,'Николай','Костюшин','Климович','nikkos@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,1,1,'1995-05-11',NULL),(4,'Зинаида','Громова','Александровна','zingrom@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,1,1,'1996-01-21',NULL),(5,'Анастасия','Кличко','Ивановна','anaskl@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,1,1,'1993-08-08',NULL),(6,'Климентий','Сахаров','Дмитриевич','klsah@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,1,1,'1998-01-02',NULL),(7,'Александр','Смирнов','Константинович','newline@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',1,1,1,'2000-03-30',NULL),(8,'Анатолий','Жданов',NULL,'anzh@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,1,3,'1994-05-24',NULL),(9,'Вадим','Гусев','Андреевич','gusvad@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,4,1,'1993-08-01',NULL),(10,'Виктория','Турова','Ивановна','vikiv@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,2,2,'1996-01-05',NULL),(11,'Яна','Сушкова','Валерьевна','yanval@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,1,1,'2000-03-06',NULL),(12,'Татьяна','Казакова',NULL,'tankaz@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,4,1,'1985-10-20',NULL),(13,'Руслан','Никифоров','Андреевич','rusandr@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,2,1,'1999-07-15',NULL),(14,'Павел','Яковлев',NULL,'pavyak@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,1,1,'1987-09-28',NULL),(15,'Николай','Суханов','Александрович','niksuch@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,3,2,'1985-01-01',NULL),(16,'Нелли','Жданова','Евгеньевна','nelevg@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,2,3,'1980-05-23',NULL),(17,'Лев','Кузнецов','Алексеевич','levkuz@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,3,3,'1989-04-27',NULL),(18,'Максим','Исаев','Алексеевич','maxis@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,4,1,'1991-03-30',NULL),(19,'Константин','Жуков','Романович','konszhuk@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,1,4,'1995-08-01',NULL),(20,'Виктор','Ершов','Вадимович','vikersh@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,2,4,'1995-12-05',NULL),(21,'Артем','Евсеев','Николаевич','artevs@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,4,1,'1990-01-12',NULL),(22,'Даниил','Авдеев','Генадьевич','danav@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,1,1,'2001-11-03',NULL),(23,'Евгений','Беляев',NULL,'evgbel@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,3,3,'1999-05-13',NULL),(24,'Евгения','Лапина','Дмитриевна','evlap@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,4,1,'1989-01-27',NULL),(25,'Диана','Панова','Дмитриевна','diapan@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,4,4,'1994-09-03',NULL),(26,'Егор','Савин',NULL,'egsav@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,1,4,'1998-10-10',NULL),(27,'Захар','Силин','Михайлович','zahsil@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,4,1,'1999-06-19',NULL),(28,'Кира','Романова','Ивановна','kirrom@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,3,3,'2000-08-19',NULL),(29,'Валентин','Панфилов','Владимирович','valpan@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,4,4,'1978-05-19',NULL),(30,'Анастасия','Савина','Дмитриевна','ansav@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,1,3,'1998-09-07',NULL),(31,'Кирилл','Потапов','Данилович','kirpot@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,1,1,'2000-06-10',NULL),(32,'Елена','Некрасова','Николаевна','elnik@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,3,1,'1993-01-21',NULL),(33,'Александр','Сафонов',NULL,'alsaf@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,2,1,'1996-12-13',NULL),(34,'Анастасия','Кузнецова','Александровна','ankuz@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,3,1,'1998-12-03',NULL),(35,'Дмитрий','Марков',NULL,'dmmar@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,1,1,'1990-07-12',NULL),(36,'Виктория','Цветкова','Александровна','viktscv@gmail.com','$2a$10$BXj5r1Xt7v8Tu3CzEBwZ8uk94pYNTSKZh2xTS0oecF84LuPv6kJdK',0,3,3,'1990-05-01',NULL);
/*!40000 ALTER TABLE `developers` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insert_developers` BEFORE INSERT ON `developers` FOR EACH ROW BEGIN
		IF (NEW.developer_birth >= curdate() - interval 14 year) THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'MyTriggerError: Trying to insert invalid birth date';
		END IF;
    END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_developers` BEFORE UPDATE ON `developers` FOR EACH ROW BEGIN
		IF (NEW.developer_birth >= curdate() - interval 14 year) THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'MyTriggerError: Trying to update invalid birth date';
		END IF;
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

-- Dump completed on 2021-06-23  2:29:16
