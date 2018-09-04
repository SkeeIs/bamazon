var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_DB"
});

function managerMenu() {
  inquirer
  .prompt([{
      message: "What would you like to do?",
      type: "list",
      name: "mainMenu",
      choices: ["View Products for Sale", "View Low Inventory Summary", "Add to Inventory", "Add new Product"]
  }])
  .then(function(answer) {
    var menuChoice = answer.mainMenu;  
    if (menuChoice === "View Products for Sale") {
      connection.query("SELECT * FROM products", function (err, res) {
        //if error occurs display the error
        if (err) throw err;
        //console.log(res); 
        //create new table using cli-table
        var table = new Table({
            head: ["Item ID", "Product Name", "Department", "Price", "Stock"],
            colWidths: [10, 45, 18, 10, 10]
        });
        //populate cli-table with data from response to our sql query
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        //print the table to terminal
        console.log(table.toString());
        managerMenu();
        })
    }
    else if (menuChoice === "View Low Inventory Summary") {

    }
  })  
}
managerMenu();