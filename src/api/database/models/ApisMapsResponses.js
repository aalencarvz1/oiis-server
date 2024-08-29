'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class ApisMapsResponses extends BaseTableModel {
  static ID = 20010;
  static model = null;

  static fields = {
    ...ApisMapsResponses.getBaseTableModelFields(),...{            
      ENTITY: {
        type: DataTypes.STRING(255)
      },
      IDENTITY: {
        type: DataTypes.STRING(255)
      },
      LIBRARY: {
        type: DataTypes.STRING(255)
      },
      PARAMETERS: {
        type: DataTypes.TEXT
      },
      RESPONSESTATUSCODE: {
        type: DataTypes.INTEGER.UNSIGNED
      }, 
      RESPONSESTATUS: {
        type: DataTypes.STRING(255)
      }, 
      RESPONSE: {
        type: DataTypes.TEXT
      },
      RESPONSEEXPIREAT: {
        type: DataTypes.DATE
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(ApisMapsResponses.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {ApisMapsResponses}