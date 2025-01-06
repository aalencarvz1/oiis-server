'use strict'

import  { DataTypes }   from "sequelize";
import  BaseTableModel  from "./BaseTableModel.js";
import  Identifier_Types  from "./Identifier_Types.js";
import  Ncms  from "./Ncms.js";



/**
 * class model
 */
export default class Items extends BaseTableModel {

  //table fields
  declare identifier_type_id: number;
  declare identifier: string;      
  declare ncm_id: number;      
  declare name: string;      
  declare description: string;
  declare default_expiration_time: number;



  static id = 8010;
  static tableName = this.name.toLowerCase();
  
  static fields = {
    ...Items.getBaseTableModelFields(),...{           
      identifier_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      identifier:{
        type: DataTypes.STRING(256),
        allowNull:false
      },      
      ncm_id:{
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
      default_expiration_time:{
        type: DataTypes.BIGINT.UNSIGNED
      },      
    }
  };
  
  
  static uniqueFields = [
    'identifier_type_id',
    'identifier'
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
      fields: ['identifier_type_id'],
      type: 'foreign key',
      references: { 
          table: Identifier_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['ncm_id'],
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
  static async createData(params: any) {
    params = params || {};  
    if (params.AUTOMATICIDENTIFIER) {
        let last : any = await Items.max('identifier');
        if (last && !isNaN(last)) {
            params.identifier = (last-0)+1;
        } else {
            params.identifier = last + 1;
        }
    }                  
    return await BaseTableModel.createData.bind(Items)(params);
  }
  static putData = this.createData;

  /**
   * 
   * @param params 
   * @returns 
   * @todo 2024-12-30 move to ItemConntroller
   */
  /*static async integrateByWinthor(params: any) {
    let result = new DataSwap();
    try {
      let queryParams = params.queryParams || params || {};
      let winthorData = await PcProdut.findOne({
        raw:true,
        where:{
          CODPROD: queryParams.id_at_origin || queryParams.item_id || queryParams.id || queryParams.CODPROD
        }
      });
      if (winthorData) {
        queryParams.data_origin_id = Data_Origins.WINTHOR;
        queryParams.id_at_origin = queryParams.id_at_origin || winthorData.CODPROD;
        queryParams.identifier_type_id = queryParams.identifier_type_id || Identifier_Types.CODE;
        queryParams.identifier = queryParams.identifier || winthorData.CODPROD;        
        if (!Utils.hasValue(queryParams.ncm_id)) {
          let ncm = await Ncms.getOrCreate({
            raw:true,
            where:{
              data_origin_id: Data_Origins.WINTHOR,
              ncm: winthorData.NBM,
              exception: Utils.hasValue(winthorData.CODNCMEX.split('.')[1]) ? winthorData.CODNCMEX.split('.')[1] : null
            },
            transaction:params.transaction,
            createMethod: Ncms.integrateByWinthor
          });
          if (ncm.success) {
            queryParams.ncm_id = ncm.data.id;
          } else {
            return ncm;                
          }
        }
        queryParams.name = queryParams.name || winthorData.DESCRICAO;
        queryParams.description = queryParams.description;
        queryParams.default_expiration_time = queryParams.default_expiration_time || winthorData.PRAZOVAL;
        result.data = await Items.create(queryParams,{transaction:params.transaction});
        if (result.data) {
          result.data = result.data.dataValues;
          result.success = true;
        }
      } else {
        throw new Error(`winthor item ${queryParams.id_at_origin || queryParams.item_id || queryParams.id || queryParams.CODPROD} not found`)
      }
    } catch (e) {
      result.setException(e);
    }
    return result;
  } */
  
  
    /**
     * 
     * @param params 
     * @returns 
     * @todo 2024-12-30 move to ItemConntroller
     */
  /*static async integrateByAurora(params: any) {
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
          and cod = ${queryParams.id_at_origin || queryParams.item_id || queryParams.id || queryParams.CODPROD}
      `;
      let auroraData : any = await DBConnectionManager.getConsultDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});

      if (auroraData && auroraData.length) 
        auroraData = auroraData[0];
      if (!Utils.hasValue(auroraData)) {
        query = `
          select
            * 
          from
            EP.EPPRODUTOS
          where
            cod = ${queryParams.id_at_origin || queryParams.item_id || queryParams.id || queryParams.CODPROD}
        `;
        auroraData = await DBConnectionManager.getConsultDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
        if (auroraData && auroraData.length) 
          auroraData = auroraData[0];
      }
      if (Utils.hasValue(auroraData)) {
        queryParams.data_origin_id = Data_Origins.AURORA;
        queryParams.id_at_origin = queryParams.id_at_origin || auroraData.COD;
        queryParams.identifier_type_id = queryParams.identifier_type_id || Identifier_Types.CODE;
        queryParams.identifier = queryParams.identifier || auroraData.COD;
        if (!Utils.hasValue(queryParams.ncm_id)) {
          let ncm = await Ncms.getOrCreate({
            raw:true,
            where:{
              data_origin_id: Data_Origins.WINTHOR,
              ncm: 1
            },
            transaction:params.transaction,
            createMethod: Ncms.integrateByWinthor
          });
          if (ncm.success) {
            queryParams.ncm_id = ncm.data.id;
          } else {
            return ncm;                
          }
        }
        queryParams.name = queryParams.name || auroraData.DESCRICAO;
        queryParams.description = queryParams.description;
        queryParams.default_expiration_time = queryParams.default_expiration_time || 1;
        result.data = await Items.create(queryParams,{transaction:params.transaction});
        if (result.data) {
          result.data = result.data.dataValues;
          result.success = true;
        }
      } else {
        throw new Error(`aurora item ${queryParams.id_at_origin || queryParams.item_id || queryParams.id || queryParams.CODPROD} not found`)
      }
    } catch (e) {
      result.setException(e);
    }
    return result;
  }*/
};