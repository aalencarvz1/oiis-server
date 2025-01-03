import { Op, Sequelize, Transaction } from "sequelize";
import Companies from "../../../../../database/models/Companies.js";
import DataSwap from "../../../../data/DataSwap.js";
import Data_Origins from "../../../../../database/models/Data_Origins.js";
import Utils from "../../../../utils/Utils.js";
import PcClient from "../../../../../database/models/winthor/PcClient.js";
import IntegrationsRegistersController from "../IntegrationsRegistersController.js";
import _ from "lodash";
import PcFilial from "../../../../../database/models/winthor/PcFilial.js";
import WinthorPeopleIntegrationsController from "./WinthorPeopleIntegrationsController.js";

export default class WinthorCompaniesIntegrationsController extends IntegrationsRegistersController{

    static getTableClassModel() : any {
        return PcFilial;
    }

    static async integrateWinthorPcFilialToCompany(winthorFilialCode?: number,transaction?: Transaction) : Promise<void | Companies> {           
        if (Utils.hasValue(winthorFilialCode)) {
            let pcfilial : any = await PcFilial.findOne({
                raw : true,
                attributes:[
                    ...Object.keys(PcFilial.fields),
                    [Sequelize.literal(`(select c.CGCENT from JUMBO.PCCLIENT c where c.CODCLI = PCFILIAL.CODCLI)`), 'CGCENT']
                ],
                where:{
                    CODIGO:winthorFilialCode
                },
            });
            if (!pcfilial) throw new Error(`codfilial not found in pcfilial: ${winthorFilialCode}`);

            let cgcCompanie = pcfilial.CGCENT.trim().replace(/[^0-9]/g,'')-0
            let radicalCgcCompanie = cgcCompanie + '';
            radicalCgcCompanie = radicalCgcCompanie.substring(0,radicalCgcCompanie.length-6);
            radicalCgcCompanie = radicalCgcCompanie + '0001';

            let pcclientCompany = await PcClient.findOne({
                raw:true,
                //attributes:Object.keys(PcClient.fields).map(el=>Sequelize.col(`${PcClient.tableName}.${el}`)),
                where : {
                    [Op.and] : [
                        Sequelize.where(
                            Sequelize.cast(Sequelize.fn('substr',
                                Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CGCENT'),'[^0-9]',''),'DECIMAL(32)'),
                                0,
                                Sequelize.literal("length(to_number(regexp_replace(CGCENT,'[^0-9]','')))-2")
                            ),'DECIMAL(32)'),
                            '=',
                            Sequelize.cast(Sequelize.fn('regexp_replace',radicalCgcCompanie,'[^0-9]',''),'DECIMAL(32)'),
                        ),
                        Sequelize.literal('DTEXCLUSAO IS NULL')
                    ]
                }
            });

            if (!pcclientCompany) {
                pcclientCompany = await PcClient.findOne({
                    raw:true,
                    //attributes:Object.keys(PcClient.fields).map(el=>Sequelize.col(`${PcClient.tableName}.${el}`)),
                    where : {
                        [Op.and] : [
                            Sequelize.where(
                                Sequelize.cast(Sequelize.fn('substr',
                                    Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CGCENT'),'[^0-9]',''),'DECIMAL(32)'),
                                    0,
                                    Sequelize.literal("length(to_number(regexp_replace(CGCENT,'[^0-9]','')))-2")
                                ),'DECIMAL(32)'),
                                '=',
                                Sequelize.cast(Sequelize.fn('regexp_replace',radicalCgcCompanie,'[^0-9]',''),'DECIMAL(32)'),
                            )
                        ]
                    }
                });
            }

            if (!pcclientCompany) throw new Error(`company not foud in pcclient with radical ${radicalCgcCompanie}`);

            let people : any = await WinthorPeopleIntegrationsController.integrateWinthorPeople([{
                TIPOFJ: pcclientCompany.TIPOFJ,
                CGCENT: pcclientCompany.CGCENT
            }]);
            if (!people) throw new Error("people is null as return of people integration");
            if (!people.success) {
                if (people.exception) throw people.exception
                else throw new Error(people.message);
            }
            people = people?.data[0];


            let pcFilialCompany = await PcFilial.findOne({
                raw:true,
                where: Sequelize.where(
                    Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CGC'),'[^0-9]',''),'DECIMAL(32)'),
                    '=',
                    Sequelize.cast(Sequelize.fn('regexp_replace',pcclientCompany.CGCENT,'[^0-9]',''),'DECIMAL(32)')
                )
            });

            if (!pcFilialCompany) throw new Error(`pcfilial of company with cgc not fount: ${pcclientCompany.CGCENT}`);

            let queryParams : any = {
                where: {
                    people_id: people.id
                }
            };
            if (transaction) queryParams.transaction = transaction;

            let company : any = await Companies.findOne(queryParams);
            if (!Utils.hasValue(company)) {
                queryParams = {
                    where: {
                        id: pcFilialCompany.CODIGO
                    }
                };
                company = await Companies.findOne(queryParams);
            }
            let options : any = {};
            if (transaction) options.transaction = transaction;

            //try preserve winthor code, if unique or primary key viloated, then raise exception here
            if (Utils.hasValue(company)) {
                if (company.id != pcFilialCompany.CODIGO) company.id = pcFilialCompany.CODIGO; 
                if (company.people_id != people.id) company.people_id = people.id;                    
                await company.save(options);                
            } else {
                company = await Companies.create({                    
                    id : pcFilialCompany.CODIGO,
                    data_origin_id: Data_Origins.WINTHOR,
                    people_id: people.id
                },options)
            }
            return company;
        } else {
            throw new Error("winthorFilialCode is empty");
        }

    }

    static async integrateWinthorCompanies(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            let identifiers = params.identifiers || params || []; 
            if (Utils.typeOf(identifiers) != 'array') identifiers = identifiers.split(',');                    
            if (identifiers.length > 0) {
                result.data = [];
                for(let key in identifiers) {
                    result.data.push(await this.integrateWinthorPcFilialToCompany(identifiers[key]));
                }
                result.success = true;
            } else {
                throw new Error("not identifiers for integration");
            }
        } catch (e: any) {
            result.setException(e);
        }
        return result;
    }

    
    
    static {
        this.configureRequestHandlers();
    }
}