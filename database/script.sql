DROP TABLE Products;
DROP TABLE Users;

CREATE TABLE Products(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    product_minInvestment DECIMAL(12,2) NOT NULL,
    product_maxInvestment DECIMAL (15,2) NOT NULL,
    product_monthlyRate DECIMAL (3,2) CONSTRAINT CK_PERCENT CHECK (product_monthlyRate between 0 and 1) NOT NULL,
    product_planTime TINYINT NOT NULL CONSTRAINT CH_PLANTIME CHECK (product_planTime between 1 and 12),
    createdAt TIMESTAMP NOT NULL DEFAULT current_timestamp  ,
    updatedAt TIMESTAMP NOT NULL DEFAULT current_timestamp  
    );
  
CREATE TABLE Users(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(200) NOT NULL,
    user_role VARCHAR(15) DEFAULT ('ADMIN_ROLE'),
    createdAt TIMESTAMP DEFAULT current_timestamp  ,
    updatedAt TIMESTAMP DEFAULT current_timestamp  
);

INSERT INTO Products (product_name,product_minInvestment,product_maxInvestment,product_monthlyRate,product_planTime) 
VALUES ('Plan Active Plus',10000,50000,0.5,6);
		
INSERT INTO Users (user_name,user_password,user_role)
VALUES ('lgap','willis','ADMIN');

INSERT INTO Users (user_name,user_password,user_role)
VALUES ('WILLIS','USER','USER');
