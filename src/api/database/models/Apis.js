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
      default_method: {
        type: DataTypes.STRING(10),
      },
      default_end_point: {
        type: DataTypes.STRING(2000)
      },            
      default_authorization:{
        type: DataTypes.STRING(2000)
      }, 
      default_request_params:{
        type: DataTypes.TEXT
      }, 
      default_request_body_params:{
        type: DataTypes.TEXT
      }, 
      default_webhook:{
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