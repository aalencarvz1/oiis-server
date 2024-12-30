'use strict';

import { QueryInterface } from "sequelize";
import Routine_Types from "../models/Routine_Types.js";

/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Routine_Types.runUpMigration(queryInterface);             
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Routine_Types.tableName);
  }
};