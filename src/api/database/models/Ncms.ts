'use strict';

import { Sequelize, DataTypes, Op } from "sequelize";
import  BaseTableModel  from "./BaseTableModel.js";
import Utils from "../../controllers/utils/Utils.js";


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
  declare code: string;
  declare start_at?: Date;
  declare end_at?: Date;
  declare start_act_type?: string;
  declare start_act_number?: string;
  declare start_act_year?: number;
  declare description: string;
  declare notes?: string;


  static id = 8008;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
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
      code:{
        type: DataTypes.STRING(20),
        allowNull:false
      },
      description:{
        type: DataTypes.TEXT,
        allowNull:false
      },
      start_at:{
        type: DataTypes.DATE
      },
      end_at:{
        type: DataTypes.DATE
      },
      start_act_type:{
        type: DataTypes.STRING(500)
      },
      start_act_number:{
        type: DataTypes.STRING(500)
      },
      start_act_year:{
        type: DataTypes.SMALLINT.UNSIGNED
      },
      notes:{
        type: DataTypes.TEXT
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

  static foreignsKeys : any[] = [];
  
/**
  * get the foreign keys avoiding ciclyc imports on BaseTableModel
  * @override
  * @created 2025-04-14
  * @version 1.0.0
  */
  static getForeignKeys(): any[] {
    //Utils.logi(this.name,'getForeignKeys');
    let result : any = this.foreignsKeys;
    if (!this.adjustedForeignKeys || !Utils.hasValue(this.foreignsKeys)) {
      result = [];
      let newAdjustedForeignKeys : boolean = true;
      let baseFks = this.getBaseTableModelForeignsKeys();
      for(let i = 0; i < baseFks.length; i++) {
        result.push(baseFks[i]);
        if (newAdjustedForeignKeys && typeof baseFks[i].references.table == 'string') newAdjustedForeignKeys = false;
      }        
      this.adjustedForeignKeys = newAdjustedForeignKeys;
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }


  /**
  * static initializer block
  */
  static {
    //Utils.logi(this.name,'STATIC');
    this.foreignsKeys = this.getForeignKeys();
    //Utils.logf(this.name,'STATIC');
  }  
};