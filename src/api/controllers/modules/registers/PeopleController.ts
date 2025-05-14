import { Op, Sequelize } from "sequelize";
import People from "../../../database/models/People.js";
import Utils from "../../utils/Utils.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class PeopleController extends BaseRegistersController {
    static getTableClassModel() : any {
        return People;
    }
   

    /**
     * get people by identifier docs
     * @created 2024-12-31
     * @version 1.0.0
     */
    static async getPeopleByIdentifiersDocs(identifiersDocs?: any,options?: any) : Promise<any> {    
        let result = null;
        let queryParams = options?.queryParams || options || {};
        queryParams.raw = Utils.firstValid([queryParams?.raw,true]),
        queryParams.where = queryParams.where || {};
        if (identifiersDocs) {
            queryParams.where[Op.or] = identifiersDocs.map((el: any)=>{
            let r : any = {};
            let and = [];
            if (typeof el === 'object') {
                if (el.identifier_doc_type_id) {
                and.push({
                    identifier_doc_type_id: el.identifier_doc_type_id
                });
                }
                if (el.identifier_doc) {
                and.push(Sequelize.where(
                    Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col(`identifier_doc`),'[^0-9]',''),'DECIMAL(32)'),
                    '=',
                    Sequelize.cast(Sequelize.fn('regexp_replace',el.identifier_doc,'[^0-9]',''),'DECIMAL(32)'),
                ));
                }
            } else {
                and.push(Sequelize.where(
                Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col(`identifier_doc`),'[^0-9]',''),'DECIMAL(32)'),
                '=',
                Sequelize.cast(Sequelize.fn('regexp_replace',el,'[^0-9]',''),'DECIMAL(32)'),
                ));
            }
            r[Op.and] = and;
            return r;
            });
        };
        result = await People.findAll(queryParams);
        return result;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
