'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseWinthorIntegrationTableModel } = require("./BaseWinthorIntegrationTableModel");

/**
 * class model
 */
class MigrationsTables extends BaseWinthorIntegrationTableModel {
  static id = 35002;
  static tableName = this.name.toUpperCase();
  static model = null;
  static fields = {
    ...MigrationsTables.getBaseTableModelFields(),...{                 
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

  static constraints = [...(MigrationsTables.getBaseTableModelConstraints() || []),...[{
    name: MigrationsTables.tableName + '_u1',
    fields: [...MigrationsTables.getBaseTableModelUniqueFields(),...MigrationsTables.uniqueFields],
    type:"unique"
  },{
    name: MigrationsTables.tableName + '_c_1',
    fields:['MIGRATEINTEGRATION'],
    type:"check",
    where:{
      MIGRATEINTEGRATION: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: MigrationsTables.tableName + '_c_2',
    fields:['MIGRATEINSERT'],
    type:"check",
    where:{
      MIGRATEINSERT: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: MigrationsTables.tableName + '_c_3',
    fields:['MIGRATEUPDATE'],
    type:"check",
    where:{
      MIGRATEUPDATE: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: MigrationsTables.tableName + '_c_4',
    fields:['MIGRATEDELETE'],
    type:"check",
    where:{
      MIGRATEDELETE: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  }]];

  static foreignsKeys = [...(MigrationsTables.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {MigrationsTables}
