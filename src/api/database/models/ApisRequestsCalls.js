'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { StatusRun } = require("./StatusRun");
const { ApisRequests } = require("./ApisRequests");


/**
 * class model
 */
class ApisRequestsCalls extends BaseTableModel {
  static ID = 20002;
  static model = null;

  static fields = {
    ...ApisRequestsCalls.getBaseTableModelFields(),...{            
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

  static constraints = [...(ApisRequestsCalls.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['IDAPIREQUEST'],
    type: 'foreign key',
    references: { 
        table: ApisRequests,
        field: 'ID'
    },    
    onUpdate: 'cascade',
    onDelete: 'cascade'
  },{
    fields: ['IDSTATUSRUN'],
    type: 'foreign key',
    references: { 
        table: StatusRun,
        field: 'ID'
    },    
    onUpdate: 'cascade'
  }]];
  
};


module.exports = {ApisRequestsCalls}