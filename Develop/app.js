const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
class Questions{
    constructor(userPrompt,userInput){
        this.type = "input";
        this.message = userPrompt;
        this.name = userInput;
    }
}
const devQuestions = ["How many developmet team members are there?", "How many Managers?", "How many engineers?", "How many interns?"];
const devInput = ["num","m","e","i"];
const managerQuestions = ["What is the managers name?", "What is their ID?","What is their email?", "What is their office number?"];
const engineerQuestions = ["What is the engeneers name?", "What is their ID?","What is their email?", "What is their Github username?"];
const internQuestions = ["What is the interns name?", "What is their ID?","What is their email?", "What is their school?"];
const employeeInput = ["name","id","email","extra"];
var prompt = [];
const userData = [];
// const employeePrompt = [];
//ask how to keep not making objects and to jsut have questions
function makePrompt(arrayOfQuestions, arrayOfInput){
    for(i=0; i<arrayOfQuestions.length; i++){
        prompt.push(new Questions(arrayOfQuestions[i],arrayOfInput[i]));
    }
}
function employeePrompt(workers){
    for(i =0; i<=workers.m; i++){
        makePrompt(managerQuestions,employeeInput);
    }
    for(i =0; i<=workers.m; i++){
        makePrompt(engineerQuestions,employeeInput);
    }
    for(i =0; i<=workers.m; i++){
        makePrompt(internQuestions,employeeInput);
    }
}
async function promptUser(){
    try{
        makePrompt(devQuestions,devInput);
        const howManyEmployees = await inquirer.prompt(prompt);
        console.log(howManyEmployees);
        prompt =[];
        employeePrompt(howManyEmployees);
        //it goes throught the prompts wrigh just cant get data out
        const workerInfo = await inquirer.prompt(prompt);
        console.log(workerInfo);
        prompt =[];
    }
    catch (err){console.log(err)};
}
promptUser();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
