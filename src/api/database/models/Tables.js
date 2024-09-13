'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
//
const { BaseTableModel } = require("./BaseTableModel");
const { Connections } = require("./Connections");
const { Schemas } = require("./Schemas");

/**
 * class model
 */
class Tables extends BaseTableModel {
  static id = 1;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Tables.getBaseTableModelFields(),...{
      data_connection_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      schema_id: {
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
    'data_connection_id',
    'schema_id',
    'name'
  ];

  static constraints = [...(Tables.getBaseTableModelConstraints() || []),...[
    {
      name: Tables.tableName + '_u1',
      fields: [...Tables.getBaseTableModelUniqueFields(),...Tables.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys() || []),...[
    {
      fields: ['data_connection_id'],
      type: 'foreign key',
      references: { 
          table: Connections,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['schema_id'],
      type: 'foreign key',
      references: { 
          table: Schemas,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];  
};



module.exports = {Tables}