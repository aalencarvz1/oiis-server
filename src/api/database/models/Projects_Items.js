'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Projects_Items_Types } = require("./Projects_Items_Types");
const { Projects } = require("./Projects");


/**
 * class model
 */
class Projects_Items extends BaseTableModel {
  static id = 15002;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Projects_Items.getBaseTableModelFields(),...{            
      project_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },       
      parent_id: {
        type: DataTypes.BIGINT.UNSIGNED
      },       
      project_item_type_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
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
    'project_id',       
    Sequelize.literal(`(COALESCE(parent_id,-1))`),
    'project_item_type_id',
    'name',
  ];

  static constraints = [...(Projects_Items.getBaseTableModelConstraints() || []),...[{
    name: Projects_Items.tableName + '_u1',
    fields: Projects_Items.uniqueFields,
    type:"unique"
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['project_id'],
      type: 'foreign key',
      references: { 
          table: Projects,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['parent_id'],
      type: 'foreign key',
      references: { 
          table: Projects_Items,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['project_item_type_id'],
      type: 'foreign key',
      references: { 
          table: Projects_Items_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Projects_Items}