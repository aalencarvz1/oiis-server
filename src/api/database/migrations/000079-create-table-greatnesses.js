'use strict';

/*imports*/
const { Greatnesses } = require('../models/Greatnesses');
const { Data_Origins } = require('../models/Data_Origins');
const { StatusRegs } = require('../models/StatusRegs');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Greatnesses.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});     
    
    await Greatnesses.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await Greatnesses.migrateForeignKeyContraint(queryInterface,Data_Origins);  
        
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Greatnesses.tableName);
  }
};