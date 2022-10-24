-- ############################################################################
-- Step 1: Drop database to start a fresh schema
-- ############################################################################
DROP DATABASE IF EXISTS employeeTracker_db;

-- ############################################################################
-- Step 2: Create database to start adding tables
-- ############################################################################
CREATE DATABASE employeeTracker_db;

-- ############################################################################
-- Step 3: Establish the database that we will work on.
-- ############################################################################
USE employeeTracker_db;

-- ############################################################################
-- Step 4: Create the tables in the database
-- ############################################################################

-- Note: Where all the work departments are going to be stored.
CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT
    ,name VARCHAR(30) NOT NULL
);

-- Note: Where all the work roles of employees are going to be stored.
CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT
    ,title VARCHAR(30) NOT NULL
    ,salary DECIMAL NOT NULL
    ,department_id INT
    -- Note: On delete set dependencies to null to smplify this project.
    ,FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

-- Note: Where all the employees data is going to be stored.
CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT
    ,first_name VARCHAR(30) NOT NULL
    ,last_name VARCHAR(30) NOT NULL
    ,role_id INT
    ,manager_id INT
    -- Note: On delete set dependencies to null to smplify this project.
    ,FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL
    ,FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);