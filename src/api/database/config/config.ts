import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

//configure dotenv
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: __dirname + "/../../../../.env" });

export default {
    "production": {
      "id":1,
      "database": process.env.DB_NAME || "SERVER_API_DB", 
      "username": process.env.DB_USERNAME || "root",
      "password": process.env.DB_PASSWORD || "masterkey",
      "host": process.env.DB_HOST || "localhost",
      "port": process.env.DB_PORT || "3306",
      "dialect": process.env.DB_DIALECT ||"mysql",
      "dialectOptions":{
        "maxAllowedPacket": 1024 * 1024 * 1024, // 1024MB
      },
      "logQueryParameters":true,
      "define":{
        "freezeTableName": true
      }
    },
    "production_old": {
      "id":1,
      "database": process.env.DB_OLD_NAME || "SERVER_API_DB", 
      "username": process.env.DB_OLD_USERNAME || "root",
      "password": process.env.DB_OLD_PASSWORD || "masterkey",
      "host": process.env.DB_OLD_HOST || "localhost",
      "port": process.env.DB_OLD_PORT || "3306",
      "dialect": process.env.DB_OLD_DIALECT ||"mysql",
      "dialectOptions":{
        "maxAllowedPacket": 1024 * 1024 * 1024, // 1024MB
      },
      "logQueryParameters":true,
      //"logging":true,
      "define":{
        "freezeTableName": true
      }
    },
    "development": {
      "id":10,
      "database": process.env.DB_DEV_NAME || "SERVER_API_DB", 
      "username": process.env.DB_DEV_USERNAME || "root",
      "password": process.env.DB_DEV_PASSWORD || "masterkey",
      "host": process.env.DB_DEV_HOST || "localhost",
      "port": process.env.DB_DEV_PORT || "3306",
      "dialect": process.env.DB_DEV_DIALECT ||"mysql",
      "dialectOptions":{
        "maxAllowedPacket": 1024 * 1024 * 1024, // 1024MB
      },
      "logQueryParameters":true,
      logging: console.log, // Enable logging of SQL queries
      "define":{
        "freezeTableName": true
      },
      //"logging":true
    },
    "development_old": {
      "id":11,
      "database": process.env.DB_DEV_OLD_NAME || "SERVER_API_DB", 
      "username": process.env.DB_DEV_OLD_USERNAME || "root",
      "password": process.env.DB_DEV_OLD_PASSWORD || "masterkey",
      "host": process.env.DB_DEV_OLD_HOST || "localhost",
      "port": process.env.DB_DEV_OLD_PORT || "3306",
      "dialect": process.env.DB_DEV_OLD_DIALECT ||"mysql",
      "dialectOptions":{
        "maxAllowedPacket": 1024 * 1024 * 1024, // 1024MB
      },
      "logQueryParameters":true,
      "define":{
        "freezeTableName": true
      }
    },
    "production_winthor": {
      "id":2,
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
      "id":20,
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
      "id":3,
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
      "id":30,
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
      "id":5,
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
      "id":50,
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
      "id":4,
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
      "id":40,
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
    "production_external_data": {
      "id":100,
      "database": process.env.DB_EXTERNAL_DATA_PROD_NAME || "SERVER_API_DB_EXTERNAL_DATA", 
      "username": process.env.DB_EXTERNAL_DATA_PROD_USERNAME || "root",
      "password": process.env.DB_EXTERNAL_DATA_PROD_PASSWORD || "masterkey",
      "host": process.env.DB_EXTERNAL_DATA_PROD_HOST || "localhost",
      "port": process.env.DB_EXTERNAL_DATA_PROD_PORT || "3306",
      "dialect": process.env.DB_EXTERNAL_DATA_PROD_DIALECT ||"mysql",
      "dialectOptions":{
        "maxAllowedPacket": 1024 * 1024 * 1024, // 1024MB
      },
      "logQueryParameters":true,
      //"logging":true,
      "define":{
        "freezeTableName": true
      }
    },
    "development_external_data": {
      "id":1000,
      "database": process.env.DB_EXTERNAL_DATA_DEV_NAME || "SERVER_API_DB_EXTERNAL_DATA", 
      "username": process.env.DB_EXTERNAL_DATA_DEV_USERNAME || "root",
      "password": process.env.DB_EXTERNAL_DATA_DEV_PASSWORD || "masterkey",
      "host": process.env.DB_EXTERNAL_DATA_DEV_HOST || "localhost",
      "port": process.env.DB_EXTERNAL_DATA_DEV_PORT || "3306",
      "dialect": process.env.DB_EXTERNAL_DATA_DEV_DIALECT ||"mysql",
      "logQueryParameters":true,
      "define":{
        "freezeTableName": true
      },
      //"logging":true
    },
  }