DROP DATABASE IF EXISTS expenses;
CREATE DATABASE expenses;

USE expenses;

CREATE TABLE users (
  id varchar(36) DEFAULT UUID(),
  username varchar(36) not null,
  password varchar(100),
  email varchar(36),
  createdAt datetime default current_timestamp(),
  updatedAt datetime default current_timestamp() ON UPDATE current_timestamp(),
  deletedAt datetime default null,
  primary key (id),
  unique key(username)
);

CREATE TABLE logsHttpRequests (
  id varchar(36) DEFAULT UUID(),
  userId varchar(36) NULL,
  type VARCHAR(30),
  url VARCHAR(500),
  statusCode INT,
  duration INT,
  errorCode varchar(36),
  errorMessage TEXT,
  createdAt datetime not null default current_timestamp(),
  updatedAt datetime not null default current_timestamp() ON UPDATE current_timestamp(),
  deletedAt datetime default null,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES users (id)
);

CREATE TABLE logsDbCalls (
  id varchar(36) DEFAULT UUID(),
  reqId varchar(36) NOT NULL,
  fileFunction VARCHAR(500),
  ormFunction VARCHAR(100),
  model VARCHAR(80) NOT NULL,
  params JSON,
  createdAt datetime not null default current_timestamp(),
  updatedAt datetime not null default current_timestamp() ON UPDATE current_timestamp(),
  deletedAt datetime default null,
  PRIMARY KEY (id),
  FOREIGN KEY (reqId) REFERENCES logsHttpRequests(id),
  CONSTRAINT params
        CHECK (json_valid(`params`))
);

CREATE TABLE userActivities (
  id varchar(36) DEFAULT UUID(),
  reqId varchar(36) NOT NULL,
  rowId varchar(36),
  attributeName VARCHAR(100),
  oldValue VARCHAR(1000),
  newValue VARCHAR(1000),
  createdAt datetime not null default current_timestamp(),
  updatedAt datetime not null default current_timestamp() ON UPDATE current_timestamp(),
  deletedAt datetime default null,
  PRIMARY KEY (id),
  FOREIGN KEY (reqId) REFERENCES logsHttpRequests(id)
);

CREATE TABLE roles (
  id varchar(36) DEFAULT UUID(),
  name varchar(100) UNIQUE,
  description varchar(255),
  createdAt datetime not null default current_timestamp(),
  updatedAt datetime not null default current_timestamp() ON UPDATE current_timestamp(),
  deletedAt datetime default null,
  PRIMARY KEY (id)
);

CREATE TABLE beneficaries (
  id varchar(36) DEFAULT UUID(),
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  createdAt datetime not null default current_timestamp(),
  updatedAt datetime not null default current_timestamp() ON UPDATE current_timestamp(),
  deletedAt datetime default null,
  PRIMARY KEY (id)
);

CREATE TABLE transactionCategories (
  id varchar(36) DEFAULT UUID(),
  name VARCHAR(255),
  createdAt datetime not null default current_timestamp(),
  updatedAt datetime not null default current_timestamp() ON UPDATE current_timestamp(),
  deletedAt datetime default null,
  PRIMARY KEY (id)
);

CREATE TABLE transactionTypes (
  id varchar(36) DEFAULT UUID(),
  type VARCHAR(100),
  createdAt datetime not null default current_timestamp(),
  updatedAt datetime not null default current_timestamp() ON UPDATE current_timestamp(),
  deletedAt datetime default null,
  PRIMARY KEY (id)
);

CREATE TABLE currencies (
  id varchar(36) DEFAULT UUID(),
  name VARCHAR(100),
  abbreviation VARCHAR(10),
  createdAt datetime not null default current_timestamp(),
  updatedAt datetime not null default current_timestamp() ON UPDATE current_timestamp(),
  deletedAt datetime default null,
  PRIMARY KEY (id)
);

CREATE TABLE stores (
  id varchar(36) DEFAULT UUID(),
  name VARCHAR(100),
  createdAt datetime not null default current_timestamp(),
  updatedAt datetime not null default current_timestamp() ON UPDATE current_timestamp(),
  deletedAt datetime default null,
  PRIMARY KEY (id)
);

CREATE TABLE transactions (
  id varchar(36) DEFAULT UUID(),
  date DATETIME,
  amount DECIMAL(8,2),
  typeId varchar(36),
  categoryId varchar(36),
  note varchar(255),
  beneficaryId VARCHAR(36),
  currencyId VARCHAR(36),
  storeId VARCHAR(36),
  createdAt datetime not null default current_timestamp(),
  updatedAt datetime not null default current_timestamp() ON UPDATE current_timestamp(),
  deletedAt datetime default null,
  PRIMARY KEY (id),
  FOREIGN KEY (typeId) REFERENCES transactionTypes (id),
  FOREIGN KEY (categoryId) REFERENCES transactionCategories (id),
  FOREIGN KEY (currencyId) REFERENCES currencies (id),
  FOREIGN KEY (beneficaryId) REFERENCES beneficaries (id),
  FOREIGN KEY (storeId) REFERENCES stores (id)
);

CREATE TABLE userSettings (
  id varchar(50) not null,
  userId varchar(50) not null,
  prefferedCurrencyId VARCHAR(36),
  prefferedStoreId VARCHAR(36),
  prefferedCategoryId VARCHAR(36),
  prefferedBeneficaryId VARCHAR(36),
  createdAt datetime not null default current_timestamp(),
  updatedAt datetime not null default current_timestamp() ON UPDATE current_timestamp(),
  deletedAt datetime default NULL,
  primary key(id),
  FOREIGN KEY (userId) references users (id),
  FOREIGN KEY (prefferedCategoryId) REFERENCES transactionCategories (id),
  FOREIGN KEY (prefferedCurrencyId) REFERENCES currencies (id),
  FOREIGN KEY (prefferedBeneficaryId) REFERENCES beneficaries (id),
  FOREIGN KEY (prefferedStoreId) REFERENCES stores (id)
);