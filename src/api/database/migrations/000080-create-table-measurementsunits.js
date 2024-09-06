'use strict';

/*imports*/
const { MeasurementsUnits } = require('../models/MeasurementsUnits');
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Greatnesses } = require('../models/Greatnesses');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await MeasurementsUnits.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});         
    
    await MeasurementsUnits.migrateForeignKeyContraint(queryInterface,StatusRegs);  
    await MeasurementsUnits.migrateForeignKeyContraint(queryInterface,OriginsDatas);  
    await MeasurementsUnits.migrateForeignKeyContraint(queryInterface,Greatnesses);  
        
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(MeasurementsUnits.tableName);
  }
};