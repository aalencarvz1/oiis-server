'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Projects_Items_Types } = require("./Projects_Items_Types");
const { Project_Item_Origin_Types } = require("./Project_item_Origin_Types");

/**
 * class model
 */
class Projects_Items extends BaseTableModel {
  static id = 15010;
  static tableName = this.name.toLowerCase();
  static model = null;
  static accessLevel = 2;

  static fields = {
    ...Projects_Items.getBaseTableModelFields(),...{            
      project_item_type_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue: Projects_Items_Types.REQUIREMENTS
      },       
      project_item_origin_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue: Project_Item_Origin_Types.USER
      },       
      identifier: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      description: {
        type: DataTypes.TEXT
      },
      anotations: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'project_item_type_id',
    'identifier',
  ];

  static constraints = [...(Projects_Items.getBaseTableModelConstraints() || []),...[{
    name: Projects_Items.tableName + '_u1',
    fields: Projects_Items.uniqueFields,
    type:"unique"
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
      fields: ['project_item_type_id'],
      type: 'foreign key',
      references: { 
          table: Projects_Items_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['project_item_origin_id'],
      type: 'foreign key',
      references: { 
          table: Project_Item_Origin_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
 
};


module.exports = {Projects_Items}