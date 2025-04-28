CREATE DATABASE car_rent_servics;

use  car_rent_servics;

CREATE Table users(
    emailid VARCHAR(255) not NULL PRIMARY KEY,
    userid VARCHAR(255) not NULL,
    password VARCHAR(255) not NULL,
    role VARCHAR(50) not NULL DEFAULT 'customer',
);
CREATE Table login_history(
    emailid VARCHAR(255) not NULL,
    password VARCHAR(255) not NULL,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (emailid) REFERENCES users(emailid),

);

INSERT INTO users (emailid, userid, password, role)
VALUES ('admin@example.com', 'admin123', 'adminPassword123', 'admin');


CREATE TABLE car_details (
    car_id INT AUTO_INCREMENT PRIMARY KEY,
    car_model VARCHAR(100) NOT NULL,
    car_brand VARCHAR(100) NOT NULL,
    car_price DECIMAL(10, 2) NOT NULL,
    first_owner_name VARCHAR(100) NOT NULL,
    first_owner_state VARCHAR(100) NOT NULL,
    year_of_manufacture INT NOT NULL,
    registration_number VARCHAR(20) NOT NULL UNIQUE,
    engine_capacity_cc INT NOT NULL
);
