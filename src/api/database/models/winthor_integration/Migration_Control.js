'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorIntegrationTableModel } = require("./BaseWinthorIntegrationTableModel");

/**
 * class model
 */
class Migration_Control extends BaseWinthorIntegrationTableModel {
  static id = 35005;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Migration_Control.getBaseTableModelFields(),...{                 
      object_type:{
        type: DataTypes.STRING(100),
        allowNull:false,
        defualtValue:'TABLE'
      },
      object_name:{
        type: DataTypes.STRING(255),
        allowNull:false
      },
      object_register_id:{
        type: DataTypes.STRING(2000),
        allowNull:false
      },      
      object_operation:{
        type: DataTypes.STRING(100),
        allowNull:false,
        defaultValue:'UPDATE'
      },      
      values_to_migrate:{
        type: DataTypes.JSON
      },
      migrated_at:{
        type: DataTypes.DATE
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Migration_Control.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(Migration_Control.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Migration_Control}
