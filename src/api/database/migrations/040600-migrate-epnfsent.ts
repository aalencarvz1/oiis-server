'use strict';


import { QueryInterface } from 'sequelize';
import  Utils  from '../../controllers/utils/Utils.js';
import  EpNfsEnt  from '../models/ep/EpNfsEnt.js';

/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    if (Utils.toBool(process.env.HAS_EP_INTEGRATION) == true) {
      await EpNfsEnt.runUpMigration(queryInterface); 
    }    
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    //await queryInterface.dropTable(EpNfsEnt.tableName);
  }
};