import Utils from "../../../utils/Utils.js";
import DataSwap from "../../../data/DataSwap.js";
import DBConnectionManager from "../../../../database/DBConnectionManager.js";
import { Op, QueryTypes, Sequelize } from "sequelize";
import { Client } from "basic-ftp";
import * as fs from 'node:fs';
import BaseRegistersIntegrationsController from "../BaseRegistersIntegrationsController.js";
import SjdEstoque_Origem from "../../../../database/models/sjd/SjdEstoque_Origem.js";
import SjdHistEst_Origem from "../../../../database/models/sjd/SjdHistEst_Origem.js";

export default class AuroraStockIntegrationsController extends BaseRegistersIntegrationsController{

        
    /**
     * integrate stock from aurora by file SALDOPRODUTO.TXT localized on ftp to consulta.sjdestoque_origem table and generate logs of movimentations INPUTS/OUTPUTS
     * @created 2024-10-31
     * @version 2.0.0
     */
    static async integrate(params?: any) : Promise<DataSwap> {
        let result = new DataSwap();
        let client = null;
        try {                        
            let path = 'aurora/Saldo';
            let fileName = "SALDOPRODUTO.TXT";            

            //access ftp client
            client = new Client();
            client.ftp.verbose = true;            
            await client.access({
                host: "192.168.2.150", 
                user: "aurora", 
                password: "aur123321ora"
            })            

            //downlaod file from ftp
            await client.downloadTo(fileName, `${path}/${fileName}`);

            //read file content
            let fileContent : any = fs.readFileSync(fileName,"utf-8");            

            if (Utils.hasValue(fileContent)) {
                let currentTime = new Date();
                fileContent = fileContent.split(/\r?\n/);
                fileContent = fileContent.map((el: any)=>el.split('#'));                
                let currentDate = new Date();
                let numtransent : any = await SjdHistEst_Origem.max('NUMTRANSENT');
                numtransent = numtransent || 0;
                numtransent = numtransent - 0;
                numtransent++;

                //change all records to not synced (synced = 0)
                await SjdEstoque_Origem.update({
                    SYNCED: 0
                },{
                    where:{
                        QTFISICO: {
                            [Op.not]: 0
                        }
                    }
                });

                //iterate over all file rows
                for(let k in fileContent) {                

                    if (Utils.hasValue(fileContent[k][0]) && Utils.hasValue(fileContent[k][1]) && Utils.hasValue(fileContent[k][2])) {
                        fileContent[k][2] = Utils.toNumber(fileContent[k][2]||0);

                        //find item
                        let item : any = await SjdEstoque_Origem.findOne({
                            where:{
                                CODFILIALORIGEM: fileContent[k][1], 
                                CODPRODORIGEM: fileContent[k][0]
                            }
                        });


                        if (!Utils.hasValue(item)) {

                            //create item if not exists
                            item = await SjdEstoque_Origem.create({
                                CODITEMEST: Sequelize.literal(`nvl((select max(t.CODITEMEST) from ${SjdEstoque_Origem.tableName} t),0)+1`),
                                CODORIGEMDADO: 1,
                                CODFILIALORIGEM: fileContent[k][1], 
                                CODFILIAL_ERP: fileContent[k][1], 
                                CODPRODORIGEM: fileContent[k][0],
                                CODPROD_ERP: fileContent[k][0],
                                QTFISICO: fileContent[k][2],
                                QTGERENCIAL: fileContent[k][2],
                                QTCOMERCIAL: fileContent[k][2],
                                QTFISICODISPONIVEL: fileContent[k][2],
                                DTULTENT: currentDate,
                                SYNCED: 1
                            });

                            await SjdHistEst_Origem.create({
                                CODHISTEST: Sequelize.literal(`nvl((select max(t.CODHISTEST) from ${SjdHistEst_Origem.tableName} t),0)+1`),
                                CODORIGEMDADO: 1,
                                CODITEMEST: item.CODITEMEST,
                                NUMTRANSENT: numtransent,
                                CODOPER: 'E',
                                DTMOV: currentDate,
                                QTMOV: item.QTFISICO
                            })
                        } else {

                            //update item if changed qty
                            if (Utils.toNumber(item.QTFISICO||0) != fileContent[k][2]) {
                                let diff = fileContent[k][2] - (Utils.toNumber(item?.QTFISICO||0) || 0);
                                item.QTFISICO = fileContent[k][2];
                                item.QTGERENCIAL = fileContent[k][2];
                                item.QTCOMERCIAL = fileContent[k][2];
                                item.QTFISICODISPONIVEL = fileContent[k][2];

                                if (diff > 0) {
                                    item.DTULTENT = currentDate;
                                }

                                item.SYNCED = 1;

                                await item.save();

                                await SjdHistEst_Origem.create({
                                    CODHISTEST: Sequelize.literal(`nvl((select max(t.CODHISTEST) from ${SjdHistEst_Origem.tableName} t),0)+1`),
                                    CODORIGEMDADO: 1,
                                    CODITEMEST: item.CODITEMEST,
                                    NUMTRANSENT: numtransent,
                                    CODOPER: diff > 0 ? 'E' : 'S',
                                    DTMOV: currentDate,
                                    QTMOV: diff
                                })
                            } else {
                                item.SYNCED = 1;
                                await item.save();
                            }
                        }                       
                    }
                }; 
                
                //change qty to 0 of items not present in file
                let notPresentItems = await SjdEstoque_Origem.findAll({
                    where:{
                        SYNCED: 0,
                        QTFISICO: {
                            [Op.not]: 0
                        }
                    }
                });
                for(let k in notPresentItems) {
                    await SjdHistEst_Origem.create({
                        CODHISTEST: Sequelize.literal(`nvl((select max(t.CODHISTEST) from ${SjdHistEst_Origem.tableName} t),0)+1`),
                        CODORIGEMDADO: 1,
                        CODITEMEST: notPresentItems[k].dataValues.CODITEMEST,
                        NUMTRANSENT: numtransent,
                        CODOPER: 'S',
                        DTMOV: currentDate,
                        QTMOV: notPresentItems[k].dataValues.QTFISICO
                    });
                    notPresentItems[k].QTFISICO = 0;
                    notPresentItems[k].QTGERENCIAL = 0;
                    notPresentItems[k].QTCOMERCIAL = 0;
                    notPresentItems[k].QTFISICODISPONIVEL = 0;
                    notPresentItems[k].SYNCED = 1;
                    await notPresentItems[k].save();
                } 

                //move file to processeds
                let newFileName = `${path}/processados/${fileName.substring(0,fileName.indexOf('.'))}${currentTime.toISOString().replace(/[\.\-\:]/g,'')}.TXT`;
                await client.rename(`${path}/${fileName}`,newFileName);

                result.success = true;
            } else {
                throw new Error("no file content");
            }
            fs.unlinkSync(fileName);
        } catch (e: any) {
            result.setException(e);
        } finally {            
            if (client) {
                client.close();
            }
        }
        return result;
    }

}