'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Clients } = require("./Clients");
const { Packagings } = require("./Packagings");
const { Measurement_Units } = require("./Measurement_Units");
const { Items } = require("./Items");

/**
 * class model
 */
class Item_Mov_Xml_Import_Id_Conversions extends BaseTableModel {
  static id = 9038;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Item_Mov_Xml_Import_Id_Conversions.getBaseTableModelFields(),...{                 
      owner_client_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      emitent_doc:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      origin_item_id:{
        type: DataTypes.STRING(256),
        allowNull: false
      },
      xml_quantity_field_name:{
        type: DataTypes.STRING(256),
        allowNull: false
      },
      item_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      packaging_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      measurement_unit_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      multiplier:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue: 1
      }
    }
  };
  
  static uniqueFields = [
    'owner_client_id',
    'emitent_doc',
    'origin_item_id',
    'xml_quantity_field_name'
  ];

  static constraints = [...(Item_Mov_Xml_Import_Id_Conversions.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['owner_client_id'],
      type: 'foreign key',
      references: { 
          table: Clients,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['item_id'],
      type: 'foreign key',
      references: { 
          table: Items,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['packaging_id'],
      type: 'foreign key',
      references: { 
          table: Packagings,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['measurement_unit_id'],
      type: 'foreign key',
      references: { 
          table: Measurement_Units,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Item_Mov_Xml_Import_Id_Conversions}