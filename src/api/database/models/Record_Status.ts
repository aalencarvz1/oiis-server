'use strict';


import { DataTypes, Op } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Utils from "../../controllers/utils/Utils.js";



/**
 * class model
 */
export default class Record_Status extends BaseTableModel {

  //table fields
  declare name: string;
  declare description: string;
  declare is_active: number;

  static id = 65;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  

  static ACTIVE = 1;
  static INACTIVE = 2;

  static fields = {
    ...Record_Status.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      is_active: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Record_Status.getBaseTableModelConstraints() || []),...[
    {
      name: Record_Status.tableName + '_u1',
      fields: [...Record_Status.getBaseTableModelUniqueFields(),...Record_Status.uniqueFields],
      type:"unique"
    },{
      name: Record_Status.tableName + '_c_1',
      fields:['is_active'],
      type:"check",
      where:{
        is_active: {
              [Op.in]: [0,1]
          }
      }
    }

  ]];

  static foreignsKeys : any[] = [];
    
  
};
