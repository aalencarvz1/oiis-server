const { Sequelize } = require("sequelize");
const { PcClient } = require("../../../../../../database/models/winthor/PcClient");
const { PcFilial } = require("../../../../../../database/models/winthor/PcFilial");
const { PeopleIntegrationsController } = require("../../integrations/PeopleIntegrationsController");
const { Companies } = require("../../../../../../database/models/Companies");
const { Utils } = require("../../../../../utils/Utils");
const { OriginsDatas } = require("../../../../../../database/models/OriginsDatas");
const { RegistersController } = require("../../../RegistersController");

/**
 * class to handle winthor people integrations
 * @created 2023-09-08
 */
class CompaniesIntegrationsController extends RegistersController{

    

    static async integrateWinthorPcFilialToCompany(winthorFilialCode,transaction) {           
        Utils.log('yyyy');
        if (Utils.hasValue(winthorFilialCode)) {
            let pcfilial = await PcFilial.getModel().findOne({
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

            let pcclientCompany = await PcClient.getModel().findOne({
                raw:true,
                attributes:Object.keys(PcClient.fields).map(el=>Sequelize.col(`${PcClient.tableName}.${el}`)),
                where : {
                    [Sequelize.Op.and] : [
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
                pcclientCompany = await PcClient.getModel().findOne({
                    raw:true,
                    attributes:Object.keys(PcClient.fields).map(el=>Sequelize.col(`${PcClient.tableName}.${el}`)),
                    where : {
                        [Sequelize.Op.and] : [
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

            let people = await PeopleIntegrationsController.integrateWinthorPeople([{
                TIPOFJ: pcclientCompany.TIPOFJ,
                CGCENT: pcclientCompany.CGCENT
            }]);
            if (!people) throw new Error("people is null as return of people integration");
            if (!people.success) {
                if (people.exception) throw people.exception
                else throw new Error(people.message);
            }
            people = people?.data[0];


            let pcFilialCompany = await PcFilial.getModel().findOne({
                raw:true,
                where: Sequelize.where(
                    Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CGC'),'[^0-9]',''),'DECIMAL(32)'),
                    '=',
                    Sequelize.cast(Sequelize.fn('regexp_replace',pcclientCompany.CGCENT,'[^0-9]',''),'DECIMAL(32)')
                )
            });

            if (!pcFilialCompany) throw new Error(`pcfilial of company with cgc not fount: ${pcclientCompany.CGCENT}`);

            let queryParams = {
                where: {
                    IDPEOPLE: people.id
                }
            };
            if (transaction) queryParams.transaction = transaction;

            let company = await Companies.getModel().findOne(queryParams);
            if (!Utils.hasValue(company)) {
                queryParams = {
                    where: {
                        id: pcFilialCompany.CODIGO
                    }
                };
                company = await Companies.getModel().findOne(queryParams);
            }
            let options = {};
            if (transaction) options.transaction = transaction;

            //try preserve winthor code, if unique or primary key viloated, then raise exception here
            if (Utils.hasValue(company)) {
                if (company.id != pcFilialCompany.CODIGO) company.id = pcFilialCompany.CODIGO; 
                if (company.IDPEOPLE != people.id) company.IDPEOPLE = people.id;                    
                await company.save(options);                
            } else {
                company = await Companies.getModel().create({                    
                    id : pcFilialCompany.CODIGO,
                    data_origin_id: OriginsDatas.WINTHOR,
                    IDPEOPLE: people.id
                },options)
            }
            return company;
        } else {
            throw new Error("winthorFilialCode is empty");
        }

    }



    static async integrateWinthorCompanies(req,res,next) {
        try {
            let identifiers = req.body.identifiers || []; 
            Utils.log(identifiers,Utils.typeOf(identifiers));
            if (Utils.typeOf(identifiers) != 'array') identifiers = identifiers.split(',');                    
            if (identifiers.length > 0) {
                res.data = [];
                for(let key in identifiers) {
                    res.data.push(await CompaniesIntegrationsController.integrateWinthorPcFilialToCompany(identifiers[key]));
                }
                res.sendResponse(200,true);
            } else {
                throw new Error("not identifiers for integration");
            }
        } catch (e) {
            Utils.log(e);
            res.sendResponse(501,false,e.message || e,null,e);
        }

    }


    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @created 2024-07-13
     * @override
     */
    static processRequest(req,res,next) {
        Utils.logi(`${this.name}`,`processRequest(${req.url})`);
        try {
            let origin = req.body.origin || "";
            let urlPath = req.url;
            urlPath = Utils.getSingleUrlPath(urlPath);
            let arrUrlPath = urlPath.split("/");
            if (!Utils.hasValue(arrUrlPath[0])) {
                arrUrlPath.shift();
            }
            let currentPathIndex = arrUrlPath.indexOf(this.name.trim().toLowerCase());
            let methodName = arrUrlPath[currentPathIndex+1] || req.method; 
            switch(methodName.trim().toLowerCase()) {
                case 'create':
                case 'integrate':
                    switch((origin.name || origin).trim().toLowerCase()) {                        
                        case "winthor":
                            return this.integrateWinthorCompanies(req,res,next);
                            break; 
                        default:
                            throw new Error(`origin not expected: ${origin}`);
                    }
                    break;               
                default:
                    return super.processRequest(req,res,next);
            }            
        } catch (e) {
            res.setException(e);
            res.sendResponse(517,false);
        }
        Utils.logf(`${this.name}`,`processRequest(${req.url})`);
    }
}
module.exports = {CompaniesIntegrationsController}