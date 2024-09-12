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

  static constraints = [...(Migration_Columns.getBaseTableModelConstraints() || []),...[{
    name: Migration_Columns.tableName + '_u1',
    fields: [...Migration_Columns.getBaseTableModelUniqueFields(),...Migration_Columns.uniqueFields],
    type:"unique"
  },{
    name: Migration_Columns.tableName + '_c_1',
    fields:['MIGRATEINTEGRATION'],
    type:"check",
    where:{
      MIGRATEINTEGRATION: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: Migration_Columns.tableName + '_c_2',
    fields:['MIGRATEINSERT'],
    type:"check",
    where:{
      MIGRATEINSERT: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: Migration_Columns.tableName + '_c_3',
    fields:['MIGRATEUPDATE'],
    type:"check",
    where:{
      MIGRATEUPDATE: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  }]];

  static foreignsKeys = [...(Migration_Columns.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['IDMIGRATIONTABLE'],
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
