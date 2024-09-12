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
class Warehouse_Address_Capacities extends BaseTableModel {
  static id = 3007;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Warehouse_Address_Capacities.getBaseTableModelFields(),...{           
      IDWAREHOUSEADDRESS:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDCAPACITYTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      IDMEASUREMENTUNIT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      CAPACITY:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:0
      },
      OBSERVATIONS:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'IDWAREHOUSEADDRESS',
    'IDCAPACITYTYPE'
  ];

  static constraints = [...(Warehouse_Address_Capacities.getBaseTableModelConstraints() || []),...[
    {
      name: Warehouse_Address_Capacities.tableName + '_u1',
      fields: [...Warehouse_Address_Capacities.getBaseTableModelUniqueFields(),...Warehouse_Address_Capacities.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDWAREHOUSEADDRESS'],
      type: 'foreign key',
      references: { 
          table: Warehouse_Addresses,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCAPACITYTYPE'],
      type: 'foreign key',
      references: { 
          table: Identifier_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDMEASUREMENTUNIT'],
      type: 'foreign key',
      references: { 
          table: Measurement_Units,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Warehouse_Address_Capacities}