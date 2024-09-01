'use strict';

/*imports*/
const { Utils } = require('../../controllers/utils/Utils');
const { EpNfsEnt } = require('../models/ep/EpNfsEnt');
require('dotenv').config({ path: __dirname + "/../../../../.env" });
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.EP_INTEGRATE) == true) {
      await EpNfsEnt.runUpMigration(queryInterface); 
    }    
  },
  async down(queryInterface, Sequelize) {
    //await queryInterface.dropTable(EpNfsEnt.name.toUpperCase());
  }
};