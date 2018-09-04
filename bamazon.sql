DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT(10) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(5, 2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  PRIMARY KEY (product_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("SCUM", "Video Games", "19.99", "99999"),
       ("Enter The Gungeon", "Video Games", "14.95", "99999"),
       ("Fallout 76 Collector Pre-Order", "Video Games", "199.99", "1"),
       ("Instant Pot", "Home Appliance", "99.99", "550"),
       ("Yonanas", "Home Appliance", "49.95", "795"),
       ("Denim Jeans", "Clothing", "24.95", "600"),
       ("Authentic Lumberjack Plaid Flannel", "Clothing", "19.99", "300"),
       ("Classic Legacy Work Boot", "Clothing", "234.00", "450"),
       ("Sony 7.2 Channel AV Receiver", "Electronics", "598.00", "500"),
       ("Sony WH1000XM3 Wireless Over Ear Headphones", "Electronics", "486.50", "500"),
       ("Goodyear Eagle RS-A Radial Tire", "Automotive", "60.97", "1500"),
       ("Meguiar's Complete Car Care Kit", "Automotive", "47.95", "200");
       