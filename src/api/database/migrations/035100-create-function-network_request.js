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
create or replace FUNCTION network_request(
    address     VARCHAR2,
    params   VARCHAR2 DEFAULT NULL
) RETURN CLOB AS
    req        utl_http.req;
    res        utl_http.resp;
    retorno    CLOB DEFAULT '';
    v_buffer   VARCHAR2(32767);
BEGIN
    req := utl_http.begin_request(address, 'POST', utl_http.http_version_1_1);
    --utl_http.set_transfer_timeout(3600);
    utl_http.SET_FOLLOW_REDIRECT(1000); 
    utl_http.write_text(req, params);
    res := utl_http.get_response(req);
    retorno := '';
    IF res.status_code IN (
        100,
        200
    ) THEN
        BEGIN
            LOOP
                utl_http.read_line(res, v_buffer);
                retorno := retorno || v_buffer;
            END LOOP;
            utl_http.end_response(res);
        EXCEPTION
            WHEN utl_http.end_of_body THEN                    
                utl_http.end_response(res);
                NULL;
            WHEN OTHERS THEN
                utl_http.end_response(res);
                raise;
        END;
    ELSE
        raise_application_error(-20001, 'request return error: || address: '
                                        || address
                                        || ' params: '
                                        || params
                                        || ' statuscode: '
                                        || to_char(res.status_code));
    END IF;
    RETURN retorno;
EXCEPTION
    WHEN OTHERS THEN 
        utl_http.end_response(res);
        RAISE;
END;
  `);*/
  },
  async down(queryInterface, Sequelize) {
    let originQueryInterface = await DBConnectionManager().getWinthorIntegrationDBConnection().getQueryInterface();
    let triggerName = 'trg_int_wint_pcclient';
    //await originQueryInterface.sequelize.query(`DROP function ${functionName}`);
  }
};