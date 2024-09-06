'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { DataTables } = require("./DataTables");


/**
 * class model
 */
class Midias extends BaseTableModel {
  static id = 50000;
  static model = null;

  static fields = {
    ...Midias.getBaseTableModelFields(),...{      
      IDTABLEREF: {
        type: DataTypes.BIGINT.UNSIGNED
      },    
      IDREGISTERREF: {
        type: DataTypes.BIGINT.UNSIGNED
      },
      ORDERNUM: {
        type: DataTypes.INTEGER
      },
      name:{
        type: DataTypes.STRING(256)
      },
      TYPE:{
        type: DataTypes.STRING(256)
      },
      LOCALPATH:{
        type: DataTypes.TEXT
      },
      BASE64CONTENT:{
        type: DataTypes.TEXT
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Midias.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['IDTABLEREF'],
    type: 'foreign key',
    references: { 
        table: DataTables,
        field: 'id'
    },
    onUpdate: 'cascade'
  }]];
  
};

module.exports = {Midias}