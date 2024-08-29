'use strict';

/*imports*/
const { GroupsMovements } = require('../models/GroupsMovements');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await GroupsMovements.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(GroupsMovements.name.toUpperCase());
  }
};