'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import Utils from "../../controllers/utils/Utils.js";



/**
 * class model
 */
export default class Currencies extends BaseTableModel {

  //table fields
  declare name: string;
  declare symbol: string;
  declare is_physical: number;
  declare description: string;


  static id = 1030;

  static tableName = this.name.toLowerCase();

  static adjustedForeignKeys : boolean = false;

  static DOLAR = 1;
  static BRL = 2;

  
  static fields = {
    ...Currencies.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      symbol:{
        type: DataTypes.STRING(10)
      },
      is_physical: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Currencies.getBaseTableModelConstraints() || []),...[
    {
      name: Currencies.tableName + '_u1',
      fields: [...Currencies.getBaseTableModelUniqueFields(),...Currencies.uniqueFields],
      type:"unique"
    },{
      name: Currencies.tableName + '_c_1',
      fields:['is_physical'],
      type:"check",
      where:{
        is_physical: {
              [Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys : any[] = [];
    
};