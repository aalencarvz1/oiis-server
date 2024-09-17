'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorIntegrationTableModel } = require("./BaseWinthorIntegrationTableModel");

/**
 * class model
 */
class Error_Logs extends BaseWinthorIntegrationTableModel {
  static id = 35000;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Error_Logs.getBaseTableModelFields(),...{                 
      object_type:{
        type: DataTypes.STRING(100)
      },
      object_name:{
        type: DataTypes.STRING(255)
      },
      OBJECTLINE:{
        type: DataTypes.BIGINT.UNSIGNED,
      },
      ERRORCODE:{
        type: DataTypes.STRING(255)
      },
      MESSAGE:{
        type: DataTypes.TEXT
      },
      LOGVALUES:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Error_Logs.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(Error_Logs.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Error_Logs}
