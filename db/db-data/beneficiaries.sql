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

-- Dumping data for table public.beneficiary: 1 rows
/*!40000 ALTER TABLE "beneficiary" DISABLE KEYS */;
INSERT INTO "beneficiary" ("id", "name", "accountNumber", "userId", "createdAt", "updatedAt", "deletedAt") VALUES
('3eb3cff7-dc8c-4ba6-a3fa-515c2193a219','Posta SK'           ,'0200/000000-0008402012', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('c48a7b28-b109-4079-ae70-396525314f1a','Tibor Bodnar'       ,'0900/000000-0449094705', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('ff047a50-f96e-4f5b-9259-2053b5871dd3','Andrea Bodenloszova','0900/000000-5186469466', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('bd56ffef-45f0-4caf-b6e2-5137d47083e8','WÜSTENROT POISŤOVŇA','1100/000000-2628844101', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('65e6caf1-9e1e-48e4-9415-d52a5f1588f4','Jaro Makara'        ,'1100/000000-2910597204', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('767a7ea2-1e48-4468-8500-388857f09cd9','Simon Smida'        ,'1100/000000-2917587674', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('d5148449-a783-4d94-aef4-ceb11e16777d','Lenka Farkasovska'  ,'1100/000000-2918594067', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('1686925e-7c22-43d5-8398-9e049fd1f504','Posta SK 2'         ,'1100/000000-2922480353', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('6b8a0529-c106-42ce-a2a2-c77d732a5509','Jan Kurty'          ,'1100/000000-2937013096', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('5942edbd-aa19-42e9-8596-319cf9ff6985','Martin Korl'        ,'1100/000000-2938711099', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('80948864-149b-4cb1-9878-7e5f83da7390','Rasto Demko'        ,'1111/000000-1713934000', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('3f85b230-b2ad-4617-a739-b9a66c0aee5a','AOMV SR'            ,'8180/000000-7000355129', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL),
('35f9344d-3d5d-4c7e-8786-ad54ad2a5038','Patrik Mlynar'      ,'8330/000000-2301556044', 'e66562a4-dcd9-498e-8977-414349a0df65', NOW(), NOW(), NULL);
/*!40000 ALTER TABLE "beneficiary" ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
