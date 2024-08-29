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
  static ID = 1;
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
      NAME: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'IDDATACONNECTION',
    'IDSCHEMA',
    'NAME'
  ];

  static constraints = [...(DataTables.getBaseTableModelConstraints() || []),...[
    {
      name: DataTables.name.toUpperCase() + '_U1',
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
          field: 'ID'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDSCHEMA'],
      type: 'foreign key',
      references: { 
          table: DataSchemas,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];  
};



module.exports = {DataTables}