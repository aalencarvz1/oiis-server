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
        let objectName = 'network_request';
        let query = `
create or replace FUNCTION ${objectName}(
    address     VARCHAR2,
    p_method VARCHAR2 DEFAULT 'POST',
    p_params   VARCHAR2 DEFAULT NULL,
    p_authorization VARCHAR2 DEFAULT 'Basic c3lzdGVtQHN5c3RlbTpzeXN0ZW0='
) RETURN JSON_OBJECT_T AS

    /*
    * function that request network resource (http) of api of oiis
    */

    req        utl_http.req;
    res        utl_http.resp;
    v_response_text    CLOB DEFAULT '';
    v_response_object JSON_OBJECT_T;
    v_buffer   VARCHAR2(32767);
BEGIN
    
    /*REQUEST PREPARE*/
    req := utl_http.begin_request(address, p_method, ' HTTP/1.1');
    UTL_HTTP.SET_HEADER(req, 'user-agent', 'mozilla/4.0');
    utl_http.set_transfer_timeout(3600);
    utl_http.set_header(req,'Expect','100-continue');
    utl_http.set_header(req,'Accept','application/json');
    utl_http.set_header(req,'Content-Type','application/json');
    utl_http.set_header(req,'Authorization',p_authorization);
    Utl_http.SET_FOLLOW_REDIRECT(1000); 
    IF p_params IS NOT NULL THEN 
        utl_http.set_header(req, 'Content-Length', length(p_params));
        utl_http.write_text(req, p_params);
    END IF;
    
    
    /*GET RESPONSE*/
    res := utl_http.get_response(req);
    
    
    /*RESPONSE TEXT READ*/
    v_response_text := '';    
    BEGIN
        LOOP
            utl_http.read_line(res, v_buffer);
            v_response_text := v_response_text || v_buffer;
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
    
    
    /*JSON RESPONSE PARSE*/
    BEGIN
        v_response_object := JSON_OBJECT_T.PARSE(v_response_text);
    EXCEPTION
        WHEN OTHERS THEN
            v_response_object := JSON_OBJECT_T.PARSE('"success":false, "message":"'||SQLERRM||'"');
    END;
    RETURN v_response_object;
EXCEPTION
    WHEN OTHERS THEN 
        utl_http.end_response(res);
        RAISE;
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