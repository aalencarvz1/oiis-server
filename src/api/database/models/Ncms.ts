'use strict';

import { Sequelize, DataTypes, Op } from "sequelize";
import  BaseTableModel  from "./BaseTableModel.js";


/**
 * class model
 */
export default class Ncms extends BaseTableModel {

  //table fields
  declare chapter: number;
  declare position?: number;
  declare subposition?: number;
  declare item?: number;
  declare subitem?: number;
  declare ncm?: number;      
  declare exception?: number;
  declare description: string;


  static id = 8008;
  static tableName = this.name.toLowerCase();
  
  static fields = {
    ...Ncms.getBaseTableModelFields(),...{           
      chapter:{
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull:false
      },
      position:{
        type: DataTypes.TINYINT.UNSIGNED,
      },
      subposition:{
        type: DataTypes.TINYINT.UNSIGNED,
      },
      item:{
        type: DataTypes.TINYINT.UNSIGNED,
      },
      subitem:{
        type: DataTypes.TINYINT.UNSIGNED,
      },
      ncm:{
        type: DataTypes.BIGINT.UNSIGNED
      },      
      exception:{
        type: DataTypes.TINYINT.UNSIGNED
      },      
      description:{
        type: DataTypes.TEXT,
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'chapter',
    Sequelize.literal('(coalesce(position,0))'),
    Sequelize.literal('(coalesce(subposition,0))'),
    Sequelize.literal('(coalesce(item,0))'),
    Sequelize.literal('(coalesce(subitem,0))'),
    Sequelize.literal('(coalesce(exception,0))'),
  ]

  static constraints = [...(Ncms.getBaseTableModelConstraints() || []),...[{
    name: Ncms.tableName + '_u1',
    fields: [...Ncms.getBaseTableModelUniqueFields(),...Ncms.uniqueFields],
    type:"unique"
  },{
    name: Ncms.tableName + '_c_1',
    fields:['chapter'],
    type:"check",
    where:{
      chapter: {
          [Op.gt]: 0,
          [Op.lte]: 99
        }
    }
  },{
    name: Ncms.tableName + '_c_2',
    fields:['position'],
    type:"check",
    where:{
      position: {
          [Op.gte]: 0,
          [Op.lte]: 99
        }
    }
  },{
    name: Ncms.tableName + '_c_3',
    fields:['subposition'],
    type:"check",
    where:{
      subposition: {
          [Op.gte]: 0,
          [Op.lte]: 99
        }
    }
  },{
    name: Ncms.tableName + '_c_4',
    fields:['item'],
    type:"check",
    where:{
      item: {
          [Op.gte]: 0,
          [Op.lte]: 9
        }
    }
  },{
    name: Ncms.tableName + '_c_5',
    fields:['subitem'],
    type:"check",
    where:{
      subitem: {
          [Op.gte]: 0,
          [Op.lte]: 9
        }
    }
  },{
    name: Ncms.tableName + '_c_6',
    fields:['exception'],
    type:"check",
    where:{
      exception: {
          [Op.gte]: 0,
          [Op.lte]: 99
        }
    }
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};