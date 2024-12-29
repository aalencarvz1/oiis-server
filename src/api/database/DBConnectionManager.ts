import { Sequelize } from "sequelize";
import Utils from "../controllers/utils/Utils.js";
import config from "./config/config.js";
import OracleDB from "oracledb";


/**
 * Class to manage connections to database
 * @author Alencar
 * @created 2023-08-10
 */
export default class DBConnectionManager {

    //to storage singleton default connection according configDB
    static #defaultDBConnection : Sequelize | null = null;

    static #oldDBConnection : Sequelize | null = null;

    static #winthorDBConnection : Sequelize | null = null;

    static #consultDBConnection : Sequelize | null = null;

    static #epDBConnection : Sequelize | null = null;

    static #winthorIntegrationConnection : Sequelize | null = null;

    static #externalDataConnection : Sequelize | null = null;

    

    /**
     * get / start default database connection, according configDB
     * @returns database connection
     * @created 2023-08-10
     */
    static getDefaultDBConnection() : Sequelize | null {
        try {
            if (DBConnectionManager.#defaultDBConnection == null) {
                console.log('xxxxxxxx config',process.env.NODE_ENV, (config as any)[process.env.NODE_ENV||'development']);
                let connectionConfig = (config as any)[`${process.env.NODE_ENV||'development'}`];
                Utils.log('starting sequelize ', connectionConfig);
                DBConnectionManager.#defaultDBConnection = new Sequelize(connectionConfig);                
            }
            return DBConnectionManager.#defaultDBConnection;
        } catch (e) {
            Utils.logError(e);
        }
        return DBConnectionManager.#defaultDBConnection;
    }


    static getWinthorDBConnection() : Sequelize | null {
        try {
            if (DBConnectionManager.#winthorDBConnection == null) {
                let connectionConfig = (config as any)[`${process.env.NODE_ENV||'development'}_winthor`];


                if (connectionConfig) {

                    if ((connectionConfig?.dialect || '').toLowerCase().trim() == 'oracle' ) {
                        
                        //https://github.com/oracle/node-oracledb/blob/b2b784218a53e0adfb8b3b8eeb91532abed946f5/doc/src/user_guide/appendix_a.rst#id87                
                        OracleDB.initOracleClient();
                    }

                    Utils.log('starting sequelize ', connectionConfig);
                    DBConnectionManager.#winthorDBConnection = new Sequelize(connectionConfig);                
                }
            }
            return DBConnectionManager.#winthorDBConnection;
        } catch (e) {
            Utils.logError(e);
        }
        return DBConnectionManager.#winthorDBConnection;
    }


    static getConsultDBConnection() : Sequelize | null {
        try {
            if (DBConnectionManager.#consultDBConnection == null) {
                let connectionConfig = (config as any)[`${process.env.NODE_ENV||'development'}_consult`];


                if (connectionConfig) {

                    if ((connectionConfig?.dialect || '').toLowerCase().trim() == 'oracle' ) {
                        
                        //https://github.com/oracle/node-oracledb/blob/b2b784218a53e0adfb8b3b8eeb91532abed946f5/doc/src/user_guide/appendix_a.rst#id87                
                        OracleDB.initOracleClient();
                    }

                    Utils.log('starting sequelize ', connectionConfig);
                    DBConnectionManager.#consultDBConnection = new Sequelize(connectionConfig);                
                }
            }
            return DBConnectionManager.#consultDBConnection;
        } catch (e) {
            Utils.logError(e);
        }
        return DBConnectionManager.#consultDBConnection;
    }

    static getEpDBConnection() : Sequelize | null {
        try {
            if (DBConnectionManager.#epDBConnection == null) {
                let connectionConfig = (config as any)[`${process.env.NODE_ENV||'development'}_ep`];


                if (connectionConfig) {

                    if ((connectionConfig?.dialect || '').toLowerCase().trim() == 'oracle' ) {
                        
                        //https://github.com/oracle/node-oracledb/blob/b2b784218a53e0adfb8b3b8eeb91532abed946f5/doc/src/user_guide/appendix_a.rst#id87                
                        OracleDB.initOracleClient();
                    }

                    Utils.log('starting sequelize ', connectionConfig);
                    DBConnectionManager.#epDBConnection = new Sequelize(connectionConfig);                
                }
            }
            return DBConnectionManager.#epDBConnection;
        } catch (e) {
            Utils.logError(e);
        }
        return DBConnectionManager.#epDBConnection;
    }


    static getOldDBConnection() : Sequelize | null {
        try {
            if (DBConnectionManager.#oldDBConnection == null) {
                let connectionConfig = (config as any)[`${process.env.NODE_ENV||'development'}_old`];

                if (connectionConfig) {

                    if ((connectionConfig?.dialect || '').toLowerCase().trim() == 'oracle' ) {
                        
                        //https://github.com/oracle/node-oracledb/blob/b2b784218a53e0adfb8b3b8eeb91532abed946f5/doc/src/user_guide/appendix_a.rst#id87                
                        OracleDB.initOracleClient();
                    }

                    Utils.log('starting sequelize ', connectionConfig);                    
                    DBConnectionManager.#oldDBConnection = new Sequelize(connectionConfig);                
                }
            }
            return DBConnectionManager.#oldDBConnection;
        } catch (e) {
            Utils.logError(e);
        }
        return DBConnectionManager.#oldDBConnection;
    }


    static getWinthorIntegrationDBConnection() : Sequelize | null {
        try {
            if (DBConnectionManager.#winthorIntegrationConnection == null) {
                let connectionConfig = (config as any)[`${process.env.NODE_ENV||'development'}_winthor_integration`];

                if (connectionConfig) {

                    if ((connectionConfig?.dialect || '').toLowerCase().trim() == 'oracle' ) {
                        
                        //https://github.com/oracle/node-oracledb/blob/b2b784218a53e0adfb8b3b8eeb91532abed946f5/doc/src/user_guide/appendix_a.rst#id87                
                        OracleDB.initOracleClient();
                    }

                    Utils.log('starting sequelize ', connectionConfig);
                    DBConnectionManager.#winthorIntegrationConnection = new Sequelize(connectionConfig);                
                }
            }
            return DBConnectionManager.#winthorIntegrationConnection;
        } catch (e) {
            Utils.logError(e);
        }
        return DBConnectionManager.#winthorIntegrationConnection;
    }

    

    static getExternalDataDBConnection() : Sequelize | null {
        try {
            if (DBConnectionManager.#externalDataConnection == null) {
                let connectionConfig = (config as any)[`${process.env.NODE_ENV||'development'}_external_data`];

                if (connectionConfig) {

                    if ((connectionConfig?.dialect || '').toLowerCase().trim() == 'oracle' ) {
                        
                        //https://github.com/oracle/node-oracledb/blob/b2b784218a53e0adfb8b3b8eeb91532abed946f5/doc/src/user_guide/appendix_a.rst#id87                
                        OracleDB.initOracleClient();
                    }

                    Utils.log('starting sequelize ', connectionConfig);                    
                    DBConnectionManager.#externalDataConnection = new Sequelize(connectionConfig);                
                }
            }
            return DBConnectionManager.#externalDataConnection;
        } catch (e) {
            Utils.logError(e);
        }
        return DBConnectionManager.#externalDataConnection;
    }



    static getConnectionBySchemaName(schemaName: string) : Sequelize | null {
        let result = null;
        switch(schemaName.trim().toLowerCase()) {
            case 'ep':
                result = DBConnectionManager.getEpDBConnection();
                break;
            case 'consult':
                result = DBConnectionManager.getConsultDBConnection();
                break;
            case 'winthor':
                result = DBConnectionManager.getWinthorDBConnection();
                break;
            case 'external_data':
                result = DBConnectionManager.getExternalDataDBConnection();
                break;
            case 'default':
                result = DBConnectionManager.getDefaultDBConnection();
                break;
        }
        return result;
    }

    static getConnectionByConnectionName(connectionName : string) : Sequelize | null {
        let result = null;
        switch(connectionName.trim().toLowerCase()) {
            case 'ep':
                result = DBConnectionManager.getEpDBConnection();
                break;
            case 'consult':
                result = DBConnectionManager.getConsultDBConnection();
                break;
            case 'winthor':
                result = DBConnectionManager.getWinthorDBConnection();
                break;
            case 'external_data':
                result = DBConnectionManager.getExternalDataDBConnection();
                break;
            case 'default':
                result = DBConnectionManager.getDefaultDBConnection();
                break;
        }
        return result;
    }
}

