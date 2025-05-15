'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import Customized_Commission_Entities  from './Customized_Commission_Entities.js';
import Utils from "../../controllers/utils/Utils.js";
import Report_Visions from "./Report_Visions.js";
import Measurement_Units from "./Measurement_Units.js";


/**
 * class model
 */
export default class Customized_Commission_Entity_Items extends BaseTableModel {

  //table fields
  declare customized_commission_entity_id: number;
  declare commission_profile_item_id?: number;
  declare name: string;
  declare description?: string;
  declare start_at?: Date;
  declare end_at?: Date;
  declare base_value_origin: string;
  declare report_vision_id?: number;
  declare measurement_unit_id?: number;
  declare consider_normal_sales: number;
  declare consider_returns: number;
  declare consider_bonuses: number;
  declare conditions?: string;
  declare base_value_query?: string;
  declare min_base_value?: number;
  declare max_base_value?: number;
  declare base_value_expression?: string;
  declare base_value?: number;
  declare percent1: number;
  declare percent2?: number;
  declare min_value?: number;
  declare max_value?: number;
  declare expression?: string;
  declare result_value?: number;
  declare calculated_at?: Date;
  declare notes?: string;



  static id = 16102;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Customized_Commission_Entity_Items.getBaseTableModelFields(),...{                 
      customized_commission_entity_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
      },
      commission_profile_item_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      name:{
        type: DataTypes.STRING(256),
        allowNull:false,
      },
      description:{
        type: DataTypes.TEXT
      },
      start_at:{
        type: DataTypes.DATE
      },
      end_at:{
        type: DataTypes.DATE
      },
      base_value_origin:{
        type: DataTypes.STRING(256),
        allowNull:false,
        default: 'manual'
      },
      report_vision_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      measurement_unit_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      consider_normal_sales:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      },
      consider_returns:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      },
      consider_bonuses:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      conditions:{
        type: DataTypes.TEXT,
      }, 
      base_value_query:{
        type: DataTypes.TEXT,
      }, 
      min_base_value:{
        type: DataTypes.DECIMAL(32,10),
      }, 
      max_base_value:{
        type: DataTypes.DECIMAL(32,10),
      }, 
      base_value_expression:{
        type: DataTypes.TEXT,
      }, 
      base_value:{
        type: DataTypes.DECIMAL(32,10),
      }, 
      percent1:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:0
      },
      percent2:{
        type: DataTypes.DECIMAL(32,10)
      },
      min_value:{
        type: DataTypes.DECIMAL(32,10),
      }, 
      max_value:{
        type: DataTypes.DECIMAL(32,10),
      }, 
      expression:{
        type: DataTypes.TEXT,
      }, 
      result_value:{
        type: DataTypes.DECIMAL(32,10),
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
    'customized_commission_entity_id',
    'name'
  ];

  static constraints = [...(Customized_Commission_Entity_Items.getBaseTableModelConstraints() || []),...[{
    name: Customized_Commission_Entity_Items.tableName + '_u1',
    fields: [...Customized_Commission_Entity_Items.getBaseTableModelUniqueFields(),...Customized_Commission_Entity_Items.uniqueFields],
    type:"unique"
  },{
    name: Customized_Commission_Entity_Items.tableName + '_c_2',
    fields:['consider_normal_sales'],
    type:"check",
    where:{
      consider_normal_sales: {
        [Op.in]: [0,1]
      }
    }
  },{
    name: Customized_Commission_Entity_Items.tableName + '_c_3',
    fields:['consider_returns'],
    type:"check",
    where:{
      consider_returns: {
        [Op.in]: [0,1]
      }
    }
  },{
    name: Customized_Commission_Entity_Items.tableName + '_c_4',
    fields:['consider_bonuses'],
    type:"check",
    where:{
      consider_bonuses: {
        [Op.in]: [0,1]
      }
    }
  }]];

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
        fields: ['customized_commission_entity_id'],
        type: 'foreign key',
        references: { 
            table: Customized_Commission_Entities,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
      result.push({
        fields: ['report_vision_id'],
        type: 'foreign key',
        references: { 
            table: Report_Visions,
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