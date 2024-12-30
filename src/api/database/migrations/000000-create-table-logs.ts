'use strict';

import { QueryInterface } from "sequelize";
import Logs from "../models/Logs.js";


/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.createTable(Logs.tableName, Logs.fields);
    await Logs.migrateConstraints(queryInterface);
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Logs.tableName);
  }
};