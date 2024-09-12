'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

/**
 * class model
 */
class Logs extends BaseTableModel {
  static tableName = this.name.toLowerCase();
  static model = null;  
  static fields = {
    id: {
      type : DataTypes.BIGINT.UNSIGNED,                
      autoIncrement : true,
      primaryKey: true,               
      allowNull: false 
    },
    PROCESSNAME: {
      type: DataTypes.STRING(256),
      allowNull: true
    },    
    PROCESSVALUES: {
      type: DataTypes.STRING(2000),
      allowNull: true
    }
  };
  static constraints = [];

};



module.exports = {Logs}