# m12_EmployeeTracker
  ## SQL Challenge: Employee Tracker

   

  ## Table of Contents
  * [License](#license)
  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Contact](#contact)
  
   

  ## [Description](#table-of-contents)
    command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

    video:https://drive.google.com/file/d/1Y-xZ96XTj6zCiCqfXcBP5VFBPz__dm_s/view?usp=sharing

  ## [User Story](#table-of-contents)
        AS A business owner
        I WANT to be able to view and manage the departments, roles, and employees in my company
        SO THAT I can organize and plan my business
  ## [Acceptance Criteria](#table-of-contents)
    GIVEN a command-line application that accepts user input
    WHEN I start the application
    THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
    WHEN I choose to view all departments
    THEN I am presented with a formatted table showing department names and department ids
    WHEN I choose to view all roles
    THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
    WHEN I choose to view all employees
    THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    WHEN I choose to add a department
    THEN I am prompted to enter the name of the department and that department is added to the database
    WHEN I choose to add a role
    THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
    WHEN I choose to add an employee
    THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
    WHEN I choose to update an employee role
    THEN I am prompted to select an employee to update and their new role and this information is updated in the database
  ## [Installation](#table-of-contents)
    * Follow tutorial to create a database instance using docker https://platzi.com/tutoriales/1432-docker/3268-como-crear-un-contenedor-con-docker-mysql-y-persistir-la-informacion/
    * Run the sql server using docker with docker exec -it mysql-db mysql -p
    * Clone the github repo
    * under the folder of docs run npm install
    * under the folder of docs run a terminal en execute node index.js

  ## [Usage](#table-of-contents)
    * under the folder of docs run a terminal en execute node index.js

  ## [Contributing](#table-of-contents)
    * no

  ## [Tests](#table-of-contents)
    * The terminal will start asking the user for infromation.
    * You can validate the changes using the show options.
  
  ## [Contact](#table-of-contents)
    - [GitHub: jorgebesnierb](https://github.com/jorgebesnierb)
    - [Email: jorgebesnierb@outlook.com](mailto:jorgebesnierb@outlook.com)
