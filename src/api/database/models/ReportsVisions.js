'use strict';

/*imports*/
const { DataTypes, Sequelize, QueryTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const DBConnectionManager = require("../DBConnectionManager");
const { Utils } = require("../../controllers/utils/Utils");


/**
 * class model
 */
class ReportsVisions extends BaseTableModel {
  static id = 10002;
  static model = null;

  static VALUES = 1;
  static ORIGIN_DATA = 2;
  static COMPANY = 3;
  static BUSINESS_uNIT = 4;
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
    ...ReportsVisions.getBaseTableModelFields(),...{                 
      NAME:{
        type: DataTypes.STRING(256),
        allowNull:false,
      },
      DESCRIPTION:{
        type: DataTypes.TEXT
      },
      VISIBLE: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(ReportsVisions.getBaseTableModelConstraints() || []),...[{
    name: ReportsVisions.name.toLowerCase() + '_u1',
    fields: ReportsVisions.uniqueFields,
    type:"unique"
  },{
    name: ReportsVisions.name.toLowerCase() + '_c_1',
    fields:['VISIBLE'],
    type:"check",
    where:{
      VISIBLE: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];

  static async getReportVisionData(body) {
    let result = null;
    Utils.log('body:',body);
    let idReportVision = body?.idReportVision;
    if (idReportVision) {
      let query = null;
      switch(idReportVision-0) {
        case 2: //origin
          query = `
            select
              n.cod as id,
              n.nome as NAME
            from
              EP.EPORIGENSINFO n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 3: //enterprise
          result = [{id:1,NAME:'JUMBO ALIMENTOS LTDA'}];
          break;
        case 4: //business unit          
          query = `
            select
              n.cod as id,
              n.cod || '-' || s.nome  as NAME,
              n.cod as BUTTON_TEXT
            from
              EP.EPFILIAIS n
              left outer join EP.EPPESSOAS p on p.cod = n.codpessoa
              left outer join EP.EPCIDADES s on s.cod = p.codcidade
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 5: //supplier
          query = `
            select
              n.cod as id,
              n.cod || '-' || p.nomerazao  as NAME,
              n.cod as BUTTON_TEXT
            from
              EP.EPFORNECEDORES n
              left outer join EP.EPPESSOAS p on p.cod = n.codpessoa
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 6: //city
          query = `
            select
              n.cod as id,
              n.uf || '-' || n.nome as NAME
            from
              EP.EPCIDADES n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 7: //supervisor
          query = `
            select 
              n.codsupervisor as id,
              n.codsupervisor || '-' || n.nome as NAME,
              n.codsupervisor  as BUTTON_TEXT
            from
              JUMBO.PCSUPERV n                            
            order by 
              n.codsupervisor
          `;
          result = await DBConnectionManager.getWinthorDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 8: //seller
          query = `
            select 
              n.codusur as id,
              n.codusur || '-' || n.nome as NAME,
              n.codusur as BUTTON_TEXT
            from
              JUMBO.PCUSUARI n
            order by 
              n.codusur
          `;
          result = await DBConnectionManager.getWinthorDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 9: //ramo
          query = `
            select 
              n.cod as id,
              n.cod || '-' || n.descricao  as NAME,
              n.cod  as BUTTON_TEXT
            from
              EP.EPATIVIDADESCLIENTES n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 10: //department
          query = `
            select 
              n.cod as id,
              n.cod || '-' || n.descricao as NAME,
              n.cod  as BUTTON_TEXT
            from
              EP.EPDEPARTAMENTOSPROD n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 11: //product
          query = `
            select 
              n.cod as id,
              n.cod || '-' || n.descricao as NAME,
              n.cod as BUTTON_TEXT
            from
              EP.EPPRODUTOS n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 13: //CLIENT
          query = `
            select
              cl.cod as id,
              cl.cod || '-' || cl_ps.coddocidentificador || '-' || cl_ps.nomerazao as NAME,
              cl.cod as BUTTON_TEXT
            from
              EP.EPCLIENTES cl
              join EP.EPPESSOAS cl_ps on cl_ps.cod = cl.codpessoa
            order by 
              cl.cod
          `;
          result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 14: //CUSTOMER NETWORK
          query = `
            select 
              n.cod as id,
              n.cod || '-' || n.descricao as NAME,
              n.cod  as BUTTON_TEXT
            from
              EP.EPREDESCLIENTES n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 15: //ROUTES
          query = `
            select 
              n.cod as id,
              n.cod || '-' || n.descricao  as NAME,
              n.cod  as BUTTON_TEXT
            from
              EP.EPROTASCLIENTES n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 16: //SQUARE
          query = `
            select 
              n.cod as id,
              n.cod || '-' || n.descricao as NAME,
              n.cod as BUTTON_TEXT
            from
              EP.EPPRACASCLIENTES n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 19: //BUSINESS ORIGIN
          query = `
            select
              n.cod as id,
              n.cod || '-' || n.descricao as NAME,
              n.cod as BUTTON_TEXT
            from
              EP.EPNEGOCIOSORIGEM n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 20: //CATEGORY ORIGIN
          query = `
            select
              c.cod as id,
              c.cod || '-' || c.descricao as NAME,
              c.cod as BUTTON_TEXT
            from
              EP.EPCATEGORIASORIGEM c
            order by 
              c.cod
          `;
          result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
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


module.exports = {ReportsVisions}