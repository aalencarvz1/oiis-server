'use strict';
/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { Data_Origins } = require('./Data_Origins');
const { PcNcm } = require('./winthor/PcNcm');
const { DataSwap } = require("../../controllers/data/DataSwap");
const { BaseTableModel } = require("./BaseTableModel");
const { Utils } = require("../../controllers/utils/Utils");
const { Parameters } = require("./Parameters");
const { Parameter_Values } = require("./Parameter_Values");


/**
 * class model
 */
class Ncms extends BaseTableModel {
  static id = 8008;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Ncms.getBaseTableModelFields(),...{           
      CHAPTER:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      NCM:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      EXCEPTION:{
        type: DataTypes.BIGINT.UNSIGNED
      },      
      description:{
        type: DataTypes.TEXT,
        allowNull:false
      }
    }
  };
  
  static uniqueFields = `create unique index ${Ncms.tableName}_u1 on ${Ncms.tableName} (${Ncms.getBaseTableModelUniqueFields().join(',')},NCM,(coalesce(EXCEPTION,-1))) `;

  static constraints = [...(Ncms.getBaseTableModelConstraints() || []),...[
    Ncms.uniqueFields
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  

  static async integrateByWinthor(params) {
    let result = new DataSwap();
    try {
      let queryParams = params.queryParams || params || {};
      let winthorData = await PcNcm.getModel().findOne({
        where:{
          CODNCM: queryParams.NCM,
          CODEX: queryParams.EXCEPTION
        }
      });
      if (!winthorData && (
        Utils.hasValue(queryParams.EXCEPTION) && Utils.toBool(await Parameter_Values.get(Parameters.WINTHOR_INTEGRATION_NCM_CONSIDER_EXCEPTION_NULL_IF_NOT_EXISTS)) == true
      )) { 
        winthorData = await PcNcm.getModel().findOne({
          where:{
            CODNCM: queryParams.NCM,
            CODEX: null
          }
        });
      }
      if (winthorData) {
        queryParams.data_origin_id = Data_Origins.WINTHOR;
        queryParams.CHAPTER = queryParams.CHAPTER || winthorData.CAPITULO;
        queryParams.description = queryParams.description || winthorData.DESCRICAO;
        result.data = await Ncms.getModel().create(queryParams);
        if (result.data) {
          result.data = result.data.dataValues;
          result.success = true;
        }
      } else {
        throw new Error(`winthor ncm ${queryParams.NCM}(ex:${queryParams.EXCEPTION || 'null'}) not found`);
      }
    } catch (e) {
      result.setException(e);
    }
    return result;
  }

};


module.exports = {Ncms}