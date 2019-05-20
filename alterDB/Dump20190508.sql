-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: cdio
-- ------------------------------------------------------
-- Server version	8.0.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `detailblock`
--

DROP TABLE IF EXISTS `detailblock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `detailblock` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `IdSubjectBlock` int(11) NOT NULL,
  `IdSubject` int(11) NOT NULL,
  `DateCreated` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detailblock`
--

LOCK TABLES `detailblock` WRITE;
/*!40000 ALTER TABLE `detailblock` DISABLE KEYS */;
INSERT INTO `detailblock` VALUES (1,1,1,'2019-03-02 00:00:00'),(2,1,2,'2019-03-02 00:00:00'),(3,1,3,'2019-03-02 00:00:00'),(6,3,6,'2019-03-02 00:00:00'),(7,3,7,'2019-03-02 00:00:00'),(8,3,8,'2019-03-02 00:00:00');
/*!40000 ALTER TABLE `detailblock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detaileduprogram`
--

DROP TABLE IF EXISTS `detaileduprogram`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `detaileduprogram` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `IdEduProgram` int(11) NOT NULL,
  `EnrollmentTarget` varchar(255) NOT NULL,
  `DateCreated` datetime DEFAULT NULL,
  `EduProcess` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `GraduatedCon` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `IdOutcome` int(11) NOT NULL,
  `OSUsedNode` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detaileduprogram`
--

LOCK TABLES `detaileduprogram` WRITE;
/*!40000 ALTER TABLE `detaileduprogram` DISABLE KEYS */;
/*!40000 ALTER TABLE `detaileduprogram` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detailoutcomestandard`
--

DROP TABLE IF EXISTS `detailoutcomestandard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `detailoutcomestandard` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `IdOutcomeStandard` int(11) NOT NULL,
  `KeyRow` varchar(63) NOT NULL,
  `NameRow` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `DetailOutcomeStandard_fk0` (`IdOutcomeStandard`),
  CONSTRAINT `DetailOutcomeStandard_fk0` FOREIGN KEY (`IdOutcomeStandard`) REFERENCES `outcomestandard` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1236 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detailoutcomestandard`
--

LOCK TABLES `detailoutcomestandard` WRITE;
/*!40000 ALTER TABLE `detailoutcomestandard` DISABLE KEYS */;
/*!40000 ALTER TABLE `detailoutcomestandard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detailrevision`
--

DROP TABLE IF EXISTS `detailrevision`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `detailrevision` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `IdRevision` int(11) NOT NULL,
  `KeyRow` varchar(63) NOT NULL,
  `NameRow` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `DetailRevision_fk0` (`IdRevision`),
  CONSTRAINT `DetailRevision_fk0` FOREIGN KEY (`IdRevision`) REFERENCES `revision` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=212 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detailrevision`
--

LOCK TABLES `detailrevision` WRITE;
/*!40000 ALTER TABLE `detailrevision` DISABLE KEYS */;
/*!40000 ALTER TABLE `detailrevision` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eduprogram`
--

DROP TABLE IF EXISTS `eduprogram`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `eduprogram` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `EduName` varchar(255) NOT NULL,
  `EduEngName` varchar(255) DEFAULT NULL,
  `IdLevel` int(11) NOT NULL,
  `IdMajor` int(11) NOT NULL,
  `IdProgram` int(11) NOT NULL,
  `SchoolYear` varchar(4) NOT NULL,
  `DateCreated` datetime NOT NULL,
  `DateEdited` datetime NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eduprogram`
--

LOCK TABLES `eduprogram` WRITE;
/*!40000 ALTER TABLE `eduprogram` DISABLE KEYS */;
/*!40000 ALTER TABLE `eduprogram` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eduprogramcontent`
--

DROP TABLE IF EXISTS `eduprogramcontent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `eduprogramcontent` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `KeyRow` varchar(255) NOT NULL,
  `NameRow` varchar(255) NOT NULL,
  `Type` tinyint(1) NOT NULL,
  `IdEduProgram` int(11) NOT NULL,
  `DateCreated` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eduprogramcontent`
--

LOCK TABLES `eduprogramcontent` WRITE;
/*!40000 ALTER TABLE `eduprogramcontent` DISABLE KEYS */;
/*!40000 ALTER TABLE `eduprogramcontent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `edupurpose`
--

DROP TABLE IF EXISTS `edupurpose`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `edupurpose` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `IdDetail` int(11) NOT NULL,
  `KeyRow` varchar(255) NOT NULL,
  `NameRow` varchar(255) NOT NULL,
  `DateCreated` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `edupurpose`
--

LOCK TABLES `edupurpose` WRITE;
/*!40000 ALTER TABLE `edupurpose` DISABLE KEYS */;
INSERT INTO `edupurpose` VALUES (1,1,'1-1--','MỤC TIÊU CHUNG','2019-03-01 17:00:00'),(2,1,'1-1-1-','Mục tiêu của chương trình đào tạo nhằm đào tạo ra các sinh viên tốt nghiệp:','2019-03-01 17:00:00'),(3,1,'1-1-1-1','Có kiến thức kỹ thuật vững chắc; hiểu được các trách nhiệm và đạo đức nghề nghiệp để','2019-03-01 17:00:00'),(4,1,'1-1-1-2','Trang bị cho sinh viên những kỹ năng cá nhân, kỹ năng nhóm/giao tiếp và kỹ năng theo','2019-03-01 17:00:00'),(5,1,'1-1-1-3','Sinh viên được trang bị đầy đủ để có thể hình thành vấn đề, phân tích, thiết kế, giải','2019-03-01 17:00:00'),(6,1,'1-2--','MỤC TIÊU CỤ THỂ – CHUẨN ĐẦU RA CỦA CHƯƠNG TRÌNH ĐÀO TẠO','2019-03-01 17:00:00'),(7,1,'1-2-1-','Mục tiêu cụ thể','2019-03-01 17:00:00'),(8,1,'1-2-1-1','Biết được trách nhiệm, đạo đức nghề nghiệp, và hiện trạng kinh tế, môi trường và xã hội.','2019-03-01 17:00:00'),(9,1,'1-2-1-2','Có đầy đủ các kỹ năng cá nhân, kỹ năng nhóm/ giao tiếp và kỹ năng CDIO.','2019-03-01 17:00:00'),(10,1,'1-2-1-3','Có khả năng kế thừa và phát triển các kiến thức, kỹ năng chuyên môn.','2019-03-01 17:00:00'),(11,1,'1-2-1-4','Có khả năng áp dụng các kiến thức chuyên môn trong quá trình giải quyết các vấn đề','2019-03-01 17:00:00'),(12,1,'1-3--','CƠ HỘI NGHỀ NGHIỆP','2019-03-01 10:00:00'),(13,1,'1-3-1-','Sinh viên sau khi tốt nghiệp có thể có các cơ hội nghề nghiệp sau:','2019-03-01 10:00:00'),(14,1,'1-3-1-1','Các vị trí thuộc nhóm Phát triển sản phẩm phần mềm: vị trí Phân tích nghiệp vụ/ phân tích yêu cầu người dùng, Thiết kế phần mềm, Lập trình phần mềm, Kiểm thử sản phẩm, Quản lý quy trình phát triển phần mềm, Quản lý dự án, Tư vấn, v.v...','2019-03-01 10:00:00'),(15,1,'1-3-1-2','Các vị trí thuộc nhóm Hệ thống thông tin: Quản trị cơ sở dữ liệu, Quản trị hệ thống CNTT cho doanh nghiệp, Tư vấn hệ thống CNTT, Quản trị thông tin, Quản trị an ninh/bảo mật, v.v...','2019-03-01 10:00:00'),(16,1,'1-3-1-3','Các vị trí thuộc nhóm Mạng máy tính và viễn thông: Quản trị mạng, Quản trị hệ thống CNTT, An ninh và bảo mật hệ thống mạng, v.v...','2019-03-01 10:00:00'),(17,1,'1-3-1-4','Các vị trí thuộc nhóm Nghiên cứu tại các viện, trường đại học, các công ty phần mềm lớn: Trí tuệ nhân tạo, Khai thác dữ liệu, Xử lý ngôn ngữ, v.v…','2019-03-01 10:00:00'),(18,1,'1-3-1-5','Các vị trí thuộc nhóm Giảng dạy: Trợ giảng, Giảng viên, v.v...','2019-03-01 10:00:00'),(19,1,'1-3-1-6','Các vị trí khác: tư vấn, huấn luyện về các hệ thống CNTT, v.v...','2019-03-01 10:00:00');
/*!40000 ALTER TABLE `edupurpose` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `faculty` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `NameFaculty` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
INSERT INTO `faculty` VALUES (1,'Công nghệ thông tin'),(2,'Vật lý'),(3,'Hóa học'),(4,'Công nghệ sinh học'),(5,'Toán học');
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `level`
--

DROP TABLE IF EXISTS `level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `level` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `LevelName` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `level`
--

LOCK TABLES `level` WRITE;
/*!40000 ALTER TABLE `level` DISABLE KEYS */;
INSERT INTO `level` VALUES (1,'Đại học'),(2,'Cao đẳng'),(3,'Thạc sĩ'),(4,'Tiến sĩ');
/*!40000 ALTER TABLE `level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `major`
--

DROP TABLE IF EXISTS `major`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `major` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `MajorCode` varchar(255) NOT NULL,
  `MajorName` varchar(255) NOT NULL,
  `MajorEngName` varchar(255) NOT NULL,
  `IdFaculty` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `major`
--

LOCK TABLES `major` WRITE;
/*!40000 ALTER TABLE `major` DISABLE KEYS */;
INSERT INTO `major` VALUES (1,'CNTT0001','Kỹ thuật phần mềm','Sotfware Engineer',1),(2,'CNTT0002','Khoa học máy tính','Computer Science',1),(3,'CNTT0003','Hệ thống thông tin','Information System',1),(4,'CNTT0004','Thị giác máy tính','Computer Vision',1),(5,'CNTT0005','Mạng máy tính','Computer Network',1);
/*!40000 ALTER TABLE `major` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `outcomeeduprogram`
--

DROP TABLE IF EXISTS `outcomeeduprogram`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `outcomeeduprogram` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `IdOutcome` int(11) NOT NULL,
  `IdEduProgram` int(11) NOT NULL,
  `DateCreated` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `outcomeeduprogram`
--

LOCK TABLES `outcomeeduprogram` WRITE;
/*!40000 ALTER TABLE `outcomeeduprogram` DISABLE KEYS */;
/*!40000 ALTER TABLE `outcomeeduprogram` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `outcomestandard`
--

DROP TABLE IF EXISTS `outcomestandard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `outcomestandard` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `NameOutcomeStandard` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `IdFaculty` int(11) NOT NULL,
  `IdProgram` int(11) NOT NULL,
  `IdUser` int(11) NOT NULL,
  `SchoolYear` varchar(255) DEFAULT NULL,
  `DateCreated` datetime DEFAULT NULL,
  `DateEdited` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `OutcomeStandard_fk0` (`IdFaculty`),
  KEY `OutcomeStandard_fk1` (`IdProgram`),
  KEY `OutcomeStandard_fk2` (`IdUser`),
  CONSTRAINT `OutcomeStandard_fk0` FOREIGN KEY (`IdFaculty`) REFERENCES `faculty` (`Id`),
  CONSTRAINT `OutcomeStandard_fk1` FOREIGN KEY (`IdProgram`) REFERENCES `program` (`Id`),
  CONSTRAINT `OutcomeStandard_fk2` FOREIGN KEY (`IdUser`) REFERENCES `user` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `outcomestandard`
--

LOCK TABLES `outcomestandard` WRITE;
/*!40000 ALTER TABLE `outcomestandard` DISABLE KEYS */;
/*!40000 ALTER TABLE `outcomestandard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program`
--

DROP TABLE IF EXISTS `program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `program` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `NameProgram` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program`
--

LOCK TABLES `program` WRITE;
/*!40000 ALTER TABLE `program` DISABLE KEYS */;
INSERT INTO `program` VALUES (1,'Chính Quy'),(2,'Chất Lượng Cao'),(3,'Tiên Tiến'),(4,'Cao Đẳng'),(5,'Việt Pháp');
/*!40000 ALTER TABLE `program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revision`
--

DROP TABLE IF EXISTS `revision`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `revision` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `IdOutcomeStandard` int(11) NOT NULL,
  `IdUser` int(11) NOT NULL,
  `NameRevision` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `DateUpdated` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Revision_fk0` (`IdOutcomeStandard`),
  KEY `Revision_fk1` (`IdUser`),
  CONSTRAINT `Revision_fk0` FOREIGN KEY (`IdOutcomeStandard`) REFERENCES `outcomestandard` (`Id`),
  CONSTRAINT `Revision_fk1` FOREIGN KEY (`IdUser`) REFERENCES `user` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revision`
--

LOCK TABLES `revision` WRITE;
/*!40000 ALTER TABLE `revision` DISABLE KEYS */;
/*!40000 ALTER TABLE `revision` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `subject` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `SubjectCode` varchar(255) NOT NULL,
  `SubjectName` varchar(255) NOT NULL,
  `SubjectEngName` varchar(255) DEFAULT NULL,
  `Credit` int(11) NOT NULL,
  `TheoryPeriod` int(11) NOT NULL,
  `PracticePeriod` int(11) NOT NULL,
  `ExercisePeriod` int(11) NOT NULL,
  `Description` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `DateCreated` datetime DEFAULT NULL,
  `DateEdited` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES (1,'BAA00001','Những nguyên lý cơ bản của chủ nghĩa Mác - Lê Nin',NULL,5,75,0,0,NULL,'2019-03-02 00:00:00','2019-03-02 00:00:00'),(2,'BAA00002','Đường lối cách mạng của ĐCSVN',NULL,3,45,0,0,NULL,'2019-03-02 00:00:00','2019-03-02 00:00:00'),(3,'BAA00003','Tư tưởng HCM',NULL,2,30,0,0,NULL,'2019-03-02 00:00:00','2019-03-02 00:00:00'),(4,'BAA00004','Pháp luật đại cương',NULL,3,45,0,0,NULL,'2019-03-02 00:00:00','2019-03-02 00:00:00'),(5,'BAA00005','Kinh tế đại cương',NULL,2,30,0,0,NULL,'2019-03-02 00:00:00','2019-03-02 00:00:00'),(6,'MTH00003','Vi tích phân 1B',NULL,3,45,0,0,NULL,NULL,NULL),(7,'MTH00081','Thực hành Vi tích phân 1B',NULL,1,0,30,0,NULL,NULL,NULL),(8,'MTH00004','Vi tích phân 2B',NULL,3,45,0,0,NULL,NULL,NULL),(9,'MTH00082','Thực hành Vi tích phân 2B',NULL,1,0,30,0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjectblock`
--

DROP TABLE IF EXISTS `subjectblock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `subjectblock` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `IdEduProgContent` int(11) NOT NULL,
  `Credit` int(11) NOT NULL,
  `isOptional` tinyint(1) NOT NULL,
  `isAccumulated` tinyint(1) NOT NULL,
  `DateCreated` datetime DEFAULT NULL,
  `KeyRow` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `NameBlock` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjectblock`
--

LOCK TABLES `subjectblock` WRITE;
/*!40000 ALTER TABLE `subjectblock` DISABLE KEYS */;
/*!40000 ALTER TABLE `subjectblock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjecteduprog`
--

DROP TABLE IF EXISTS `subjecteduprog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `subjecteduprog` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IdSubject` int(11) NOT NULL,
  `IdEduProg` int(11) NOT NULL,
  `DateCreated` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjecteduprog`
--

LOCK TABLES `subjecteduprog` WRITE;
/*!40000 ALTER TABLE `subjecteduprog` DISABLE KEYS */;
/*!40000 ALTER TABLE `subjecteduprog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teachersubject`
--

DROP TABLE IF EXISTS `teachersubject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `teachersubject` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `IdSubject` int(11) NOT NULL,
  `IdUser` int(11) NOT NULL,
  `DateCreated` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachersubject`
--

LOCK TABLES `teachersubject` WRITE;
/*!40000 ALTER TABLE `teachersubject` DISABLE KEYS */;
/*!40000 ALTER TABLE `teachersubject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Password` varchar(127) NOT NULL,
  `Username` varchar(127) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `DateCreated` datetime DEFAULT NULL,
  `DateEdited` datetime DEFAULT NULL,
  `Role` varchar(20) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'newpass2','admin','2019-03-02 07:00:00','2019-03-02 07:00:00','ADMIN'),(2,'giaovu','giaovu','2019-03-02 07:00:00','2019-03-02 07:00:00','TEACHER'),(3,'123','chuong','2019-03-02 00:00:00','2019-03-02 00:00:00','EDITOR'),(5,'newpass2','anhvu','2019-03-02 00:00:00','2019-03-02 00:00:00','TEACHER'),(6,'ANJo82Nz','root','2019-03-02 00:00:00','2019-03-02 00:00:00','ADMIN');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-08 22:39:53
