'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Projects extends BaseTableModel {
  static id = 15000;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Projects.getBaseTableModelFields(),...{            
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
      forecast_start_moment: {
        type: DataTypes.DATE
      },
      forecast_end_moment: {
        type: DataTypes.DATE
      },
      start_at: {
        type: DataTypes.DATE
      },
      end_at: {
        type: DataTypes.DATE
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Projects.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['parent_id'],
      type: 'foreign key',
      references: { 
          table: Projects,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};


module.exports = {Projects}