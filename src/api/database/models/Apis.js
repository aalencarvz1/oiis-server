'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Apis extends BaseTableModel {
  static id = 20000;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Apis.getBaseTableModelFields(),...{            
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      DEFAULTMETHOD: {
        type: DataTypes.STRING(10),
      },
      DEFAULTENDPOINT: {
        type: DataTypes.STRING(2000)
      },            
      DEFAULTAUTHORIZATION:{
        type: DataTypes.STRING(2000)
      }, 
      DEFAULTREQUESTPARAMS:{
        type: DataTypes.TEXT
      }, 
      DEFAULTREQUESTBODYPARAMS:{
        type: DataTypes.TEXT
      }, 
      DEFAULTWEBHOOK:{
        type: DataTypes.STRING(2000)
      }, 
      description: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [     
    'name'
  ];

  static constraints = [...(Apis.getBaseTableModelConstraints() || []),...[
    {
      name: Apis.tableName + '_u1',
      fields: Apis.uniqueFields,
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];

  
  
};


module.exports = {Apis}