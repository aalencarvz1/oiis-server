'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Collaborator_Functions extends BaseTableModel {

  //table fields
  declare name: string;
  declare is_trust: number;
  declare is_time_controlled: number;


  static id = 6001;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Collaborator_Functions.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      is_trust: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_time_controlled: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Collaborator_Functions.getBaseTableModelConstraints() || []),...[
    {
      name: Collaborator_Functions.tableName + '_u1',
      fields: [...Collaborator_Functions.getBaseTableModelUniqueFields(),...Collaborator_Functions.uniqueFields],
      type:"unique"
    },{
      name: Collaborator_Functions.tableName + '_c_1',
      fields:['is_trust'],
      type:"check",
      where:{
        is_trust: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Collaborator_Functions.tableName + '_c_2',
      fields:['is_time_controlled'],
      type:"check",
      where:{
        is_time_controlled: {
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
      result = [];
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