-- Do NOT change
INSERT INTO roles (id,name,description,createdAt,updatedAt,deletedAt) VALUES
('5aa5924d-e9e0-4054-884c-af20e1ccaeca','admin'       ,'Správca všetkého'                                  ,NOW(), NOW(), NULL),
('54baf8d8-4c48-4110-a5b2-a68b346b894e','redactor'    ,'Správca iba vlastných tabuliek'                    ,NOW(), NOW(), NULL),
('789bb232-d29e-4d0b-b958-8558add71b86','co-redactor' ,'Správca iba povolených tabuliek'                   ,NOW(), NOW(), NULL),
('0db108e4-4549-4cef-b8dc-8ca738d812f5','reader'      ,'Čitateľ iba vlastných a/alebo povolených tabuliek' ,NOW(), NOW(), NULL);