'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { StatusRun } = require("./StatusRun");
const { Api_Requests } = require("./Api_Requests");


/**
 * class model
 */
class Api_Request_Calls extends BaseTableModel {
  static id = 20002;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Api_Request_Calls.getBaseTableModelFields(),...{            
      IDAPIREQUEST: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDSTATUSRUN: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue: StatusRun.NOT_STARTED
      },
      ONRECEIVEWEBHOOKRESPONSE:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Api_Request_Calls.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['IDAPIREQUEST'],
    type: 'foreign key',
    references: { 
        table: Api_Requests,
        field: 'id'
    },    
    onUpdate: 'cascade',
    onDelete: 'cascade'
  },{
    fields: ['IDSTATUSRUN'],
    type: 'foreign key',
    references: { 
        table: StatusRun,
        field: 'id'
    },    
    onUpdate: 'cascade'
  }]];
  
};


module.exports = {Api_Request_Calls}