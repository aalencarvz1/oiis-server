'use strict';

import { QueryInterface } from "sequelize";
import Languages from "../models/Languages.js";

/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Languages.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Languages.tableName);
  }
};