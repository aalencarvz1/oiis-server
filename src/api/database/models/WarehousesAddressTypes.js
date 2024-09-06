'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class WarehousesAddressTypes extends BaseTableModel {
  static id = 3003;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...WarehousesAddressTypes.getBaseTableModelFields(),...{           
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

  static constraints = [...(WarehousesAddressTypes.getBaseTableModelConstraints() || []),...[
    {
      name: WarehousesAddressTypes.tableName + '_u1',
      fields: [...WarehousesAddressTypes.getBaseTableModelUniqueFields(),...WarehousesAddressTypes.uniqueFields],
      type:"unique"
    },{
      name: WarehousesAddressTypes.tableName + '_c_1',
      fields:['ISSTORABLE'],
      type:"check",
      where:{
        ISSTORABLE: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: WarehousesAddressTypes.tableName + '_c_2',
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


module.exports = {WarehousesAddressTypes}