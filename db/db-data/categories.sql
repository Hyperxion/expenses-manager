-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               PostgreSQL 16.2, compiled by Visual C++ build 1937, 64-bit
-- Server OS:                    
-- HeidiSQL Version:             12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping data for table public.transaction_category: 2 rows
/*!40000 ALTER TABLE "transaction_category" DISABLE KEYS */;
INSERT INTO "transaction_category" ("id", "name", "userId", "createdAt", "updatedAt", "deletedAt") VALUES
('59871e85-f7c0-499a-a652-8cbad3e86bfc', 'Alkohol', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('7b88ecfc-7c9a-4b13-b374-fb928d97a51a', 'Auto', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('4ddd2604-3fb6-4385-b487-e01ad85ecddd', 'Biznis', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('12550a53-6ae2-475b-9214-c351b5f0c561', 'Darceky', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('d97e9a25-cf38-4412-a4fd-a8f5894a4974', 'Domacnost', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('0b07a251-1d03-410c-a738-1e4db2a0394f', 'Doprava', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('48489f39-2167-4fd8-812e-7580025daf8c', 'Drogeria', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('1356b06a-c55c-42c6-86f8-f6fbe23dd794', 'Hobby', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('d0446db9-b50c-4cbb-b6dc-41db1b3cefe1', 'Investicia', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('87c47560-e88a-4568-a783-1f28cc7ddbde', 'Jasle', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('7b511341-4ebf-44a0-8000-6c671ac73869', 'Jedlo - objednane', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('5b837409-21ad-4ac4-831d-7481eb75e064', 'Mobilne Sluzby', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('31d5d3a7-7a72-4bf3-9fde-0b0be7378f31', 'Nabytok/Byt/Spotrebice', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('e63e70ef-2983-4d01-baef-2ba84ca28d09', 'Najom', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('821a5d02-87b2-4b4e-b6d3-339736695e30', 'Oblecenie', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('b98a8b8c-6c50-455f-ba66-39d42360e5e1', 'PHM', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('eaa2d4e2-c591-482e-88af-c5e604386d7e', 'Pokuta', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('61e6ea02-8b47-4b91-8ab6-96a6c3de7297', 'Potraviny', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('b64767e5-51cb-482c-a079-e2605e75e444', 'Potraviny - Pochutiny', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('01ee08cc-cc76-499b-a7fe-859d2739e6e8', 'Psikovia', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('5cee58fc-51aa-473f-abbb-175299bbe802', 'Spolocenska Zabava', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('bc631c39-88ec-4587-82ba-bc27d8f266e8', 'TatraBanka', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('300e5d5e-896d-485b-bf65-122892814f18', 'Vylet', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('d458b691-d45d-4d95-9ea6-8ec90c27ca78', 'Vyplata', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('38c2a58f-1a35-44a9-940e-20b89c997111', 'Zdravie', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL);
/*!40000 ALTER TABLE "transaction_category" ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
