'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';


/**
 * class model
 */
export default class Financial_Value_Localization_Types extends BaseTableModel {

  //table fields
  declare name: string;
  declare is_physical: number;
  declare is_eletronic: number;
  declare description: string;


  static id = 1033;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static UNKNOWN = 1; //DESCONHECIDO
  static ACCOUNT = 2;
  static POUCH = 3; // MALOTE


  static fields = {
    ...Financial_Value_Localization_Types.getBaseTableModelFields(),...{
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      is_physical: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_eletronic: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      description: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Financial_Value_Localization_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Financial_Value_Localization_Types.tableName + '_u1',
      fields: [...Financial_Value_Localization_Types.getBaseTableModelUniqueFields(),...Financial_Value_Localization_Types.uniqueFields],
      type:"unique"
    },{
      name: Financial_Value_Localization_Types.tableName + '_c_1',
      fields:['is_physical'],
      type:"check",
      where:{
        is_physical: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Financial_Value_Localization_Types.tableName + '_c_3',
      fields:['is_eletronic'],
      type:"check",
      where:{
        is_eletronic: {
              [Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys : any[] = [];
  
};