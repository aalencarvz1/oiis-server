'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';


/**
 * class model
 */
export default class Requirements_Types extends BaseTableModel {

  //table fields
  declare name: string
  declare description: string;
  declare notes: string;
  declare is_functional: number;


  static id = 15019;
  static tableName = this.name.toLowerCase();
  

  static FUNCTIONAL = 1;
  static NO_FUNCTIONAL = 2;

  static fields = {
    ...Requirements_Types.getBaseTableModelFields(),...{            
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      description: {
        type: DataTypes.TEXT
      },
      notes: {
        type: DataTypes.TEXT
      },
      is_functional: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Requirements_Types.getBaseTableModelConstraints() || []),...[{
    name: Requirements_Types.tableName + '_u1',
    fields: [...Requirements_Types.getBaseTableModelUniqueFields(),...Requirements_Types.uniqueFields],
    type:"unique"
  },{
    name: Requirements_Types.tableName + '_c_1',
    fields:['is_functional'],
    type:"check",
    where:{
      is_functional: {
            [Op.in]: [0,1]
        }
    }
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};