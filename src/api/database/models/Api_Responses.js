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
      IDAPIREQUESTCALL: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      RESPONSESTATUSCODE: {
        type: DataTypes.INTEGER.UNSIGNED
      }, 
      RESPONSE: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Api_Responses.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['IDAPIREQUESTCALL'],
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