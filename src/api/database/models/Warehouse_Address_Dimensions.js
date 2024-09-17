'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Warehouse_Addresses } = require("./Warehouse_Addresses");
const { Measurement_Units } = require("./Measurement_Units");
const { Identifier_Types } = require("./Identifier_Types");

/**
 * class model
 */
class Warehouse_Address_Dimensions extends BaseTableModel {
  static id = 3006;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Warehouse_Address_Dimensions.getBaseTableModelFields(),...{           
      warehouse_address_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      dimension_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      measurement_unit_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      value:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:0
      },
      observations:{
        type:DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'warehouse_address_id',
    'dimension_type_id'
  ];

  static constraints = [...(Warehouse_Address_Dimensions.getBaseTableModelConstraints() || []),...[
    {
      name: Warehouse_Address_Dimensions.tableName + '_u1',
      fields: [...Warehouse_Address_Dimensions.getBaseTableModelUniqueFields(),...Warehouse_Address_Dimensions.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['warehouse_address_id'],
      type: 'foreign key',
      references: { 
          table: Warehouse_Addresses,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['dimension_type_id'],
      type: 'foreign key',
      references: { 
          table: Identifier_Types,
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


module.exports = {Warehouse_Address_Dimensions}