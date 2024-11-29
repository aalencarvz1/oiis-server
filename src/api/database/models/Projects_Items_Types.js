'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Projects_Items_Types extends BaseTableModel {
  static id = 15001;
  static tableName = this.name.toLowerCase();
  static model = null;
  
  static PROJECTS = 1;
  static PROJECT = 2;
  static PLANNINGS = 20;
  static PLANNING = 21;
  static MANAGEMENTS = 30;
  static MANAGEMENT = 31;
  static INICIATIVES = 210;
  static INICIATIVE = 211;
  static EPICS = 2110;
  static EPIC = 2111;
  static FEATURES = 21110;
  static FEATURE = 21111;
  static REQUIREMENTS = 200000;
  static REQUIREMENT = 200001;

  static fields = {
    ...Projects_Items_Types.getBaseTableModelFields(),...{            
      parent_id: {
        type: DataTypes.BIGINT.UNSIGNED
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
      },
    }
  };
  
  static uniqueFields = [
    Sequelize.literal(`(COALESCE(parent_id,-1))`),
    'name'
  ];

  static constraints = [...(Projects_Items_Types.getBaseTableModelConstraints() || []),...[{
    name: Projects_Items_Types.tableName + '_u1',
    fields: Projects_Items_Types.uniqueFields,
    type:"unique"
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['parent_id'],
      type: 'foreign key',
      references: { 
          table: Projects_Items_Types,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};


module.exports = {Projects_Items_Types}