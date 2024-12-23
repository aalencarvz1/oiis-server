'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorIntegrationTableModel } = require("./BaseWinthorIntegrationTableModel");

/**
 * class model
 */
class Integration_Parameters extends BaseWinthorIntegrationTableModel {
  static id = 35006;
  static tableName = this.name.toLowerCase();
  static model = null;

  static API_LOCAL_NETWORK_IP_ID = 1;
  static API_LOCAL_NETWORK_IP = process.env.API_LOCAL_NETWORK_IP;

  static fields = {
    ...Integration_Parameters.getBaseTableModelFields(),...{                 
      name:{
        type: DataTypes.STRING(255),
        allowNull:false
      },
      value:{
        type: DataTypes.STRING(2000),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Integration_Parameters.getBaseTableModelConstraints() || []),...[{
    name: Integration_Parameters.tableName + '_u1',
    fields: [...Integration_Parameters.getBaseTableModelUniqueFields(),...Integration_Parameters.uniqueFields],
    type:"unique"
  }]];

  static foreignsKeys = [...(Integration_Parameters.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Integration_Parameters}
