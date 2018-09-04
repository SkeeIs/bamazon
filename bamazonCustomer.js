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

//function to query the SQL db for table values & construct the "storefront"
function displayShop() {
    //query SQL for all data from the products table
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
      customerPrompts();
    })
}
//function using inquirer package to interact with user
function customerPrompts() {
    //use inquirer package to obtain user input for item ID & quantity to purchase
    inquirer
    .prompt([{
        message: "Please enter the Item ID of the product you would like to purchase",
        type: "input",
        name: "itemID"
    },{
        message: "Please enter the quantity you would like to purchase",
        type: "input",
        name: "quantity"
    }])
    //promise waiting before continuing on
    .then(function(userInputs) {
        //setting user inputs to variables for ease of use 
        var selectItem = userInputs.itemID;
        var quantity = parseFloat(userInputs.quantity);
        
        connection.query("SELECT * FROM products WHERE ?", {item_id: selectItem}, function(err, res) {
          if (err) throw err;
          
          //console.log(res);
          //console.log(quantity);
          //console.log(res[0].stock_quantity);
          var stock = res[0].stock_quantity;
          var price = res[0].price;
          var name = res[0].product_name;

          if (quantity <= stock) {
            
            console.log("Product in stock! Processing...")

            connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: stock - quantity}, {item_id: selectItem}], function(err, res) {
              if (err) throw err;
              //console.log(res)  
              console.log("Order placed! Your Bamazon card has been charged $" + price * quantity + ".");
              console.log("Your order of " + name + ", in the amount of " + quantity + ", will arrive in two business days. Thanks for shopping Bamazon!");
              displayShop();  
            })
          }
          else {
            console.log("Insufficient quantity! Please try again.")
            displayShop();  
          } 
        })
    })
}
displayShop();