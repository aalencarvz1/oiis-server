'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseExternalDataTableModel } = require('./BaseExternalDataTableModel');


/**
 * class model
 */
class Countries extends BaseExternalDataTableModel {
  static id = 60006;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    id: {
      type: DataTypes.INTEGER(8).UNSIGNED,
      allowNull: false,
      primaryKey:true
    },
    name:{
      type: DataTypes.STRING(4000),
      allowNull:false
    }
  };
  
  static uniqueFields = [
    'id'
  ];  

  static constraints = [{
    name: Countries.tableName + '_u1',
    fields: [...Countries.uniqueFields],
    type:"unique"
  }];

  static foreignsKeys = [];  
  
};


module.exports = {Countries}

