DROP TABLE pictures;
DROP TABLE favorites;
DROP TABLE carriers_ratings;
DROP TABLE givers_ratings;
DROP TABLE donos;
DROP TABLE dono_status;
DROP TABLE users;

-- ! ^Above code is the order needed to drop tables^ !

CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
username VARCHAR(60) NOT NULL UNIQUE,
zip_code INT NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
hash VARCHAR(100) NOT NULL );

CREATE TABLE dono_status (
dono_status_id SERIAL PRIMARY KEY,
status VARCHAR(100) );

INSERT INTO dono_status 
(status)
VALUES
('INITIAL'), ('PENDING PICKUP'), ('COMPLETED');

CREATE TABLE donos (
dono_id SERIAL PRIMARY KEY,
giver_id INT REFERENCES users(user_id) NOT NULL,
zip_code INT NOT NULL,
carrier_id INT REFERENCES users(user_id) DEFAULT NULL,
title VARCHAR(100) NOT NULL,
description VARCHAR(1000),
price INT NOT NULL DEFAULT 0,
dono_status INT REFERENCES dono_status(dono_status_id) DEFAULT 1,
multiple_people boolean DEFAULT 'FALSE',
truck_trailer boolean DEFAULT 'FALSE' );

CREATE TABLE pictures (
picture_id SERIAL PRIMARY KEY,
dono_id INT REFERENCES donos(dono_id) NOT NULL,
picture_url TEXT );

CREATE TABLE favorites (
favorites_id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(user_id) NOT NULL,
dono_id INT REFERENCES donos(dono_id) NOT NULL UNIQUE );

-- Ratings carriers received from givers
CREATE TABLE carriers_ratings (
carriers_ratings_id SERIAL PRIMARY KEY,
dono_id INT REFERENCES donos(dono_id) NOT NULL UNIQUE,
rating INT, 
comment VARCHAR(1000) );

-- Ratings givers received from carriers
CREATE TABLE givers_ratings (
givers_ratings_id SERIAL PRIMARY KEY,
dono_id INT REFERENCES donos(dono_id) NOT NULL UNIQUE,
rating INT,
comment VARCHAR(1000));