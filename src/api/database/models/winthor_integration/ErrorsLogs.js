'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorIntegrationTableModel } = require("./BaseWinthorIntegrationTableModel");

/**
 * class model
 */
class ErrorsLogs extends BaseWinthorIntegrationTableModel {
  static ID = 35000;
  static model = null;
  static fields = {
    ...ErrorsLogs.getBaseTableModelFields(),...{                 
      OBJECTTYPE:{
        type: DataTypes.STRING(100)
      },
      OBJECTNAME:{
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

  static constraints = [...(ErrorsLogs.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(ErrorsLogs.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {ErrorsLogs}
