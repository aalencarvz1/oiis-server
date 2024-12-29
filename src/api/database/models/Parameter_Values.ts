'use strict';

import { DataTypes, Sequelize } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Parameters from "./Parameters.js";
import Tables from "./Tables.js";

/*imports*/

/**
 * class model
 */
export default class Parameter_Values extends BaseTableModel {
  static id = 56;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Parameter_Values.getBaseTableModelFields(),...{
      parameter_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull : false,
      },
      table_id: {
        type: DataTypes.BIGINT.UNSIGNED
      },
      register_id: {
        type: DataTypes.BIGINT.UNSIGNED
      },
      value: {
        type: DataTypes.STRING(256)
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'parameter_id',
    Sequelize.literal(`(COALESCE(table_id,0))`),
    Sequelize.literal(`(COALESCE(register_id,0))`),
    Sequelize.literal(`(COALESCE(value,'NULL'))`)
  ];

  static constraints = [...(Parameter_Values.getBaseTableModelConstraints() || []),...[
    {
      name: Parameter_Values.tableName + '_u1',
      fields: [...Parameter_Values.getBaseTableModelUniqueFields(),...Parameter_Values.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['parameter_id'],
    type: 'foreign key',
    references: { 
        table: Parameters,
        field: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  },{
    fields: ['table_id'],
    type: 'foreign key',
    references: { 
        table: Tables,
        field: 'id'
    },
    onUpdate: 'cascade'
  }]];

  static async get(pIdParameter: number) {
    let result : any = null;
    result = await Parameter_Values.findOne({
      raw:true,
      attributes:[
        `${Parameter_Values.tableName}.*`
      ],
      where:{
        parameter_id:pIdParameter
      }
    });
    if (result) {
      result = result.value;
    }
    return result;
  }
};
