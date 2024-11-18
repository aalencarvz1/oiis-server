'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Report_Data_Founts } = require("./Report_Data_Founts");
const { Sql_Object_Types } = require("./Sql_Object_Types");
const { Data_Types } = require("./Data_Types");


/**
 * class model
 */
class Report_Data_Fount_Items extends BaseTableModel {
  static id = 10006;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Report_Data_Fount_Items.getBaseTableModelFields(),...{                 
      parent_id: {
        type: DataTypes.BIGINT.UNSIGNED,
      },
      report_data_source_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      sql_object_type_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      sql_object_id: {
        type: DataTypes.BIGINT.UNSIGNED
      },
      before_sql_text:{
        type: DataTypes.TEXT,
      },
      sql_text:{
        type: DataTypes.TEXT,
        allowNull:false,
      },
      sql_text_after_children:{
        type: DataTypes.TEXT
      },
      numeric_order: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1
      },
      sql_alias:{
        type: DataTypes.STRING(2000)
      },
      data_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      existence_critery:{
        type: DataTypes.TEXT
      },
      access_critery:{
        type: DataTypes.TEXT
      },
      is_unique_in_groupment:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      data_groupment:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      value_groupment:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      observations:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Report_Data_Fount_Items.getBaseTableModelConstraints() || []),...[{
    name: Report_Data_Fount_Items.tableName + '_c_1',
    fields:['is_unique_in_groupment'],
    type:"check",
    where:{
      is_unique_in_groupment: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: Report_Data_Fount_Items.tableName + '_c_2',
    fields:['data_groupment'],
    type:"check",
    where:{
      data_groupment: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: Report_Data_Fount_Items.tableName + '_c_3',
    fields:['value_groupment'],
    type:"check",
    where:{
      value_groupment: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['parent_id'],
    type: 'foreign key',
    references: { 
        table: Report_Data_Fount_Items,
        field: 'id'
    },    
    onUpdate: 'cascade',
    onDelete: 'cascade'
  },{
    fields: ['report_data_source_id'],
    type: 'foreign key',
    references: { 
        table: Report_Data_Founts,
        field: 'id'
    },    
    onUpdate: 'cascade',
    onDelete: 'cascade'
  },{
    fields: ['sql_object_type_id'],
    type: 'foreign key',
    references: { 
        table: Sql_Object_Types,
        field: 'id'
    },    
    onUpdate: 'cascade'
  },{
    fields: ['data_type_id'],
    type: 'foreign key',
    references: { 
        table: Data_Types,
        field: 'id'
    },    
    onUpdate: 'cascade'
  }]];

};


module.exports = {Report_Data_Fount_Items}