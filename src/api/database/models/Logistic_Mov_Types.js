'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Logistic_Mov_Types extends BaseTableModel {
  static id = 12000;
  static tableName = this.name.toLowerCase();
  static model = null;

  static DELIVERY = 1;
  static COLLECT = 2;
  static RETREAT = 3;

  static fields = {
    ...Logistic_Mov_Types.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      is_input: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      is_output: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      description: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Logistic_Mov_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Logistic_Mov_Types.tableName + '_u1',
      fields: [...Logistic_Mov_Types.getBaseTableModelUniqueFields(),...Logistic_Mov_Types.uniqueFields],
      type:"unique"
    },{
      name: Logistic_Mov_Types.tableName + '_c_1',
      fields:['is_input'],
      type:"check",
      where:{
        is_input: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Logistic_Mov_Types.tableName + '_c_2',
      fields:['is_output'],
      type:"check",
      where:{
        is_output: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Logistic_Mov_Types}