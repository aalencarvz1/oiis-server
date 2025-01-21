import { QueryTypes, Sequelize } from "sequelize";
import SjdProduto_Origem from "../../../../database/models/sjd/SjdProduto_Origem.js";
import SjdTabpr_Origem from "../../../../database/models/sjd/SjdTabpr_Origem.js";
import PcProdut from "../../../../database/models/winthor/PcProdut.js";
import DataSwap from "../../../data/DataSwap.js";
import Utils from "../../../utils/Utils.js";
import BaseRegistersIntegrationsController from "../BaseRegistersIntegrationsController.js";
import DBConnectionManager from "../../../../database/DBConnectionManager.js";
import SjdTabpr_Origem_Log from "../../../../database/models/sjd/SjdTabpr_Origem_Log.js";

export default class AuroraPricesIntegrationsController extends BaseRegistersIntegrationsController{

        
    /**
     * integrate stock from aurora by file SALDOPRODUTO.TXT localized on ftp to consulta.sjdestoque_origem table and generate logs of movimentations INPUTS/OUTPUTS
     * @created 2025-01-21
     * @version 2.0.0
     */
    static async integrate(params?: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {                        
            let data = params?.data || null;
            let processeds = 0;
            if (data) {
                data = data.split(/\r?\n|\r|\n/g);
                if (data && data.length > 1) {
                    for(let k in data) {
                        data[k] = data[k].split(';');
                    }
                    let columns = data[0];

                    /*[
                        'CODFILIAL',     'CODPROD',
                        'DESCRICAO',     'AVISTA',
                        '7DIAS',         'PERDESC',
                        ' PFINAL ',      'DISPONIVEL PALM',
                        '% ESCALONADA',  'VOLUME M�NIMO KG ',
                        'DATA INICIAL ', 'DATA FINAL',
                        'ESCALONADO 2 ', 'VOLUME M�NIMO KG ',
                        'DATA INICIAL ', 'DATA FINAL',
                        'ESCALONADO 3 ', 'VOLUME M�NIMO KG ',
                        'DATA INICIAL ', 'DATA FINAL'
                      ]*/


                      /*
                        0 = CODFILIAL
                        1 = CODPROD
                        2 = DESCRICAO
                        3 = A VISTA
                        4 = A PARAZO
                        5 = PERCDESC
                    */
                    
                    let expected_titles : any = {
                        'CODFILIAL':-1,
                        'CODPROD' : -1,
                        'AVISTA':-1,
                        '7DIAS':-1,
                        'PERDESC':-1
                    };

                    let real_titles : any = {
                        'CODFILIAL':'CODFILIALORIGEM',
                        'CODPROD' : 'CODPRODORIGEM',
                        'AVISTA':'PCOMPRA1',
                        '7DIAS':'PCOMPRA2',
                        'PERDESC':'PERCDESCPCOMPRA2'
                    };
                    data.shift(); //delete columns row;
                    columns = columns.join(';').toUpperCase().trim().split(';');
                    let qt_tot_titles = columns.length;
                    let ind = null;
                    for( let k in expected_titles) {
                        ind = columns.indexOf(k);
                        if (ind > -1) {
                            expected_titles[k] = ind;
                        } else {
                            throw new Error(`missing column: ${k}`);
                        }
                    }

                    let inserts = [];
                    //print_r(data);exit();
                    for(let k in data) {                        
                        if (data[k].length ==  qt_tot_titles && Utils.hasValue(data[k][expected_titles.CODPROD])) {
                            let insert : any = {};
                            for(let k2 in expected_titles){                            
                                insert[real_titles[k2]] = data[k][expected_titles[k2]];  
                                if (Utils.hasValue(insert[real_titles[k2]])) {
                                    if (['CODFILIALORIGEM','CODPRODORIGEM','PCOMPRA1','PCOMPRA2','PERCDESCPCOMPRA2'].indexOf(real_titles[k2]) > -1) {
                                        insert[real_titles[k2]] = Utils.toNumber(insert[real_titles[k2]]);
                                    } 
                                } else {
                                    insert[real_titles[k2]] = null;
                                }
                            }
                            insert.CODORIGEMDADO = 1;
                            inserts.push(insert);
                        } 
                    }

                    if(inserts && inserts.length) {
                        for(let k in inserts) {
                            let pcProdut = await PcProdut.findOne({
                                raw:true,
                                where:{
                                    CODPROD: inserts[k].CODPRODORIGEM
                                }
                            })
                            let prodOrigemUpserted = await SjdProduto_Origem.saveOrCreate({
                                where:{
                                    CODPROD_NA_ORIGEM: inserts[k].CODPRODORIGEM
                                },
                                values:{
                                    CODPROD:inserts[k].CODPRODORIGEM,
                                    CODPROD_NA_ORIGEM:inserts[k].CODPRODORIGEM,                                    
                                    CODSITUACAOREGISTRO:1,
                                    CODUNIDADEORIGEM:1,
                                    EXISTE_ERP: pcProdut ? 1 : 0,
                                    CODORIGEMDADO: pcProdut ? 0 : 1,
                                    CODPROD_ERP : pcProdut?.CODPROD || null,
                                    CODFORNEC_ERP: pcProdut?.CODFORNEC || null,
                                    CODEPTO_ERP: pcProdut?.CODEPTO || null,
                                    DESCRICAO: pcProdut?.DESCRICAO || null
                                }
                            });

                            
                            let tabPrOrigem : any = await SjdTabpr_Origem.findOne({
                                where:{
                                    CODORIGEMDADO: inserts[k].CODORIGEMDADO, 
                                    CODFILIALORIGEM: inserts[k].CODFILIALORIGEM,
                                    CODPRODORIGEM: inserts[k].CODPRODORIGEM
                                }
                            });
                            if (tabPrOrigem) {
                                tabPrOrigem.DTATUALIZACAO= Sequelize.literal('sysdate');
                                tabPrOrigem.CODFILIAL_ERP= inserts[k].CODFILIALORIGEM;
                                tabPrOrigem.CODPROD_ERP= pcProdut?.CODPROD;
                                tabPrOrigem.NUMREGIAO= inserts[k].CODFILIALORIGEM == 2 ? 10 : 1;
                                tabPrOrigem.DTIMPORTACAO = Sequelize.literal('NVL(DTIMPORTACAO,sysdate)');
                                tabPrOrigem.PCOMPRA1= inserts[k].PCOMPRA1;
                                tabPrOrigem.PCOMPRA2= inserts[k].PCOMPRA2;
                                tabPrOrigem.PERCDESCPCOMPRA2= inserts[k].PERCDESCPCOMPRA2;
                                await tabPrOrigem.save();
                            } else {

                                let nextId : any = await DBConnectionManager.getConsultDBConnection()?.query(`select nvl(max(nvl(T2.CODITEMTABPR,0)),0) as NEXTID from CONSULTA.SJDTABPR_ORIGEM T2`,{raw:true,type:QueryTypes.SELECT});
                                if (Utils.hasValue(nextId)) nextId = nextId[0] || null;
                                if (Utils.hasValue(nextId)) nextId = (Utils.toNumber(nextId.NEXTID) || 0) + 1
                                else nextId = 1;

                                tabPrOrigem = await SjdTabpr_Origem.create({
                                    CODITEMTABPR: nextId,
                                    CODORIGEMDADO:  inserts[k].CODORIGEMDADO, 
                                    CODFILIALORIGEM: inserts[k].CODFILIALORIGEM,
                                    CODPRODORIGEM: inserts[k].CODPRODORIGEM,
                                    DTATUALIZACAO: Sequelize.literal('sysdate'),
                                    CODFILIAL_ERP: inserts[k].CODFILIALORIGEM,
                                    CODPROD_ERP: pcProdut?.CODPROD,
                                    NUMREGIAO: inserts[k].CODFILIALORIGEM == 2 ? 10 : 1,
                                    DTIMPORTACAO: Sequelize.literal('sysdate'),
                                    PCOMPRA1: inserts[k].PCOMPRA1,
                                    PCOMPRA2: inserts[k].PCOMPRA2,
                                    PERCDESCPCOMPRA2: inserts[k].PERCDESCPCOMPRA2
                                });
                            }                            
                            if (!tabPrOrigem) throw new Error(`error on upsert ${Object.values(inserts[k])}` );
                            tabPrOrigem.DTIMPORTACAO = Sequelize.literal('sysdate');
                            await SjdTabpr_Origem_Log.create(tabPrOrigem.dataValues || tabPrOrigem);
                            processeds++;
                        }
                    } else {
                        throw new Error("missing data");
                    }                    
                    result.success = true;
                } else {
                    throw new Error("missing data");    
                }
            } else {
                throw new Error("missing data");
            }
        } catch (e: any) {
            result.setException(e);
        } 
        return result;
    }

}