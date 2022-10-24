const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consTable = require ('console.table');

//files where questions are stored
const generalQA = require ('./inquirer/inquirerQA')
const functionOp = require ('./indexFunctions/dbActions')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ###############################################################
// Function call to initialize app.
// ###############################################################
function init() {
    // -----------------------------------------------------------
    // Welcome console log
    // -----------------------------------------------------------
    console.log(".--------------------.")
    console.log("|                    |")
    console.log("|  Employee Manager  |")
    console.log("|                    |")
    console.log(".____________________.")

    // -----------------------------------------------------------
    // Main function
    // -----------------------------------------------------------
    async function callInquirers(req, res){
        // .........................................................
        // Get the action the user wants to make
        // .........................................................
        let objGeneral = "";
        const inq1 = await inquirer.prompt(generalQA.inquirerQA)
        .then(async (res0) => {
            objGeneral = res0.op;
            if (objGeneral === 'Quit'){
                objGeneral = false;
                return objGeneral;
            }
            else {
                const test = await callOp(objGeneral);
                return objGeneral;
            };  
        })
    }

    async function callOp(objGeneral){
        switch (objGeneral) {
            case 'View All Employees':
                opSelect = await functionOp.viewAllEmployees();
                break;
            case 'View All Departments':
                opSelect =  await functionOp.viewAllDepartments();
                break;
            case 'View All Roles':
                opSelect =  await functionOp.viewAllRoles();
                break;  
            case 'Update Employee Role':
                opSelect =  await functionOp.updateEmployee();
                break;
            case 'Update Employee Manager':
                opSelect =  await functionOp.updateManager();
                break;   
            case 'Add Employee':
                opSelect =  await functionOp.addEmployee();
                break;
            case 'Add Role':
                opSelect =   await functionOp.addRole();
                break;
            case 'Add Department':
                opSelect =  await functionOp.addDepartment();
                break;  
            case 'Delete Department':
                opSelect =  await functionOp.deleteDepartment();
                break; 
            case 'Delete Role':
                opSelect =  await functionOp.deleteRole();
                break; 
            case 'Delete Employee':
                opSelect =  await functionOp.deleteEmployee();
                break;          
        }

    }
    // --------------------------------------------------------------
    // Loop Function
    // --------------------------------------------------------------
    async function dbOperation (){
        // local scope variables
        let selectBool = true;

        //loop to keep asking the user
        let counter = 0;
        while (selectBool){
            counter++;
            console.log(counter);
            const inq1 = await callInquirers();
            console.log(inq1)
            if (inq1 == false){selectBool = inq1}
        }
        return selectBool
    }

    // --------------------------------------------------------------
    //Call the aysnconous function to run every thing sequentally
    // --------------------------------------------------------------
    return dbOperation() 
    .then(res => {
        return res;
    })   
};

// ###############################################################
// Initialize funciton for the inquirer
// ###############################################################
init()
    .then((res)=> {
        console.log(".then del final",res)
        process.exit();
    })
    .catch(err => {
        console.log(err);
    })
;

// ###############################################################
// Console log state of the server
// ###############################################################
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ###############################################################
// Login commando to log on to docker terminal
// ###############################################################
// docker exec -it mysql-db mysql -p 
