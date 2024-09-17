'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Maps_Api_Responses extends BaseTableModel {
  static id = 20010;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Maps_Api_Responses.getBaseTableModelFields(),...{            
      ENTITY: {
        type: DataTypes.STRING(255)
      },
      entity_id: {
        type: DataTypes.STRING(255)
      },
      LIBRARY: {
        type: DataTypes.STRING(255)
      },
      PARAMETERS: {
        type: DataTypes.TEXT
      },
      response_status_code: {
        type: DataTypes.INTEGER.UNSIGNED
      }, 
      response_status: {
        type: DataTypes.STRING(255)
      }, 
      response: {
        type: DataTypes.TEXT
      },
      response_expire_at: {
        type: DataTypes.DATE
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Maps_Api_Responses.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Maps_Api_Responses}