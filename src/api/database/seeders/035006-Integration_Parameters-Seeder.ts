'use strict';

import  Integration_Parameters  from '../models/winthor_integration/Integration_Parameters.js';
import  Users  from '../models/Users.js';
import  { QueryInterface, QueryTypes } from 'sequelize';
import  Utils  from '../../controllers/utils/Utils.js';
import DBConnectionManager from '../DBConnectionManager.js';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {    
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) === true) {
      let query = `
        MERGE INTO 
          "${Integration_Parameters.tableName}" target
        USING (
          SELECT 
            :id AS id, 
            :creator_user_id as creator_user_id,
            sysdate as created_at,
            :name as name,          
            :value AS "value"
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
            source."value"
          )
      `;
      await DBConnectionManager.getWinthorIntegrationDBConnection()?.query(
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

  async down(queryInterface: QueryInterface, Sequelize: any) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) === true) {
      await DBConnectionManager.getWinthorIntegrationDBConnection()?.getQueryInterface().bulkDelete(Integration_Parameters, {});
    }
  }
};
