'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';


/**
 * class model
 */
export default class Project_Item_Origin_Types extends BaseTableModel {

  //table fields
  declare name:  string;
  declare description:  string;
  declare notes:  string;
  declare is_system: number;


  static id = 15005;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static USER = 1;
  static SYSTEM = 2;

  static fields = {
    ...Project_Item_Origin_Types.getBaseTableModelFields(),...{
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
      is_system: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Project_Item_Origin_Types.getBaseTableModelConstraints() || []),...[{
    name: Project_Item_Origin_Types.tableName + '_u1',
    fields: [...Project_Item_Origin_Types.getBaseTableModelUniqueFields(),...Project_Item_Origin_Types.uniqueFields],
    type:"unique"
  },{
    name: Project_Item_Origin_Types.tableName + '_c_1',
    fields:['is_system'],
    type:"check",
    where:{
      is_system: {
            [Op.in]: [0,1]
        }
    }
  }]];

  static foreignsKeys : any[] = [];
  
};