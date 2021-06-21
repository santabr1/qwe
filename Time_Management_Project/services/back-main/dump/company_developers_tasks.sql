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
-- Table structure for table `developers_tasks`
--

DROP TABLE IF EXISTS `developers_tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `developers_tasks` (
  `developer_id` int NOT NULL,
  `task_id` int NOT NULL,
  PRIMARY KEY (`developer_id`,`task_id`),
  KEY `task_id` (`task_id`),
  CONSTRAINT `developers_tasks_ibfk_1` FOREIGN KEY (`developer_id`) REFERENCES `developers` (`developer_id`) ON DELETE CASCADE,
  CONSTRAINT `developers_tasks_ibfk_2` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `developers_tasks`
--

LOCK TABLES `developers_tasks` WRITE;
/*!40000 ALTER TABLE `developers_tasks` DISABLE KEYS */;
INSERT INTO `developers_tasks` VALUES (1,1),(2,1),(3,1),(4,1),(5,2),(6,2),(8,2),(9,2),(15,2),(10,3),(11,3),(12,3),(13,3),(14,3),(15,4),(16,4),(17,4),(18,4),(19,4),(20,5),(21,5),(22,5),(23,5),(24,5),(25,5),(26,5),(27,6),(28,6),(29,6),(30,6),(31,6),(32,6),(33,6),(1,7),(7,7),(13,7),(34,7),(35,7),(19,8),(21,8),(19,9),(20,9),(21,9),(30,9),(2,10),(3,10),(5,10),(17,10),(18,11),(25,11),(32,11),(6,12),(16,12),(24,12);
/*!40000 ALTER TABLE `developers_tasks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-21  2:15:57
