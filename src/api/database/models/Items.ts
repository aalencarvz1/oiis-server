'use strict'

import  { DataTypes }   from "sequelize";
import  BaseTableModel  from "./BaseTableModel.js";
import  Identifier_Types  from "./Identifier_Types.js";
import  Ncms  from "./Ncms.js";
import Utils from "../../controllers/utils/Utils.js";



/**
 * class model
 */
export default class Items extends BaseTableModel {

  //table fields
  declare identifier_type_id: number;
  declare identifier: string;      
  declare ncm_id: number;      
  declare name: string;      
  declare description: string;
  declare default_expiration_time: number;



  static id = 8010;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Items.getBaseTableModelFields(),...{           
      identifier_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      identifier:{
        type: DataTypes.STRING(256),
        allowNull:false
      },      
      ncm_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },      
      description:{
        type: DataTypes.TEXT
      },      
      default_expiration_time:{
        type: DataTypes.BIGINT.UNSIGNED
      },      
    }
  };
  
  
  static uniqueFields = [
    'identifier_type_id',
    'identifier'
  ];

  static constraints = [...(Items.getBaseTableModelConstraints() || []),...[
    {
      name: Items.tableName + '_u1',
      fields: [...Items.getBaseTableModelUniqueFields(),...Items.uniqueFields],
      type:"unique"
    }
  ]];

  
  /**
   * create data of model this
   * @static (pay attention to bindings)
   * @async (pay attention to await)
   * @override
   * @created 2023-11-10
   */
  static async createData(params: any) {
    params = params || {};  
    if (params.AUTOMATICIDENTIFIER) {
        let last : any = await Items.max('identifier');
        if (last && !isNaN(last)) {
            params.identifier = (last-0)+1;
        } else {
            params.identifier = last + 1;
        }
    }                  
    return await BaseTableModel.createData.bind(Items)(params);
  }
  static putData = this.createData;

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
      result.spush({
        fields: ['identifier_type_id'],
        type: 'foreign key',
        references: { 
            table: Identifier_Types,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['ncm_id'],
        type: 'foreign key',
        references: { 
            table: Ncms,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
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