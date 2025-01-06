'use strict';

import { QueryInterface } from "sequelize";
import Relationships from "../models/Relationships.js";


/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Relationships.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Relationships.tableName);
  }
};