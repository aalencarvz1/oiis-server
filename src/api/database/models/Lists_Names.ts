'use strict';

import { DataTypes, Op } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";


/**
 * class model
 * purpose: storage generic lists of names wich can be used in others parts of system. they also can be nested by parent_id column and can be storage different values types on type named columns
 */
export default class Lists_Names extends BaseTableModel {

  //table fields
  declare name : string;
  declare description?: string;
  declare integer_value_1?: number;
  declare integer_value_2?: number;
  declare integer_value_3?: number;
  declare decimal_value_1?: number;
  declare decimal_value_2?: number;
  declare decimal_value_3?: number;
  declare string_value_1?: string;
  declare string_value_2?: string;
  declare string_value_3?: string;
  declare text_value_1?: string;
  declare text_value_2?: string;
  declare text_value_3?: string;
  declare boolean_value_1?: number;
  declare boolean_value_2?: number;
  declare boolean_value_3?: number;
  declare date_value_1?: Date;
  declare date_value_2?: Date;
  declare date_value_3?: Date;
  declare notes?: string;


  static id = 1004;
  static tableName = this.name.toLowerCase();
  

  static fields = {
    ...Lists_Names.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(512),
        allowNull:false
      },
      description: {
        type: DataTypes.TEXT
      }, 
      integer_value_1: {
        type: DataTypes.INTEGER
      },
      integer_value_2: {
        type: DataTypes.INTEGER
      },
      integer_value_3: {
        type: DataTypes.INTEGER
      },
      decimal_value_1: {
        type: DataTypes.DECIMAL(38,12)
      },
      decimal_value_2: {
        type: DataTypes.DECIMAL(38,12)
      },
      decimal_value_3: {
        type: DataTypes.DECIMAL(38,12)
      },
      string_value_1: {
        type: DataTypes.STRING(4000)
      },
      string_value_2: {
        type: DataTypes.STRING(4000)
      },
      string_value_3: {
        type: DataTypes.STRING(4000)
      },      
      text_value_1: {
        type: DataTypes.TEXT
      },
      text_value_2: {
        type: DataTypes.TEXT
      },
      text_value_3: {
        type: DataTypes.TEXT
      },      
      boolean_value_1: {
        type: DataTypes.INTEGER
      },
      boolean_value_2: {
        type: DataTypes.INTEGER
      },
      boolean_value_3: {
        type: DataTypes.INTEGER
      },
      date_value_1: {
        type: DataTypes.DATE
      },
      date_value_2: {
        type: DataTypes.DATE
      },
      date_value_3: {
        type: DataTypes.DATE
      },
      notes: {
        type: DataTypes.TEXT
      }, 
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Lists_Names.getBaseTableModelConstraints() || []),...[
    {
      name: Lists_Names.tableName + '_u1',
      fields: [...Lists_Names.getBaseTableModelUniqueFields(),...Lists_Names.uniqueFields],
      type:"unique"
    },{
      name: Lists_Names.tableName + '_c_1',
      fields:['boolean_value_1'],
      type:"check",
      where:{
        boolean_value_1: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Lists_Names.tableName + '_c_2',
      fields:['boolean_value_2'],
      type:"check",
      where:{
        boolean_value_2: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Lists_Names.tableName + '_c_3',
      fields:['boolean_value_3'],
      type:"check",
      where:{
        boolean_value_3: {
              [Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};