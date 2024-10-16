'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Warehouse_Address_Types extends BaseTableModel {
  static id = 3003;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Warehouse_Address_Types.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      is_storable: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },
      is_passable: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Warehouse_Address_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Warehouse_Address_Types.tableName + '_u1',
      fields: [...Warehouse_Address_Types.getBaseTableModelUniqueFields(),...Warehouse_Address_Types.uniqueFields],
      type:"unique"
    },{
      name: Warehouse_Address_Types.tableName + '_c_1',
      fields:['is_storable'],
      type:"check",
      where:{
        is_storable: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Warehouse_Address_Types.tableName + '_c_2',
      fields:['is_passable'],
      type:"check",
      where:{
        is_passable: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Warehouse_Address_Types}