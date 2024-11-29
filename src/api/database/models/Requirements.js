'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Requirements_Types } = require("./Requirements_Types");
const { Projects_Items } = require("./Projects_Items");



/**
 * class model
 */
class Requirements extends BaseTableModel {
  static id = 15020;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Requirements.getBaseTableModelFields(),...{            
      project_item_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },    
      requirement_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue: Requirements_Types.FUNCTIONAL
      }
    }
  };
  
  static uniqueFields = [
    'project_item_id'
  ];

  static constraints = [...(Requirements.getBaseTableModelConstraints() || []),...[
    {
      name: Requirements.tableName + '_u1',
      fields: Requirements.uniqueFields,
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['project_item_id'],
      type: 'foreign key',
      references: { 
          table: Projects_Items,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};


module.exports = {Requirements}