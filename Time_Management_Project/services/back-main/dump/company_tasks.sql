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
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `task_id` int NOT NULL AUTO_INCREMENT,
  `task_title` varchar(150) NOT NULL,
  `task_description` varchar(2000) DEFAULT NULL,
  `task_results` varchar(3000) DEFAULT NULL,
  `task_planned_deadline` datetime NOT NULL,
  `task_actual_deadline` datetime NOT NULL,
  `task_lead_id` int DEFAULT NULL,
  `project_id` int NOT NULL,
  PRIMARY KEY (`task_id`),
  KEY `task_lead_id` (`task_lead_id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`task_lead_id`) REFERENCES `developers` (`developer_id`) ON DELETE SET NULL,
  CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,'Создание и проектирование базы','Необходимо реализовать базу данных для хранения всей собираемой оборудованием информации','1. Была выбрана база данных Oracle,\n    2. Спроектирована структура базы данных со всеми вытекающими сущностями','2020-11-01 20:00:00','2020-11-01 20:00:00',1,1),(2,'Программирование оборудования','Необходимо собрать плату и запрограммировать ее на основе прошлых проектов.','1. Куплены все необходимые материалы,\n    2. Обеспечен сбор всей необходимой информации\n    3. Собран фреймворк для конфортной работы команды над задачей','2020-11-05 20:00:00','2020-11-05 20:00:00',5,1),(3,'Настройка локальной сети',NULL,'1. Совершена настройка сервера,\n    2. Написан протокол для локальной отправки данных\n    3. Протокол протекстирован на локальной сети','2020-12-01 13:00:00','2020-12-01 13:00:00',8,1),(4,'Сбор необходимых данных и построение архитектуры приложения','Необходимо обеспечить сбор медицинской информации и на ее основе построить граф приложения.\n    Данное задание должно быть выполено как можно раньше','1. Произведена настройка и имплементация прошлого проекта\n    2. Промежуточные данные переданы лидеру','2020-12-31 18:30:00','2020-12-31 18:30:00',15,2),(5,'Создание сети серверов','Выбор технологии для создания сети серверов, а также реализация общей структуры для как можно скорейшего тестирования\n    мобльной части приложения. По поводу использованя ресурсов проконсультироваться с лидером проекта. При возникновении \n    проблем нетривиального характера сообщить менеджеру проекта.','1. Были выбраны технологии Java + Node JS прослойка','2020-12-31 18:30:00','2020-12-31 18:30:00',22,2),(6,'Реализация клиентского календаря в браузере','Необходимо ознакомиться с фреймворком VueJS. Должна быть подключена библиотека дл отрисовки и синхронизации времени\n    на стороне сервера. Должен быть реализован механизм взаимодействия пользователя с календарем. Страница отдельной даты.','1. Произведено ознакомление с фрейморком VueJS.\n    2. Получен макет календаря и страницы даты\n    3. Настроен WebPack','2020-01-05 18:30:00','2020-01-05 18:30:00',22,2),(7,'Реализация оплаты','Необходимо сделать страницу оплаты, а механизм оплаты. Оплата должна производиться как по банковской карте, так и\n    с помощью WebMoney, Qiwi и т.д.','1. Сделана страница оплаты\n    2. Добавлена возможность оплаты по карте','2020-10-31 13:00:00','2020-10-31 13:00:00',29,2),(8,'Работа с алгоритмом, рассчитывающим дальнейшую диету','Разработать алгоритм с помощью вспомогательных библиотек, рассчитывающим дальнейших ход диеты, а так же \n    предполагаемое самочувствие пользователя при соблюдении данной диеты.','1. Разработан алгоритм','2020-01-03 18:30:00','2020-01-03 18:30:00',16,2),(9,'Создание системы контроля взаимодействия лидеров и подчиненных','Реализация системы взаимодействия различных участников проекта. Должна включать чат, а также прочие приблуды',NULL,'2020-11-13 13:30:00','2020-11-13 13:30:00',22,3),(10,'Построение архитектуры приложения и вспомогательных диаграмм','Необхоимд учесть ожидаемые результаты и возможные требования заказчика, \n    после чего сделать расширяемую модель приложения, состоящую из нескольких точек входа на сервере\n    и модели хранения общего состояния на клиенте.','1. Построена архитектура\n    2. Произведена работа с командой','2020-11-15 18:30:00','2020-11-15 18:30:00',33,3),(11,'Добавление возможности поиска разработчика по фамилии или почте','Необходимо добавить на страницу списка разработчиков компании окно для поиска. Поиск должен осуществляться по фамилии или почте сотрудника.','С помощью JS были созданы два специальных окна поиска в верхней части страницы','2020-10-30 05:00:00','2020-11-01 20:00:00',13,3),(12,'Возможность редактирования персональной информации разработчика','Необходимо добавить возможность редактирования персональной информации разработчика. Изменение должно осуществляться на отдельной странице и быть доступно для каждого разработчика.','1. На страницу разработчика добавлена кнопка изменения личного профиля\n	2. Создана отдельная страница для удобного изменения информации','2020-10-30 04:00:00','2020-11-01 20:00:00',1,3);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insert_tasks_planned_deadline` BEFORE INSERT ON `tasks` FOR EACH ROW BEGIN
		IF (NEW.task_planned_deadline < current_timestamp()) THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'MyTriggerError: Trying to insert invalid planned deadline';
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insert_tasks_actual_deadline` BEFORE INSERT ON `tasks` FOR EACH ROW BEGIN
		IF (NEW.task_actual_deadline < current_timestamp()) THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT  = 'MyTriggerError: Trying to insert invalid actual deadline';
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

-- Dump completed on 2021-06-21  2:15:57
