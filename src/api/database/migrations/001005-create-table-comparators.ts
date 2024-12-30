'use strict';

import { QueryInterface } from "sequelize";
import Comparators from "../models/Comparators.js";

/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Comparators.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Comparators.tableName);
  }
};