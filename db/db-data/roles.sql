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

-- Dumping data for table public.role: 1 rows
/*!40000 ALTER TABLE "role" DISABLE KEYS */;
INSERT INTO "role" ("id", "name", "description", "createdAt", "updatedAt", "deletedAt") VALUES
('5aa5924d-e9e0-4054-884c-af20e1ccaeca','admin'       ,'Správca všetkého'                                  ,NOW(), NOW(), NULL),
('54baf8d8-4c48-4110-a5b2-a68b346b894e','redactor'    ,'Správca iba vlastných tabuliek'                    ,NOW(), NOW(), NULL),
('789bb232-d29e-4d0b-b958-8558add71b86','co-redactor' ,'Správca iba povolených tabuliek'                   ,NOW(), NOW(), NULL),
('0db108e4-4549-4cef-b8dc-8ca738d812f5','reader'      ,'Čitateľ iba vlastných a/alebo povolených tabuliek' ,NOW(), NOW(), NULL);

/*!40000 ALTER TABLE "role" ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
