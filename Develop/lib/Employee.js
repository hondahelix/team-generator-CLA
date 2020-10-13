// TODO: Write code to define and export the Employee class
class Employee{
    constructor(name,id,email){
        this.name = name;
        this.id = id;
        this.email = email;
    }
    //ask about formatting this like this
    getName(){return this.name;};
    getId(){return this.id};
    getEmail(){return this.email};
    getRole(){return Employee.name;}
}
module.exports = Employee;