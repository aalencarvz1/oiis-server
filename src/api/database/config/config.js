
require('dotenv').config({ path: __dirname + "/../../../../.env" });
/**
 * configure database for use in sequelize-cli and default connection
 */
module.exports = {
  "production": {
    "ID":1,
    "database": process.env.DB_NAME || "SERVER_API_DB", 
    "username": process.env.DB_USERNAME || "root",
    "password": process.env.DB_PASSWORD || "masterkey",
    "host": process.env.DB_HOST || "localhost",
    "port": process.env.DB_PORT || "3306",
    "dialect": process.env.DB_DIALECT ||"mysql",
    "logQueryParameters":true,
    "define":{
      "freezeTableName": true
    }
  },
  "production_old": {
    "ID":1,
    "database": process.env.DB_OLD_NAME || "SERVER_API_DB", 
    "username": process.env.DB_OLD_USERNAME || "root",
    "password": process.env.DB_OLD_PASSWORD || "masterkey",
    "host": process.env.DB_OLD_HOST || "localhost",
    "port": process.env.DB_OLD_PORT || "3306",
    "dialect": process.env.DB_OLD_DIALECT ||"mysql",
    "logQueryParameters":true,
    //"logging":true,
    "define":{
      "freezeTableName": true
    }
  },
  "development": {
    "ID":10,
    "database": process.env.DB_DEV_NAME || "SERVER_API_DB", 
    "username": process.env.DB_DEV_USERNAME || "root",
    "password": process.env.DB_DEV_PASSWORD || "masterkey",
    "host": process.env.DB_DEV_HOST || "localhost",
    "port": process.env.DB_DEV_PORT || "3306",
    "dialect": process.env.DB_DEV_DIALECT ||"mysql",
    "logQueryParameters":true,
    "define":{
      "freezeTableName": true
    },
    //"logging":true
  },
  "development_old": {
    "ID":11,
    "database": process.env.DB_DEV_OLD_NAME || "SERVER_API_DB", 
    "username": process.env.DB_DEV_OLD_USERNAME || "root",
    "password": process.env.DB_DEV_OLD_PASSWORD || "masterkey",
    "host": process.env.DB_DEV_OLD_HOST || "localhost",
    "port": process.env.DB_DEV_OLD_PORT || "3306",
    "dialect": process.env.DB_DEV_OLD_DIALECT ||"mysql",
    "logQueryParameters":true,
    "define":{
      "freezeTableName": true
    }
  },
  "production_winthor": {
    "ID":2,
    "database":"WINT",
    "username": "JUMBO",
    "password": "JUMBO",    
    "host":"192.168.2.42",
    "dialect": "oracle",
    "logQueryParameters":true,
    "dialectOptions":{      
      "schema": "JUMBO"
    }
  },
  "development_winthor": {
    "ID":20,
    "database":"WINT",
    "username": "JUMBO",
    "password": "JUMBO",    
    "host":"192.168.2.42",
    "dialect": "oracle",
    "logQueryParameters":true,
    "dialectOptions":{      
      "schema": "JUMBO"
    }
  },
  "production_winthor_integration": {
    "ID":3,
    "database":"WINT",
    "username": "OIIS",
    "password": "OIIS",    
    "host":"192.168.2.42",
    "dialect": "oracle",
    "logQueryParameters":true,
    "dialectOptions":{      
      "schema": "OIIS"
    }
  },
  "development_winthor_integration": {
    "ID":30,
    "database":"WINT",
    "username": "OIIS",
    "password": "OIIS",    
    "host":"192.168.2.42",
    "dialect": "oracle",
    "logQueryParameters":true,
    "dialectOptions":{      
      "schema": "OIIS"
    }
  },
  "production_consult": {
    "ID":5,
    "database":"WINT",
    "username": "CONSULTA",
    "password": "CONSULTA",    
    "host":"192.168.2.42",
    "dialect": "oracle",
    "logQueryParameters":true,
    "dialectOptions":{      
      "schema": "CONSULTA"
    }
  },
  "development_consult": {
    "ID":50,
    "database":"WINT",
    "username": "CONSULTA",
    "password": "CONSULTA",    
    "host":"192.168.2.42",
    "dialect": "oracle",
    "logQueryParameters":true,
    "dialectOptions":{      
      "schema": "CONSULTA"
    }
  },
  "production_ep": {
    "ID":4,
    "database":"WINT",
    "username": "EP",
    "password": "EP",    
    "host":"192.168.2.42",
    "dialect": "oracle",
    "logQueryParameters":true,
    "dialectOptions":{      
      "schema": "EP"
    }
  },
  "development_ep": {
    "ID":40,
    "database":"WINT",
    "username": "EP",
    "password": "EP",    
    "host":"192.168.2.42",
    "dialect": "oracle",
    "logQueryParameters":true,
    "dialectOptions":{      
      "schema": "EP"
    }
  },
}
  