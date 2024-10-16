'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Tables } = require("./Tables");


/**
 * class model
 */
class Midias extends BaseTableModel {
  static id = 50000;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Midias.getBaseTableModelFields(),...{      
      table_ref_id: {
        type: DataTypes.BIGINT.UNSIGNED
      },    
      record_ref_id: {
        type: DataTypes.BIGINT.UNSIGNED
      },
      numeric_order: {
        type: DataTypes.INTEGER
      },
      name:{
        type: DataTypes.STRING(256)
      },
      type:{
        type: DataTypes.STRING(256)
      },
      local_path:{
        type: DataTypes.TEXT
      },
      content_base64:{
        type: DataTypes.TEXT
      },
      description: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Midias.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['table_ref_id'],
    type: 'foreign key',
    references: { 
        table: Tables,
        field: 'id'
    },
    onUpdate: 'cascade'
  }]];
  
};

module.exports = {Midias}