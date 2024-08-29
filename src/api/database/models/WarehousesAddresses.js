'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { IdentifiersTypes } = require("./IdentifiersTypes");
const { WarehousesAddressesTypes } = require("./WarehousesAddressesTypes");
const { Warehouses } = require("./Warehouses");
const { FormsTypes } = require("./FormsTypes");

/**
 * class model
 */
class WarehousesAddresses extends BaseTableModel {
  static ID = 3004;
  static model = null;
  static fields = {
    ...WarehousesAddresses.getBaseTableModelFields(),...{           
      IDWAREHOUSE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDWAREHOUSEADDRESSTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDIDENTIFIERTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDENTIFIER:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      IDFORMTYPE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      ISSTORABLE: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },
      ISPASSABLE: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISDISPONIBLE: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },
      OBSERVATIONS:{
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'IDWAREHOUSE',
    'IDENTIFIER'
  ];

  static constraints = [...(WarehousesAddresses.getBaseTableModelConstraints() || []),...[
    {
      name: WarehousesAddresses.name.toUpperCase() + '_U1',
      fields: [...WarehousesAddresses.getBaseTableModelUniqueFields(),...WarehousesAddresses.uniqueFields],
      type:"unique"
    },{
      name: WarehousesAddresses.name.toUpperCase() + '_C_1',
      fields:['ISSTORABLE'],
      type:"check",
      where:{
        ISSTORABLE: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: WarehousesAddresses.name.toUpperCase() + '_C_2',
      fields:['ISPASSABLE'],
      type:"check",
      where:{
        ISPASSABLE: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: WarehousesAddresses.name.toUpperCase() + '_C_3',
      fields:['ISDISPONIBLE'],
      type:"check",
      where:{
        ISDISPONIBLE: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDWAREHOUSE'],
      type: 'foreign key',
      references: { 
          table: Warehouses,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDWAREHOUSEADDRESSTYPE'],
      type: 'foreign key',
      references: { 
          table: WarehousesAddressesTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDIDENTIFIERTYPE'],
      type: 'foreign key',
      references: { 
          table: IdentifiersTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDFORMTYPE'],
      type: 'foreign key',
      references: { 
          table: FormsTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {WarehousesAddresses}