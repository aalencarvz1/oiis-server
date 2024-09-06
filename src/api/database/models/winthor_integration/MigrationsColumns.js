'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseWinthorIntegrationTableModel } = require("./BaseWinthorIntegrationTableModel");
const { MigrationsTables } = require("./MigrationsTables");

/**
 * class model
 */
class MigrationsColumns extends BaseWinthorIntegrationTableModel {
  static id = 35003;
  static tableName = this.name.toUpperCase();
  static model = null;
  static fields = {
    ...MigrationsColumns.getBaseTableModelFields(),...{                 
      IDMIGRATIONTABLE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      COLUMNNAME:{
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
      }       
    }
  };
  
  static uniqueFields = [
    'IDMIGRATIONTABLE',
    'COLUMNNAME'
  ];

  static constraints = [...(MigrationsColumns.getBaseTableModelConstraints() || []),...[{
    name: MigrationsColumns.tableName + '_u1',
    fields: [...MigrationsColumns.getBaseTableModelUniqueFields(),...MigrationsColumns.uniqueFields],
    type:"unique"
  }]];

  static foreignsKeys = [...(MigrationsColumns.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['IDMIGRATIONTABLE'],
    type: 'foreign key',
    references: { 
        table: MigrationsTables,
        field: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  },{
    name: MigrationsColumns.tableName + '_c_1',
    fields:['MIGRATEINTEGRATION'],
    type:"check",
    where:{
      MIGRATEINTEGRATION: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: MigrationsColumns.tableName + '_c_2',
    fields:['MIGRATEINSERT'],
    type:"check",
    where:{
      MIGRATEINSERT: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: MigrationsColumns.tableName + '_c_3',
    fields:['MIGRATEUPDATE'],
    type:"check",
    where:{
      MIGRATEUPDATE: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  }]];
  
  
};


module.exports = {MigrationsColumns}
