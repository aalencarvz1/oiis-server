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
      CREATE TRIGGER ${Movements.schema}.${Movements.name.toUpperCase()}_DELETED AFTER DELETE on ${Movements.schema}.${Movements.name.toUpperCase()}
      FOR EACH ROW 
      BEGIN
        DELETE FROM ${Movements.schema}.${DatasValues.name.toUpperCase()} WHERE ${DatasValues.name.toUpperCase()}.IDTABLE = ${Movements.ID} AND ${DatasValues.name.toUpperCase()}.IDREG = OLD.ID;      
        DELETE FROM ${Movements.schema}.${DatasRelationships.name.toUpperCase()} WHERE (${DatasRelationships.name.toUpperCase()}.IDTABLE1 = ${Movements.ID} AND ${DatasRelationships.name.toUpperCase()}.IDREG1 = OLD.ID) OR (${DatasRelationships.name.toUpperCase()}.IDTABLE2 = ${Movements.ID} AND ${DatasRelationships.name.toUpperCase()}.IDREG2 = OLD.ID);      
      END
    `;
    if ((connectionConfig?.dialect || '').toLowerCase().trim() == 'mysql' ) {
      await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS ${Movements.schema}.${Movements.name.toUpperCase()}_DELETED`);
      await queryInterface.sequelize.query(queryTrigger);
    } else if ((connectionConfig?.dialect || '').toLowerCase().trim() == 'oracle' ) {
      queryTrigger = queryTrigger.replace("CREATE TRIGGER","CREATE OR REPLACE TRIGGER");
      await queryInterface.sequelize.query(queryTrigger);
    } else {
      Utils.log('not created triggers because dialect is not suported ',connectionConfig?.dialect);
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(Movements.name.toUpperCase());
  }
};