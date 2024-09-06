'use strict';

/*imports*/
const { Greatnesses } = require('../models/Greatnesses');
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Greatnesses.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});     
    
    await Greatnesses.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await Greatnesses.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
        
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Greatnesses.name.toLowerCase());
  }
};