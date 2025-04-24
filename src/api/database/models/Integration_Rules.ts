'use strict';

import { DataTypes, Op, Sequelize } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Data_Origins from "./Data_Origins.js";
import Tables from "./Tables.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Integration_Rules extends BaseTableModel {

  //table fiels
  declare name: string;
  declare description?: string;
  declare table_id: number;
  declare field_name?: string;
  declare condition_to_check?: string;
  declare rule: string;
  declare check_at_front: number;
  declare check_at_back: number;
  declare check_on_insert: number;
  declare check_on_update: number;
  declare check_on_delete: number;
  declare notes?: string;


  static id = 20020;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  

  
  static fields = {
    ...Integration_Rules.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      table_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      field_name: {
        type: DataTypes.STRING(255)
      },
      condition_to_check: {
        type: DataTypes.TEXT
      },
      rule: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      check_at_front: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      },
      check_at_back: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      },
      check_on_insert: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      },
      check_on_update: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      },
      check_on_delete: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      notes: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name',
    'table_id',
    Sequelize.literal(`(COALESCE(field_name,'NULL'))`)
  ];

  static constraints = [...(Integration_Rules.getBaseTableModelConstraints() || []),...[
    {
      name: Integration_Rules.tableName + '_u1',
      fields: [...Integration_Rules.getBaseTableModelUniqueFields(),...Integration_Rules.uniqueFields],
      type:"unique"
    },{
      name: Integration_Rules.tableName + '_c_1',
      fields:['check_at_front'],
      type:"check",
      where:{
        check_at_front: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Integration_Rules.tableName + '_c_2',
      fields:['check_at_back'],
      type:"check",
      where:{
        check_at_back: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Integration_Rules.tableName + '_c_3',
      fields:['check_on_insert'],
      type:"check",
      where:{
        check_on_insert: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Integration_Rules.tableName + '_c_4',
      fields:['check_on_update'],
      type:"check",
      where:{
        check_on_update: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Integration_Rules.tableName + '_c_5',
      fields:['check_on_delete'],
      type:"check",
      where:{
        check_on_delete: {
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
      result = super.getForeignKeys();
      result.push({
        fields: ['table_id'],
        type: 'foreign key',
        references: { 
            table: Tables,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }

};
