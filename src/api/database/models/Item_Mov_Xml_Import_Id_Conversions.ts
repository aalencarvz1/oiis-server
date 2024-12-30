'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Clients  from "./Clients.js";
import  Packagings  from "./Packagings.js";
import  Measurement_Units  from "./Measurement_Units.js";
import  Items  from "./Items.js";

/**
 * class model
 */
export default class Item_Mov_Xml_Import_Id_Conversions extends BaseTableModel {

  //table fields
  declare owner_client_id: number;
  declare emitent_doc: string;
  declare origin_item_id: string;
  declare xml_quantity_field_name: string;
  declare item_id: number;
  declare packaging_id: number;
  declare measurement_unit_id: number;
  declare multiplier: number;


  static id = 9038;
  static tableName = this.name.toLowerCase();
  
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