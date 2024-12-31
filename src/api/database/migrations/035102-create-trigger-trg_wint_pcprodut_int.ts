'use strict';

import { QueryInterface } from 'sequelize';
import  Utils  from '../../controllers/utils/Utils.js';
import  PcProdut  from '../models/winthor/PcProdut.js';
import DBConnectionManager from '../DBConnectionManager.js';
/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {  
  async up(queryInterface: QueryInterface, Sequelize: any) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
        let originQueryInterface : any = await DBConnectionManager.getWinthorIntegrationDBConnection()?.getQueryInterface();        
        let objectName = `trg_wint_${PcProdut.tableName}_int`;
        let query = `
create or replace TRIGGER ${objectName}
    AFTER
        INSERT 
        OR DELETE 
        OR UPDATE OF CODPROD,DESCRICAO
    ON ${PcProdut.schema}.${PcProdut.tableName}
    FOR EACH ROW
DECLARE

    /*
    * trigger that monitors winthor ${PcProdut.schema}.${PcProdut.tableName} table for integration of changes to oiis
    */


    PRAGMA autonomous_transaction;  
    v_err "error_logs"%rowtype;
    v_int_control "integration_control"%rowtype default null;
    v_op VARCHAR2(10) DEFAULT 'UPDATE';
BEGIN    

    IF INSERTING THEN 
        v_op := 'INSERT';
    ELSIF DELETING THEN 
        v_op := 'DELETE';
    END IF;

    begin
        select
            t."id" into v_int_control."integration_table_id"
        from
            "integration_tables" t
        where
            lower(t."schema_name") = lower('${PcProdut.schema}')
            and lower(t."table_name") = lower('${PcProdut.tableName}')
            and t."integrate" = 1
            and ((
                v_op = 'INSERT' 
                and t."integrate_insert" = 1
            ) or (
                v_op = 'DELETE' 
                and t."integrate_delete" = 1
            ) or (
                v_op = 'UPDATE' 
                and t."integrate_update" = 1
            ))
            and not exists(
                select 
                    1
                from
                    "integration_control" ic 
                where
                    ic."integration_table_id" = t."id"
                    and ic."register_id" = :new.codprod
                    and ic."operation" = v_op
                    and ic."integrated_at" is null
            );
    exception
        when NO_DATA_FOUND then null;
        when others then raise;
    end;

    if v_int_control."integration_table_id" is not null then
        v_int_control."creator_user_id" := 1;
        v_int_control."created_at" := sysdate;
        v_int_control."register_id" := :new.codprod;
        v_int_control."operation" := v_op;
        insert into "integration_control" values v_int_control;
        commit;
    end if;   
    
EXCEPTION
    WHEN OTHERS THEN 
    
        v_err."created_at" := sysdate;
        v_err."object_type" := 'trigger';
        v_err."object_name" := $$plsql_unit;
        v_err."object_line" := $$plsql_line;
        v_err."error_code" := sqlcode;
        v_err."message" := substr(sqlerrm|| ' '|| dbms_utility.format_error_backtrace, 1, 4000);
        v_err."log_values" := 'codprod: '||:new.codprod;
        INSERT INTO "error_logs" VALUES v_err;
        COMMIT;
        NULL;
        
END;  
        `;
        await originQueryInterface.sequelize.query(query);
    }
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
        let originQueryInterface : any = await DBConnectionManager.getWinthorIntegrationDBConnection()?.getQueryInterface();
        let objectName = `trg_wint_${PcProdut.tableName}_int`;
        await originQueryInterface.sequelize.query(`DROP function ${objectName}`);
    }
  }
};