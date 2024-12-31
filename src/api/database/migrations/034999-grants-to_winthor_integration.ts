'use strict';

import { QueryInterface } from 'sequelize';
import  Utils  from '../../controllers/utils/Utils.js';
import DBConnectionManager from '../DBConnectionManager.js';
import config from '../config/config.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {  
  async up(queryInterface: QueryInterface, Sequelize: any) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      let originQueryInterface : any = await DBConnectionManager.getWinthorDBConnection()?.getQueryInterface();    
      let connectionConfig = (config as any)[`${process.env.NODE_ENV||'development'}_winthor_integration`];
      let dbUserName = connectionConfig?.username || 'OIIS';
      await originQueryInterface.sequelize.query(`grant select any table to ${dbUserName}`);
      await originQueryInterface.sequelize.query(`grant create any trigger to ${dbUserName}`);
    }    
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      let originQueryInterface : any = await DBConnectionManager.getWinthorDBConnection()?.getQueryInterface();    
      let connectionConfig = (config as any)[`${process.env.NODE_ENV||'development'}_winthor_integration`];
      let dbUserName = connectionConfig?.username || 'OIIS';
      await originQueryInterface.sequelize.query(`revoke create any trigger to ${dbUserName}`);
      await originQueryInterface.sequelize.query(`revoke select any table to ${dbUserName}`);  
    }  
  }
};