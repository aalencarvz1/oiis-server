'use strict';


import { DataTypes } from 'sequelize';
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import PcRotulo from './PcRotulo.js';
import Utils from '../../../controllers/utils/Utils.js';

/**
 * class model
 */
export default class PcRotuloItem extends BaseWinthorTableModel {

  //table fields
  declare ID: string;
  declare DESCRICAO: string;
  declare VALOR?: string;
  declare DTCADASTRO?: Date;
  declare CRIADOPELOCLIENTE?: string;


  static id = 30006;
  static tableName = this.name.toUpperCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;


  static fields = {      
    ID: {
      type: DataTypes.STRING(40),
      primaryKey: true,
      allowNull: false		
    },
    DESCRICAO: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false		
    },
    VALOR: {
      type: DataTypes.STRING(15)		
    },
    DTCADASTRO: {
      type: DataTypes.DATE,
      defaultValue: 'SYSDATE'	
    },
    CRIADOPELOCLIENTE: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
  };
 
  static foreignsKeys : any[] = [];

  /**
   * @override
   * @created 2025-04-14
   * @version 1.0.0
   */
  static getForeignKeys(): any[] {
    //Utils.logi(this.name,'getForeignKeys');
    let result : any = this.foreignsKeys;
    if (!this.adjustedForeignKeys || !Utils.hasValue(this.foreignsKeys)) {
      result = super.getForeignKeys();
      result.push({
        fields: ['ID'],
        type: 'foreign key',
        references: { 
            table: PcRotulo,
            field: 'ID'
        }
    });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }    

};