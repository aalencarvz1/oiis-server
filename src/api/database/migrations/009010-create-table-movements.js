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
      CREATE TRIGGER ${Movements.schema}.${Movements.name.toLowerCase()}_deleted AFTER DELETE on ${Movements.schema}.${Movements.name.toLowerCase()}
      FOR EACH ROW 
      BEGIN
        DELETE FROM ${Movements.schema}.${DatasValues.name.toLowerCase()} WHERE ${DatasValues.name.toLowerCase()}.IDTABLE = ${Movements.id} AND ${DatasValues.name.toLowerCase()}.IDREG = OLD.id;      
        DELETE FROM ${Movements.schema}.${DatasRelationships.name.toLowerCase()} WHERE (${DatasRelationships.name.toLowerCase()}.IDTABLE1 = ${Movements.id} AND ${DatasRelationships.name.toLowerCase()}.IDREG1 = OLD.id) OR (${DatasRelationships.name.toLowerCase()}.IDTABLE2 = ${Movements.id} AND ${DatasRelationships.name.toLowerCase()}.IDREG2 = OLD.id);      
      END
    `;
    if ((connectionConfig?.dialect || '').toLowerCase().trim() == 'mysql' ) {
      await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS ${Movements.schema}.${Movements.name.toLowerCase()}_deleted`);
      await queryInterface.sequelize.query(queryTrigger);
    } else if ((connectionConfig?.dialect || '').toLowerCase().trim() == 'oracle' ) {
      queryTrigger = queryTrigger.replace("CREATE TRIGGER","CREATE OR REPLACE TRIGGER");
      await queryInterface.sequelize.query(queryTrigger);
    } else {
      Utils.log('not created triggers because dialect is not suported ',connectionConfig?.dialect);
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Movements.name.toLowerCase());
  }
};