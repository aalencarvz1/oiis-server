'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Projects } = require("./Projects");
const { Projects_Items } = require("./Projects_Items");
const { Project_Item_Origin_Types } = require("./Project_item_Origin_Types");


/**
 * class model
 */
class Features extends BaseTableModel {
  static id = 15010;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Features.getBaseTableModelFields(),...{            
      project_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      features_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      feature_origin_id:{
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
    'features_id',
    Sequelize.literal('(COALESCE(parent_id,-1))'),
    'identifier'
  ];

  static constraints = [...(Features.getBaseTableModelConstraints() || []),...[
    {
      name: Features.tableName + '_u1',
      fields: Features.uniqueFields,
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
      fields: ['features_id'],
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
          table: Features,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['feature_origin_id'],
      type: 'foreign key',
      references: { 
          table: Project_Item_Origin_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Features}