'use strict';

import { QueryInterface } from "sequelize";
import Lists_Names from "../models/Lists_Names.js";


/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Lists_Names.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Lists_Names.tableName);
  }
};