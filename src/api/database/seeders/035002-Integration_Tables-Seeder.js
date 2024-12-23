'use strict';

require('dotenv').config({ path: __dirname + "/../../../../.env" });
const { Integration_Tables } = require('../models/winthor_integration/Integration_Tables');
const { Users } = require('../models/Users');
const { PcProdut } = require('../models/winthor/PcProdut');
const { Utils } = require('../../controllers/utils/Utils');
const DBConnectionManager = require('../DBConnectionManager');
const { QueryTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      let query = `
        MERGE INTO 
          "${Integration_Tables.tableName}" target
        USING (
          SELECT 
            :id AS id, 
            :creator_user_id as creator_user_id,
            sysdate as created_at,
            :schema_name as schema_name,          
            :table_name AS table_name,
            :identifier_column AS identifier_column
          FROM 
              dual
        ) source
        ON (
          target."id" = source.id
        )
        WHEN NOT MATCHED THEN
          INSERT (
            target."id", 
            target."creator_user_id",
            target."created_at", 
            target."schema_name", 
            target."table_name", 
            target."identifier_column"
          ) VALUES (
            source.id, 
            source.creator_user_id, 
            source.created_at, 
            source.schema_name, 
            source.table_name, 
            source.identifier_column
          )
      `;
      await DBConnectionManager.getWinthorIntegrationDBConnection().query(
        query,{
          replacements:{
            id:PcProdut.id,
            creator_user_id: Users.SYSTEM,
            schema_name: PcProdut.schema,
            table_name: PcProdut.tableName,
            identifier_column: "CODPROD"
          },
          type: QueryTypes.INSERT
        }
      );
    }     
  },

  async down (queryInterface, Sequelize) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      await Integration_Tables.getModel().bulkDelete(null, {});
    }
  }
};
