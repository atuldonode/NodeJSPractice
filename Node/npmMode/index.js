// const chalk = require("chalk");
// console.log(chalk.green.inverse("True"));
// console.log(chalk.red.inverse("false"));

const validator = require("validator");
const chalk = require("chalk");
const mail = validator.isEmail('foo@bar..kcom');
console.log(mail ? chalk.green.inverse(mail) : chalk.yellow.inverse(mail));