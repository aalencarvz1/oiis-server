'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class WarehousesAddressesTypes extends BaseTableModel {
  static ID = 3003;
  static model = null;
  static fields = {
    ...WarehousesAddressesTypes.getBaseTableModelFields(),...{           
      NAME:{
        type: DataTypes.STRING(256),
        allowNull:false
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
      }
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(WarehousesAddressesTypes.getBaseTableModelConstraints() || []),...[
    {
      name: WarehousesAddressesTypes.name.toUpperCase() + '_U1',
      fields: [...WarehousesAddressesTypes.getBaseTableModelUniqueFields(),...WarehousesAddressesTypes.uniqueFields],
      type:"unique"
    },{
      name: WarehousesAddressesTypes.name.toUpperCase() + '_C_1',
      fields:['ISSTORABLE'],
      type:"check",
      where:{
        ISSTORABLE: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: WarehousesAddressesTypes.name.toUpperCase() + '_C_2',
      fields:['ISPASSABLE'],
      type:"check",
      where:{
        ISPASSABLE: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {WarehousesAddressesTypes}