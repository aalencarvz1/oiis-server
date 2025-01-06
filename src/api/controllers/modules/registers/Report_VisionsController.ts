import { NextFunction, Request, Response } from "express";
import Report_Visions from "../../../database/models/Report_Visions.js";
import BaseRegistersController from "./BaseRegistersController.js";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import DBConnectionManager from "../../../database/DBConnectionManager.js";
import { QueryTypes } from "sequelize";

export default class Report_VisionsController extends BaseRegistersController {

    /**
     * @override
     * @created 2024-12-31
     * @version 1.0.0
     */
    static getTableClassModel() : any {
        return Report_Visions;
    }    


    /**
     * get data (records) from report vision
     * @requesthandler
     * @created 2024-12-31
     * @version 1.0.0
     */
    static async get_report_vision_data(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let idReportVision = req.body?.idReportVision;
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
                        res.data = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
                    break;
                    case 3: //enterprise
                        res.data = [{id:1,name:'JUMBO ALIMENTOS LTDA'}];
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
                        res.data = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
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
                        res.data = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
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
                        res.data = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
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
                        res.data = await DBConnectionManager.getWinthorDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
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
                        res.data = await DBConnectionManager.getWinthorDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
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
                        res.data = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
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
                        res.data = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
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
                        res.data = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
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
                        res.data = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
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
                        res.data = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
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
                        res.data = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
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
                        res.data = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
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
                        res.data = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
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
                        res.data = await DBConnectionManager.getEpDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
                    break;
                    default:
                        throw new Error(`id report vision not expected: ${idReportVision}`);
                    break;
                }
            } else {
                throw new Error("missing data");
            }
            res.success = true;
        } catch (e: any) {
            res.setException(e);
        }
        res.sendResponse();
    }

    static {
        this.configureDefaultRequestHandlers([this.get_report_vision_data]);
    }
}
