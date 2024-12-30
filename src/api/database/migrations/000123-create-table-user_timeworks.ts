'use strict';

import { QueryInterface } from "sequelize";
import User_Timeworks from "../models/User_Timeworks.js";

/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await User_Timeworks.runUpMigration(queryInterface);           
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(User_Timeworks.tableName);
  }
};