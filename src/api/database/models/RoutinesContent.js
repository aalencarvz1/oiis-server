'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Routines } = require("./Routines");


/**
 * class model
 */
class RoutinesContent extends BaseTableModel {
  static id = 241;
  static model = null;
  static fields = {
    ...RoutinesContent.getBaseTableModelFields(),...{     
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

  static constraints = [...(RoutinesContent.getBaseTableModelConstraints() || []),...[
    {
      name: RoutinesContent.name.toLowerCase() + '_u1',
      fields: RoutinesContent.uniqueFields,
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


module.exports = {RoutinesContent}