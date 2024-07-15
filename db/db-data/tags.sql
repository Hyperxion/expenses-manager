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

-- Dumping data for table public.tag: 71 rows
/*!40000 ALTER TABLE "tag" DISABLE KEYS */;
INSERT INTO "tag" ("id", "name", "createdAt", "updatedAt", "deletedAt", "userId") VALUES
('5d22ddf9-5e7a-4498-8033-9fffb72d4808', '3dtlac'                , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('60b94b93-f774-4a8d-b99b-9935fdfd894a', 'airsoft'               , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('c2c6bab1-8284-461f-9a22-371983c9020f', 'alibaba'               , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('3daa8687-8e1c-4950-a617-c70ab43e2883', 'alkohol'               , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('59a96936-1147-48a6-a542-444001a9b0ce', 'andreaB'               , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('5aa71e67-7341-4fb6-94a2-8e93b8c78f57', 'auto'                  , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('ce69a052-a8a3-445c-bb8e-62a3e29fc357', 'bazos'                 , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('8104fa62-6845-4084-9948-3d62bac49813', 'biznis'                , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('097bf315-ef0a-4e02-892b-fd9099c9bcea', 'byt'                   , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('b7048853-b3e5-452e-8fd3-94dbcdef23bd', 'cyklistika'            , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('34e2bb35-512b-483c-96ef-b2f5c645a3af', 'darceky'               , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('4eb78f5a-36b0-4d26-811f-52c6a7918351', 'dogtag'                , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('1f237362-b084-4d05-be49-ba1b0dcd6e9b', 'domacnost'             , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('19fb9506-260b-4b66-b386-06f2191c4d91', 'doprava'               , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('34ff7017-a050-40cd-ae59-f35bbcacb437', 'drogeria'              , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('3444ad93-e15f-48a0-9b05-8c60f3f9027d', 'elektronika'           , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('662bffd5-796a-441d-85f8-eac9bb3e6288', 'filamenty'             , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('3abddae4-dd5f-4b9c-94b7-464fd4eae78e', 'ford'                  , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('524dd555-5a89-4b56-a6eb-d9c7df98c2b1', 'fotografovanie'        , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('14d4644e-9558-4627-8269-64ca1c5982bc', 'gaming'                , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('e2b54fa7-813e-4a1c-b94a-30892a736f5f', 'gitara'                , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('a1fcb768-d3b6-4d98-a8cc-85bcb3737de9', 'hobby'                 , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('5e783073-1837-4adc-b4ec-498f0d99f725', 'investicia'            , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('f6777542-fd10-4331-92c4-088f53063980', 'jasle'                 , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('032ef851-ac6b-4923-907c-3743ad8db6a1', 'jedlo'                 , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('3f21f0e8-4632-4275-a67c-fa60ad62cff1', 'kat'                   , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('b69ba1c4-36ac-4048-b92b-bc1a0e4b9ccc', 'kaufland'              , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('f5bedca5-6860-4d3e-ad4d-912814db9939', 'kia'                   , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('674b4386-abd4-48c5-8e84-1a368995f122', 'kodi'                  , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('8bd6d618-7d15-440d-8c53-7c60dc40ccb1', 'masaznePistole'        , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('b76046f4-bc90-4f02-aa28-649dd2f6bc08', 'mobil'                 , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('4376784a-ac38-423d-b95b-2d8cccb29880', 'nabytok/byt/spotrebice', NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('6be12cdd-cd83-4979-8977-4e787f0660d9', 'najom'                 , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('e998da54-bcb3-441a-8afb-2d8a1cd7e44b', 'nezname'               , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('601919bf-90d6-478a-8f19-1e050c1952ed', 'oblecenie'             , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('c6f124c3-2e90-464b-8ad8-b93f6bc5da83', 'obuv'                  , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('bdb11e00-9daa-48af-bf88-edfcbc416bd3', 'paddleboardy'          , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('378200b1-3925-4078-adde-b2c8d929cbef', 'parkovne'              , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('70552268-a07b-451a-b7f6-f9daee0515ba', 'party'                 , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('884987ec-7694-4b4b-bae4-eba578028946', 'pausal'                , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('a84825a5-7096-4b35-a0e9-a7252d746205', 'pc'                    , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('e6f8f18b-5611-4a10-976f-8cebf8894e5b', 'phm'                   , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('3727125f-30e5-4ecb-ab92-53863c54b71f', 'plechovky'             , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('08375440-e347-4390-816e-1961597858eb', 'pochutiny'             , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('ff50aa5e-4282-40e5-aa76-afab3f6399a8', 'podlozka'              , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('7326f9c8-1026-48e1-9871-52c9ebdada64', 'poker'                 , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('aedb3369-988e-4ac3-b37e-bfcdb00ea0ab', 'pokuta'                , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('30bccc21-3aac-4dc7-bb9b-bc004a6c16dc', 'cvicenie'              , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('71e072da-75ba-43bb-9953-ccbd64fc85e1', 'potraviny'             , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('9d7afdec-e06e-4dab-b612-547592c5ea4a', 'psikovia'              , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('7712058a-656c-4cb5-bf26-1d78cc5fdde5', 'pzp'                   , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('e818f1a1-7d9e-45e2-a1b9-763a1070d89b', 'ria'                   , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('e2152ee7-0fc9-42f7-bab5-edb7c9ab8c8e', 'snowboard'             , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('7572bb7d-43ef-4e29-a3d5-66accc21e5cd', 'snp62'                 , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('47118b6e-d027-460a-ae6a-53eef3077c01', 'spolocenskaZabava'     , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('ea3e6d4a-cc4c-469b-887c-7d74f2c8f12e', 'sport'                 , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('92789074-406b-41be-b2f1-f0fd4d252312', 'spotrebice'            , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('2481def1-5534-4ca4-8052-5b6daaa896bf', 'svadba'                , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('cb701c4c-bf36-452e-8cac-d4025932092f', 'tanecna'               , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('0e731c6e-f7ab-4675-b191-5e594b73891d', 'tatrabanka'            , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('461902f8-8b08-4251-bae1-98e265b37de7', 'taxi'                  , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('d6c92aa9-86c6-40d3-94b4-f8fea9cc8af4', 'toyota'                , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('49e574f2-f507-4a60-85b9-182b1767dc07', 'vylet'                 , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('be218009-f8ce-440b-90f6-c902fe9e292a', 'vymedzovacie'          , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('8528d160-98ef-4e38-882a-f584910e9eb3', 'vyplata'               , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('fc76cc2e-435d-4154-bbb4-9920797c1ab3', 'youtube'               , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('ba7ce7f0-63e2-4888-ade6-2c94554ad2a5', 'zabava'                , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('320aca0c-cd73-4348-a731-499a057183df', 'zahrada'               , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('d724bb15-685d-4b80-9ee3-4bee585fa7ec', 'zbrane'                , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('4d7ef362-f68a-46c9-b760-94645dc0926b', 'zdravie'               , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65'),
('03eb8b78-c245-4f3a-ac69-8e2fd8f57050', 'zubar'                 , NOW(), NOW(), NULL, 'e66562a4-dcd9-498e-8977-414349a0df65');
/*!40000 ALTER TABLE "tag" ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
