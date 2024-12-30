'use strict';

import { QueryInterface } from "sequelize";
import Modules from "../models/Modules.js";

/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Modules.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Modules.tableName);
  }
};