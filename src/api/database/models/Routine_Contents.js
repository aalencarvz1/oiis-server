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
      IDROUTINE: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      }, 
      CONTENT: {
        type: DataTypes.TEXT
      },
      SERVERVIEWPATH: {
        type: DataTypes.TEXT
      },
      CLIENTVIEWPATH: {
        type: DataTypes.TEXT
      },
      CLIENTDOWNLOADEDAT: {
        type: DataTypes.DATE
      }
    }
  };
  
  static uniqueFields = [ 
    'IDROUTINE',
    'name'
  ];

  static constraints = [...(Routine_Contents.getBaseTableModelConstraints() || []),...[
    {
      name: Routine_Contents.tableName + '_u1',
      fields: Routine_Contents.uniqueFields,
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDROUTINE'],
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