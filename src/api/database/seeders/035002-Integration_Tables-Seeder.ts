'use strict';

import  Integration_Tables  from '../models/winthor_integration/Integration_Tables.js';
import  Users  from '../models/Users.js';
import  PcProdut  from '../models/winthor/PcProdut.js';
import  Utils  from '../../controllers/utils/Utils.js';
import { QueryInterface, QueryTypes } from 'sequelize';
import DBConnectionManager from '../DBConnectionManager.js';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {    
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
      await DBConnectionManager.getWinthorIntegrationDBConnection()?.query(
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

  async down(queryInterface: QueryInterface, Sequelize: any) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
      await DBConnectionManager.getWinthorIntegrationDBConnection()?.getQueryInterface().bulkDelete(Integration_Tables, {});
    }
  }
};
