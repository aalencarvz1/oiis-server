'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Warehouse_Addresses } = require("./Warehouse_Addresses");
const { Warehouse_Address_Types } = require("./Warehouse_Address_Types");

/**
 * class model
 */
class Warehouse_Address_Coordinates extends BaseTableModel {
  static id = 3005;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Warehouse_Address_Coordinates.getBaseTableModelFields(),...{           
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

  static constraints = [...(Warehouse_Address_Coordinates.getBaseTableModelConstraints() || []),...[
    {
      name: Warehouse_Address_Coordinates.tableName + '_u1',
      fields: [...Warehouse_Address_Coordinates.getBaseTableModelUniqueFields(),...Warehouse_Address_Coordinates.uniqueFields],
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
      fields: ['IDCOORDINATETYPE'],
      type: 'foreign key',
      references: { 
          table: Warehouse_Address_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Warehouse_Address_Coordinates}