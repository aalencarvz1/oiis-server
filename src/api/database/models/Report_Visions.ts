'use strict';


import  { DataTypes, Op, QueryTypes}  from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import DBConnectionManager from "../DBConnectionManager.js";



/**
 * class model
 */
export default class Report_Visions extends BaseTableModel {

  //table fields
  declare name: string;
  declare description: string;
  declare is_visible: number;


  static id = 10002;
  static tableName = this.name.toLowerCase();
  

  static VALUES = 1;
  static ORIGIN_DATA = 2;
  static COMPANY = 3;
  static BUSINESS_UNIT = 4;
  static SUPPLIER = 5;
  static CITY = 6;
  static SUPERVISOR = 7;
  static SELLER = 8;
  static BUSINESS_AREA = 9;
  static DEPARTMENT = 10;
  static PRODUCT = 11;
  static EVOLUTION = 12;
  static CLIENT = 13;
  static NETWORK_CLIENT = 14;
  static ROUTE = 15;
  static SQUARE = 16;
  static INVOICE = 17;
  static ITEM_INVOICE = 18;
  static ORIGIN_BUSINESS = 19;
  static ORIGIN_CATEGORY = 20;
  static PLATE = 21;


  static fields = {
    ...Report_Visions.getBaseTableModelFields(),...{                 
      name:{
        type: DataTypes.STRING(256),
        allowNull:false,
      },
      description:{
        type: DataTypes.TEXT
      },
      is_visible: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      },
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Report_Visions.getBaseTableModelConstraints() || []),...[{
    name: Report_Visions.tableName + '_u1',
    fields: [...Report_Visions.getBaseTableModelUniqueFields(),...Report_Visions.uniqueFields],
    type:"unique"
  },{
    name: Report_Visions.tableName + '_c_1',
    fields:['is_visible'],
    type:"check",
    where:{
      is_visible: {
            [Op.in]: [0,1]
        }
    }
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];

  static async getReportVisionData(body?: any) {
    let result = null;
    let idReportVision = body?.idReportVision;
    if (idReportVision) {
      let query = null;
      switch(idReportVision-0) {
        case 2: //origin
          query = `
            select
              n.cod as "id",
              n.nome as "name"
            from
              EP.EPORIGENSINFO n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
          break;
        case 3: //enterprise
          result = [{id:1,name:'JUMBO ALIMENTOS LTDA'}];
          break;
        case 4: //business unit          
          query = `
            select
              n.cod as "id",
              n.cod || '-' || s.nome as "name",
              n.cod as "button_text"
            from
              EP.EPFILIAIS n
              left outer join EP.EPPESSOAS p on p.cod = n.codpessoa
              left outer join EP.EPCIDADES s on s.cod = p.codcidade
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
          break;
        case 5: //supplier
          query = `
            select
              n.cod as "id",
              n.cod || '-' || p.nomerazao  as "name",
              n.cod as "button_text"
            from
              EP.EPFORNECEDORES n
              left outer join EP.EPPESSOAS p on p.cod = n.codpessoa
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
          break;
        case 6: //city
          query = `
            select
              n.cod as "id",
              n.uf || '-' || n.nome as "name"
            from
              EP.EPCIDADES n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
          break;
        case 7: //supervisor
          query = `
            select 
              n.codsupervisor as "id",
              n.codsupervisor || '-' || n.nome as "name",
              n.codsupervisor  as "button_text"
            from
              JUMBO.PCSUPERV n                            
            order by 
              n.codsupervisor
          `;
          result = await DBConnectionManager.getWinthorDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
          break;
        case 8: //seller
          query = `
            select 
              n.codusur as "id",
              n.codusur || '-' || n.nome as "name",
              n.codusur as "button_text"
            from
              JUMBO.PCUSUARI n
            order by 
              n.codusur
          `;
          result = await DBConnectionManager.getWinthorDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
          break;
        case 9: //ramo
          query = `
            select 
              n.cod as "id",
              n.cod || '-' || n.descricao  as "name",
              n.cod  as "button_text"
            from
              EP.EPATIVIDADESCLIENTES n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
          break;
        case 10: //department
          query = `
            select 
              n.cod as "id",
              n.cod || '-' || n.descricao as "name",
              n.cod  as "button_text"
            from
              EP.EPDEPARTAMENTOSPROD n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
          break;
        case 11: //product
          query = `
            select 
              n.cod as "id",
              n.cod || '-' || n.descricao as "name",
              n.cod as "button_text"
            from
              EP.EPPRODUTOS n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
          break;
        case 13: //CLIENT
          query = `
            select
              cl.cod as "id",
              cl.cod || '-' || cl_ps.coddocidentificador || '-' || cl_ps.nomerazao as "name",
              cl.cod as "button_text"
            from
              EP.EPCLIENTES cl
              join EP.EPPESSOAS cl_ps on cl_ps.cod = cl.codpessoa
            order by 
              cl.cod
          `;
          result = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
          break;
        case 14: //CUSTOMER NETWORK
          query = `
            select 
              n.cod as "id",
              n.cod || '-' || n.descricao as "name",
              n.cod  as "button_text"
            from
              EP.EPREDESCLIENTES n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
          break;
        case 15: //ROUTES
          query = `
            select 
              n.cod as "id",
              n.cod || '-' || n.descricao  as "name",
              n.cod  as "button_text"
            from
              EP.EPROTASCLIENTES n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
          break;
        case 16: //SQUARE
          query = `
            select 
              n.cod as "id",
              n.cod || '-' || n.descricao as "name",
              n.cod as "button_text"
            from
              EP.EPPRACASCLIENTES n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
          break;
        case 19: //BUSINESS ORIGIN
          query = `
            select
              n.cod as "id",
              n.cod || '-' || n.descricao as "name",
              n.cod as "button_text"
            from
              EP.EPNEGOCIOSORIGEM n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
          break;
        case 20: //CATEGORY ORIGIN
          query = `
            select
              c.cod as "id",
              c.cod || '-' || c.descricao as "name",
              c.cod as "button_text"
            from
              EP.EPCATEGORIASORIGEM c
            order by 
              c.cod
          `;
          result = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
          break;
        default:
          throw new Error(`id report vision not expected: ${idReportVision}`);
          break;
      }
    } else {
      throw new Error("missing data");
    }
    return result;
  }
};