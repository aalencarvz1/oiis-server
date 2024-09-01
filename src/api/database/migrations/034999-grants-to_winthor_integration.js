'use strict';

const { Utils } = require('../../controllers/utils/Utils');
const DBConnectionManager = require('../DBConnectionManager');

/*imports*/
require('dotenv').config({ path: __dirname + "/../../../../.env" });
const configDB  = require("../config/config");
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {  
  async up(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.WINTHOR_INTEGRATE) == true) {
      let originQueryInterface = await DBConnectionManager.getWinthorDBConnection().getQueryInterface();    
      let connectionConfig = configDB[`${process.env.NODE_ENV||'development'}_winthor_integration`];
      let dbUserName = connectionConfig?.username || 'OIIS';
      await originQueryInterface.sequelize.query(`grant select any table to ${dbUserName}`);
      await originQueryInterface.sequelize.query(`grant create any trigger to ${dbUserName}`);
    }    
  },
  async down(queryInterface, Sequelize) {
    if (Utils.toBool(process.env.WINTHOR_INTEGRATE) == true) {
      let originQueryInterface = await DBConnectionManager.getWinthorDBConnection().getQueryInterface();    
      let connectionConfig = configDB[`${process.env.NODE_ENV||'development'}_winthor_integration`];
      let dbUserName = connectionConfig?.username || 'OIIS';
      await originQueryInterface.sequelize.query(`revoke create any trigger to ${dbUserName}`);
      await originQueryInterface.sequelize.query(`revoke select any table to ${dbUserName}`);  
    }  
  }
};