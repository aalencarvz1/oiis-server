'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import Utils from "../../controllers/utils/Utils.js";



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
  private static adjustedForeignKeys : boolean = false;
  

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

  static foreignsKeys : any[] = [];
    

  /**
   * get the foreign keys avoiding ciclyc imports on BaseTableModel
   * @override
   * @created 2025-04-14
   * @version 1.0.0
   */
  static getForeignKeys(): any[] {
    let result : any = this.foreignsKeys;
    if (!this.adjustedForeignKeys || !Utils.hasValue(this.foreignsKeys)) {
      result = [];
      let newAdjustedForeignKeys : boolean = true;
      let baseFks = this.getBaseTableModelForeignsKeys();
      for(let i = 0; i < baseFks.length; i++) {
        result.push(baseFks[i]);
        if (newAdjustedForeignKeys && typeof baseFks[i].references.table == 'string') newAdjustedForeignKeys = false;
      }        
      this.adjustedForeignKeys = newAdjustedForeignKeys;
    }
    return result;
  }


  /**
   * static initializer block
   */
  static {
    this.foreignsKeys = this.getForeignKeys();
  }
   
  
};