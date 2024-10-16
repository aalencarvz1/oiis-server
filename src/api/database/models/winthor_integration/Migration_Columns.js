'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseWinthorIntegrationTableModel } = require("./BaseWinthorIntegrationTableModel");
const { Migration_Tables } = require("./Migration_Tables");

/**
 * class model
 */
class Migration_Columns extends BaseWinthorIntegrationTableModel {
  static id = 35003;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Migration_Columns.getBaseTableModelFields(),...{                 
      migration_table_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      column_name:{
        type: DataTypes.STRING(255),
        allowNull:false
      },      
      migrate_integration:{
        type: DataTypes.INTEGER(1),
        allowNull:false,
        defaultValue:1
      },
      migrate_insert:{
        type: DataTypes.INTEGER(1),
        allowNull:false,
        defaultValue:1
      },
      migrate_update:{
        type: DataTypes.INTEGER(1),
        allowNull:false,
        defaultValue:1
      }       
    }
  };
  
  static uniqueFields = [
    'migration_table_id',
    'column_name'
  ];

  static constraints = [...(Migration_Columns.getBaseTableModelConstraints() || []),...[{
    name: Migration_Columns.tableName + '_u1',
    fields: [...Migration_Columns.getBaseTableModelUniqueFields(),...Migration_Columns.uniqueFields],
    type:"unique"
  },{
    name: Migration_Columns.tableName + '_c_1',
    fields:['migrate_integration'],
    type:"check",
    where:{
      migrate_integration: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: Migration_Columns.tableName + '_c_2',
    fields:['migrate_insert'],
    type:"check",
    where:{
      migrate_insert: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: Migration_Columns.tableName + '_c_3',
    fields:['migrate_update'],
    type:"check",
    where:{
      migrate_update: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  }]];

  static foreignsKeys = [...(Migration_Columns.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['migration_table_id'],
    type: 'foreign key',
    references: { 
        table: Migration_Tables,
        field: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }]];
  
  
};


module.exports = {Migration_Columns}
