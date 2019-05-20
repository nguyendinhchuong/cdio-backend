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
  PRIMARY KEY (`Id`),
  KEY `fk_subject_subjectblock` (`IdSubject`),
  CONSTRAINT `fk_subject_subjectblock` FOREIGN KEY (`IdSubject`) REFERENCES `subject` (`Id`)
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
  PRIMARY KEY (`Id`),
  KEY `fk_outcome_detaileduprog` (`IdOutcome`),
  KEY `fk_eduprog_detaileduprog` (`IdEduProgram`),
  CONSTRAINT `fk_eduprog_detaileduprog` FOREIGN KEY (`IdEduProgram`) REFERENCES `eduprogram` (`Id`),
  CONSTRAINT `fk_outcome_detaileduprog` FOREIGN KEY (`IdOutcome`) REFERENCES `outcomestandard` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detaileduprogram`
--

LOCK TABLES `detaileduprogram` WRITE;
/*!40000 ALTER TABLE `detaileduprogram` DISABLE KEYS */;
INSERT INTO `detaileduprogram` VALUES (8,6,'Theo Quy chế tuyển sinh đại học, cao đẳng hệ chính quy của Bộ Giáo dục và Đào tạo','2019-05-08 19:37:24','Căn cứ Quy chế học vụ Đào tạo đại học và cao đẳng theo hệ chính qui theo Hệ thống tín chỉ ban\nhành kèm theo Quyết định số 1167/QĐ-KHTN-ĐT ngày 25 tháng 8 năm 2016 của Hiệu trưởng\nTrường Đại học Khoa học Tự nhiên.','Tích lũy đủ ít nhất 137 tín chỉ của khối kiến thức giáo dục đại cương và giáo dục chuyên nghiệp\nnhư đã mô tả ở mục 6. CẤU TRÚC CHƯƠNG TRÌNH và mục 7. NỘI DUNG CHƯƠNG\nTRÌNH của Chương trình đào tạo này, đồng thời thỏa các điều kiện tại Điều 28 Quy chế học vụ\nĐào tạo đại học và cao đẳng theo hệ chính qui theo Hệ thống tín chỉ ban hành kèm theo Quyết định\nsố 1167/QĐ-KHTN-ĐT ngày 25 tháng 8 năm 2016 của Hiệu trưởng Trường Đại học Khoa học Tự\nnhiên.',23,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=1551 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detailoutcomestandard`
--

LOCK TABLES `detailoutcomestandard` WRITE;
/*!40000 ALTER TABLE `detailoutcomestandard` DISABLE KEYS */;
INSERT INTO `detailoutcomestandard` VALUES (1236,23,'1...','KIẾN THỨC VÀ LẬP LUẬN KỸ THUẬT'),(1237,23,'1.1..','Kiến thức nền tảng về Khoa học'),(1238,23,'1.1.1.','Khối kiến thức về Toán'),(1239,23,'1.1.1.1','Kiến thức về Giải tích'),(1240,23,'1.1.1.2','Kiến thức Đại số'),(1241,23,'1.1.1.3','Kiến thức về Toán rời rạc'),(1242,23,'1.1.1.4','Kiến thức về Xác suất thống kê'),(1243,23,'1.1.2.','Khối kiến thức về Vật lý'),(1244,23,'1.1.2.1','Kiến thức Vật lý đại cương'),(1245,23,'1.1.2.2','Kiến thức thực hành vật lý'),(1246,23,'1.1.3.','Khối kiến thức về điện - điện tử'),(1247,23,'1.1.3.1','Kiến thức về mạch số'),(1248,23,'1.1.3.2','Kiến thức căn bản về Điện - Điện tử'),(1249,23,'1.2..','Kiến thức nền tảng của lĩnh vực CNTT'),(1250,23,'1.2.1.','Khối kiến thức về lập trình '),(1251,23,'1.2.1.1','Kiến thức cơ bản về lập trình (nhập môn)'),(1252,23,'1.2.1.2','Các kỹ thuật lập trình'),(1253,23,'1.2.1.3','Kiến thức về lập trình hướng đối tượng'),(1254,23,'1.2.1.4','Kiến thức lập trình hệ thống (hợp ngữ…)'),(1255,23,'1.2.2.','Kiến thức tổng quát về lĩnh vực CNTT'),(1256,23,'1.2.2.1','Kiến thức tổng quát ngành CNTT'),(1257,23,'1.2.2.2','Kiến thức tổng quát của mỗi lĩnh vực trong CNTT (KHMT, CNTT, CNPM, HTTT, MMT, TGMT-Robot)'),(1258,23,'1.3..','Kiến thức kỹ thuật nâng cao ngành CNTT'),(1259,23,'1.3.1.','Khối kiến thức cấu trúc dữ liệu và giải thuật'),(1260,23,'1.3.1.1','Hiểu được các CTDL cơ bản (mảng, danh sách liên kết, ngăn xếp, hàng đợi…)'),(1261,23,'1.3.1.2','Hiểu được các CTDL nâng cao (các loại cây, bảng băm...)'),(1262,23,'1.3.1.3','Biết được 1 số cấu trúc file và xử lý được trên file'),(1263,23,'1.3.1.4','Hiểu được các thuật toán cơ bản: tìm kiếm, sắp xếp, đệ qui, quy hoạch động…'),(1264,23,'1.3.1.5','Có thể tự định nghĩa cấu trúc dữ liệu mới để phù hợp với yêu cầu của bài toán'),(1265,23,'1.3.1.6','Có thể phân tích ưu điểm và hạn chế để chọn ra được giải pháp tốt nhất trong một tình huống cụ thể'),(1266,23,'1.3.1.7','Biết được các giải thuật nâng cao trong lý thuyết đồ thị, trí tuệ nhân tạo…'),(1267,23,'1.3.2.','Khối kiến thức về hệ điều hành máy tính'),(1268,23,'1.3.2.1','Hiểu được các thành phần chính của hệ điều hành'),(1269,23,'1.3.2.2','Biết được các điểm khác biệt cơ bản giữa các hệ điều hành phổ biến hiện nay'),(1270,23,'1.3.2.3','Hiểu được các cơ chế hoạt động của các thành phần chính trong hệ điều hành'),(1271,23,'1.3.3.','Khối kiến thức kiến trúc máy tính'),(1272,23,'1.3.3.1','Biết được các thành phần của máy tính'),(1273,23,'1.3.3.2','Biết được lịch sử ra đời và quá trình phát triển của máy tính'),(1274,23,'1.3.3.3','Hiểu được một số giao tiếp và tương tác giữa các thành phần chính trong máy tính'),(1275,23,'1.3.3.4','Biết được cách vận hành và hoạt động của các thành phần chính trong máy tính'),(1276,23,'1.3.4.','Khối kiến thức mạng máy tính'),(1277,23,'1.3.4.1','Hiểu được các loại kết nối khác nhau để liên kết các máy tính (có dây, không dây...)'),(1278,23,'1.3.4.2','Hiểu được các phương thức giao tiếp và ưu nhược điểm của chúng'),(1279,23,'1.3.4.3','Có kiến thức về các mô hình mạng khác nhau'),(1280,23,'1.3.4.4','Có kiến thức cơ bản về các thiết bị phần cứng dành cho mạng'),(1281,23,'1.3.4.5','Có khả năng cấu hình và thiết lập một số mạng đơn giản'),(1282,23,'1.3.5.','Khối kiến thức cơ sở dữ liệu'),(1283,23,'1.3.5.1','Hiểu các mô hình cơ sở dữ liệu cơ bản'),(1284,23,'1.3.5.2','Có khả năng sử dụng một số hệ QTCSDL phổ biến để xây dựng CSDL'),(1285,23,'1.3.5.3','Có khả năng xây dựng một mô hình CSDL cho một bài toán thực tế đơn giản'),(1286,23,'1.3.5.4','Có khả năng viết được các dòng lệnh truy vấn CSDL đơn giản bằng SQL'),(1287,23,'1.3.6.','Các kiến thức nâng cao của từng chuyên ngành \n(xác định riêng cho từng ngành)'),(1288,23,'1.3.6.1','Kiến thức nâng cao ngành Khoa học máy tính (KHMT+CNTT+TGMT&Robot)'),(1289,23,'1.3.6.2','Kiến thức nâng cao ngành Công nghệ phần mềm'),(1290,23,'1.3.6.3','Kiến thức nâng cao ngành Hệ thống thông tin'),(1291,23,'1.3.6.4','Kiến thức nâng cao ngành Mạng máy tính và truyền thông'),(1292,23,'2...','KỸ NĂNG CÁ NHÂN VÀ NGHỀ NGHIỆP VÀ CÁC TỐ CHẤT'),(1293,23,'2.1..','Suy luận có phân tích và giải quyết vấn đề'),(1294,23,'2.1.1.','Xác định và hình thành vấn đề'),(1295,23,'2.1.1.1','   Có khả năng xác định vấn đề'),(1296,23,'2.1.1.2','Có khả năng phân tích các giả định của vấn đề'),(1297,23,'2.1.1.3','Có khả năng phát biểu bài toán dựa trên dữ liệu và quan sát'),(1298,23,'2.1.1.4','Hiểu cách hình thành kế hoạch tổng thể để giải quyết bài toán '),(1299,23,'2.1.2.','Mô hình hóa và phân tích'),(1300,23,'2.1.2.1','Có khả năng sử dụng giả thiết để đơn giản hóa bài toán'),(1301,23,'2.1.2.2','Biết các loại mô hình khác nhau để mô hình hóa bài toán'),(1302,23,'2.1.2.3','Có khả năng xây dựng các mô hình từ các yêu cầu của bài toán'),(1303,23,'2.1.2.4','Có khả năng chọn loại mô hình phù hợp để mô hình hóa bài toán'),(1304,23,'2.1.2.5','Có khả năng phân tích để làm rõ các yêu cầu bài toán'),(1305,23,'2.1.3.','Suy luận & giải quyết'),(1306,23,'2.1.3.1','Có kỹ năng suy luận trên bài toán'),(1307,23,'2.1.3.2','Có khả năng xây dựng các bước để giải quyết bài toán'),(1308,23,'2.1.3.3','Có khả năng tổng kết các bước suy luận'),(1309,23,'2.1.3.4','Có khả năng phân tích và đánh giá các giải pháp/giải thuật để tìm ra \ngiải thuật thích hợp hoặc hình thành giải thuật mới cho bài toán'),(1310,23,'2.1.3.5','Có khả năng hình thành giải pháp/giải thuật để giải quyết bài toán'),(1311,23,'2.1.4.','Đánh giá giải pháp và đề xuất'),(1312,23,'2.1.4.1','Có khả năng phân tích tính đúng đắn và độ phức tạp của giải pháp/giải thuật'),(1313,23,'2.1.4.2','Có khả năng phân tích, đánh giá kết quả đầu ra '),(1314,23,'2.1.4.3','Có khả năng phân tích ưu, khuyết điểm của giải pháp và đề xuất cải tiến'),(1315,23,'2.1.4.4','Nhận ra được các vấn đề bất thường của kết quả và có khả năng phân tích & hiểu được lý do'),(1316,23,'2.2..','Thực nghiệm, điều tra và khám phá tri thức'),(1317,23,'2.2.1.','Hình thành giả thuyết'),(1318,23,'2.2.1.1','Có khả năng liệt kê và lựa chọn các giả thuyết phù hợp để kiểm chứng '),(1319,23,'2.2.1.2','Có khả năng đặt câu hỏi mang tính phản biện'),(1320,23,'2.2.1.3','Có khả năng xác định các bên liên quan đến giả thuyết'),(1321,23,'2.2.2.','Khảo sát trên tài liệu'),(1322,23,'2.2.2.1','Hiểu các chiến lược và biết cách chọn chiến lược nghiên cứu tài liệu phù hợp'),(1323,23,'2.2.2.2','Biết cách tra cứu tài liệu bằng công cụ tìm kiếm, trong thư viện.'),(1324,23,'2.2.2.3','Biết cách tra sắp xếp và phân loại thông tin'),(1325,23,'2.2.2.4','Biết cách đánh giá độ tin cậy của thông tin'),(1326,23,'2.2.2.5','Có khả năng xác định các vấn đề nghiên cứu còn tồn đọng'),(1327,23,'2.2.2.6','Biết cách liệt kê trích dẫn về tài liệu tham khảo'),(1328,23,'2.2.3.','Khảo sát trên thực tế'),(1329,23,'2.2.3.1','Hiểu các phương pháp thực hiện khảo sát thực tế'),(1330,23,'2.2.3.2','Hiểu các chiến thuật để hình thành bài khảo sát'),(1331,23,'2.2.3.3','Có khả năng vận dụng các công cụ máy tính để thực hiện khảo sát'),(1332,23,'2.2.3.4','Có khả năng tiến hành khảo sát trên nhiều nhóm khác nhau'),(1333,23,'2.2.4.','Kiểm chứng và bảo vệ giả thuyết'),(1334,23,'2.2.4.1','Có khả năng đưa ra các kết luận, quyết định từ kết quả khảo sát'),(1335,23,'2.2.4.2','Có khả năng xác định các ưu, khuyết điểm của cuộc khảo sát'),(1336,23,'2.2.4.3','Có khả năng viết báo cáo tổng kết quá trình khảo sát'),(1337,23,'2.3..','Suy nghĩ tầm mức hệ thống'),(1338,23,'2.3.1.','Suy nghĩ toàn cục'),(1339,23,'2.3.1.1','Có khả năng hiểu được cấu trúc của hệ thống '),(1340,23,'2.3.1.2','Có khả năng hiểu được cơ chế hoạt động của hệ thống'),(1341,23,'2.3.1.3','Có khả năng hiểu được tác động của hệ thống với ngoại cảnh và ngược lại'),(1342,23,'2.3.2.','Sự tương tác giữa các thành phần trong hệ thống'),(1343,23,'2.3.2.1','Có khả năng hiểu được cấu trúc của từng thành phần trong hệ thống'),(1344,23,'2.3.2.2','Có khả năng hiểu được cơ chế hoạt động của từng thành phần trong hệ thống'),(1345,23,'2.3.2.3','Có khả năng hiểu được tác động giữa các thành phần trong hệ thống '),(1346,23,'2.3.3.','Xác định độ ưu tiên và quan trọng'),(1347,23,'2.3.3.1','Có khả năng hiểu được mức độ quan trọng của từng thành phần trong hệ thống '),(1348,23,'2.3.3.2','Có khả năng hiểu được mức độ ưu tien của từng thành phần trong hệ thống'),(1349,23,'2.3.3.3','Giải thích sự phân bổ nguồn lực để giải quyết vấn đề'),(1350,23,'2.3.4.','Đánh giá hệ thống'),(1351,23,'2.3.4.1','Có khả năng đánh giá hệ thống dựa vào kết quả định tính và định lượng'),(1352,23,'2.3.4.2','Có khả năng đánh giá tính hiệu quả và hữu dụng của hệ thống và việc sử dụng tài nguyên '),(1353,23,'2.3.4.3','Lựa chọn và sử dụng các phương pháp cân bằng nhiều yếu tố khác nhau, giải quyết mâu thuẩn và tối ưu hóa toàn bộ hệ thống.'),(1354,23,'2.4..','Tự học và học suốt đời'),(1355,23,'2.4.1.','Tự phát triển kiến thức nghề nghiệp'),(1356,23,'2.4.1.1','  Hiểu biết động lực của tự phát triển kiến thức nghề nghiệp.'),(1357,23,'2.4.1.2','Có các kỹ năng và kiến thức nền tảng cho việc cập nhật các kiến thức mới trong lĩnh vực'),(1358,23,'2.4.1.3','Thể hiện được các kỹ năng tự học'),(1359,23,'2.4.2.','Đeo đuổi và tìm kiếm các tri thức và công nghệ mới'),(1360,23,'2.4.2.1','  Hiểu biết động lực trong việc cập nhật tri thức và công nghệ mới'),(1361,23,'2.4.2.2','Có các kỹ năng tìm kiếm các tri thức và công nghệ mới'),(1362,23,'2.4.3.','Cập nhật '),(1363,23,'2.4.3.1','Có khả năng hiểu biết tiến trình phát triển của công nghệ và tri thức trong lĩnh vực'),(1364,23,'2.4.3.2','Có khả năng giải thích mối liên hệ giữa lý thuyết và thực tế của lĩnh vực '),(1365,23,'2.4.3.3','Có khả năng thích ứng với sự thay đổi công nghệ , tri thức trong lĩnh vực'),(1366,23,'2.4.3.4','Có khả năng liệt kê và thảo luận các xu hướng chính hiện nay trong lĩnh vực'),(1367,23,'2.5..','Quản trị dự án'),(1368,23,'2.5.1.','Quản lý dự án và theo dõi'),(1369,23,'2.5.1.1','Hiểu biết yêu cầu của dự án và khà năng đáp ứng về nhân lực, tài nguyên.'),(1370,23,'2.5.1.2','Hiểu cách tổ chức và phân công công việc đáp ứng yêu cầu dự án'),(1371,23,'2.5.1.3','Hiểu cách giám sát tiến độ và chất lượng thực hiện dự án.'),(1372,23,'2.5.2.','Phân bổ vai trò/nhân sự'),(1373,23,'2.5.2.1','Có khả năng tìm thấy nguồn tài nguyên thích hợp nhất cho mỗi công việc'),(1374,23,'2.5.2.2','Có khả năng phát huy thế mạnh của từng thành viên nhằm đem lại hiệu quả chung của công việc.'),(1375,23,'2.5.3.','Phân tích và quản trị rủi ro'),(1376,23,'2.5.3.1','Có khả năng lường trước các rủi ro khách quan và chủ quan có thể xảy ra đối với dự án.'),(1377,23,'2.5.3.2','Biết cách đối phó và chuẩn bị phương án đối phó với các rủi ro.'),(1378,23,'3...','KỸ NĂNG PHỐI HỢP GIỮA CÁC CÁ NHÂN'),(1379,23,'3.1..','Tính cách cá nhân'),(1380,23,'3.1.1.','Độc lập'),(1381,23,'3.1.1.1','Thể hiện sự sẵn sàng và khả năng làm việc độc lập'),(1382,23,'3.1.2.','Tự tin trong môi trường nghề nghiệp'),(1383,23,'3.1.2.1','Thể hiện sự nhiệt tình trong công việc'),(1384,23,'3.1.2.2','Thể hiện sự quan tâm đến mọi người xung quanh'),(1385,23,'3.1.2.3','Thể hiện sự sẵn sàng hợp tác với những người xung quanh'),(1386,23,'3.1.2.4','Sẵn sàng trao đổi thẳng thắn, góp ý, tranh luận với đồng nghiệp và cấp trên khi cần thiết'),(1387,23,'3.1.2.5','Thể hiện sự phê bình và tự phê bình'),(1388,23,'3.1.3.','Sẵn sàng ra quyết định'),(1389,23,'3.1.3.1','Xác định dược các giải pháp và độ ưu tiên cho vấn đề cần giải quyết'),(1390,23,'3.1.3.2','Thể hiện sự sẵn sàng chấp nhận rủi ro khi chọn giải pháp'),(1391,23,'3.1.3.3','Lựa chọn giải pháp phù hợp nhất trong ngữ cảnh'),(1392,23,'3.1.3.4','Sẵn sàng chấp nhận rủi ro và trách nhiệm '),(1393,23,'3.1.4.','Cách nghĩ sáng tạo'),(1394,23,'3.1.4.1','Thể hiện cách nghĩ trừu tượng (ở mức concept, abstract….)'),(1395,23,'3.1.4.2','Thể hiện cách tổng quát hóa'),(1396,23,'3.1.4.3','Thực hiện tiến trình sáng tạo'),(1397,23,'3.1.4.4','Có khả năng thảo luận vai trò của sự sáng tạo trong nghệ thuật, khoa học, công nghệ…'),(1398,23,'3.1.5.','Cách nghĩ mang tính phản biện'),(1399,23,'3.1.5.1','Phân tích phát biểu của vấn đề'),(1400,23,'3.1.5.2','Chọn lựa được các phản biện và giải pháp hợp lý'),(1401,23,'3.1.5.3','Đánh giá được các minh chứng hỗ trợ'),(1402,23,'3.1.5.4','Định hình được các góc nhìn, lý thuyết, sự kiện đối lập'),(1403,23,'3.1.5.5','Kiểm chứng được giả thuyết và đưa ra kết luận'),(1404,23,'3.1.6.','Thích nghi vào môi trường mới'),(1405,23,'3.1.6.1','Thể hiện được khả năng đáp ứng, thích nghi với những thay đổi'),(1406,23,'3.1.7.','Quản lý tài nguyên cá nhân (thời gian, tiền bạc…)'),(1407,23,'3.1.7.1','Có thể thảo luận về các nhiệm vụ và mức độ ưu tiên của công việc'),(1408,23,'3.1.7.2','Giải thích sự quan trọng và cấp thiết của nhiệm vụ'),(1409,23,'3.1.7.3','Giải thích sự tiến hành hiệu quả các nhiệm vụ'),(1410,23,'3.2..','Kỹ năng nhóm'),(1411,23,'3.2.1.','Xác định vai trò thành viên hay lãnh đạo nhóm'),(1412,23,'3.2.1.1','Xác định được công việc liên quan đến từng loại vai trò trong nhóm'),(1413,23,'3.2.1.2','Xác định được mục đích, nhiệm vụ của nhóm'),(1414,23,'3.2.2.','Thành lập nhóm'),(1415,23,'3.2.2.1','Xác định quy trình thành lập nhóm'),(1416,23,'3.2.2.2','Lựa chọn thành viên'),(1417,23,'3.2.2.3','Phân tích được điểm mạnh, yếu của nhóm'),(1418,23,'3.2.2.4','Nhận thức được điểm mạnh, yếu của nhóm'),(1419,23,'3.2.2.5','Đề xuất các nguyên tác hoạt động của nhóm'),(1420,23,'3.2.3.','Quản lý tiến trình hoạt động của nhóm'),(1421,23,'3.2.3.1','Xác định được kế hoạch làm việc của nhóm'),(1422,23,'3.2.3.2','Triển khai kế hoạch làm việc'),(1423,23,'3.2.3.3','Giám sát và giải quyết các vấn đề phát sinh'),(1424,23,'3.2.3.4','Đánh giá kết quả thực hiện'),(1425,23,'3.2.3.5','Biết được các cách đánh giá các thành viên trong nhóm'),(1426,23,'3.2.3.6','Biết được cách tạo động cơ cho nhóm'),(1427,23,'3.3..','Giao tiếp'),(1428,23,'3.3.1.','Kỹ năng giao tiếp nghe, nói, đọc, viết'),(1429,23,'3.3.1.1','Biết lắng nghe, tôn trọng ý kiến người khác'),(1430,23,'3.3.1.2','Hình thành ý tưởng chặt chẽ và logic khi giao tiếp'),(1431,23,'3.3.1.3','Đưa ra minh chứng hỗ trợ khi giao tiếp'),(1432,23,'3.3.1.4','Biết cách đọc và tóm lược những ý chính'),(1433,23,'3.3.1.5','Viết đúng chính tả, ngữ pháp, mạch lạc'),(1434,23,'3.3.1.6','Có khả năng trình bày theo các văn phong khác nhau: (tóm tắt, báo cáo, tài liệu kỹ thuật)'),(1435,23,'3.3.2.','Kỹ năng trình bày'),(1436,23,'3.3.2.1','Có khả năng sử dụng các công cụ hỗ trợ khi trình bày'),(1437,23,'3.3.2.2','Tự tin và biết cách sử dụng được giao tiếp phi ngôn từ (điệu bộ, cử chỉ,…)'),(1438,23,'3.3.2.3','Có khả năng biên soạn các nội dung phù hợp (hình ảnh, âm thanh...) với yêu cầu trình bày'),(1439,23,'3.3.3.','Kỹ năng đàm phán'),(1440,23,'3.3.3.1','Nhận biết được các mâu thuẩn cần giải quyết'),(1441,23,'3.3.3.2','Đề xuất các giải pháp để hóa giải mâu thuẩn'),(1442,23,'3.3.3.3','Có khả năng thuyết phục các bên liên quan khi có mẫu thuẩn'),(1443,23,'3.3.4.','Kỹ năng phát triển các mối quan hệ xã hội'),(1444,23,'3.3.4.1','Biết cách xây dựng mối quan hệ với các bạn bè, đồng nghiệp'),(1445,23,'3.3.4.2','Biết cách xây dựng mạng lưới giao tiếp ngoài xã hội'),(1446,23,'3.4..','Các kỹ năng về ngoại ngữ'),(1447,23,'3.4.1.','Kỹ năng nói tiếng Anh'),(1448,23,'3.4.1.1','Có khả năng giao tiếp cơ bản bằng tiếng Anh'),(1449,23,'3.4.1.2','Có khả năng giao tiếp về chuyên môn trong lĩnh vực CNTT'),(1450,23,'3.4.2.','Kỹ năng nghe tiếng Anh'),(1451,23,'3.4.2.1','Có khả năng nghe và hiểu được các câu giao tiếp cơ bản bằng tiếng Anh'),(1452,23,'3.4.2.2','Có khả năng hiểu được khi nghe các từ chuyên môn trong lĩnh vực CNTT'),(1453,23,'3.4.3.','Kỹ năng đọc tiếng Anh'),(1454,23,'3.4.3.1','Có khả năng đọc/hiểu các tài liệu cơ bản bằng tiếng Anh'),(1455,23,'3.4.3.2','Có khả năng đọc và hiểu các tài liệu kỹ thuật bằng tiếng Anh trong lĩnh vực CNTT'),(1456,23,'3.4.4.','Kỹ năng viết tiếng Anh'),(1457,23,'3.4.4.1','Có khả năng viết bài luận ngắn bằng tiếng Anh hướng chủ đề chuyên môn'),(1458,23,'3.4.4.2','Có khả năng viết báo cáo kỹ thuật bằng tiếng Anh theo mẫu '),(1459,23,'3.4.5.','Sử dụng các thuật ngữ chuyên ngành'),(1460,23,'3.4.5.1','Hiểu và dùng đúng các thuật ngữ chuyên ngành'),(1461,23,'4...','ÁP DỤNG KIẾN THỨC ĐỂ ĐEM LẠI LỢI ÍCH CHO XÃ HỘI BẰNG CÁC NĂNG LỰC C-D-I-O'),(1462,23,'4.1..','Các công cụ và công nghệ hỗ trợ'),(1463,23,'4.1.1.','Nhận thức được các công cụ, kỹ thuật, công nghệ hỗ trợ'),(1464,23,'4.1.1.1','Biết được các công cụ, môi trường hỗ trợ '),(1465,23,'4.1.1.2','Biết được các kỹ thuật và công nghệ phổ biến có thể áp dụng phù hợp'),(1466,23,'4.1.1.3','Biết được cách tìm kiếm các công cụ, công nghệ liên quan'),(1467,23,'4.1.2.','Sử dụng các công cụ và công nghệ'),(1468,23,'4.1.2.1','Có khả năng đọc hiểu được các công cụ và công nghệ liên quan'),(1469,23,'4.1.2.2','Có khả năng phân tích điểm mạnh/yếu và phù hợp của công cụ và công nghệ liên quan'),(1470,23,'4.1.2.3','Biết cách vận hành các công cụ và công nghệ liên quan để phát triển hệ thống'),(1471,23,'4.1.3.','Tiến trình và chu kỳ sống của hệ thống'),(1472,23,'4.1.3.1','Có kiến thức về các tiến trình phát triển tổng quát cho một hệ thống'),(1473,23,'4.1.3.2','Hiểu các pha trong tiến trình phát triển hệ thống'),(1474,23,'4.1.3.3','Hiểu rõ vòng đời/chu kỳ sống của một hệ thống'),(1475,23,'4.1.4.','Nhận thức các chứng chỉ, tiêu chuẩn liên quan'),(1476,23,'4.1.4.1','Nhận thức được các chứng chỉ dành cho các hệ thống CNTT (CMMi, ISO…)'),(1477,23,'4.1.4.2','Nhận thức được các tiêu chuẩn phổ biến trong phát triển các sản phẩm CNTT'),(1478,23,'4.2..','Hình thành ý tưởng/bài toán/dự án'),(1479,23,'4.2.1.','Xác định mục tiêu của bài toán/dự án và thu thập yêu cầu'),(1480,23,'4.2.1.1','Biết các phương pháp thu thập các yêu cầu của người dùng/hệ thống'),(1481,23,'4.2.1.2','Tìm hiểu mục tiêu của hệ thống, thu thập và khai thác yêu cầu của người dùng/hệ thống'),(1482,23,'4.2.1.3','Hiểu được các loại yêu cầu (yêu cầu chức năng, yêu cầu phi chức năng…)'),(1483,23,'4.2.2.','Phân tích và nghiên cứu tính khả thi của bài toán/dư án'),(1484,23,'4.2.2.1','Phân tích được các kết quả thu thập từ người dùng/hệ thống'),(1485,23,'4.2.2.2','Đánh giá được tính phù hợp và khả thi của các yêu câu người dùng/hệ thống'),(1486,23,'4.2.3.','Đặc tả mục tiêu, yêu cầu của bài toán/dư án'),(1487,23,'4.2.3.1','Có khả năng xây dựng tài liệu đặc tả yêu cầu người dùng/hệ thống'),(1488,23,'4.2.3.2','Có khả năng liệt kê được các tình huống hoạt động khác nhau của hệ thống'),(1489,23,'4.3..','Thiết kế  hệ thống CNTT (giải pháp, sản phẩm, ...)'),(1490,23,'4.3.1.','Tiến trình và phương pháp thiết kế'),(1491,23,'4.3.1.1','Hiểu các tiến trình và phương pháp thiết kế khác nhau'),(1492,23,'4.3.1.2','Hiểu rõ được các thành phần cần được thiết kế của hệ thống'),(1493,23,'4.3.1.3','Đánh giá được bản thiết kế phù hợp với mục tiêu của hê thống'),(1494,23,'4.3.1.4','Vận dụng được các kiến thức và kỹ năng và các kết quả đã có vào thiết kế'),(1495,23,'4.3.1.5','Tổng hợp được các thành phần thiết kế khác nhau để đạt kết quả thiết kế cuối cùng'),(1496,23,'4.3.2.','Thiết kế kiến trúc và các thành phần của  hệ thống CNTT (chức năng, CSDL, ,,,)'),(1497,23,'4.3.2.1','Xây dựng được bản thiết kế về các thành phần của hệ thống ở các mức trừu tượng khác nhau.'),(1498,23,'4.3.2.2','Có khả năng sử dụng các tri thức bổ sung các giai đoạn khác (như phân tích, hiện thực hóa, …) và các kết quả phân tích -đánh giá để điều chỉnh lại bản thiết kế.'),(1499,23,'4.3.2.3','Hiểu cách chọn kỹ thuật, công cụ phù hợp cho thiết kế'),(1500,23,'4.3.2.4','Phân tích và đánh giá được các cách thiết kế khác nhau cho bài toán'),(1501,23,'4.3.3.','Thiết kế đa ngành, đa mục tiêu'),(1502,23,'4.3.3.1','Chỉ ra được sự tương tác và sự khác biệt giữa các ngành khác nhau'),(1503,23,'4.3.3.2','Có thể thiết kế theo các mục tiêu khác nhau: tốc độ, chi phí, dễ bảo trì, tiến hóa…'),(1504,23,'4.4..','Hiện thực hóa (implementation)'),(1505,23,'4.4.1.','Các tiến trình và phương pháp hiện thực hóa'),(1506,23,'4.4.1.1',' Biết được mục tiêu và các độ đo gắn liền với kỹ thuật&công nghệ (chất lượng, chi phí, thời gian...)'),(1507,23,'4.4.1.2','Có khả năng lựa chọn phương pháp hiện thực hóa phù hợp với mục tiêu  hệ thống và các ràng buộc thiết kế'),(1508,23,'4.4.1.3','Biết được tiến trình chuyển hóa bảng thiết kế cấp cao thành cấp thấp'),(1509,23,'4.4.1.4','Hiểu được ngôn ngữ, công cụ, môi trường sử dụng để phát triển hệ thống'),(1510,23,'4.4.2.','Hiện thực hóa hệ thống dựa trên thiết kế'),(1511,23,'4.4.2.1','Hiểu được bản thiết kế hệ thống'),(1512,23,'4.4.2.2','Có khả năng hiện thực hóa dựa trên một bảng thiết kế chi tiết'),(1513,23,'4.4.3.','Tích hợp các thành phần trong hệ thống'),(1514,23,'4.4.3.1','Hiểu được mối liên hệ giữa các thành phần của hệ thống'),(1515,23,'4.4.3.2','Có khả năng gắn kết các thành phần của hệ thống theo thiết kế'),(1516,23,'4.5..','Kiểm chứng'),(1517,23,'4.5.1.','Tiến trình và phương pháp kiểm chứng'),(1518,23,'4.5.1.1','Biết các tiến trình và phương pháp kiểm chứng'),(1519,23,'4.5.1.2','Hiểu tầm quan trọng của kiếm chứng trong phát triển sản phẩm CNTT'),(1520,23,'4.5.2.','Kiểm chứng các yêu cầu'),(1521,23,'4.5.2.1','Có khả năng kiểm tra tính khả thi của yêu cầu'),(1522,23,'4.5.2.2','Có khả năng kiểm tra sự phù hợp của giải pháp so với yêu cầu'),(1523,23,'4.5.3.','Kiểm chứng các thành phần hay toàn bộ hệ thống'),(1524,23,'4.5.3.1','Có khả năng kiểm tra tính đúng đắn của từng thành phần'),(1525,23,'4.5.3.2','Có khả năng kiểm tra tính đúng đăn và hợp lý trong quá trình tích hợp các thành phần'),(1526,23,'4.5.3.3','Có khả năng kiểm tra toàn bộ hệ thống'),(1527,23,'4.6..','Vận hành và bảo trì'),(1528,23,'4.6.1.','Huấn luyện và vận hành'),(1529,23,'4.6.1.1','Có khả năng viết tài liệu hướng dẫn sử dụng cho hệ thống'),(1530,23,'4.6.1.2','Có khả năng huấn luyện khách hàng về các tính năng của hệ thống'),(1531,23,'4.6.1.3','Có khả năng tiếp thu, hiểu và vận hành được một hệ thống mới sau khi được huấn luyện'),(1532,23,'4.6.2.','Quản lý việc vận hành'),(1533,23,'4.6.2.1','Có khả năng mô tả cách tổ chức và cấu trúc sẵn sàng cho việc vận hành'),(1534,23,'4.6.2.2','Nhận biết các mối liên quan đến việc vận hành'),(1535,23,'4.6.2.3','Mô tả được các tiến trình cần cho việc vận hành'),(1536,23,'4.6.2.4','Biết được chi phí vận hành, năng lực hệ thống'),(1537,23,'4.6.2.5','Biết được sự đảm bảo chất lượng và an toàn khi vận hành'),(1538,23,'4.6.2.6','Biết tuân thủ qui trình vận hành một cách nghiêm ngặt'),(1539,23,'4.6.3.','Bảo trì hệ thống'),(1540,23,'4.6.3.1','Biết được các tiến trình bảo trì sản phẩm'),(1541,23,'4.6.3.2','Có khả năng xác định các vấn đề của sản phẩm'),(1542,23,'4.7..','Cải tiến và kết thúc'),(1543,23,'4.7.1.','Cải tiến hệ thống '),(1544,23,'4.7.1.1','Nhận biết được các chi tiết bất hợp lý của hệ thống.'),(1545,23,'4.7.1.2','Có khả năng chỉ ra các cải tiến có thể có cho hệ thống'),(1546,23,'4.7.1.3','Nhận biết được sự cần thiết phải cải tiến dựa trên sự vận hành của hệ thống'),(1547,23,'4.7.2.','Kết thúc và hủy bỏ hệ thống'),(1548,23,'4.7.2.1','Định nghĩa được các vấn đề khi hủy bỏ hệ thống'),(1549,23,'4.7.2.2','Có khả năng liệt kê các tình huống kết thúc khác nhau cho hệ thống'),(1550,23,'4.7.2.3','Có khả năng xác định được giá trị còn lại của hệ thống sau khi bị hủy bỏ');
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
-- Table structure for table `detailteachplanblock`
--

DROP TABLE IF EXISTS `detailteachplanblock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `detailteachplanblock` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `IdTeachPlan` int(11) NOT NULL,
  `IdSubject` int(11) NOT NULL,
  `Note` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `DateCreated` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_TeachPlan_DetailTeachPlan` (`IdTeachPlan`),
  KEY `fk_Subject_DetailTeachPlan` (`IdSubject`),
  CONSTRAINT `fk_Subject_DetailTeachPlan` FOREIGN KEY (`IdSubject`) REFERENCES `subject` (`Id`),
  CONSTRAINT `fk_TeachPlan_DetailTeachPlan` FOREIGN KEY (`IdTeachPlan`) REFERENCES `teachplanblock` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detailteachplanblock`
--

LOCK TABLES `detailteachplanblock` WRITE;
/*!40000 ALTER TABLE `detailteachplanblock` DISABLE KEYS */;
INSERT INTO `detailteachplanblock` VALUES (1,4,3,'Tích lũy đủ 3 tín chỉ với nhóm 3A',NULL),(2,4,5,'Tích lũy đủ 3 tín chỉ với nhóm 3A',NULL),(3,5,1,'Tích lũy đủ 3 tín chỉ với nhóm 3A',NULL),(4,5,8,'Tích lũy đủ 3 tín chỉ với nhóm 3A',NULL),(5,6,6,'Tích lũy đủ 3 tín chỉ với nhóm 3A',NULL),(6,6,7,'Tích lũy đủ 3 tín chỉ với nhóm 3A',NULL),(7,9,1,'Tích lũy đủ 3 tín chỉ với nhóm 3A',NULL),(8,9,8,'Tích lũy đủ 3 tín chỉ với nhóm 3A',NULL),(9,8,6,'Tích lũy đủ 3 tín chỉ với nhóm 3A',NULL),(10,8,7,'Tích lũy đủ 3 tín chỉ với nhóm 3A',NULL),(11,7,3,'Tích lũy đủ 3 tín chỉ với nhóm 3A',NULL),(12,7,5,'Tích lũy đủ 3 tín chỉ với nhóm 3A',NULL);
/*!40000 ALTER TABLE `detailteachplanblock` ENABLE KEYS */;
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
  PRIMARY KEY (`Id`),
  KEY `fk_major_eduprog` (`IdMajor`),
  KEY `fk_level_eduprog` (`IdLevel`),
  KEY `fk_program_eduprog` (`IdProgram`),
  CONSTRAINT `fk_level_eduprog` FOREIGN KEY (`IdLevel`) REFERENCES `level` (`Id`),
  CONSTRAINT `fk_major_eduprog` FOREIGN KEY (`IdMajor`) REFERENCES `major` (`Id`),
  CONSTRAINT `fk_program_eduprog` FOREIGN KEY (`IdProgram`) REFERENCES `program` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eduprogram`
--

LOCK TABLES `eduprogram` WRITE;
/*!40000 ALTER TABLE `eduprogram` DISABLE KEYS */;
INSERT INTO `eduprogram` VALUES (6,'CTDT_ABET_Khoa 2017_28Apr2017_KTPM','',1,1,1,'2017','2019-05-08 18:52:19','2019-05-08 19:37:24');
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `outcomestandard`
--

LOCK TABLES `outcomestandard` WRITE;
/*!40000 ALTER TABLE `outcomestandard` DISABLE KEYS */;
INSERT INTO `outcomestandard` VALUES (23,'CĐR Khoa CNTT 2019',1,1,1,'2019','2019-05-08 18:46:22','2019-05-09 01:46:22');
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revision`
--

LOCK TABLES `revision` WRITE;
/*!40000 ALTER TABLE `revision` DISABLE KEYS */;
INSERT INTO `revision` VALUES (14,23,1,'CĐR Khoa CNTT 2019','2019-05-08 18:46:22');
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES (1,'BAA00001','Những nguyên lý cơ bản của chủ nghĩa Mác - Lê Nin',NULL,5,75,0,0,NULL,'2019-03-02 00:00:00','2019-03-02 00:00:00'),(2,'BAA00002','Đường lối cách mạng của ĐCSVN',NULL,3,45,0,0,NULL,'2019-03-02 00:00:00','2019-03-02 00:00:00'),(3,'BAA00003','Tư tưởng HCM',NULL,2,30,0,0,NULL,'2019-03-02 00:00:00','2019-03-02 00:00:00'),(4,'BAA00004','Pháp luật đại cương',NULL,3,45,0,0,NULL,'2019-03-02 00:00:00','2019-03-02 00:00:00'),(5,'BAA00005','Kinh tế đại cương',NULL,2,30,0,0,NULL,'2019-03-02 00:00:00','2019-03-02 00:00:00'),(6,'MTH00003','Vi tích phân 1B',NULL,3,45,0,0,NULL,NULL,NULL),(7,'MTH00081','Thực hành Vi tích phân 1B',NULL,1,0,30,0,NULL,NULL,NULL),(8,'MTH00004','Vi tích phân 2B',NULL,3,45,0,0,NULL,NULL,NULL),(9,'MTH00082','Thực hành Vi tích phân 2B',NULL,1,0,30,0,NULL,NULL,NULL),(21,'MTH00030','Đại số tuyến tính',NULL,3,45,0,0,NULL,'2019-05-07 17:00:00','2019-05-07 17:00:00'),(22,'MTH00040','Xác suất thống kê',NULL,3,45,0,0,NULL,'2019-05-07 17:00:00','2019-05-07 17:00:00'),(23,'MTH00041','Toán rời rạc',NULL,3,45,0,0,NULL,'2019-05-07 17:00:00','2019-05-07 17:00:00'),(24,'BAA00006','Tâm lý đại cương',NULL,2,30,0,0,NULL,'2019-05-07 17:00:00','2019-05-07 17:00:00'),(25,'BAA00007','Phương pháp luận sáng tạo',NULL,2,30,0,0,NULL,'2019-05-07 17:00:00','2019-05-07 17:00:00');
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
  PRIMARY KEY (`ID`),
  KEY `fk_subject` (`IdSubject`),
  KEY `fk_eduprogram` (`IdEduProg`),
  CONSTRAINT `fk_eduprogram` FOREIGN KEY (`IdEduProg`) REFERENCES `eduprogram` (`Id`),
  CONSTRAINT `fk_subject` FOREIGN KEY (`IdSubject`) REFERENCES `subject` (`Id`)
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
-- Table structure for table `teachplanblock`
--

DROP TABLE IF EXISTS `teachplanblock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `teachplanblock` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `IdDetailEdu` int(11) NOT NULL,
  `Semester` int(11) DEFAULT NULL,
  `DateCreated` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_TeachPlan_DetailEduProg` (`IdDetailEdu`),
  CONSTRAINT `fk_TeachPlan_DetailEduProg` FOREIGN KEY (`IdDetailEdu`) REFERENCES `detaileduprogram` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachplanblock`
--

LOCK TABLES `teachplanblock` WRITE;
/*!40000 ALTER TABLE `teachplanblock` DISABLE KEYS */;
INSERT INTO `teachplanblock` VALUES (1,8,NULL,NULL),(2,8,NULL,NULL),(3,8,NULL,NULL),(4,8,NULL,NULL),(5,8,NULL,NULL),(6,8,NULL,NULL),(7,8,1,NULL),(8,8,3,NULL),(9,8,2,NULL);
/*!40000 ALTER TABLE `teachplanblock` ENABLE KEYS */;
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

-- Dump completed on 2019-05-15 14:07:49
