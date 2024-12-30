'use strict';

import { QueryInterface } from "sequelize";
import Relationship_Types from "../models/Relationship_Types.js";

/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Relationship_Types.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Relationship_Types.tableName);
  }
};