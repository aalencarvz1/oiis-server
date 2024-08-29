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
  static ID = 10002;
  static model = null;

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
    name: ReportsVisions.name.toUpperCase() + '_U1',
    fields: ReportsVisions.uniqueFields,
    type:"unique"
  },{
    name: ReportsVisions.name.toUpperCase() + '_C_1',
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
              n.cod as ID,
              n.nome as NAME
            from
              ep.eporigensinfo n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 3: //enterprise
          result = [{ID:1,NAME:'JUMBO ALIMENTOS LTDA'}];
          break;
        case 4: //business unit          
          query = `
            select
              n.cod as ID,
              n.cod || '-' || s.nome  as NAME,
              n.cod as BUTTON_TEXT
            from
              ep.epfiliais n
              left outer join ep.eppessoas p on p.cod = n.codpessoa
              left outer join ep.epcidades s on s.cod = p.codcidade
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 5: //supplier
          query = `
            select
              n.cod as ID,
              n.cod || '-' || p.nomerazao  as NAME,
              n.cod as BUTTON_TEXT
            from
              EP.epfornecedores n
              left outer join ep.eppessoas p on p.cod = n.codpessoa
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 6: //city
          query = `
            select
              n.cod as ID,
              n.uf || '-' || n.nome as NAME
            from
              ep.epcidades n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 7: //supervisor
          query = `
            select 
              n.codsupervisor as ID,
              n.codsupervisor || '-' || n.nome as NAME,
              n.codsupervisor  as BUTTON_TEXT
            from
              jumbo.pcsuperv n                            
            order by 
              n.codsupervisor
          `;
          result = await DBConnectionManager.getWinthorDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 8: //seller
          query = `
            select 
              n.codusur as ID,
              n.codusur || '-' || n.nome as NAME,
              n.codusur as BUTTON_TEXT
            from
              jumbo.pcusuari n
            order by 
              n.codusur
          `;
          result = await DBConnectionManager.getWinthorDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 9: //ramo
          query = `
            select 
              n.cod as ID,
              n.cod || '-' || n.descricao  as NAME,
              n.cod  as BUTTON_TEXT
            from
              ep.epatividadesclientes n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 10: //department
          query = `
            select 
              n.cod as ID,
              n.cod || '-' || n.descricao as NAME,
              n.cod  as BUTTON_TEXT
            from
              ep.epdepartamentosprod n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 11: //product
          query = `
            select 
              n.cod as ID,
              n.cod || '-' || n.descricao as NAME,
              n.cod as BUTTON_TEXT
            from
              ep.epprodutos n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 13: //CLIENT
          query = `
            select
              cl.cod as ID,
              cl.cod || '-' || cl_ps.coddocidentificador || '-' || cl_ps.nomerazao as NAME,
              cl.cod as BUTTON_TEXT
            from
              ep.epclientes cl
              join ep.eppessoas cl_ps on cl_ps.cod = cl.codpessoa
            order by 
              cl.cod
          `;
          result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 14: //CUSTOMER NETWORK
          query = `
            select 
              n.cod as ID,
              n.cod || '-' || n.descricao as NAME,
              n.cod  as BUTTON_TEXT
            from
              ep.epredesclientes n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 15: //ROUTES
          query = `
            select 
              n.cod as ID,
              n.cod || '-' || n.descricao  as NAME,
              n.cod  as BUTTON_TEXT
            from
              ep.eprotasclientes n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 16: //SQUARE
          query = `
            select 
              n.cod as ID,
              n.cod || '-' || n.descricao as NAME,
              n.cod as BUTTON_TEXT
            from
              ep.eppracasclientes n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 19: //BUSINESS ORIGIN
          query = `
            select
              n.cod as ID,
              n.cod || '-' || n.descricao as NAME,
              n.cod as BUTTON_TEXT
            from
              ep.epnegociosorigem n
            order by 
              n.cod
          `;
          result = await DBConnectionManager.getEpDBConnection().query(query,{raw:true,queryType: QueryTypes.SELECT});
          result = result[0] || [];
          break;
        case 20: //CATEGORY ORIGIN
          query = `
            select
              c.cod as ID,
              c.cod || '-' || c.descricao as NAME,
              c.cod as BUTTON_TEXT
            from
              ep.epcategoriasorigem c
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