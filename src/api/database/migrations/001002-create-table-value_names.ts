'use strict';

import { QueryInterface } from "sequelize";
import Value_Names from "../models/Value_Names.js";


/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Value_Names.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Value_Names.tableName);
  }
};