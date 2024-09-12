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
      TABLENAME:{
        type: DataTypes.STRING(255),
        allowNull:false
      },
      MIGRATEINTEGRATION:{
        type: DataTypes.INTEGER(1),
        allowNull:false,
        defaultValue:1
      },
      MIGRATEINSERT:{
        type: DataTypes.INTEGER(1),
        allowNull:false,
        defaultValue:1
      },
      MIGRATEUPDATE:{
        type: DataTypes.INTEGER(1),
        allowNull:false,
        defaultValue:1
      },
      MIGRATEDELETE:{
        type: DataTypes.INTEGER(1),
        allowNull:false,
        defaultValue:1
      },
      MIGRATEONDEMAND:{
        type: DataTypes.INTEGER(1),
        allowNull:false,
        defaultValue:1
      },
      MIGRATEBYTIME:{
        type: DataTypes.STRING(2000),
        allowNull:true,
        defaultValue:"{minute:5}"
      }
    }
  };
  
  static uniqueFields = [
    'TABLENAME'
  ];

  static constraints = [...(Migration_Tables.getBaseTableModelConstraints() || []),...[{
    name: Migration_Tables.tableName + '_u1',
    fields: [...Migration_Tables.getBaseTableModelUniqueFields(),...Migration_Tables.uniqueFields],
    type:"unique"
  },{
    name: Migration_Tables.tableName + '_c_1',
    fields:['MIGRATEINTEGRATION'],
    type:"check",
    where:{
      MIGRATEINTEGRATION: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: Migration_Tables.tableName + '_c_2',
    fields:['MIGRATEINSERT'],
    type:"check",
    where:{
      MIGRATEINSERT: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: Migration_Tables.tableName + '_c_3',
    fields:['MIGRATEUPDATE'],
    type:"check",
    where:{
      MIGRATEUPDATE: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: Migration_Tables.tableName + '_c_4',
    fields:['MIGRATEDELETE'],
    type:"check",
    where:{
      MIGRATEDELETE: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  }]];

  static foreignsKeys = [...(Migration_Tables.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Migration_Tables}
