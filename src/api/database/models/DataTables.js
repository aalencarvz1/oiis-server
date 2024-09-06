'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
//
const { BaseTableModel } = require("./BaseTableModel");
const { DataConnections } = require("./DataConnections");
const { DataSchemas } = require("./DataSchemas");

/**
 * class model
 */
class DataTables extends BaseTableModel {
  static id = 1;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...DataTables.getBaseTableModelFields(),...{
      IDDATACONNECTION: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      IDSCHEMA: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'IDDATACONNECTION',
    'IDSCHEMA',
    'name'
  ];

  static constraints = [...(DataTables.getBaseTableModelConstraints() || []),...[
    {
      name: DataTables.tableName + '_u1',
      fields: [...DataTables.getBaseTableModelUniqueFields(),...DataTables.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys() || []),...[
    {
      fields: ['IDDATACONNECTION'],
      type: 'foreign key',
      references: { 
          table: DataConnections,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDSCHEMA'],
      type: 'foreign key',
      references: { 
          table: DataSchemas,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];  
};



module.exports = {DataTables}