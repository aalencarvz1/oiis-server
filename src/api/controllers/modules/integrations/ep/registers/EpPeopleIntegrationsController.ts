import { Op, Sequelize } from "sequelize";
import DataSwap from "../../../../data/DataSwap.js";
import Data_Origins from "../../../../../database/models/Data_Origins.js";
import Utils from "../../../../utils/Utils.js";
import BaseRegistersIntegrationsController from "../../BaseRegistersIntegrationsController.js";
import _ from "lodash";
import Clients from "../../../../../database/models/Clients.js";
import Relationships from "../../../../../database/models/Relationships.js";
import Record_Status from "../../../../../database/models/Record_Status.js";
import Relationship_Types from "../../../../../database/models/Relationship_Types.js";
import Modules from "../../../../../database/models/Modules.js";
import DatabaseUtils from "../../../../database/DatabaseUtils.js";
import EpClientes from "../../../../../database/models/ep/EpClientes.js";
import EpPessoas from "../../../../../database/models/ep/EpPessoas.js";
import Identifier_Types from "../../../../../database/models/Identifier_Types.js";
import People from "../../../../../database/models/People.js";

export default class EpPeopleIntegrationsController extends BaseRegistersIntegrationsController{

    static getTableClassModel() {
        return EpPessoas;
    }


    static async getPeopleByIdentifiersDocs(identifiersDocs?: any, options?: any) : Promise<any> {
        let result : any = null;
        if (identifiersDocs) {
            if (Utils.typeOf(identifiersDocs) != 'array') identifiersDocs = identifiersDocs.toString().split(',');
            let whereIdentifiersDocs = identifiersDocs.map((el: any)=>{
                let r : any = {};
                let and = [];
                if (typeof el == 'object') {
                    if (el.CODTIPODOCIDENTIFICADOR) {
                        and.push(Sequelize.where(
                            Sequelize.col(`CODTIPODOCIDENTIFICADOR`),
                            el.CODTIPODOCIDENTIFICADOR
                        ));
                    }
                    if (el.CODDOCIDENTIFICADOR) {
                        and.push(Sequelize.where(
                            Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CODDOCIDENTIFICADOR'),'[^0-9]',''),'DECIMAL(32)'),
                            '=',
                            Sequelize.cast(Sequelize.fn('regexp_replace',el.CODDOCIDENTIFICADOR,'[^0-9]',''),'DECIMAL(32)')
                        ));
                    }
                } else {
                    and.push(Sequelize.where(
                        Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CODDOCIDENTIFICADOR'),'[^0-9]',''),'DECIMAL(32)'),
                        '=',
                        Sequelize.cast(Sequelize.fn('regexp_replace',el,'[^0-9]',''),'DECIMAL(32)')
                    ));
                }
                r[Op.and] = and;
                return r;
            });

            let findParams : any = {
                raw:true,
                where:{
                    [Op.or]:whereIdentifiersDocs
                }
            };
            if (options && options?.attributes) {
                findParams.attributes = options.attributes;
            }
            result = await EpPessoas.findAll(findParams);
        }
        return result;
    }

    static async getPeopleByIdentifierDocToIntegrate(identifiersDocs?: any): Promise<any> {
        let result = null;
        result = await this.getPeopleByIdentifiersDocs(
            identifiersDocs,{
                attributes:[
                    ['COD','id'],
                    [Sequelize.literal(`${Data_Origins.EP}`),'data_origin_id'],
                    ['COD','id_at_origin'],
                    [Sequelize.literal(`case when EPPESSOAS.CODTIPODOCIDENTIFICADOR = 1 AND LENGTH(EPPESSOAS.CODDOCIDENTIFICADOR) <= 11 then ${Identifier_Types.CPF} else ${Identifier_Types.CNPJ} end`),'identifier_doc_type_id'],
                    [Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CODDOCIDENTIFICADOR'),'[^0-9]',''),'DECIMAL(32)'),'identifier_doc'],
                    ['NOMERAZAO','name'],
                    ['FANTASIA','fantasy']
                ]
            }
        );
        return result;
    }    

    /**
     * integrate ep pople register to people register
     * @static
     * @async
     * @created 2023-09-08
     */
    static async integrate(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            params = params || {};
            params.registersIdentifiersDocs = params.registersIdentifiersDocs || params;
            if (params.registersIdentifiersDocs) {
                let interateRegsParams = {
                    tableClassModel: People,
                    registersIds: params.registersIdentifiersDocs,
                    getIntegratedsByOriginIds: async (registersIdentifiersDocs?: any,options?: any) => {
                        let peopleRegsIdentifiers = registersIdentifiersDocs.map((el: any)=>{
                            return {
                                identifier_doc_type_id: el?.CODTIPODOCIDENTIFICADOR == 1 && (el.CODDOCIDENTIFICADOR || '').length() <= 11 ? Identifier_Types.CPF : Identifier_Types.CNPJ,
                                identifier_doc: el?.CODDOCIDENTIFICADOR || el
                            }
                        });
                        return await People.getPeopleByIdentifiersDocs(peopleRegsIdentifiers,options);
                    }, 
                    getBulkDataToCreate: EpPeopleIntegrationsController.getPeopleByIdentifierDocToIntegrate,
                    getDataToUpdate: async (row: any) => {
                        return await EpPeopleIntegrationsController.getPeopleByIdentifierDocToIntegrate([{
                            CODTIPODOCIDENTIFICADOR: row.identifier_doc_type_id == Identifier_Types.CPF ? 1 : 2,
                            CODDOCIDENTIFICADOR: row.identifier_doc
                        }]);
                    }
                }
                result = await this.defaultIntegrate(interateRegsParams);

                //relationships
                if (result.success) {
                    let originalPeople = await this.getPeopleByIdentifierDocToIntegrate(params.registersIdentifiersDocs);
                    for(let k in originalPeople) {
                        await Relationships.createIfNotExists({
                            where: {
                                status_reg_id: Record_Status.ACTIVE,
                                relationship_type_id: Relationship_Types.RELATIONSHIP,
                                table_1_id : People.id,
                                record_1_id: originalPeople[k].id,
                                table_2_id : Modules.id,
                                record_2_id: Modules.WMS
                            }
                        });

                        await Relationships.createIfNotExists({
                            where: {
                                status_reg_id: Record_Status.ACTIVE,
                                relationship_type_id: Relationship_Types.RELATIONSHIP,
                                table_1_id : People.id,
                                record_1_id: originalPeople[k].id,
                                table_2_id : Modules.id,
                                record_2_id: Modules.LOGISTIC
                            }
                        });
                    }
                }
            } else {
                throw new Error('missing parameter property (params.registersIdentifiersDocs)');
            }            
        } catch (e: any) {
            result.setException(e);
        }
        return result;
    }
    
}