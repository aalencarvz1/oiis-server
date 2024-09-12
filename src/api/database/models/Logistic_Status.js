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
      ISTODELIVERY: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISDELIVERING: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISDELIVERED: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISPARTIALRETURNED: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISTOTALRETURNED: {
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
      fields:['ISTODELIVERY'],
      type:"check",
      where:{
        ISTODELIVERY: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Logistic_Status.tableName + '_c_2',
      fields:['ISDELIVERING'],
      type:"check",
      where:{
        ISDELIVERING: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Logistic_Status.tableName + '_c_3',
      fields:['ISDELIVERED'],
      type:"check",
      where:{
        ISDELIVERED: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Logistic_Status.tableName + '_c_4',
      fields:['ISPARTIALRETURNED'],
      type:"check",
      where:{
        ISPARTIALRETURNED: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Logistic_Status.tableName + '_c_5',
      fields:['ISTOTALRETURNED'],
      type:"check",
      where:{
        ISTOTALRETURNED: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Logistic_Status}