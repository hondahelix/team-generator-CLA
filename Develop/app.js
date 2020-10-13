const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const getId = [];
const holdWorkers = [];

function appMenu(){
    function createManager(){
        inquirer.prompt([
            {
                type:"input",
                name: "managerName",
                message: "what is your managers name?"
            },
            {
                type:"input",
                name: "managerId",
                message: "what is your managers ID?"
            },
            {
                type:"input",
                name: "managerEmail",
                message: "what is your managers Email?"
            },
            {
                type:"input",
                name: "managerOffice",
                message: "what is your managers office number?"
            }
        ]).then(function(answers){
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOffice);
            holdWorkers.push(manager);
            getId.push(answers.managerId);
            createTeam();
        });
    }
    function createTeam(){
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoices",
                message: "which type of team member would you like to add?",
                choices: ["engineer", "intern", "no more"]
            }
        ]).then(function(answer){
            switch(answer.memberChoices){
                case "engineer":
                    createEngneer();
                    break;
                case "intern":
                    createIntern();
                    break;
                default:
                    buildTeam();
            }
        });
    }
    function createEngneer(){
        inquirer.prompt([
            {
                type:"input",
                name: "engineerName",
                message: "what is your engineers name?"
            },
            {
                type:"input",
                name: "engineerId",
                message: "what is your managers ID?"
            },
            {
                type:"input",
                name: "engineerEmail",
                message: "what is your managers Email?"
            },
            {
                type:"input",
                name: "githubUsername",
                message: "what is your engineers github username?"
            }
        ]).then(function(answers){
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.githubUsername);
            holdWorkers.push(engineer);
            getId.push(answers.engineerId);
            createTeam();
        });
    }

    function createIntern(){
        inquirer.prompt([
            {
                type:"input",
                name: "internName",
                message: "what is your interns name?"
            },
            {
                type:"input",
                name: "internId",
                message: "what is your interns ID?"
            },
            {
                type:"input",
                name: "internEmail",
                message: "what is your interns Email?"
            },
            {
                type:"input",
                name: "internSchool",
                message: "what is your interns school?"
            }
        ]).then(function(answers){
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            holdWorkers.push(intern);
            getId.push(answers.internId);
            createTeam();
        });
    }

    function buildTeam() {
        console.log(holdWorkers);
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(holdWorkers), "utf-8")
    }
    createManager();
}
appMenu();
