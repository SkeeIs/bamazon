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
      choices: ["View Products for Sale", "View Low Inventory Summary", "Add to Inventory", "Add new Product", "Quit"]
  }])
  .then(function(answer) {
    
    var menuChoice = answer.mainMenu;  
    
    if (menuChoice === "View Products for Sale") {
      displayStore();
      managerMenu();
    }
    
    else if (menuChoice === "View Low Inventory Summary") {
      connection.query("SELECT * FROM products", function (err, res) {
        //if error occurs display the error
        if (err) throw err;
         
        //create new table using cli-table
        var table = new Table({
            head: ["Item ID", "Product Name", "Department", "Price", "Stock"],
            colWidths: [10, 45, 18, 10, 10]
        });
        //populate cli-table with only the items that have a stock of 5 or less
        for (var i = 0; i < res.length; i++) {
          if (res[i].stock_quantity <= 5) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
          }  
        }
        //print the table to terminal
        console.log(table.toString());
        managerMenu();
        })
    }
    
    else if (menuChoice === "Add to Inventory") {
        updateInventory();
    }
    
    else if (menuChoice === "Add new Product") {
      inquirer
      .prompt([{
          message: "What is the name of the product you would like to add?",
          type: "input",
          name: "newProductName"
      },{
          message: "Which department does the product belong?",
          type: "list",
          name: "newProductDept",
          choices: ["Video Games", "Home Appliance", "Clothing", "Electronics", "Automotive"]
      },{
          message: "How much does it cost?",
          type: "input",
          name: "newProductPrice",
      },{
          message: "How many in stock?",
          type: "input",
          name: "startingStock"
      }])
      .then(function(newProduct) {
        //console.log(newProduct);
        var newName = newProduct.newProductName;
        var newDept = newProduct.newProductDept;
        var newPrice = parseFloat(newProduct.newProductPrice);
        var newStock = parseFloat(newProduct.startingStock);

        connection.query("INSERT INTO products SET ?", {product_name: newName, department_name: newDept, price: newPrice, stock_quantity: newStock}, function(err, res) {
          if (err) throw err;
          
          console.log("Store updated!");
          console.log(newName + " added to department " + newDept + " with a price of $" + newPrice + " and a starting stock of " + newStock + " units.");
          managerMenu();
        })
      })
    }

    else if (menuChoice === "Quit") {
        console.log("5 O'Clock already, huh, manager? Goodnight!")
        connection.end();
    }
  })  
}

function displayStore() {
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
  })  
}

function updateInventory() {
  
  console.log("---------Wholesale Order Guide---------");
  displayStore();
  inquirer
  .prompt([{
      message: "Please input Item ID",
      type: "input",
      name: "itemID"
  },{
      message: "Pleae input quantity to order",
      type: "input",
      name: "orderQuantity"
  }])
  .then(function(managerOrder) {
    
    var itemID = managerOrder.itemID;
    var orderQuantity = parseFloat(managerOrder.orderQuantity);

    connection.query("SELECT * FROM products WHERE ?", {item_id: itemID}, function(err, res) {
      if (err) throw err;

      var stock = res[0].stock_quantity;
      var name = res[0].product_name;

        connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: stock + orderQuantity}, {item_id: itemID}], function (err, res) {
        //if error occurs display the error
        if (err) throw err;
        
        console.log("Order placed. " + orderQuantity + " " + name + " will be shipped to Bamazon central warehouse.");
        managerMenu();
        })
        
    })
  })    
}
managerMenu();