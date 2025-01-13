import Utils from "../../../utils/Utils.js";
import DataSwap from "../../../data/DataSwap.js";
import DBConnectionManager from "../../../../database/DBConnectionManager.js";
import { QueryTypes } from "sequelize";
import { Client } from "basic-ftp";
import * as fs from 'node:fs';
import BaseRegistersIntegrationsController from "../BaseRegistersIntegrationsController.js";

export default class AuroraStockIntegrationsController extends BaseRegistersIntegrationsController{

    
    
    
    static async integrate(params?: any) : Promise<DataSwap> {
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
            let fileContent : any = fs.readFileSync(fileName,"utf-8");            
            if (Utils.hasValue(fileContent)) {
                let currentTime = new Date();
                fileContent = fileContent.split(/\r?\n/);
                fileContent = fileContent.map((el: any)=>el.split('#'));                

                await DBConnectionManager.getConsultDBConnection()?.query('delete from consulta.arestaurimportacao',{type:QueryTypes.DELETE});
                for(let k in fileContent) {                
                    if (Utils.hasValue(fileContent[k][0]) && Utils.hasValue(fileContent[k][1]) && Utils.hasValue(fileContent[k][2])) {
                        await DBConnectionManager.getConsultDBConnection()?.query(`
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
                await DBConnectionManager.getConsultDBConnection()?.query('call consulta.sjdpkg_funcs_sisjd.atualizar_estoque_aurora()', {type: QueryTypes.RAW});
                await DBConnectionManager.getConsultDBConnection()?.query('delete from consulta.arestaurimportacao',{type:QueryTypes.DELETE});
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