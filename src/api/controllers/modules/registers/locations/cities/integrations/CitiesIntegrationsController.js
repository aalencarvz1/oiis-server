const { Utils } = require("../../../../../utils/Utils");
const { OriginsDatas } = require("../../../../../../database/models/OriginsDatas");
const { States } = require("../../../../../../database/models/States");
const { PcCidade } = require("../../../../../../database/models/winthor/PcCidade");
const { Cities } = require("../../../../../../database/models/Cities");
const { StatesIntegrationsController } = require("../../states/integrations/StatesIntegrationsController");
const { RegistersController } = require("../../../RegistersController");

/**
 * class to handle winthor people integrations
 * @created 2023-09-08
 */
class CitiesIntegrationsController extends RegistersController{

    static async integrateWinthorPcCidadeToCity(winthorCityCode,transaction) {           
        Utils.log('yyyy');
        if (Utils.hasValue(winthorCityCode)) {
            let pccidade = await PcCidade.getModel().findOne({
                raw : true,
                where:{
                    CODCIDADE:winthorCityCode
                },
            });
            if (!pccidade) throw new Error(`city not found in pccidade: ${winthorCityCode}`);

            let state = await States.getModel().findOne({
                raw:true,
                where:{
                    SIGLA:pccidade.UF
                }
            });

            if (!state) {
                state = await StatesIntegrationsController.integrateWinthorPcEstadoToState(pccidade.UF);
                if (!state) {
                    throw new Error(`state ${pccidade.UF} not found`);
                }
            }
                                       
            let queryParams = {
                where: {
                    IDSTATE: state.id,
                    id: winthorCityCode
                }
            };
            if (transaction) queryParams.transaction = transaction;

            let city = await Cities.getModel().findOne(queryParams);
            let options = {};
            if (transaction) options.transaction = transaction;

            //try preserve winthor code, if unique or primary key viloated, then raise exception here
            if (city) {
                if (city.NAME != pccidade.NOMECIDADE) {
                    city.NAME = pccidade.NOMECIDADE;
                    await city.save(options);                
                }
            } else {
                city = await Cities.getModel().create({   
                    id:pccidade.CODCIDADE,                 
                    data_origin_id: OriginsDatas.WINTHOR,
                    id_at_origin: pccidade.CODCIDADE,
                    IDSTATE: state.id,
                    NAME: pccidade.NOMECIDADE,
                    POPULATION: pccidade.POPULACAO,
                    LATITUDE: pccidade.LATITUDE,
                    LONGITUDE: pccidade.LONGITUDE
                },options)
            }
            return city;
        } else {
            throw new Error("winthorCityCode is empty");
        }

    }



    static async integrateWinthorCities(req,res,next) {
        try {
            let identifiers = req.body.identifiers || []; 
            Utils.log(identifiers,Utils.typeOf(identifiers));
            if (Utils.typeOf(identifiers) != 'array') identifiers = identifiers.split(',');                    
            if (identifiers.length > 0) {
                res.data = [];
                for(let key in identifiers) {
                    res.data.push(await CitiesIntegrationsController.integrateWinthorPcCidadeToCity(identifiers[key]));
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
            console.log('xxxxx',currentPathIndex,arrUrlPath);
            let methodName = arrUrlPath[currentPathIndex+1] || req.method; 
            switch(methodName.trim().toLowerCase()) {
                case 'create':   
                case 'integrate':                                    
                    switch((origin.NAME || origin).trim().toLowerCase()) {                        
                        case "winthor":
                            return this.integrateWinthorCities(req,res,next);
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
module.exports = {CitiesIntegrationsController}