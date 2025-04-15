'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Measurement_Units  from "./Measurement_Units.js";
import  Identifier_Types  from "./Identifier_Types.js";
import  Container_Types  from "./Container_Types.js";
import Utils from "../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class Container_Type_Dimensions extends BaseTableModel {

  //table fields
  declare container_type_id: number;
  declare dimension_type_id: number;      
  declare measurement_unit_id: number;      
  declare value: number;
  declare observations: string;


  static id = 8003;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Container_Type_Dimensions.getBaseTableModelFields(),...{           
      container_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      dimension_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      measurement_unit_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      value:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:0
      },
      observations:{
        type:DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'container_type_id',
    'dimension_type_id'
  ];

  static constraints = [...(Container_Type_Dimensions.getBaseTableModelConstraints() || []),...[
    {
      name: Container_Type_Dimensions.tableName + '_u1',
      fields: [...Container_Type_Dimensions.getBaseTableModelUniqueFields(),...Container_Type_Dimensions.uniqueFields],
      type:"unique"
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
      result = super.getForeignKeys();    
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
        fields: ['dimension_type_id'],
        type: 'foreign key',
        references: { 
            table: Identifier_Types,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['measurement_unit_id'],
        type: 'foreign key',
        references: { 
            table: Measurement_Units,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }
   
};