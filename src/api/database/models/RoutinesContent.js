'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Routines } = require("./Routines");


/**
 * class model
 */
class RoutinesContent extends BaseTableModel {
  static ID = 241;
  static model = null;
  static fields = {
    ...RoutinesContent.getBaseTableModelFields(),...{     
      IDROUTINE: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      NAME: {
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
    'NAME'
  ];

  static constraints = [...(RoutinesContent.getBaseTableModelConstraints() || []),...[
    {
      name: RoutinesContent.name.toUpperCase() + '_U1',
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
          field: 'ID'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};


module.exports = {RoutinesContent}