'use strict';


import { Sequelize, DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Measurement_Units  from "./Measurement_Units.js";
import  Suppliers  from "./Suppliers.js";
import Utils from "../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class Meas_X_Meas_Origins extends BaseTableModel {

  //table fields
  declare supplier_id: number;
  declare origin_measurement_unit: string;
  declare measurement_unit_id: number;


  static id = 30801;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Meas_X_Meas_Origins.getBaseTableModelFields(),...{           
      /*data_origin_id:{
        type: DataTypes.BIGINT.UNSIGNED
      }, already exists*/
      supplier_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      origin_measurement_unit:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      measurement_unit_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    Sequelize.literal(`(COALESCE(supplier_id,0))`),
    'origin_measurement_unit'
  ];

  static constraints = [...(Meas_X_Meas_Origins.getBaseTableModelConstraints() || []),...[
    {
      name: Meas_X_Meas_Origins.tableName + '_u1',
      fields: [...Meas_X_Meas_Origins.getBaseTableModelUniqueFields(),...Meas_X_Meas_Origins.uniqueFields],
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
        fields: ['supplier_id'],
        type: 'foreign key',
        references: { 
            table: Suppliers,
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