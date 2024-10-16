'use strict';

/*imports*/
const { Utils } = require('../../controllers/utils/Utils');
const { Businesses } = require('../models/external_data/Businesses');
require('dotenv').config({ path: __dirname + "/../../../../.env" });
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.HAS_DB_EXTERNAL_DATA) == true) {
      await Businesses.runUpMigration(queryInterface); 
    }    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Businesses.tableName);    
  }
};