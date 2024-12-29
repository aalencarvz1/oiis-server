'use strict';

/*imports*/
import { DataTypes, Op } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";



/**
 * class model
 */
export default class Connections extends BaseTableModel {
  static id = 2;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Connections.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      default_env_identifier: {
        type: DataTypes.STRING(4000)
      },
      is_default: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Connections.getBaseTableModelConstraints() || []),...[
    {
      name: Connections.tableName + '_u1',
      fields: [...Connections.getBaseTableModelUniqueFields(),...Connections.uniqueFields],
      type:"unique"
    },{
      name: Connections.tableName + '_c_1',
      fields:['is_default'],
      type:"check",
      where:{
        is_default: {
              [Op.in]: [0,1]
          }
      }
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};
