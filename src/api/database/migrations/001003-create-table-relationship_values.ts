'use strict';

import { QueryInterface } from "sequelize";
import Relationship_Values from "../models/Relationship_Values.js";


/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Relationship_Values.runUpMigration(queryInterface);     
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Relationship_Values.tableName);
  }
};