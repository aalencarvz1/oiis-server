'use strict';

import { QueryInterface } from "sequelize";
import Errors from "../models/Errors.js";



/*imports*/
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {

  async up(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.createTable(Errors.name.toLocaleLowerCase(), Errors.fields);
    await Errors.migrateConstraints(queryInterface);
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Errors.name.toLocaleLowerCase());
  }
};