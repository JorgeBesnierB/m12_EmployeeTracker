const mysql = require('mysql2');
const inquirer = require('inquirer');
const consTable = require ('console.table');

// ###############################################################
// Create Conection to data base.
// ###############################################################
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'secret',
      database: 'employeeTracker_db',
      port: 33060
    },
    console.log(`Connected to the books_db database.`)
);

// ###############################################################
// Queries to database
// ###############################################################

// ------------------------------------------------------------------
// Queries to VIEW information
// ------------------------------------------------------------------
//--
async function viewAllEmployees(){
    const p = new Promise(function (resolve, reject){
        const opQuery = `
        SELECT 
             employee.id
            ,employee.first_name
            ,employee.last_name 
            ,role.title
            ,department.name AS department
            ,role.salary
            ,CONCAT (manager.first_name, " ", manager.last_name) AS manager
        FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON employee.manager_id = manager.id`;
    
        const inq1 = db.query(opQuery, function (err, results) {
            if (err){
                throw err;
                reject(err);
            } 
            resolve(results);
            console.table("this op select ", results)
        });
    });
    return p ;
};
//--
async function viewAllDepartments(){
    // Base code for promise, and wait for the code to complete
    const p = new Promise(function (resolve, reject){
        // Remember to add reject(err); and resolve(results);
        console.log('viewAllDepartments();')
        const opQuery = `
        SELECT * 
        FROM department
        `
        db.query(opQuery, function (err, results) {
            if (err){
                throw err;
                reject(err);
            } 
            resolve(results);
            console.table("this op select ", results)
        });
    });
    //return the value of the promise for the await in index.js continue
    return p;
};
//--
async function viewAllRoles(){
    console.log('viewAllRoles();')
    // Base code for promise, and wait for the code to complete
    const p = new Promise(function (resolve, reject){
        // Remember to add reject(err); and resolve(results);
        const opQuery = `
        SELECT  role.id
                ,role.title
                ,department.name AS department
                ,role.salary
        FROM role
        LEFT JOIN department ON role.department_id = department.id `;
        
        db.query(opQuery, function (err, results) {
            if (err){
                throw err;
                reject(err);
            } 
            resolve(results);
            console.table("this op select ", results)
        });
    });
    //return the value of the promise for the await in index.js continue
    return p;
};

// ------------------------------------------------------------------
// Queries to UPDATE information
// ------------------------------------------------------------------
//--
async function updateEmployee(){
    //Step 1: console log to know at which function you are
    console.log('updateEmployee();')

    //Step 2: Arrays to store information from the queries to show as options
    const empArr = [];
    const roleArr = [];

    //Step 3: Questions to be made in the inquirer
    let updateEmpQA = [
        {
            type: 'list',
            message: "Which employee's role do you want to update?",
            choices: empArr,
            name: 'empSelected'
            
        },
        {
            type: 'list',
            message: 'Which role do you want to assign the selected employee?', 
            choices: roleArr,
            name: 'newRole' 
        }
    ]
    const p = new Promise(function (resolve, reject){
        //Step 4: Query to get all employee, and store in array
        db.query("SELECT * FROM employee", function (err, results) {
            //If the query can not be completed show an error
            if (err) throw err;
            
            //Get the list of employee
            for (let i = 0; i < results.length; i++) {
                empArr.push({
                    name: results[i].first_name + ' ' + results[i].last_name,
                    value: results[i].id
                }); 
            }
            //Query to get all roles, and store in array
            db.query("SELECT * FROM role", function (err, results) {
                if (err) throw err;
                for (let i = 0; i < results.length; i++) {
                    roleArr.push({
                        name: results[i].title,
                        value: results[i].id
                    }); 
                }
            });
            //Ask the user for the next questions
            inquirer.prompt(updateEmpQA)
            .then(answers => {
                db.query(`UPDATE employee SET role_id = ${answers.newRole} WHERE id = ${answers.empSelected}`, function (err, results) {
                    if (err){
                        throw err;
                        reject(err);
                    }
                    resolve(results);
                    console.log('Employee has been updated.');
                });
            })
            
        });
    });
    return p;
};
//--
async function updateManager(){
    console.log('updateManager();')
    // Base code for promise, and wait for the code to complete
    // ----------------------------------------------------------
    // Variables
    // ----------------------------------------------------------
    const empArray = [];
    const manArray = [{
        name: '',
        value: ''
    }];

    // ----------------------------------------------------------
    // Inquierer
    // ----------------------------------------------------------
    let QA = [
        {
            type: 'list',
            message: "Select Employee?",
            choices: empArray,
            name: 'empSelected'
        
        },
        {
            type: 'list',
            message: 'Select manager to assign to employee?', 
            choices: manArray,
            name: 'manSelected' 
        }
    ]

    const p = new Promise(function (resolve, reject){
        // Remember to add reject(err); and resolve(results);
        db.query("SELECT * FROM employee", function (err, results) {
            if (err) throw err;

            
            for (let i = 0; i < results.length; i++) {
                empArray.push({
                    name: results[i].first_name + ' ' + results[i].last_name,
                    value: results[i].id
                }); 
            }
            
            db.query("SELECT * FROM employee WHERE manager_id IS NULL", function (err, results) {
                if (err) throw err;

        
                for (let i = 0; i < results.length; i++) {
                    manArray.push({
                        name: results[i].first_name + ' ' + results[i].last_name,
                        value: results[i].id
                    });    
                }

            inquirer.prompt(QA)
            .then(answers => {
                db.query(`UPDATE employee SET manager_id = ${answers.manSelected} WHERE id = ${answers.empSelected}`, function (err, results) {
                    if (err){
                        throw err;
                        reject(err);
                    }
                    resolve(results);
                    console.log('Employee has been updated.');
                });
            })
        });
      });
    });
    //return the value of the promise for the await in index.js continue
    return p;
};
 
// ------------------------------------------------------------------
// Queries to ADD information
// ------------------------------------------------------------------
function addEmployee(){
    console.log('addEmployee();')
    // Base code for promise, and wait for the code to complete
    const manArr = [{
        name: '',
        value: ''
    }];
    const roleArr = [];
    let QA = [
        {
            type: 'input',
            message: "First name?", 
            name: 'name', 
        },
        {
            type: 'input',
            message: "Last name?", 
            name: 'last',
        }, 
        {
            type: 'list',
            message: "Role?", 
            choices: roleArr,
            name: 'role'
        },
        {
            type: 'list',
            message: "Employee's manager?",
            choices: manArr,
            name: 'manager'
        }
    ] 
    const p = new Promise(function (resolve, reject){
        // Remember to add reject(err); and resolve(results);
        db.query("SELECT * FROM employee WHERE manager_id IS NULL", function (err, results) {
            if (err) throw err;
    
            for (let i = 0; i < results.length; i++) {
                manArr.push({
                    name: results[i].first_name + ' ' + results[i].last_name,
                    value: results[i].id
                });    
            }
        
            db.query("SELECT * FROM role", function (err, results) {
                if (err) throw err;
                
                for (let i = 0; i < results.length; i++) {
                    roleArr.push({
                        name: results[i].title,
                        value: results[i].id
                    });    
                }
                inquirer.prompt(QA)
                .then(answers => {
                    const sqlQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.name}', '${answers.last}', ${answers.role}, ${answers.manager})`;
                    db.query(sqlQuery, function (err, results) {
                        if (err){
                            throw err;
                            reject(err);
                        }
                        resolve(results);
                        console.log('Employee Added.');
                    });
                }) 
            });
        });
    });
    //return the value of the promise for the await in index.js continue
    return p;
};

function addRole(){
    console.log('addRole();')
    let depArr = [];
    // Base code for promise, and wait for the code to complete
    const QA = [{
        type: 'input',
        message: 'New Role?', 
        name: 'name'
    }, 
    {
        type: 'input',
        message: 'Role Salary?',
        name: 'salary'
    },
    {
        type: 'list', 
        message: 'Department?',
        choices: depArr,
        name: 'dep'
    }]

    const p = new Promise(function (resolve, reject){
        // Remember to add reject(err); and resolve(results);
        db.query("SELECT * FROM department", function (err, results) {
            if (err) throw err;
            
            for (let i = 0; i < results.length; i++) {
                let dept = {
                    name: results[i].name,
                    value: results[i].id
                }
                depArr.push(dept);
            }
    
            inquirer.prompt(QA)
            .then(answers => {
                db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.name}', ${answers.salary}, ${answers.dep})`, function (err, results) {
                    if (err){
                        throw err;
                        reject(err);
                    }
                    resolve(results);
                    console.log('Role has been added.');
                });
            }) 
        });
    });
    //return the value of the promise for the await in index.js continue
    return p;
};

function addDepartment(){
    console.log('addDepartment();')
    // Base code for promise, and wait for the code to complete
    let QA = [
        {
            type: 'input',
            message: 'Name of department?', 
            name: 'selectedDep'
        }
    ]
    const p = new Promise(function (resolve, reject){
        // Remember to add reject(err); and resolve(results);
        //you can query fist to avoid duplicates
        inquirer.prompt (QA)
        .then(answers => {
            db.query(`INSERT INTO department (name) VALUES ('${answers.selectedDep}');`, function (err, results) {
                if (err){
                    throw err;
                    reject(err);
                }
                resolve(results);
                console.log('Department has been added.');
            });
    
        })
    });
    //return the value of the promise for the await in index.js continue
    return p;
};

// ------------------------------------------------------------------
// Queries to DELETE information
// ------------------------------------------------------------------
function deleteDepartment(){
    console.log('deleteDepartment();')
    // Base code for promise, and wait for the code to complete
    const depArr = [];
    let QA = [
        {
            type: 'list',
            message: 'Select department to delete?', 
            choices: depArr,
            name: 'depToDelete'
        }
    ]
    const p = new Promise(function (resolve, reject){
        // Remember to add reject(err); and resolve(results);
        db.query("SELECT * FROM department", function (err, results) {
            if (err) throw err;
            for (let i = 0; i < results.length; i++) {
                depArr.push({
                    name: results[i].name,
                    value: results[i].id
                }); 
            }
            inquirer.prompt (QA)
            .then(answers => {
                db.query(`DELETE FROM department WHERE id = ${answers.depToDelete}`, function (err, results) {
                    if (err){
                        throw err;
                        reject(err);
                    }
                    resolve(results);
                    console.log('Department has been deleted.');
                });
    
            })
        })
    });
    //return the value of the promise for the await in index.js continue
    return p;
};
//--
function deleteRole(){
    console.log('deleteRole();')
    const roleArr = [];
    let QA = [
        {
            type: 'list',
            message: 'Select role to delete?', 
            choices: roleArr,
            name: 'roleToDelete'
        }
    ]
    // Base code for promise, and wait for the code to complete
    const p = new Promise(function (resolve, reject){
        // Remember to add reject(err); and resolve(results);
        db.query("SELECT * FROM role", function (err, results) {
            if (err) throw err;
            
            for (let i = 0; i < results.length; i++) {
                roleArr.push({
                    name: results[i].title,
                    value: results[i].id
                }); 
            }
        
            inquirer.prompt (QA)
            .then(answers => {
                db.query(`DELETE FROM role WHERE id = ${answers.roleToDelete}`, function (err, results) {
                    if (err){
                        throw err;
                        reject(err);
                    }
                    resolve(results);
                    console.log('Role has been deleted.');
                });
            })
        })
    });
    //return the value of the promise for the await in index.js continue
    return p;
};
//--
async function deleteEmployee(){
    console.log('deleteEmployee();')
    const empArray = [];
    let QA = [
        {
            type: 'list',
            message: 'Select Employee to delete?', 
            choices: empArray,
            name: 'empToDelete'
        },
    ]
    // Base code for promise, and wait for the code to complete
    const p = new Promise(function (resolve, reject){
        db.query("SELECT * FROM employee", function (err, results) {
            if (err) throw err;
            for (let i = 0; i < results.length; i++) {
                empArray.push({
                    name: results[i].first_name + ' ' + results[i].last_name,
                    value: results[i].id
                }); 
            }
            inquirer.prompt(QA)
            .then(answers => {
                db.query(`DELETE FROM employee WHERE id = ${answers.empToDelete}`, function (err, results) {
                    if (err){
                        throw err;
                        reject(err);
                    }
                    resolve(results);
                    console.log('Employee has been deleted.');
                });
            })
        })
    });
    //return the value of the promise for the await in index.js continue
    return p;
};

module.exports = {
    viewAllEmployees
    ,viewAllDepartments
    ,viewAllRoles
    ,updateEmployee
    ,updateManager
    ,addEmployee
    ,addRole
    ,addDepartment
    ,deleteDepartment
    ,deleteRole
    ,deleteEmployee
};
