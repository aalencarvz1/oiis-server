'use strict';

const { Errors } = require('../models/Errors');

/*imports*/
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {

  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(Errors.name.toLocaleLowerCase(), Errors.fields);
    await Errors.migrateConstraints(queryInterface);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Errors.name.toLocaleLowerCase());
  }
};