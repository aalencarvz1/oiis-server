'use strict';

import { DataTypes, Op } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";


/**
 * class model
 */
export default class Greatnesses extends BaseTableModel {

  //table fields
  declare name: string;
  declare sigla: string;
  declare description: string;
  declare is_scalar: number;
  declare is_vetorial: number;


  static id = 79;
  static tableName = this.name.toLowerCase();
  

  static QUANTITY = 1;
  static MASS = 2;
  static VOLUM = 3;
  static LENGTH = 4;
  
  static fields = {
    ...Greatnesses.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      sigla: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      is_scalar: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      is_vetorial: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
    }
  };
  
  static uniqueFields = [
    'name',
    'sigla'
  ];

  static constraints = [...(Greatnesses.getBaseTableModelConstraints() || []),...[
    {
      name: Greatnesses.tableName + '_u1',
      fields: [...Greatnesses.getBaseTableModelUniqueFields(),...Greatnesses.uniqueFields],
      type:"unique"
    },{
      name: Greatnesses.tableName + '_c_1',
      fields:['is_scalar'],
      type:"check",
      where:{
        is_scalar: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Greatnesses.tableName + '_c_2',
      fields:['is_vetorial'],
      type:"check",
      where:{
        is_vetorial: {
              [Op.in]: [0,1]
          }
      }
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
    
};
