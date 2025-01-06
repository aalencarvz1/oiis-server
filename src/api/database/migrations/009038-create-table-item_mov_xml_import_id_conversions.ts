'use strict';

import { QueryInterface } from 'sequelize';
import  Item_Mov_Xml_Import_Id_Conversions  from '../models/Item_Mov_Xml_Import_Id_Conversions.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Item_Mov_Xml_Import_Id_Conversions.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Item_Mov_Xml_Import_Id_Conversions.tableName);
  }
};