'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { ApisRequestsCalls } = require("./ApisRequestsCalls");


/**
 * class model
 */
class ApisResponses extends BaseTableModel {
  static ID = 20005;
  static model = null;

  static fields = {
    ...ApisResponses.getBaseTableModelFields(),...{            
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

  static constraints = [...(ApisResponses.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['IDAPIREQUESTCALL'],
    type: 'foreign key',
    references: { 
        table: ApisRequestsCalls,
        field: 'ID'
    },    
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }]];
  
};


module.exports = {ApisResponses}