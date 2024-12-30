'use strict';

import { Sequelize, DataTypes } from "sequelize";
import  BaseTableModel  from "./BaseTableModel.js";


/**
 * class model
 */
export default class Ncms extends BaseTableModel {

  //table fields
  declare chapter: number;
  declare ncm: number;      
  declare exception: number;
  declare description: string;


  static id = 8008;
  static tableName = this.name.toLowerCase();
  
  static fields = {
    ...Ncms.getBaseTableModelFields(),...{           
      chapter:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      ncm:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      exception:{
        type: DataTypes.BIGINT.UNSIGNED
      },      
      description:{
        type: DataTypes.TEXT,
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'ncm',
    Sequelize.literal('(coalesce(exception,-1))')
  ]

  static constraints = [...(Ncms.getBaseTableModelConstraints() || []),...[{
      name: Ncms.tableName + '_u1',
      fields: [...Ncms.getBaseTableModelUniqueFields(),...Ncms.uniqueFields],
      type:"unique"
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  

  /**
   * 
   * @param params 
   * @returns 
   * @todo move to controller
   */
  /*static async integrateByWinthor(params) {
    let result = new DataSwap();
    try {
      let queryParams = params.queryParams || params || {};
      let winthorData = await PcNcm.getModel().findOne({
        where:{
          CODNCM: queryParams.ncm,
          CODEX: queryParams.exception||null
        }
      });
      if (!winthorData && (
        Utils.hasValue(queryParams.exception) && Utils.toBool(await Parameter_Values.get(Parameters.WINTHOR_INTEGRATION_NCM_CONSIDER_EXCEPTION_NULL_IF_NOT_EXISTS)) == true
      )) { 
        winthorData = await PcNcm.getModel().findOne({
          where:{
            CODNCM: queryParams.ncm,
            CODEX: null
          },
          transaction:params.transaction
        });
      }
      if (winthorData) {
        queryParams.data_origin_id = Data_Origins.WINTHOR;
        queryParams.chapter = queryParams.chapter || winthorData.CAPITULO;
        queryParams.description = queryParams.description || winthorData.DESCRICAO;
        result.data = await Ncms.getModel().create(queryParams,{transaction:params.transaction});
        if (result.data) {
          result.data = result.data.dataValues;
          result.success = true;
        }
      } else {
        throw new Error(`winthor ncm ${queryParams.ncm}(ex:${queryParams.exception || 'null'}) not found`);
      }
    } catch (e) {
      result.setException(e);
    }
    return result;
  }*/

};