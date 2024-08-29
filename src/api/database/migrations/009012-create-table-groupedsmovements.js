'use strict';

/*imports*/
const { GroupedsMovements } = require('../models/GroupedsMovements');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await GroupedsMovements.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(GroupedsMovements.name.toUpperCase());
  }
};