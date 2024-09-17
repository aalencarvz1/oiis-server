'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Api_Request_Calls } = require("./Api_Request_Calls");


/**
 * class model
 */
class Api_Responses extends BaseTableModel {
  static id = 20005;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Api_Responses.getBaseTableModelFields(),...{            
      api_request_call_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      response_status_code: {
        type: DataTypes.INTEGER.UNSIGNED
      }, 
      response: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Api_Responses.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['api_request_call_id'],
    type: 'foreign key',
    references: { 
        table: Api_Request_Calls,
        field: 'id'
    },    
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }]];
  
};


module.exports = {Api_Responses}