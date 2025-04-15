'use strict';

import { DataTypes, Op } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Utils from "../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class Sync_Status extends BaseTableModel {

  //table fields
  declare name: string;
  declare synchronized: number;
  

  static id = 66;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Sync_Status.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      synchronized: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Sync_Status.getBaseTableModelConstraints() || []),...[
    {
      name: Sync_Status.tableName + '_u1',
      fields: [...Sync_Status.getBaseTableModelUniqueFields(),...Sync_Status.uniqueFields],
      type:"unique"
    },{
      name: Sync_Status.tableName + '_c_1',
      fields:['synchronized'],
      type:"check",
      where:{
        synchronized: {
              [Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys : any[] = [];
    
};
