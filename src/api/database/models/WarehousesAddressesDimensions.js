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
class WarehousesAddressesDimensions extends BaseTableModel {
  static ID = 3006;
  static model = null;
  static fields = {
    ...WarehousesAddressesDimensions.getBaseTableModelFields(),...{           
      IDWAREHOUSEADDRESS:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDDIMENSIONTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      IDMEASUREMENTUNIT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      VALUE:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:0
      },
      OBSERVATIONS:{
        type:DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'IDWAREHOUSEADDRESS',
    'IDDIMENSIONTYPE'
  ];

  static constraints = [...(WarehousesAddressesDimensions.getBaseTableModelConstraints() || []),...[
    {
      name: WarehousesAddressesDimensions.name.toUpperCase() + '_U1',
      fields: [...WarehousesAddressesDimensions.getBaseTableModelUniqueFields(),...WarehousesAddressesDimensions.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDWAREHOUSEADDRESS'],
      type: 'foreign key',
      references: { 
          table: WarehousesAddresses,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDDIMENSIONTYPE'],
      type: 'foreign key',
      references: { 
          table: IdentifiersTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDMEASUREMENTUNIT'],
      type: 'foreign key',
      references: { 
          table: MeasurementsUnits,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {WarehousesAddressesDimensions}