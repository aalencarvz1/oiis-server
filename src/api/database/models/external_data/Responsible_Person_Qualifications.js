'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseExternalDataTableModel } = require('./BaseExternalDataTableModel');


/**
 * class model
 */
class Responsible_Person_Qualifications extends BaseExternalDataTableModel {
  static id = 60010;
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
    name: Responsible_Person_Qualifications.tableName + '_u1',
    fields: [...Responsible_Person_Qualifications.uniqueFields],
    type:"unique"
  }];

  static foreignsKeys = [];  
  
};


module.exports = {Responsible_Person_Qualifications}

