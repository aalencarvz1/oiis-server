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
  
  static PLANNINGS = 1;
  static MANAGEMENTS = 2;
  static INICIATIVES = 10;
  static EPICS = 20;
  static FEATURES = 30;
  static REQUIREMENTS = 100;

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