CREATE TABLE IF NOT EXISTS assets  (
    id Integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
    identifier VARCHAR(50) NOT NULL,
    name VARCHAR(200) NOT NULL,
    type VARCHAR(50) NOT NULL,
    icon VARCHAR(400),
    subtype VARCHAR(50)
);
CREATE TABLE IF NOT EXISTS currencies  (
    id Integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
    identifier VARCHAR(200) NOT NULL,
    short VARCHAR(20) NOT NULL
);
CREATE TABLE IF NOT EXISTS notifications (
    id Integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200),
    text VARCHAR(300),
    icon VARCHAR(300),
    createdate TIMESTAMP,
    userid INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS transactions  (
    id Integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userassetid INTEGER NOT NULL,
    createdate TIMESTAMP,
    amount FLOAT,
    status INTEGER
);
CREATE TABLE IF NOT EXISTS userassets (
    id Integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
    assetid INTEGER NOT NULL,
    userid INTEGER NOT NULL,
    amount FLOAT,
    highlighted BOOLEAN,
    sum FLOAT,
    plattform VARCHAR(100)
);
CREATE TABLE IF NOT EXISTS users  (
    id Integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(200) NOT NULL,
    email VARCHAR(200),
    status Integer,
    password VARCHAR(200),
    currencyyid INTEGER NOT NULL,
    registered TIMESTAMP,
    last_login TIMESTAMP
);