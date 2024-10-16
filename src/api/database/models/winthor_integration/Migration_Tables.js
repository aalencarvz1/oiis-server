'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseWinthorIntegrationTableModel } = require("./BaseWinthorIntegrationTableModel");

/**
 * class model
 */
class Migration_Tables extends BaseWinthorIntegrationTableModel {
  static id = 35002;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Migration_Tables.getBaseTableModelFields(),...{                 
      table_name:{
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
      },
      migrate_delete:{
        type: DataTypes.INTEGER(1),
        allowNull:false,
        defaultValue:1
      },
      migrate_on_demand:{
        type: DataTypes.INTEGER(1),
        allowNull:false,
        defaultValue:1
      },
      migrate_by_time:{
        type: DataTypes.STRING(2000),
        allowNull:true,
        defaultValue:"{minute:5}"
      }
    }
  };
  
  static uniqueFields = [
    'table_name'
  ];

  static constraints = [...(Migration_Tables.getBaseTableModelConstraints() || []),...[{
    name: Migration_Tables.tableName + '_u1',
    fields: [...Migration_Tables.getBaseTableModelUniqueFields(),...Migration_Tables.uniqueFields],
    type:"unique"
  },{
    name: Migration_Tables.tableName + '_c_1',
    fields:['migrate_integration'],
    type:"check",
    where:{
      migrate_integration: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: Migration_Tables.tableName + '_c_2',
    fields:['migrate_insert'],
    type:"check",
    where:{
      migrate_insert: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: Migration_Tables.tableName + '_c_3',
    fields:['migrate_update'],
    type:"check",
    where:{
      migrate_update: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: Migration_Tables.tableName + '_c_4',
    fields:['migrate_delete'],
    type:"check",
    where:{
      migrate_delete: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  }]];

  static foreignsKeys = [...(Migration_Tables.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Migration_Tables}
