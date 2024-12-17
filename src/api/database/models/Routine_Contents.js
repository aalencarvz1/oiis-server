'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Routines } = require("./Routines");


/**
 * class model
 */
class Routine_Contents extends BaseTableModel {
  static id = 241;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Routine_Contents.getBaseTableModelFields(),...{     
      routine_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      }, 
      content: {
        type: DataTypes.TEXT
      },
      view_server_path: {
        type: DataTypes.TEXT
      },
      view_client_path: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [ 
    'routine_id',
    'name'
  ];

  static constraints = [...(Routine_Contents.getBaseTableModelConstraints() || []),...[
    {
      name: Routine_Contents.tableName + '_u1',
      fields: [...Routine_Contents.getBaseTableModelUniqueFields(),...Routine_Contents.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['routine_id'],
      type: 'foreign key',
      references: { 
          table: Routines,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};


module.exports = {Routine_Contents}