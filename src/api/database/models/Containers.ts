'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';

import  Identifier_Types  from "./Identifier_Types.js";
import  Container_Types  from "./Container_Types.js";
import Utils from "../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class Containers extends BaseTableModel {

  //table fields
  declare container_type_id: number;
  declare identifier_type_id: number;
  declare identifier: string;
  declare tara: number;
  declare allow_multiple_addresses: number;
  declare observations: string;


  static id = 8015;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static WITHOUT_CONTEINER = 1;

  static fields = {
    ...Containers.getBaseTableModelFields(),...{           
      container_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      identifier_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      identifier:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      tara:{
        type: DataTypes.DECIMAL(32,10)
      },
      allow_multiple_addresses: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      observations:{
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'container_type_id',
    'identifier_type_id',
    'identifier'
  ];

  static constraints = [...(Containers.getBaseTableModelConstraints() || []),...[
    {
      name: Containers.tableName + '_u1',
      fields: [...Containers.getBaseTableModelUniqueFields(),...Containers.uniqueFields],
      type:"unique"
    },{
      name: Containers.tableName + '_c_1',
      fields:['allow_multiple_addresses'],
      type:"check",
      where:{
        allow_multiple_addresses: {
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
        fields: ['container_type_id'],
        type: 'foreign key',
        references: { 
            table: Container_Types,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['identifier_type_id'],
        type: 'foreign key',
        references: { 
            table: Identifier_Types,
            field: 'id'
        },
        onUpdate: 'cascade'
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