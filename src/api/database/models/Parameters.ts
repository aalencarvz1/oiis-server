'use strict';

import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Data_Types from "./Data_Types.js";
import Utils from "../../controllers/utils/Utils.js";



/**
 * class model
 */
export default class Parameters extends BaseTableModel {

  //table fields
  declare data_type_id: number;
  declare name: string;
  declare default_value: string;
  declare description: string;


  static id = 55;

  static tableName = this.name.toLowerCase();

  private static adjustedForeignKeys : boolean = false;

  static HAS_WINTHOR_INTEGRATION = 1;
  static LOGISTIC_INTEGRATE_AUTOMATIC_CLOSE_BOX_DRIVER = 2;
  static WMS_OUTPUT_INTEGRATION_CHECK_RCA = 3;
  static APPS_DELIVERY_MUST_CAPTURE_SIGNATURE	= 4;
  static APPS_DELIVERY_MUST_CAPTURE_SIGNATURE_BY_INVOICE	= 5;
  static APPS_DELIVERY_ONLY_ONE_DELIVERY_RUNNING = 6;  
  static WINTHOR_INTEGRATION_NCM_CONSIDER_EXCEPTION_NULL_IF_NOT_EXISTS = 10;
  static LOOP_RECURSION_LIMIT = 1000;
  static LOOP_RECURSION_INTERVAL = 1001;
  static COMMISSION_MIN_VAL = 9050;
  static WINTHOR_CUSTOMIZED_GIRO_STOCK_DAYS = 30101;

  
  static fields = {
    ...Parameters.getBaseTableModelFields(),...{
      data_type_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull : false,
      },
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      default_value: {
        type: DataTypes.STRING(256)
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Parameters.getBaseTableModelConstraints() || []),...[
    {
      name: Parameters.tableName + '_u1',
      fields: [...Parameters.getBaseTableModelUniqueFields(),...Parameters.uniqueFields],
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
    let result : any = this.foreignsKeys;
    if (!this.adjustedForeignKeys || !Utils.hasValue(this.foreignsKeys)) {
      let newAdjustedForeignKeys : boolean = true;
      let baseFks = this.getBaseTableModelForeignsKeys();
      for(let i = 0; i < baseFks.length; i++) {
        result.push(baseFks[i]);
        if (newAdjustedForeignKeys && typeof baseFks[i].references.table == 'string') newAdjustedForeignKeys = false;
      }        
      result.push({
        fields: ['data_type_id'],
        type: 'foreign key',
        references: { 
            table: Data_Types,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
