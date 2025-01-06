const { Sequelize, QueryTypes } = require("sequelize");
const { SjdTabpr_Origem } = require("../../../../../database/models/sjd/SjdTabpr_Origem");
const { Utils } = require("../../../../utils/Utils");
const { SjdProduto_Origem } = require("../../../../../database/models/sjd/SjdProduto_Origem");
const { PcProdut } = require("../../../../../database/models/winthor/PcProdut");
const DBConnectionManager = require("../../../../../database/DBConnectionManager");
const { SjdTabpr_Origem_Log } = require("../../../../../database/models/sjd/SjdTabpr_Origem_Log");
const { DataSwap } = require("../../../../data/DataSwap");
const { Client } = require("basic-ftp");
const fs = require("fs");
const { IntegrationsRegistersController } = require("../IntegrationsRegistersController");


/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2023-25-08
 */
class AuroraIntegrationsRegistersController extends IntegrationsRegistersController {

    /**
     * @override
     * @returns 
     * @created 2024-07-17
     * @version 1.0.0
     * @todo override this in inherited registers controllers if directory returned is another
     */
    static getDatabaseModelsPath(){        
        return `${super.getDatabaseModelsPath()}${path.sep}winthor`;
    }

    /**
     * @override
     * @returns 
     * @created 2024-07-17
     * @version 1.0.0
     * @todo override this in inherited registers controllers if directory returned is another
     */
    static getDirName(){
        return __dirname;
    }

    
    static async integratePrices(req,res,next,route,arrRoute,level) {
        try {
            let data = req.body.data || null;
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
                    
                    let expected_titles = {
                        'CODFILIAL':-1,
                        'CODPROD' : -1,
                        'AVISTA':-1,
                        '7DIAS':-1,
                        'PERDESC':-1
                    };

                    let real_titles = {
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
                            let insert = {};
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
                            let pcProdut = await PcProdut.getModel().findOne({
                                raw:true,
                                where:{
                                    CODPROD: inserts[k].CODPRODORIGEM
                                }
                            })
                            let prodOrigemUpserted = await SjdProduto_Origem.getModel().saveOrCreate({
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

                            
                            let tabPrOrigem = await SjdTabpr_Origem.getModel().findOne({
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

                                let nextId = await DBConnectionManager.getConsultDBConnection().query(`select nvl(max(nvl(T2.CODITEMTABPR,0)),0) as NEXTID from CONSULTA.SJDTABPR_ORIGEM T2`,{raw:true,type:QueryTypes.SELECT});
                                if (Utils.hasValue(nextId)) nextId = nextId[0] || null;
                                if (Utils.hasValue(nextId)) nextId = Utils.toNumber(nextId.NEXTID) + 1
                                else nextId = 1;

                                tabPrOrigem = await SjdTabpr_Origem.getModel().create({
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
                            await SjdTabpr_Origem_Log.getModel().create(tabPrOrigem.dataValues || tabPrOrigem);
                            processeds++;
                        }
                    } else {
                        throw new Error("missing data");
                    }
                    
                    res.sendResponse(200,true,`${processeds} registers processeds`);
                } else {
                    throw new Error("missing data");    
                }
            } else {
                throw new Error("missing data");
            }
        } catch (e) {
            Utils.logError(e);
            res.sendResponse(517,false,e.message || e,null,e);
        }
    }

    static async integrateStock() {
        let result = new DataSwap();
        let client = null;
        try {                        
            let path = 'aurora/Saldo';
            let fileName = "SALDOPRODUTO.TXT";            
            client = new Client();
            client.ftp.verbose = true;
            await client.access({
                host: "192.168.2.150", 
                user: "aurora", 
                password: "aur123321ora"
            })            
            await client.downloadTo(fileName, `${path}/${fileName}`);
            let fileContent = fs.readFileSync(fileName,"utf-8");            
            if (Utils.hasValue(fileContent)) {
                let currentTime = new Date();
                fileContent = fileContent.split(/\r?\n/);
                fileContent = fileContent.map(el=>el.split('#'));                

                await DBConnectionManager.getConsultDBConnection().query('delete from consulta.arestaurimportacao',{type:QueryTypes.DELETE});
                for(let k in fileContent) {                
                    if (Utils.hasValue(fileContent[k][0]) && Utils.hasValue(fileContent[k][1]) && Utils.hasValue(fileContent[k][2])) {
                        await DBConnectionManager.getConsultDBConnection().query(`
                            insert into consulta.arestaurimportacao(
                                codfilial,
                                cd_item,
                                qtde,
                                dtimport
                            ) values (
                                ${fileContent[k][1]},
                                ${fileContent[k][0]},
                                ${fileContent[k][2]},
                                to_date('${currentTime.toISOString().substring(0,19).replace('T',' ')}','yyyy-mm-dd hh24:mi:ss')
                            )
                        `,{type:QueryTypes.INSERT});
                    }
                };
                //await DBConnectionManager.getConsultDBConnection().query('commit',{type:'COMMIT'});
                
                let newFileName = `${path}/processados/${fileName.substring(0,fileName.indexOf('.'))}${currentTime.toISOString().replace(/[\.\-\:]/g,'')}.TXT`;
                await client.rename(`${path}/${fileName}`,newFileName);
                let responseProcess = await DBConnectionManager.getConsultDBConnection().query('call consulta.sjdpkg_funcs_sisjd.atualizar_estoque_aurora();');
                await DBConnectionManager.getConsultDBConnection().query('delete from consulta.arestaurimportacao',{type:QueryTypes.DELETE});
                result.success = true;
            } else {
                throw new Error("no file content");
            }
            fs.unlinkSync(fileName);
        } catch (e) {
            result.setException(e);
        } finally {            
            if (client) {
                client.close();
            }
        }
        return result;
    }

    

    /**
     * * Process route as array of levels. ex: /modules/inputs/purchases/forecast/get as ['modules','inputs','purchases','forecast','get']
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @param {*} arrRoute 
     * @param {*} level 
     * @created 2023-08-25
     * @deprecated 2024-10-29
     */
    static processPostAsRoute = async(req,res,next,route,arrRoute,level) => {
        level++;
        switch(arrRoute[level].trim().toLowerCase()) {
            case 'prices':
                await AuroraIntegrationsRegistersController.integratePrices(req,res,next,route,arrRoute,level);
                break;
            default:
                throw new Error(`resource level not expected: ${arrRoute[level]} of ${route}`);
                break;
        }         
    }
}

module.exports = {AuroraIntegrationsRegistersController}