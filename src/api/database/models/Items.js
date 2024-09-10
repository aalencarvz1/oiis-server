'use strict'
/*imports*/
const { DataTypes, QueryTypes } = require("sequelize");
const { Utils } = require("../../controllers/utils/Utils");
const { BaseTableModel } = require("./BaseTableModel");
const { Data_Origins } = require("./Data_Origins");
const { Identifier_Types } = require("./Identifier_Types");
const { PcProdut } = require("./winthor/PcProdut");
const { Ncms } = require("./Ncms");
const DBConnectionManager = require("../DBConnectionManager");
const { DataSwap } = require("../../controllers/data/DataSwap");


/**
 * class model
 */
class Items extends BaseTableModel {
  static id = 8010;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Items.getBaseTableModelFields(),...{           
      IDIDENTIFIERTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDENTIFIER:{
        type: DataTypes.STRING(256),
        allowNull:false
      },      
      IDNCM:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },      
      description:{
        type: DataTypes.TEXT
      },      
      DEFAULTEXPIRATIONTIME:{
        type: DataTypes.BIGINT.UNSIGNED
      },      
    }
  };
  
  
  static uniqueFields = [
    'IDIDENTIFIERTYPE',
    'IDENTIFIER'
  ];

  static constraints = [...(Items.getBaseTableModelConstraints() || []),...[
    {
      name: Items.tableName + '_u1',
      fields: [...Items.getBaseTableModelUniqueFields(),...Items.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDIDENTIFIERTYPE'],
      type: 'foreign key',
      references: { 
          table: Identifier_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDNCM'],
      type: 'foreign key',
      references: { 
          table: Ncms,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
  /**
   * create data of model this
   * @static (pay attention to bindings)
   * @async (pay attention to await)
   * @override
   * @created 2023-11-10
   */
  static async createData(params) {
    params = params || {};  
    if (params.AUTOMATICIDENTIFIER) {
        let last = await Items.getModel().max('IDENTIFIER');
        if (last && !isNaN(last)) {
            params.IDENTIFIER = (last-0)+1;
        } else {
            params.IDENTIFIER = last + 1;
        }
    }                  
    return await BaseTableModel.createData.bind(Items)(params);
  }
  static putData = this.createData;

  static async integrateByWinthor(params) {
    let result = new DataSwap();
    try {
      let queryParams = params.queryParams || params || {};
      let winthorData = await PcProdut.getModel().findOne({
        raw:true,
        where:{
          CODPROD: queryParams.id_at_origin || queryParams.IDITEM || queryParams.id || queryParams.CODPROD
        }
      });
      if (winthorData) {
        queryParams.data_origin_id = Data_Origins.WINTHOR;
        queryParams.id_at_origin = queryParams.id_at_origin || winthorData.CODPROD;
        queryParams.IDIDENTIFIERTYPE = queryParams.IDIDENTIFIERTYPE || Identifier_Types.CODE;
        queryParams.IDENTIFIER = queryParams.IDENTIFIER || winthorData.CODPROD;
        if (!Utils.hasValue(queryParams.IDNCM)) {
          let ncm = await Ncms.getOrCreate({
            raw:true,
            where:{
              data_origin_id: Data_Origins.WINTHOR,
              NCM: winthorData.NBM,
              EXCEPTION: Utils.hasValue(winthorData.CODNCMEX.split('.')[1]) ? winthorData.CODNCMEX.split('.')[1] : null
            },
            createMethod: Ncms.integrateByWinthor
          });
          if (ncm.success) {
            queryParams.IDNCM = ncm.data.id;
          } else {
            return ncm;                
          }
        }
        queryParams.name = queryParams.name || winthorData.DESCRICAO;
        queryParams.description = queryParams.description;
        queryParams.DEFAULTEXPIRATIONTIME = queryParams.DEFAULTEXPIRATIONTIME || winthorData.PRAZOVAL;
        result.data = await Items.getModel().create(queryParams);
        if (result.data) {
          result.data = result.data.dataValues;
          result.success = true;
        }
      } else {
        throw new Error(`winthor item ${queryParams.id_at_origin || queryParams.IDITEM || queryParams.id || queryParams.CODPROD} not found`)
      }
    } catch (e) {
      result.setException(e);
    }
    return result;
  } 
  
  
  static async integrateByAurora(params) {
    let result = new DataSwap();
    try {
      let queryParams = params.queryParams || params || {};
      let query = `
        select
          * 
        from
          EP.EPPRODUTOS
        where
          codorigeminfo = 1
          and cod = ${queryParams.id_at_origin || queryParams.IDITEM || queryParams.id || queryParams.CODPROD}
      `;
      let auroraData = await DBConnectionManager.getConsultDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
      if (auroraData && auroraData.length) 
        auroraData = auroraData[0];
      if (auroraData && auroraData.length) 
        auroraData = auroraData[0];
      if (!auroraData || (Utils.typeOf(auroraData) == 'array' && !auroraData.length)) {
        query = `
          select
            * 
          from
            EP.EPPRODUTOS
          where
            cod = ${queryParams.id_at_origin || queryParams.IDITEM || queryParams.id || queryParams.CODPROD}
        `;
        auroraData = await DBConnectionManager.getConsultDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
        if (auroraData && auroraData.length) 
          auroraData = auroraData[0];
        if (auroraData && auroraData.length) 
          auroraData = auroraData[0];
      }
      if (Utils.hasValue(auroraData)) {
        queryParams.data_origin_id = Data_Origins.AURORA;
        queryParams.id_at_origin = queryParams.id_at_origin || auroraData.COD;
        queryParams.IDIDENTIFIERTYPE = queryParams.IDIDENTIFIERTYPE || Identifier_Types.CODE;
        queryParams.IDENTIFIER = queryParams.IDENTIFIER || auroraData.COD;
        if (!Utils.hasValue(queryParams.IDNCM)) {
          let ncm = await Ncms.getOrCreate({
            raw:true,
            where:{
              data_origin_id: Data_Origins.WINTHOR,
              NCM: 1
            },
            createMethod: Ncms.integrateByWinthor
          });
          if (ncm.success) {
            queryParams.IDNCM = ncm.data.id;
          } else {
            return ncm;                
          }
        }
        queryParams.name = queryParams.name || auroraData.DESCRICAO;
        queryParams.description = queryParams.description;
        queryParams.DEFAULTEXPIRATIONTIME = queryParams.DEFAULTEXPIRATIONTIME || 1;
        result.data = await Items.getModel().create(queryParams);
        if (result.data) {
          result.data = result.data.dataValues;
          result.success = true;
        }
      } else {
        throw new Error(`aurora item ${queryParams.id_at_origin || queryParams.IDITEM || queryParams.id || queryParams.CODPROD} not found`)
      }
    } catch (e) {
      result.setException(e);
    }
    return result;
  }
};


module.exports = {Items}