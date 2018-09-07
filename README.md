# bamazon

A console based webstore that can be accessed as a customer or as a manager. The items for sale are stored in a sql database. I use the mysql node package to access the data in the sql database stored in a table made up of columns & rows. I use another node package called CLI-Table to return the data in a beautifully aligned table on the command line.

* Powered by Javascript, node.js, MySQL node package, Inquirer node package, CLI-Table node package, MySQL Workbench



### Image Preview of Store Functionality
<!-- take a picture of the image and add it into the readme  -->
![Customer Storefront & Purchase Process](https://i.imgur.com/t4GVQan.png)
![Manager View All Products & View Low Invetory (less than 5)](https://i.imgur.com/lLl7XqC.png)
![Manager Ordering More Inventory](https://i.imgur.com/xEaUyid.png)
![Manager Adding New Product For Sale](https://i.imgur.com/0UutQrH.png)

## Prerequisites

To view my store in your console you would have to download some node modules. These dependencies can be found in the package.json file within this repository.

## Technology Used

* **Javascript** - the primary scripting logic powering the game
* **Node.js** - allowing us to execute javascript outside the browser (assorted node packages used listed above)
* **MySQL** -creating, reading, updating data about the store's inventory & storing it in a table
* **Inquirer** -User interaction within the command line
* **CLI-Table** -Bringing some style to this backend only application

# Code Snippets
<!-- put snippets of code inside ``` ``` so it will look like code -->
<!-- if you want to put blockquotes use a > -->

This is a function that got used in all three versions of bamazon because this function does something simple & crucial. When you break it down, this function is getting up to date data from our sql database & transforming it into something as user friendly as command line data display can get.

```
  function displayShop() {
    //query SQL for all data from the products table except wholesale price (don't want to show our customer's our awesome margin)
    connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function (err, res) {
      //if error occurs display the error
      if (err) throw err;
      //console.log(res); 
      //create new table using cli-table following their documentation example
      var table = new Table({
          head: ["Item ID", "Product Name", "Department", "Price", "Stock"],
          colWidths: [10, 45, 18, 10, 10]
      });
      //populate cli-table with data from response to our sql query by iterating through our results & pushing relevant data to our table
      for (var i = 0; i < res.length; i++) {
        table.push(
            [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
        );
      }
      //print the table to terminal
      console.log(table.toString());
      //call our starting screen again so customers can keep buying!
      customerPrompts();
    })
}

```

# Learning points
<!-- Learning points where you would write what you thought was helpful -->
* Storing data in a sql database & creating, reading, updating, deleting data
* Connecting to a sql database using node
* More practice getting information from a user using inquirer package
* Researching & finding technologies to make a project more efficient (Took me a bit to find CLI-Table)


## Authors

* **Taylor Skeels** - [GitHub](https://github.com/skeeis)
