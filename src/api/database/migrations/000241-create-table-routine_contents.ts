'use strict';

import { QueryInterface } from "sequelize";
import Routine_Contents from "../models/Routine_Contents.js";

/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Routine_Contents.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Routine_Contents.tableName);
  }
};