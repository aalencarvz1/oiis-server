'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Requirements_Types } = require("./Requirements_Types");
const { Projects } = require("./Projects");
const { Projects_Items } = require("./Projects_Items");
const { Project_Item_Origin_Types } = require("./Project_Item_Origin_Types");


/**
 * class model
 */
class Requirements extends BaseTableModel {
  static id = 15020;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Requirements.getBaseTableModelFields(),...{            
      project_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      requirements_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      requirement_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue: Requirements_Types.FUNCTIONAL
      },
      requirement_origin_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue: Project_Item_Origin_Types.USER
      },
      parent_id: {
        type: DataTypes.BIGINT.UNSIGNED
      },
      identifier:{
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
      notes: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'project_id',
    'requirements_id',
    'requirement_type_id',
    Sequelize.literal('(COALESCE(parent_id,-1))'),
    'identifier'
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
      fields: ['project_id'],
      type: 'foreign key',
      references: { 
          table: Projects,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['requirements_id'],
      type: 'foreign key',
      references: { 
          table: Projects_Items,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['parent_id'],
      type: 'foreign key',
      references: { 
          table: Requirements,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['requirement_type_id'],
      type: 'foreign key',
      references: { 
          table: Requirements_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['requirement_origin_id'],
      type: 'foreign key',
      references: { 
          table: Project_Item_Origin_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Requirements}