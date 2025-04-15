'use strict';

import { DataTypes, Sequelize } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Relationships from "./Relationships.js";
import Contexts from "./Contexts.js";
import Identifier_Types from "./Identifier_Types.js";
import Data_Types from "./Data_Types.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Relationship_Values extends BaseTableModel {

  //table fields
  declare data_relationship_id: number;
  declare context_id: number;
  declare identifier_type_id:number;
  declare data_type_id:number;
  declare value: string;
  declare numeric_order: number;
  declare start_at: Date;
  declare end_at: Date;



  static id = 1003;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Relationship_Values.getBaseTableModelFields(),...{           
      data_relationship_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      context_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      identifier_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      data_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      value:{
        type: DataTypes.STRING(256)
      },
      numeric_order:{
        type: DataTypes.BIGINT
      },
      start_at:{
        type: DataTypes.DATE
      },
      end_at:{
        type: DataTypes.DATE
      }
    }
  };
  
  static uniqueFields = [
    'data_relationship_id',
    Sequelize.literal(`(COALESCE(context_id,0))`),
    'identifier_type_id',
    'data_type_id',
    Sequelize.literal(`(COALESCE(value,'NULL'))`),
    Sequelize.literal(`(COALESCE(numeric_order,0))`),
    Sequelize.literal(`(COALESCE(start_at,'1900-01-01'))`)
  ];

  static constraints = [...(Relationship_Values.getBaseTableModelConstraints() || []),...[
    {
      name: Relationship_Values.tableName + '_u1',
      fields: [...Relationship_Values.getBaseTableModelUniqueFields(),...Relationship_Values.uniqueFields],
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
        fields: ['data_relationship_id'],
        type: 'foreign key',
        references: { 
            table: Relationships,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['context_id'],
        type: 'foreign key',
        references: { 
            table: Contexts,
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
      result.push({
        fields: ['data_type_id'],
        type: 'foreign key',
        references: { 
            table: Data_Types,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }

};