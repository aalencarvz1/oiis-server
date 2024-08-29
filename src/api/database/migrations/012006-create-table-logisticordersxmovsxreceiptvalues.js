'use strict';

/*imports*/
const { LogisticOrdersXMovsXReceiptValues } = require('../models/LogisticOrdersXMovsXReceiptValues');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await LogisticOrdersXMovsXReceiptValues.runUpMigration(queryInterface);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(LogisticOrdersXMovsXReceiptValues.name.toUpperCase());    
  }
};