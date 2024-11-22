'use strict';
require('dotenv').config({ path: __dirname + "/../../../../.env" });
const configDB  = require("../config/config");
/*imports*/
const { Movements } = require('../models/Movements');
const { Relationships } = require("../models/Relationships");
const { Utils } = require('../../controllers/utils/Utils');
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await Movements.runUpMigration(queryInterface);     
    let connectionConfig = configDB[`${process.env.NODE_ENV||'development'}`];
    let queryTrigger = `
      CREATE TRIGGER ${Movements.schema}.${Movements.tableName}_deleted AFTER DELETE on ${Movements.schema}.${Movements.tableName}
      FOR EACH ROW 
      BEGIN
        DELETE FROM ${Movements.schema}.${Relationships.tableName} WHERE (${Relationships.tableName}.table_1_id = ${Movements.id} AND ${Relationships.tableName}.record_1_id = OLD.id) OR (${Relationships.tableName}.table_2_id = ${Movements.id} AND ${Relationships.tableName}.record_2_id = OLD.id);      
      END
    `;
    if ((connectionConfig?.dialect || '').toLowerCase().trim() == 'mysql' ) {
      await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS ${Movements.schema}.${Movements.tableName}_deleted`);
      await queryInterface.sequelize.query(queryTrigger);
    } else if ((connectionConfig?.dialect || '').toLowerCase().trim() == 'oracle' ) {
      queryTrigger = queryTrigger.replace("CREATE TRIGGER","CREATE OR REPLACE TRIGGER");
      await queryInterface.sequelize.query(queryTrigger);
    } 
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Movements.tableName);
  }
};