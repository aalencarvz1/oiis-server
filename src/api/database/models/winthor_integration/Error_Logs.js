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
    created_at : {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    object_type:{
      type: DataTypes.STRING(100)
    },
    object_name:{
      type: DataTypes.STRING(255)
    },
    object_line:{
      type: DataTypes.BIGINT.UNSIGNED,
    },
    error_code:{
      type: DataTypes.STRING(255)
    },
    message:{
      type: DataTypes.TEXT
    },
    log_values:{
      type: DataTypes.TEXT
    }
  };
  
  static uniqueFields = [];

  static constraints = [];

  static foreignsKeys = [];
  
};


module.exports = {Error_Logs}
