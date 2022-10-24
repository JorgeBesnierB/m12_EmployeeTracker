// ###########################################################
// this file contains the questions for the inquirer
// ###########################################################
const inquirer = require('inquirer');

function delEmployee (employeeArray){
    inquirer.prompt ({
        type: 'list',
        message: 'Which employee do you want to delete?', 
        choices: employeeArray,
        name: 'employeeDeleted'
    })
    .then(answers => {
        db.query(`DELETE FROM employees WHERE id = ${answers.employeeDeleted}`, function (err, results) {
            if (err) throw err;
            console.log('Employee deleted.');
            promptUser();
        });

    })

}



//this gives us acess to the items we want to acces in other files.
module.exports = {
    delEmployee,
};
