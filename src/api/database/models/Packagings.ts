'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';



/**
 * class model
 */
export default class Packagings extends BaseTableModel {

  //table fields
  declare name:  string;
  declare sigla: string;
  declare description: string;


  static id = 8001;
  static tableName = this.name.toLowerCase();
  

  static BULK = 1; // GRANEL
  static BOX = 2; //CAIXA
  static PACK = 3; //PACOTE
  static BUCKET = 4; //BALDE
  static BAG = 5; //SACO
  static BALE = 6; //FARDO
  static CUP = 7; //COPO
  static CAN = 8; //LATA
  static TUBE = 9; //TUBO
  static ROLL = 10; //ROLO
  static REAM = 11; //RESMA

  //translates to pt-br
  static UN = 1; // GRANEL
  static CX = 2; //CAIXA
  static PCT = 3; //PACOTE
  static BD = 4; //BALDE
  static SC = 5; //SACO
  static FD = 6; //FARDO
  static CP = 7; //COPO
  static LT = 8; //LATA
  static TB = 9; //TUBO
  static RL = 10; //ROLO
  static RS = 11; //RESMA

  static fields = {
    ...Packagings.getBaseTableModelFields(),...{
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
      }
    }
  };
  
  static uniqueFields = [
    'name',
    'sigla'
  ];

  static constraints = [...(Packagings.getBaseTableModelConstraints() || []),...[
    {
      name: Packagings.tableName + '_u1',
      fields: [...Packagings.getBaseTableModelUniqueFields(),...Packagings.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};