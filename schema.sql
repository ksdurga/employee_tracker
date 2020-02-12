DROP DATABASE IF EXISTS employee_trackerDB;

-- Create the database employee_trackerDB and specified it for use.
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

-- Create the table movies.
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT(5) NOT NULL,
  manager_id INT(5),
  PRIMARY KEY (id)
);


CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INT(5),
  PRIMARY KEY (id)
);

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO departments (name) VALUE ("Sales"),("Engineers"),("Finance"),("Legal"),("HR");

INSERT INTO roles (title, salary, department_id) VALUE ("Salesperson", 90000, 1),("Sales Lead", 130000, 1),("Engineer", 100000, 2),("Engineering Lead", 150000, 2),("Lead Accountant", 130000, 3),("Accountant", 90000, 3),("Legal Team Lead", 200000, 4),("Lawyer", 170000, 4),("HR Lead", 80000, 5),("HR Rep", 60000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUE ("Katie", "Durga", 2, 4);