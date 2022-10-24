-- ######################################################################
-- Step 1: Create table of work departments (As in mockup)
-- ######################################################################
INSERT INTO department (name) VALUES 
     ('Sales')
    ,('Engineering')
    ,('Finance')
    ,('Legal');

-- ######################################################################
-- Step 2: Create table of work roles (As in mockup)
-- ######################################################################
INSERT INTO role (title, salary, department_id)
VALUES
     ('Sales Lead', 100000, 1)
    ,('Salesperson', 80000, 1)
    ,('Lead Engineer', 150000, 2) 
    ,('Software Engineer', 120000, 2)
    ,('Account Manager', 160000, 3)
    ,('Accountant', 1250000, 3)
    ,('Legal Team Lead', 250000, 4)
    ,('Lawyer', 190000, 4);

-- ######################################################################
-- Step 3: Create table of employees at work (As in mockup)
-- ######################################################################
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Doe', 1, null)
    ,('Mike', 'Chan', 2, 1)
    ,('Ashley', 'Rodriguez', 3, null)
    ,('Kevin', 'Tupik', 4, 3)
    ,('Kunal', 'Singh', 5, null)
    ,('Malia', 'Brown', 6, 5)
    ,('Sarah', 'Lourd', 7, null)
    ,('Tom', 'Allen', 8, 7);