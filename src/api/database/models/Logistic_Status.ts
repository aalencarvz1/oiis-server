'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';


/**
 * class model
 */
export default class Logistic_Status extends BaseTableModel {

  //table fields
  declare name: string;
  declare is_to_delivery:  number;
  declare is_delivering:  number;
  declare id_delivered:  number;
  declare is_partial_returned:  number;
  declare is_total_returned:  number;
  declare description:  string;


  static id = 12001;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

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
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_delivering: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      id_delivered: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_partial_returned: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_total_returned: {
        type: DataTypes.INTEGER,
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
              [Op.in]: [0,1]
          }
      }
    },{
      name: Logistic_Status.tableName + '_c_2',
      fields:['is_delivering'],
      type:"check",
      where:{
        is_delivering: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Logistic_Status.tableName + '_c_3',
      fields:['id_delivered'],
      type:"check",
      where:{
        id_delivered: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Logistic_Status.tableName + '_c_4',
      fields:['is_partial_returned'],
      type:"check",
      where:{
        is_partial_returned: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Logistic_Status.tableName + '_c_5',
      fields:['is_total_returned'],
      type:"check",
      where:{
        is_total_returned: {
              [Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys : any[] = [];
  
};