'use strict';

import { QueryInterface } from "sequelize";
import User_Tokens from "../models/User_Tokens.js";


/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await User_Tokens.runUpMigration(queryInterface);           
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(User_Tokens.tableName);
  }
};