'use strict';

const DBConnectionManager = require('../DBConnectionManager');

/*imports*/
require('dotenv').config({ path: __dirname + "/../../../../.env" });
const configDB  = require("../config/config");
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {  
  async up(queryInterface, Sequelize) {
    let originQueryInterface = await DBConnectionManager.getWinthorIntegrationDBConnection().getQueryInterface();
    let triggerName = 'trg_int_wint_pcclient';
    let connectionConfig = configDB[`${process.env.NODE_ENV||'development'}_winthor`];
    let dbWinthorUserName = connectionConfig?.username || 'WINTHOR';
    //await originQueryInterface.sequelize.query(`DROP TRIGGER ${triggerName}`);
    /*await originQueryInterface.sequelize.query(`
CREATE OR REPLACE TRIGGER TRG_INT_WINT_PCCLIENT 
    AFTER
        INSERT 
        OR DELETE 
        OR UPDATE OF 
            CODCLI, 
            CGCENT,
            IEENT,
            CLIENTE, 
            FANTASIA, 
            CODUSUR1,
            CODUSUR2,
            CODUSUR3,
            CODPAIS,
            CODCIDADE,
            CODMUNICIPIO,
            PAISENT,            
            ESTENT,
            MUNICENT,
            BAIRROENT,
            ENDERENT,
            NUMEROENT,
            BLOQUEIO,
            DTEXCLUSAO            
    ON JUMBO.PCCLIENT
    FOR EACH ROW
DECLARE
    PRAGMA autonomous_transaction;    
    v_exists integer default 0;
    v_table_name varchar2(255) default 'PCCLIENT';
    v_migrationtable_row migrationstables%rowtype default null;
    v_error_log errorslogs%rowtype default NULL;
    v_codcli integer default null;
    v_json_values json_object_t;
    v_blob_values blob default empty_blob();
    v_operation varchar2(100) default null;
    hasValues integer(1) default 0;    
BEGIN    
    v_exists := 0;
    hasValues := 0;
    select count(1) into v_exists from migrationstables where upper(trim(tablename)) = v_table_name;
    IF v_exists > 0 THEN
        select * into v_migrationtable_row from migrationstables where upper(trim(tablename)) = v_table_name;     
        IF v_migrationtable_row.MIGRATEINTEGRATION = 1 THEN
            v_json_values := new json_object_t();            
            v_operation := 'MIGRATION';
            IF DELETING THEN
                v_codcli := :OLD.CODCLI;
                v_json_values.put('CODCLI',v_codcli);
                v_json_values.put('CGCENT',:OLD.CGCENT);
                v_json_values.put('IEENT',:OLD.IEENT);
                v_json_values.put('CLIENTE',:OLD.CLIENTE);
                v_json_values.put('FANTASIA',:OLD.FANTASIA);
                v_json_values.put('CODUSUR1',:OLD.CODUSUR1);
                v_json_values.put('CODUSUR2',:OLD.CODUSUR2);
                v_json_values.put('CODUSUR3',:OLD.CODUSUR3);
                v_json_values.put('CODPAIS',:OLD.CODPAIS);
                v_json_values.put('CODCIDADE',:OLD.CODCIDADE);
                v_json_values.put('CODMUNICIPIO',:OLD.CODMUNICIPIO);
                v_json_values.put('PAISENT',:OLD.PAISENT);
                v_json_values.put('ESTENT',:OLD.ESTENT);
                v_json_values.put('MUNICENT',:OLD.MUNICENT);
                v_json_values.put('BAIRROENT',:OLD.BAIRROENT);
                v_json_values.put('ENDERENT',:OLD.ENDERENT);
                v_json_values.put('NUMEROENT',:OLD.NUMEROENT);
                v_json_values.put('BLOQUEIO',:OLD.BLOQUEIO);
                v_json_values.put('DTEXCLUSAO',:OLD.DTEXCLUSAO);
            ELSE
                v_codcli := :NEW.CODCLI;
                v_json_values.put('CODCLI',v_codcli);
                v_json_values.put('CGCENT',:NEW.CGCENT);
                v_json_values.put('IEENT',:NEW.IEENT);
                v_json_values.put('CLIENTE',:NEW.CLIENTE);
                v_json_values.put('FANTASIA',:NEW.FANTASIA);
                v_json_values.put('CODUSUR1',:NEW.CODUSUR1);
                v_json_values.put('CODUSUR2',:NEW.CODUSUR2);
                v_json_values.put('CODUSUR3',:NEW.CODUSUR3);
                v_json_values.put('CODPAIS',:NEW.CODPAIS);
                v_json_values.put('CODCIDADE',:NEW.CODCIDADE);
                v_json_values.put('CODMUNICIPIO',:NEW.CODMUNICIPIO);
                v_json_values.put('PAISENT',:NEW.PAISENT);
                v_json_values.put('ESTENT',:NEW.ESTENT);
                v_json_values.put('MUNICENT',:NEW.MUNICENT);
                v_json_values.put('BAIRROENT',:NEW.BAIRROENT);
                v_json_values.put('ENDERENT',:NEW.ENDERENT);
                v_json_values.put('NUMEROENT',:NEW.NUMEROENT);
                v_json_values.put('BLOQUEIO',:NEW.BLOQUEIO);
                v_json_values.put('DTEXCLUSAO',:NEW.DTEXCLUSAO);                
            END IF;
            hasValues := 1;
            v_blob_values := v_json_values.to_blob();                
        ELSIF INSERTING AND v_migrationtable_row.MIGRATEINTEGRATION = 0 AND v_migrationtable_row.MIGRATEINSERT = 1 THEN 
            v_operation := 'INSERT';            
            v_codcli := :NEW.CODCLI;
        ELSIF UPDATING AND v_migrationtable_row.MIGRATEINTEGRATION = 0 AND v_migrationtable_row.MIGRATEUPDATE = 1 THEN
            v_operation := 'UPDATE';
            v_codcli := :NEW.CODCLI;
        ELSIF DELETING AND v_migrationtable_row.MIGRATEINTEGRATION = 0 AND v_migrationtable_row.MIGRATEDELETE = 1 THEN
            v_operation := 'DELETE';
            v_codcli := :OLD.CODCLI;
        END IF;
        IF v_migrationtable_row.MIGRATEINTEGRATION = 0 AND (INSERTING OR UPDATING) AND (v_migrationtable_row.MIGRATEINSERT = 1 OR v_migrationtable_row.MIGRATEUPDATE = 1) THEN
            v_json_values := new json_object_t();
            v_json_values.put('CODCLI',v_codcli);
            IF INSERTING THEN
                v_json_values.put('CGCENT',:NEW.CGCENT);
                v_json_values.put('IEENT',:NEW.IEENT);
                v_json_values.put('CLIENTE',:NEW.CLIENTE);
                v_json_values.put('FANTASIA',:NEW.FANTASIA);
                v_json_values.put('CODUSUR1',:NEW.CODUSUR1);
                v_json_values.put('CODUSUR2',:NEW.CODUSUR2);
                v_json_values.put('CODUSUR3',:NEW.CODUSUR3);
                v_json_values.put('CODPAIS',:NEW.CODPAIS);
                v_json_values.put('CODCIDADE',:NEW.CODCIDADE);
                v_json_values.put('CODMUNICIPIO',:NEW.CODMUNICIPIO);
                v_json_values.put('PAISENT',:NEW.PAISENT);
                v_json_values.put('ESTENT',:NEW.ESTENT);
                v_json_values.put('MUNICENT',:NEW.MUNICENT);
                v_json_values.put('BAIRROENT',:NEW.BAIRROENT);
                v_json_values.put('ENDERENT',:NEW.ENDERENT);
                v_json_values.put('NUMEROENT',:NEW.NUMEROENT);
                v_json_values.put('BLOQUEIO',:NEW.BLOQUEIO);
                v_json_values.put('DTEXCLUSAO',:NEW.DTEXCLUSAO);
            ELSIF UPDATING THEN
                IF UPDATING('CGCENT') AND :NEW.CGCENT <> :OLD.CGCENT THEN
                    v_json_values.put('CGCENT',:NEW.CGCENT);
                END IF;
                IF UPDATING('IEENT') AND :NEW.IEENT <> :OLD.IEENT THEN
                    v_json_values.put('IEENT',:NEW.IEENT);
                END IF;
                IF UPDATING('CLIENTE') AND :NEW.CLIENTE <> :OLD.CLIENTE THEN
                    v_json_values.put('CLIENTE',:NEW.CLIENTE);
                END IF;
                IF UPDATING('FANTASIA') AND :NEW.FANTASIA <> :OLD.FANTASIA THEN
                    v_json_values.put('FANTASIA',:NEW.FANTASIA);
                END IF;
                IF UPDATING('CODUSUR1') AND :NEW.CODUSUR1 <> :OLD.CODUSUR1 THEN
                    v_json_values.put('CODUSUR1',:NEW.CODUSUR1);
                END IF;
                IF UPDATING('CODUSUR2') AND :NEW.CODUSUR2 <> :OLD.CODUSUR2 THEN
                    v_json_values.put('CODUSUR2',:NEW.CODUSUR2);
                END IF;
                IF UPDATING('CODUSUR3') AND :NEW.CODUSUR3 <> :OLD.CODUSUR3 THEN
                    v_json_values.put('CODUSUR3',:NEW.CODUSUR3);
                END IF;
                IF UPDATING('CODPAIS') AND :NEW.CODPAIS <> :OLD.CODPAIS THEN
                    v_json_values.put('CODPAIS',:NEW.CODPAIS);
                END IF;
                IF UPDATING('CODCIDADE') AND :NEW.CODCIDADE <> :OLD.CODCIDADE THEN
                    v_json_values.put('CODCIDADE',:NEW.CODCIDADE);
                END IF;
                IF UPDATING('CODMUNICIPIO') AND :NEW.CODMUNICIPIO <> :OLD.CODMUNICIPIO THEN
                    v_json_values.put('CODMUNICIPIO',:NEW.CODMUNICIPIO);
                END IF;
                IF UPDATING('PAISENT') AND :NEW.PAISENT <> :OLD.PAISENT THEN
                    v_json_values.put('PAISENT',:NEW.PAISENT);
                END IF;
                IF UPDATING('ESTENT') AND :NEW.ESTENT <> :OLD.ESTENT THEN
                    v_json_values.put('ESTENT',:NEW.ESTENT);
                END IF;
                IF UPDATING('MUNICENT') AND :NEW.MUNICENT <> :OLD.MUNICENT THEN
                    v_json_values.put('MUNICENT',:NEW.MUNICENT);
                END IF;
                IF UPDATING('BAIRROENT') AND :NEW.BAIRROENT <> :OLD.BAIRROENT THEN
                    v_json_values.put('BAIRROENT',:NEW.BAIRROENT);
                END IF;
                IF UPDATING('ENDERENT') AND :NEW.ENDERENT <> :OLD.ENDERENT THEN
                    v_json_values.put('ENDERENT',:NEW.ENDERENT);
                END IF;
                IF UPDATING('NUMEROENT') AND :NEW.NUMEROENT <> :OLD.NUMEROENT THEN
                    v_json_values.put('NUMEROENT',:NEW.NUMEROENT);
                END IF;
                IF UPDATING('BLOQUEIO') AND :NEW.BLOQUEIO <> :OLD.BLOQUEIO THEN
                    v_json_values.put('BLOQUEIO',:NEW.BLOQUEIO);
                END IF;
                IF UPDATING('DTEXCLUSAO') AND :NEW.DTEXCLUSAO <> :OLD.DTEXCLUSAO THEN
                    v_json_values.put('DTEXCLUSAO',:NEW.DTEXCLUSAO);
                END IF;
            END IF;      
            
            --indicate has update fields
            IF v_json_values.get_keys().count > 1 THEN
                hasValues := 1;
                v_blob_values := v_json_values.to_blob();
            END IF;
            
        END IF;
    
        IF DELETING OR hasValues = 1 THEN
            INSERT INTO MIGRATIONSCONTROL (            
                CREATEDAT,
                IDSTATUSREG,
                OBJECTTYPE,
                OBJECTNAME,
                OBJECTREGISTERID,
                OBJECTOPERATION,
                VALUESTOMIGRATE
            ) VALUES (
                CURRENT_TIMESTAMP,
                1,
                'TABLE',
                'PCCLIENT',
                v_codcli,
                v_operation,    
                v_blob_values
            );
        END IF;
        COMMIT;
    end if;
EXCEPTION
    WHEN OTHERS THEN
        v_error_log.idusercreate := 1;        
        v_error_log.createdat := sysdate;        
        v_error_log.idstatusreg := 1;
        v_error_log.idorigindata := 1;
        v_error_log.issystemreg := 0;
        v_error_log.objecttype := 'trigger';
        v_error_log.objectname := $$plsql_unit;
        v_error_log.objectline := $$plsql_line;
        v_error_log.errorcode := sqlcode;
        v_error_log.message := substr(sqlerrm
                                      || ' '
                                      || dbms_utility.format_error_backtrace, 1, 4000);
        v_error_log.logvalues := 'codcli: ' || :new.codcli;
        INSERT INTO errorslogs VALUES v_error_log;
        COMMIT;
        NULL;
END;
  `);*/
  },
  async down(queryInterface, Sequelize) {
    let originQueryInterface = await DBConnectionManager().getWinthorIntegrationDBConnection().getQueryInterface();
    let triggerName = 'trg_int_wint_pcclient';
    //await originQueryInterface.sequelize.query(`DROP TRIGGER ${triggerName}`);
  }
};