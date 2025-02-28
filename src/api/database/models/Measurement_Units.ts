'use strict';

import { DataTypes, Op } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Greatnesses from "./Greatnesses.js";


/**
 * class model
 */
export default class Measurement_Units extends BaseTableModel {

  //table fields
  declare greatness_id: number;
  declare name: string;
  declare sigla: string;
  declare description: string;
  declare is_scalar: number;
  declare is_vetorial: number;



  static id = 80;
  static tableName = this.name.toLowerCase();
  

  static UN = 1;

  //static KG = 2;
  static WT = 2; //WEIGHT
  
  static VL = 3; //VALUE

  static DT = 4; //DISTINCT ITEMS
  
  static PC = 5; //PIECE

  //static L = 3;
  static L = 6;

  static PKG = 10; //PACKAGE
  static BOX = 11; 
  static BCK = 12; //BUCKET (BALDE)
  static CAN = 13; //LATA 
  static BAG = 14; //SACA

  //translates to pt-br
  static PCT = 10; //PACKAGE
  static CX = 11; 
  static BD = 12; //BUCKET (BALDE)
  static LT = 13; //LATA 
  static SC = 14; //SACA
  
  
  static fields = {
    ...Measurement_Units.getBaseTableModelFields(),...{
      greatness_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
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

  static constraints = [...(Measurement_Units.getBaseTableModelConstraints() || []),...[
    {
      name: Measurement_Units.tableName + '_u1',
      fields: [...Measurement_Units.getBaseTableModelUniqueFields(),...Measurement_Units.uniqueFields],
      type:"unique"
    },{
      name: Measurement_Units.tableName + '_c_1',
      fields:['is_scalar'],
      type:"check",
      where:{
        is_scalar: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Measurement_Units.tableName + '_c_2',
      fields:['is_vetorial'],
      type:"check",
      where:{
        is_vetorial: {
              [Op.in]: [0,1]
          }
      }
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['greatness_id'],
      type: 'foreign key',
      references: { 
          table: Greatnesses,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
   
};
