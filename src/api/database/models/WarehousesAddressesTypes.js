'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class WarehousesAddressesTypes extends BaseTableModel {
  static id = 3003;
  static model = null;
  static fields = {
    ...WarehousesAddressesTypes.getBaseTableModelFields(),...{           
      name:{
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
    'name'
  ];

  static constraints = [...(WarehousesAddressesTypes.getBaseTableModelConstraints() || []),...[
    {
      name: WarehousesAddressesTypes.name.toLowerCase() + '_u1',
      fields: [...WarehousesAddressesTypes.getBaseTableModelUniqueFields(),...WarehousesAddressesTypes.uniqueFields],
      type:"unique"
    },{
      name: WarehousesAddressesTypes.name.toLowerCase() + '_c_1',
      fields:['ISSTORABLE'],
      type:"check",
      where:{
        ISSTORABLE: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: WarehousesAddressesTypes.name.toLowerCase() + '_c_2',
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