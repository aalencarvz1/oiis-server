'use strict';

require('dotenv').config({ path: __dirname + "/../../../../.env" });
const { Integration_Parameters } = require('../models/winthor_integration/Integration_Parameters');
const { Users } = require('../models/Users');
const { QueryTypes } = require('sequelize');
const DBConnectionManager = require('../DBConnectionManager');
const { Utils } = require('../../controllers/utils/Utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      let query = `
        MERGE INTO 
          "${Integration_Parameters.tableName}" target
        USING (
          SELECT 
            :id AS id, 
            :creator_user_id as creator_user_id,
            sysdate as created_at,
            :name as name,          
            :value AS value
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
            target."name", 
            target."value"
          ) VALUES (
            source.id, 
            source.creator_user_id, 
            source.created_at, 
            source.name, 
            source.value
          )
      `;
      await DBConnectionManager.getWinthorIntegrationDBConnection().query(
        query,{
          replacements:{
            id:Integration_Parameters.API_LOCAL_NETWORK_IP_ID,
            creator_user_id : Users.SYSTEM,
            name : 'API_LOCAL_NETWORK_IP',
            value: Integration_Parameters.API_LOCAL_NETWORK_IP
          },
          type: QueryTypes.INSERT
        }
      );
    } 
  },

  async down (queryInterface, Sequelize) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      await Integration_Parameters.getModel().bulkDelete(null, {});
    }
  }
};
