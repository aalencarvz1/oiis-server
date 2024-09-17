'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Logistic_Status extends BaseTableModel {
  static id = 12001;
  static tableName = this.name.toLowerCase();
  static model = null;

  static TO_DELIVERY = 1;
  static DELIVERING = 2;
  static DELIVERED = 3;
  static PARTIAL_RETURNED = 4;
  static TOTAL_RETURNED = 5;

  static fields = {
    ...Logistic_Status.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      is_to_delivery: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      is_delivering: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      id_delivered: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      is_partial_returned: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      is_total_returned: {
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

  static constraints = [...(Logistic_Status.getBaseTableModelConstraints() || []),...[
    {
      name: Logistic_Status.tableName + '_u1',
      fields: [...Logistic_Status.getBaseTableModelUniqueFields(),...Logistic_Status.uniqueFields],
      type:"unique"
    },{
      name: Logistic_Status.tableName + '_c_1',
      fields:['is_to_delivery'],
      type:"check",
      where:{
        is_to_delivery: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Logistic_Status.tableName + '_c_2',
      fields:['is_delivering'],
      type:"check",
      where:{
        is_delivering: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Logistic_Status.tableName + '_c_3',
      fields:['id_delivered'],
      type:"check",
      where:{
        id_delivered: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Logistic_Status.tableName + '_c_4',
      fields:['is_partial_returned'],
      type:"check",
      where:{
        is_partial_returned: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Logistic_Status.tableName + '_c_5',
      fields:['is_total_returned'],
      type:"check",
      where:{
        is_total_returned: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Logistic_Status}