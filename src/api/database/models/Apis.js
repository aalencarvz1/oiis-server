'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Apis extends BaseTableModel {
  static ID = 20000;
  static model = null;

  static fields = {
    ...Apis.getBaseTableModelFields(),...{            
      NAME: {
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
      DESCRIPTION: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [     
    'NAME'
  ];

  static constraints = [...(Apis.getBaseTableModelConstraints() || []),...[
    {
      name: Apis.name.toUpperCase() + '_U1',
      fields: Apis.uniqueFields,
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];

  
  
};


module.exports = {Apis}