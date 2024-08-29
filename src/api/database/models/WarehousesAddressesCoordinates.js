'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { WarehousesAddresses } = require("./WarehousesAddresses");
const { WarehousesAddressesTypes } = require("./WarehousesAddressesTypes");

/**
 * class model
 */
class WarehousesAddressesCoordinates extends BaseTableModel {
  static ID = 3005;
  static model = null;
  static fields = {
    ...WarehousesAddressesCoordinates.getBaseTableModelFields(),...{           
      IDWAREHOUSEADDRESS:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDCOORDINATETYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      VALUE:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'IDWAREHOUSEADDRESS',
    'IDCOORDINATETYPE'
  ];

  static constraints = [...(WarehousesAddressesCoordinates.getBaseTableModelConstraints() || []),...[
    {
      name: WarehousesAddressesCoordinates.name.toUpperCase() + '_U1',
      fields: [...WarehousesAddressesCoordinates.getBaseTableModelUniqueFields(),...WarehousesAddressesCoordinates.uniqueFields],
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
      fields: ['IDCOORDINATETYPE'],
      type: 'foreign key',
      references: { 
          table: WarehousesAddressesTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {WarehousesAddressesCoordinates}