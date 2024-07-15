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

-- Dumping data for table public.store: 1 rows
/*!40000 ALTER TABLE "store" DISABLE KEYS */;
INSERT INTO "store" ("id", "name", "createdAt", "updatedAt", "deletedAt", "userId") VALUES
('6794c20d-ccdb-4837-b2e2-923603cffc75','Fresh'            ,NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('9206cf0a-6c49-461e-a879-a2ba3c9b9267','Lidl'             ,NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('bd81e6e0-5f78-4e72-8d34-19ff17cdbb29','Kaufland'         ,NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('ae967de7-b0a8-4a73-99d2-3afe8428b960','Olympic Casino KE',NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('a2457621-9b9c-444c-94e9-8fbc46447a67','Alza'             ,NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('0793a835-9e74-4172-a494-522f9248aa70','Datacomp'         ,NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('4ab9af2c-167f-4264-a251-0148a01e43ee','Tesco'            ,NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('d92ac25a-ab26-4921-920e-4af9314f0409','Gopass'           ,NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('57e2a626-ef40-4ea1-bb31-bbff900fd50f','Boltfood'         ,NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65');
/*!40000 ALTER TABLE "store" ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
