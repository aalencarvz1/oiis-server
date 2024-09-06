'use strict';
require('dotenv').config({ path: __dirname + "/../../../../.env" });
const configDB  = require("../config/config");
const { DatasValues } = require('../models/DatasValues');
/*imports*/
const { Movements } = require('../models/Movements');
const { DatasRelationships } = require("../models/DatasRelationships");
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
        DELETE FROM ${Movements.schema}.${DatasValues.tableName} WHERE ${DatasValues.tableName}.IDTABLE = ${Movements.id} AND ${DatasValues.tableName}.IDREG = OLD.id;      
        DELETE FROM ${Movements.schema}.${DatasRelationships.tableName} WHERE (${DatasRelationships.tableName}.IDTABLE1 = ${Movements.id} AND ${DatasRelationships.tableName}.IDREG1 = OLD.id) OR (${DatasRelationships.tableName}.IDTABLE2 = ${Movements.id} AND ${DatasRelationships.tableName}.IDREG2 = OLD.id);      
      END
    `;
    if ((connectionConfig?.dialect || '').toLowerCase().trim() == 'mysql' ) {
      await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS ${Movements.schema}.${Movements.tableName}_deleted`);
      await queryInterface.sequelize.query(queryTrigger);
    } else if ((connectionConfig?.dialect || '').toLowerCase().trim() == 'oracle' ) {
      queryTrigger = queryTrigger.replace("CREATE TRIGGER","CREATE OR REPLACE TRIGGER");
      await queryInterface.sequelize.query(queryTrigger);
    } else {
      Utils.log('not created triggers because dialect is not suported ',connectionConfig?.dialect);
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Movements.tableName);
  }
};