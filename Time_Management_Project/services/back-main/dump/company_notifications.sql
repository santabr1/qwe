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
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `notif_id` int NOT NULL AUTO_INCREMENT,
  `notif_sender` varchar(150) NOT NULL,
  `notif_content` varchar(3100) NOT NULL,
  `notif_date` datetime NOT NULL,
  `task_id` int NOT NULL,
  PRIMARY KEY (`notif_id`),
  KEY `task_id` (`task_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,'System','Задача \"Создание и проектирование базы\" была создана','2020-10-30 20:00:00',1),(2,'System','Задача \"Создание и проектирование базы\" была изменена','2020-10-30 20:00:00',1),(3,'System','Задача \"Программирование оборудования\" была создана','2020-10-27 20:00:00',2),(4,'System','Задача \"Программирование оборудования\" была изменена','2020-10-28 20:00:00',2),(5,'Лидер проекта','Задача \"Программирование оборудования\": уведомляю, что фреймворк готов к работе. Установочное собрание\n    для обучения работы с ним пройдет завтра во второй половине дня.','2020-10-29 20:00:00',2),(6,'System','Задача \"Настройка локальной сети\" была создана','2020-10-26 10:00:00',3),(7,'Лидер проекта','Задача \"Настройка локальной сети\": Все необходимые работы были проделаны, поздравляю участников проекта.\n    Завтра будет принято решение о переносе актуальных сроков сдачи почти на месяц раньше','2020-10-29 20:00:00',3),(8,'System','Задача \"Сбор необходимых данных и построение архитектуры приложения\" была создана','2020-10-30 10:00:00',4),(9,'System','Задача \"Создание сети серверов\" была создана','2020-10-31 15:30:00',5),(10,'Администратор','Уведомляю Вас о продолжении формирования вашей команды. В течение недели будет поток джунов, которым необходимо \n    получить опыт именно на вашей задаче. Просим отнестись с пониманием к получившейся неразберихе в команде.','2020-10-31 19:40:00',5),(11,'System','Задача \"Реализация клиентского календаря в браузере\" была создана','2020-10-31 15:30:00',6),(12,'System','Задача \"Реализация клиентского календаря в браузере\" была изменена','2020-11-08 18:30:00',6),(13,'System','Задача \"Реализация клиентского календаря в браузере\" была изменена','2020-11-10 15:30:00',6),(14,'System','Задача \"Реализация оплаты\" была создана','2020-10-22 11:30:00',7),(15,'System','Задача \"Реализация оплаты\" была изменена','2020-10-22 11:30:00',7),(16,'Лидер проекта','Уведомляю о проблемме, связанной с реализацией оплаты с Qiwi. Данная система оплаты довольно нестабильна,\n    поэтому ведется пересмотр реализации системы оплаты со средствами, отличными от банковских карт.','2020-10-23 15:30:00',7),(17,'System','Задача \"Создание системы контроля взаимодействия лидеров и подчиненных\" была создана','2020-11-30 15:30:00',8),(18,'System','Задача \"Создание системы контроля взаимодействия лидеров и подчиненных\" была изменена','2020-11-30 23:30:00',8),(19,'Лидер проекта','Задача построения диаграмм отменяется, данное решение буду реализовывать я)))','2020-11-05 15:30:00',8),(20,'Лидер проекта','Уведомляю о готовности половины проекта \"Добавление возможности поиска разработчика по фамилии или почте\". В данный момент на страницу добавлена возможность поиска по фамилии. Возможность поиска по почте находится в разработке.','2020-11-08 16:25:00',11),(21,'System','Задача \"Добавление возможности поиска разработчика по фамилии или почте\" была создана','2020-11-08 20:55:00',11),(22,'System','The current execution time for the \"Создание и проектирование базы\" task you are working\n                                    on expires in less than a day. Make the necessary edits, prepare\n                                    documentation. Have a good day.','2021-06-21 02:21:30',1),(23,'System','The current execution time for the \"Программирование оборудования\" task you are working\n                                    on expires in less than a day. Make the necessary edits, prepare\n                                    documentation. Have a good day.','2021-06-21 02:21:30',2),(24,'System','The current execution time for the \"Настройка локальной сети\" task you are working\n                                    on expires in less than a day. Make the necessary edits, prepare\n                                    documentation. Have a good day.','2021-06-21 02:21:30',3),(25,'System','The current execution time for the \"Сбор необходимых данных и построение архитектуры приложения\" task you are working\n                                    on expires in less than a day. Make the necessary edits, prepare\n                                    documentation. Have a good day.','2021-06-21 02:21:30',4),(26,'System','The current execution time for the \"Создание сети серверов\" task you are working\n                                    on expires in less than a day. Make the necessary edits, prepare\n                                    documentation. Have a good day.','2021-06-21 02:21:30',5),(27,'System','The current execution time for the \"Реализация клиентского календаря в браузере\" task you are working\n                                    on expires in less than a day. Make the necessary edits, prepare\n                                    documentation. Have a good day.','2021-06-21 02:21:30',6),(28,'System','The current execution time for the \"Реализация оплаты\" task you are working\n                                    on expires in less than a day. Make the necessary edits, prepare\n                                    documentation. Have a good day.','2021-06-21 02:21:30',7),(29,'System','The current execution time for the \"Работа с алгоритмом, рассчитывающим дальнейшую диету\" task you are working\n                                    on expires in less than a day. Make the necessary edits, prepare\n                                    documentation. Have a good day.','2021-06-21 02:21:30',8),(30,'System','The current execution time for the \"Создание системы контроля взаимодействия лидеров и подчиненных\" task you are working\n                                    on expires in less than a day. Make the necessary edits, prepare\n                                    documentation. Have a good day.','2021-06-21 02:21:30',9),(31,'System','The current execution time for the \"Построение архитектуры приложения и вспомогательных диаграмм\" task you are working\n                                    on expires in less than a day. Make the necessary edits, prepare\n                                    documentation. Have a good day.','2021-06-21 02:21:30',10),(32,'System','The current execution time for the \"Добавление возможности поиска разработчика по фамилии или почте\" task you are working\n                                    on expires in less than a day. Make the necessary edits, prepare\n                                    documentation. Have a good day.','2021-06-21 02:21:30',11),(33,'System','The current execution time for the \"Возможность редактирования персональной информации разработчика\" task you are working\n                                    on expires in less than a day. Make the necessary edits, prepare\n                                    documentation. Have a good day.','2021-06-21 02:21:30',12);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-23  2:29:16
