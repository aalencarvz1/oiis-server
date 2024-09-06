'use strict';

/*imports*/
const { ItemsXMeaXPackXIdentif } = require('../models/ItemsXMeaXPackXIdentif');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await ItemsXMeaXPackXIdentif.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ItemsXMeaXPackXIdentif.name.toLowerCase());
  }
};