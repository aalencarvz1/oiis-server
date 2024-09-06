'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { WarehousesAddresses } = require("./WarehousesAddresses");
const { MeasurementsUnits } = require("./MeasurementsUnits");
const { IdentifiersTypes } = require("./IdentifiersTypes");

/**
 * class model
 */
class WarehousesAddressesCapacities extends BaseTableModel {
  static id = 3007;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...WarehousesAddressesCapacities.getBaseTableModelFields(),...{           
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

  static constraints = [...(WarehousesAddressesCapacities.getBaseTableModelConstraints() || []),...[
    {
      name: WarehousesAddressesCapacities.tableName + '_u1',
      fields: [...WarehousesAddressesCapacities.getBaseTableModelUniqueFields(),...WarehousesAddressesCapacities.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDWAREHOUSEADDRESS'],
      type: 'foreign key',
      references: { 
          table: WarehousesAddresses,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCAPACITYTYPE'],
      type: 'foreign key',
      references: { 
          table: IdentifiersTypes,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDMEASUREMENTUNIT'],
      type: 'foreign key',
      references: { 
          table: MeasurementsUnits,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {WarehousesAddressesCapacities}