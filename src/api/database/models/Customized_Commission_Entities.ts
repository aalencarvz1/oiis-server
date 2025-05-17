'use strict';


import { DataTypes, Sequelize } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import Customized_Commissions  from "./Customized_Commissions.js";
import Utils from "../../controllers/utils/Utils.js";
import Entities_Types from "./Entities_Types.js";



/**
 * class model
 */
export default class Customized_Commission_Entities extends BaseTableModel {

  //table fields
  declare customized_commission_id: number;
  declare entity_type_id: number;
  declare entity_id: number;
  declare entity_name: string;
  declare description?: string;
  declare commission_profile_id?: number;
  declare alias?: string;
  declare start_at?: Date;
  declare end_at?: Date;
  declare conditions?: string;
  declare min_base_value?: number;
  declare max_base_value?: number;
  declare base_value?: number;
  declare min_result_value?: number;
  declare max_result_value?: number;
  declare expression?: string;
  declare result_value?: number;
  declare calculated_at?: Date;
  declare notes?: string;


  static id = 16101;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  

  static fields = {
    ...Customized_Commission_Entities.getBaseTableModelFields(),...{           
      customized_commission_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      entity_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      entity_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      entity_name: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      description:{
        type: DataTypes.TEXT
      },
      commission_profile_id:{
        type: DataTypes.BIGINT.UNSIGNED,        
      },
      alias: {
        type: DataTypes.STRING(256)
      },
      start_at:{
        type: DataTypes.DATE
      },
      end_at:{
        type: DataTypes.DATE
      },
      conditions:{
        type: DataTypes.TEXT
      },    
      min_base_value:{
        type: DataTypes.DECIMAL(38,12)
      },
      max_base_value:{
        type: DataTypes.DECIMAL(38,12)
      },        
      base_value:{
        type: DataTypes.DECIMAL(38,12)
      },
      min_result_value:{
        type: DataTypes.DECIMAL(38,12)
      },
      max_result_value:{
        type: DataTypes.DECIMAL(38,12)
      },
      expression:{
        type: DataTypes.TEXT
      },
      result_value:{
        type: DataTypes.DECIMAL(38,12)
      },
      calculated_at:{
        type: DataTypes.DATE
      },
      notes:{
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'customized_commission_id',
    'entity_type_id',
    'entity_id',
    'entity_name',
    Sequelize.literal(`(coalesce(alias,0))`)
  ];

  static constraints = [...(Customized_Commission_Entities.getBaseTableModelConstraints() || []),...[
    {
      name: Customized_Commission_Entities.tableName + '_u1',
      fields: [...Customized_Commission_Entities.getBaseTableModelUniqueFields(),...Customized_Commission_Entities.uniqueFields],
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
        fields: ['customized_commission_id'],
        type: 'foreign key',
        references: { 
            table: Customized_Commissions,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
      result.push({
        fields: ['entity_type_id'],
        type: 'foreign key',
        references: { 
            table: Entities_Types,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }

};
