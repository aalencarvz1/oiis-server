'use strict';

import { QueryInterface } from "sequelize";
import Processes from "../models/Processes.js";

/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize:any) {
    await Processes.runUpMigration(queryInterface);
  },
  async down(queryInterface: QueryInterface, Sequelize:any) {
    await queryInterface.dropTable(Processes.tableName);
  }
};