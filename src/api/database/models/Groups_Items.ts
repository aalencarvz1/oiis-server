'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Groups  from "./Groups.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Groups_Items extends BaseTableModel {

  //table fields
  declare group_id: number;      
  declare item_id: number;
  declare is_manual_included: number;
  declare observations: string;


  static id = 7007;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static fields = {
    ...Groups_Items.getBaseTableModelFields(),...{              
      group_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      item_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      is_manual_included: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      observations:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'group_id',
    'item_id'
  ];

  static constraints = [...(Groups_Items.getBaseTableModelConstraints() || []),...[
    {
      name: Groups_Items.tableName + '_u1',
      fields: [...Groups_Items.getBaseTableModelUniqueFields(),...Groups_Items.uniqueFields],
      type:"unique"
    },{
      name: Groups_Items.tableName + '_c_1',
      fields:['is_manual_included'],
      type:"check",
      where:{
        is_manual_included: {
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
      result.push({
        fields: ['group_id'],
        type: 'foreign key',
        references: { 
            table: Groups,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
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
