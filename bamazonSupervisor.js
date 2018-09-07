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

function marginCalc() {
  var marginArr = [];  
  
  connection.query("SELECT price, wholesale_cost FROM products", function(err, res) {
    if (err) throw err;

    console.log(res);

    for (var i = 0; i <res.length; i++) {
      var cogs = res[i].wholesale_cost;
      var revenue = res[i].price;
      
      var profitMargin = ((revenue - cogs) / revenue) * 100;
      marginArr.push(profitMargin);
    }
    console.log(marginArr);
    connection.end();
  })

//   connection.query("ALTER TABLE products ADD COLUMN profit_margin decimal(10,2)", function (err, res) {
//     if (err) throw err;

//     console.log("Profit Margin row Added!");
//     connection.end();
//   });  

//   connection.query("INSERT INTO products SET ?", {profit_margin: marginArr}, function(err, res) {
//       if (err) throw err;

//       console.log("Margins added!");
//   })
  

}
marginCalc();