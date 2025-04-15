'use strict';

import { DataTypes, Op, Sequelize } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Power_Types from "./Power_Types.js";
import Access_Profiles from "./Access_Profiles.js";
import Users from "./Users.js";
import Contexts from "./Contexts.js";
import Tables from "./Tables.js";
import Modules from "./Modules.js";
import Routines from "./Routines.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Permissions extends BaseTableModel {

  //table fields
  declare power_type_id: number;
  declare access_profile_id: number;
  declare user_id: number;
  declare context_id: number;
  declare table_id: number;
  declare module_id: number;
  declare routine_id: number;
  declare start_date: Date; 
  declare end_date: Date; 
  declare allowed_access: number;
  declare allowed_search: number;
  declare allowed_read: number;
  declare allowed_update: number;
  declare allowed_create: number;
  declare allowed_delete: number;
  declare observations: string;



  static id = 7003;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  

  static SYSTEM = 1;

  static fields = {
    ...Permissions.getBaseTableModelFields(),...{           
      power_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      access_profile_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      user_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      context_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      table_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      module_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      routine_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      start_date:{
        type: DataTypes.DATE
      },
      end_date:{
        type: DataTypes.DATE
      },
      allowed_access: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      },
      allowed_search: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      },
      allowed_read: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      },
      allowed_update: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      },
      allowed_create: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      },
      allowed_delete: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      },
      observations: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'power_type_id',
    Sequelize.literal(`(COALESCE(access_profile_id,0))`),
    Sequelize.literal(`(COALESCE(user_id,0))`),
    Sequelize.literal(`(COALESCE(context_id,0))`),
    Sequelize.literal(`(COALESCE(table_id,0))`),
    Sequelize.literal(`(COALESCE(module_id,0))`),
    Sequelize.literal(`(COALESCE(routine_id,0))`),
    Sequelize.literal(`(COALESCE(start_date,'1900-01-01'))`)
  ];

  static constraints = [...(Permissions.getBaseTableModelConstraints() || []),...[
    {
      name: Permissions.tableName + '_u1',
      fields: [...Permissions.getBaseTableModelUniqueFields(),...Permissions.uniqueFields],
      type:"unique"
    },{
      name: Permissions.tableName + '_c_1',
      fields:['allowed_access'],
      type:"check",
      where:{
        allowed_access: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Permissions.tableName + '_c_2',
      fields:['allowed_search'],
      type:"check",
      where:{
        allowed_search: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Permissions.tableName + '_c_3',
      fields:['allowed_read'],
      type:"check",
      where:{
        allowed_read: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Permissions.tableName + '_c_4',
      fields:['allowed_update'],
      type:"check",
      where:{
        allowed_update: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Permissions.tableName + '_c_5',
      fields:['allowed_create'],
      type:"check",
      where:{
        allowed_create: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Permissions.tableName + '_c_6',
      fields:['allowed_delete'],
      type:"check",
      where:{
        allowed_delete: {
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
        fields: ['power_type_id'],
        type: 'foreign key',
        references: { 
            table: Power_Types,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['access_profile_id'],
        type: 'foreign key',
        references: { 
            table: Access_Profiles,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['user_id'],
        type: 'foreign key',
        references: { 
            table: Users,
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
        fields: ['table_id'],
        type: 'foreign key',
        references: { 
            table: Tables,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['module_id'],
        type: 'foreign key',
        references: { 
            table: Modules,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
      result.push({
        fields: ['routine_id'],
        type: 'foreign key',
        references: { 
            table: Routines,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }

};

