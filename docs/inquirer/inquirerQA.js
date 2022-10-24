// ###########################################################
// this file contains the questions for the inquirer
// ###########################################################

const inquirerQA= [
    {
        type:"list",
        name: "op",
        message: 'What would you like to do?',
        choices: ['View All Employees',
                  'View All Departments',
                  'View All Roles', 
                  'Update Employee Role',
                  'Update Employee Manager', 
                  'Add Employee',
                  'Add Role',
                  'Add Department',
                  'Delete Department',
                  'Delete Role',
                  'Delete Employee', 
                  'Quit'],
    },
    // ----------------------------------------------------
];

//this gives us acess to the items we want to acces in other files.
module.exports = {
    inquirerQA,
};
