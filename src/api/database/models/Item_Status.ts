'use strict';


import { Sequelize, DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Item_Status extends BaseTableModel {

  //table fields
  declare name: string;
  declare sigla: string;
  declare is_disponible: number;
  declare is_damaged: number;
  declare description: string;


  static id = 8009;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static NORMAL = 1;
  static DAMAGED = 2;
  
  static fields = {
    ...Item_Status.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      sigla: {
        type: DataTypes.STRING(10)
      },
      is_disponible: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      is_damaged: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      description: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'name',
    Sequelize.literal(`(COALESCE(sigla,'NULL'))`)
  ];

  static constraints = [...(Item_Status.getBaseTableModelConstraints() || []),...[
    {
      name: Item_Status.tableName + '_u1',
      fields: [...Item_Status.getBaseTableModelUniqueFields(),...Item_Status.uniqueFields],
      type:"unique"
    },{
      name: Item_Status.tableName + '_c_1',
      fields:['is_disponible'],
      type:"check",
      where:{
        is_disponible: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Item_Status.tableName + '_c_2',
      fields:['is_damaged'],
      type:"check",
      where:{
        is_damaged: {
              [Op.in]: [0,1]
          }
      }
    }

  ]];

  static foreignsKeys : any[] = [];

/**
  * get the foreign keys avoiding ciclyc imports on BaseTableModel
  * @override
  * @created 2025-04-14
  * @version 1.0.0
  */
  static getForeignKeys(): any[] {
    let result : any = this.foreignsKeys;
    if (!this.adjustedForeignKeys || !Utils.hasValue(this.foreignsKeys)) {
      let newAdjustedForeignKeys : boolean = true;
      let baseFks = this.getBaseTableModelForeignsKeys();
      for(let i = 0; i < baseFks.length; i++) {
        result.push(baseFks[i]);
        if (newAdjustedForeignKeys && typeof baseFks[i].references.table == 'string') newAdjustedForeignKeys = false;
      }        
      this.adjustedForeignKeys = newAdjustedForeignKeys;
    }
    return result;
  }


  /**
  * static initializer block
  */
  static {
    this.foreignsKeys = this.getForeignKeys();
  }  
   
};