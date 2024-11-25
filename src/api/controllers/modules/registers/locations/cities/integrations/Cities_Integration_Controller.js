const { Utils } = require("../../../../../utils/Utils");
const { Data_Origins } = require("../../../../../../database/models/Data_Origins");
const { States } = require("../../../../../../database/models/States");
const { PcCidade } = require("../../../../../../database/models/winthor/PcCidade");
const { Cities } = require("../../../../../../database/models/Cities");
const { States_Integration_Controller } = require("../../states/integrations/States_Integration_Controller");
const { RegistersController } = require("../../../RegistersController");

/**
 * class to handle winthor people integrations
 * @created 2023-09-08
 */
class Cities_Integration_Controller extends RegistersController{

    static async integrateWinthorPcCidadeToCity(winthorCityCode,transaction) {           
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
                    sigla:pccidade.UF
                }
            });

            if (!state) {
                state = await States_Integration_Controller.integrateWinthorPcEstadoToState(pccidade.UF);
                if (!state) {
                    throw new Error(`state ${pccidade.UF} not found`);
                }
            }
                                       
            let queryParams = {
                where: {
                    state_id: state.id,
                    id: winthorCityCode
                }
            };
            if (transaction) queryParams.transaction = transaction;

            let city = await Cities.getModel().findOne(queryParams);
            let options = {};
            if (transaction) options.transaction = transaction;

            //try preserve winthor code, if unique or primary key viloated, then raise exception here
            if (city) {
                if (city.name != pccidade.NOMECIDADE) {
                    city.name = pccidade.NOMECIDADE;
                    await city.save(options);                
                }
            } else {
                city = await Cities.getModel().create({   
                    id:pccidade.CODCIDADE,                 
                    data_origin_id: Data_Origins.WINTHOR,
                    id_at_origin: pccidade.CODCIDADE,
                    state_id: state.id,
                    name: pccidade.NOMECIDADE,
                    population: pccidade.POPULACAO,
                    latitude: pccidade.latitude,
                    longitude: pccidade.longitude
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
            if (Utils.typeOf(identifiers) != 'array') identifiers = identifiers.split(',');                    
            if (identifiers.length > 0) {
                res.data = [];
                for(let key in identifiers) {
                    res.data.push(await Cities_Integration_Controller.integrateWinthorPcCidadeToCity(identifiers[key]));
                }
                res.sendResponse(200,true);
            } else {
                throw new Error("not identifiers for integration");
            }
        } catch (e) {
            Utils.logError(e);
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
module.exports = {Cities_Integration_Controller}