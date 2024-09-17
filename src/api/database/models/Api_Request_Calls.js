'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Run_Status } = require("./Run_Status");
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
      api_request_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      run_status_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue: Run_Status.NOT_STARTED
      },
      on_receive_response:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Api_Request_Calls.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['api_request_id'],
    type: 'foreign key',
    references: { 
        table: Api_Requests,
        field: 'id'
    },    
    onUpdate: 'cascade',
    onDelete: 'cascade'
  },{
    fields: ['run_status_id'],
    type: 'foreign key',
    references: { 
        table: Run_Status,
        field: 'id'
    },    
    onUpdate: 'cascade'
  }]];
  
};


module.exports = {Api_Request_Calls}