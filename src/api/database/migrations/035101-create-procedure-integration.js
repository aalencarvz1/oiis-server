'use strict';

const DBConnectionManager = require('../DBConnectionManager');

/*imports*/
const { Utils } = require('../../controllers/utils/Utils');
require('dotenv').config({ path: __dirname + "/../../../../.env" });
const configDB  = require("../config/config");
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {  
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
        let originQueryInterface = await DBConnectionManager.getWinthorIntegrationDBConnection().getQueryInterface();
        let objectName = 'integration';
        let query = `
create or replace PROCEDURE ${objectName} AS

    /*
    * procedure to integrate winthor registers to oiis
    */

    v_err "error_logs"%rowtype;
    v_response JSON_OBJECT_T default null;
    v_qt integer default 0;
    v_ip varchar2(20) default null;
BEGIN

    /*check if has registers to integrate*/
    select 
        count(1) into v_qt
    from
        "integration_control" ic
    where
        ic."integrated_at" is null;
    
    if v_qt > 0 then    
        select
            p."value" into v_ip
        from
            "integration_parameters" p
        where
            p."id" = 1;
            
        /*request api integrate method*/
        v_response := network_request(
            'http://'||v_ip||':3004/api/controllers/modules/registers/integrations/winthor/WinthorIntegrationsRegistersController/req_integrate_registers'
        ); 
        
        /*handle response*/
        if v_response is not null then
            if v_response.has('success') then
                if v_response.get_Boolean('success') then
                    null;
                else 
                    raise_application_error(-20000,v_response.get_string('message'));
                end if;
            else 
                raise_application_error(-20000,'response not has success property');
            end if;
        else 
            raise_application_error(-20000,'response is null');
        end if;
    end if;
    
EXCEPTION
    WHEN OTHERS THEN         
        v_err."created_at" := sysdate;
        v_err."object_type" := 'procedure';
        v_err."object_name" := $$plsql_unit;
        v_err."object_line" := $$plsql_line;
        v_err."error_code" := sqlcode;
        v_err."message" := substr(sqlerrm|| ' '|| dbms_utility.format_error_backtrace, 1, 4000);
        INSERT INTO "error_logs" VALUES v_err;
        COMMIT;
        NULL;
END;
        `;
        await originQueryInterface.sequelize.query(query);
    }
  },
  async down(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.HAS_WINTHOR_INTEGRATION) == true) {
        let originQueryInterface = await DBConnectionManager.getWinthorIntegrationDBConnection().getQueryInterface();
        let objectName = 'network_request';
        await originQueryInterface.sequelize.query(`DROP function ${objectName}`);
    }
  }
};