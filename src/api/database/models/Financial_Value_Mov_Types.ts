'use strict';

import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Financial_Value_Mov_Types extends BaseTableModel {

  //table fields
  declare name: string;
  declare is_physical: number;
  declare is_eletronic: number;
  declare description: string;


  static id = 1034;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static TRANSFERENCE = 1; 
  static DEPOSIT = 2;
  static POUCH = 3; // MALOTE


  static fields = {
    ...Financial_Value_Mov_Types.getBaseTableModelFields(),...{
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      is_physical: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_eletronic: {
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

  static constraints = [...(Financial_Value_Mov_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Financial_Value_Mov_Types.tableName + '_u1',
      fields: [...Financial_Value_Mov_Types.getBaseTableModelUniqueFields(),...Financial_Value_Mov_Types.uniqueFields],
      type:"unique"
    },{
      name: Financial_Value_Mov_Types.tableName + '_c_1',
      fields:['is_physical'],
      type:"check",
      where:{
        is_physical: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Financial_Value_Mov_Types.tableName + '_c_3',
      fields:['is_eletronic'],
      type:"check",
      where:{
        is_eletronic: {
              [Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys : any[] = [];


  static getIdByIntegrationId(idOnOrigin: string) {
    let result = Financial_Value_Mov_Types.DEPOSIT;
    switch(idOnOrigin.trim().toLowerCase()) {
      case 'DEPÓSITO':
      case 'DEPOSITO':
      case 'DEP':
      case 'DEPOSIT':
          result = Financial_Value_Mov_Types.DEPOSIT;
          break;
      case 'TRANSFERÊNCIA':
      case 'TRANSFERENCIA':
      case 'TRANSFERENCE':
      case 'TRANSF':
          result = Financial_Value_Mov_Types.TRANSFERENCE;
          break;
      case 'MALOTE':
      case 'MALOT':
      case 'POUCH':
          result = Financial_Value_Mov_Types.POUCH;
          break;
      default:
          result = Financial_Value_Mov_Types.DEPOSIT;
          break;
    }
    return result;
  }

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