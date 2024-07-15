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

-- Dumping data for table public.currency: 3 rows
/*!40000 ALTER TABLE "currency" DISABLE KEYS */;
INSERT INTO "currency" ("id", "name", "abbreviation", "createdAt", "updatedAt", "deletedAt") VALUES
	('53da56ba-f65b-40f5-a3ec-062ab2843bc3', 'Euro', 'EUR', '2024-07-08 18:21:18', '2024-07-08 18:21:19', NULL),
	('3ed69195-f967-4919-88ac-bd37928a62d9', 'Dollar', 'USD', '2024-07-08 18:21:43', '2024-07-08 18:21:44', NULL),
	('662bfd55-d24e-463d-955b-b9238baa566e', 'Czech Crown', 'CZK', '2024-07-08 18:22:03', '2024-07-08 18:22:04', NULL);
/*!40000 ALTER TABLE "currency" ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
