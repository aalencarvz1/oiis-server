'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorIntegrationTableModel } = require("./BaseWinthorIntegrationTableModel");

/**
 * class model
 */
class MigrationsControl extends BaseWinthorIntegrationTableModel {
  static id = 35005;
  static tableName = this.name.toUpperCase();
  static model = null;
  static fields = {
    ...MigrationsControl.getBaseTableModelFields(),...{                 
      OBJECTTYPE:{
        type: DataTypes.STRING(100),
        allowNull:false,
        defualtValue:'TABLE'
      },
      OBJECTNAME:{
        type: DataTypes.STRING(255),
        allowNull:false
      },
      OBJECTREGISTERID:{
        type: DataTypes.STRING(2000),
        allowNull:false
      },      
      OBJECTOPERATION:{
        type: DataTypes.STRING(100),
        allowNull:false,
        defaultValue:'UPDATE'
      },      
      VALUESTOMIGRATE:{
        type: DataTypes.JSON
      },
      MIGRATEDAT:{
        type: DataTypes.DATE
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(MigrationsControl.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(MigrationsControl.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {MigrationsControl}
