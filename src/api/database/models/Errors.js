'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

/**
 * class model
 */
class Errors extends BaseTableModel {
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    id: {
      type : DataTypes.BIGINT.UNSIGNED,                
      autoIncrement : true,
      primaryKey: true,               
      allowNull: false 
    },
    object_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    object_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    LINE: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    CODE: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    MESSAGE: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    DATA: {
      type: DataTypes.STRING(2000),
      allowNull: true
    }
  };
  static constraints = [];

};



module.exports = {Errors}