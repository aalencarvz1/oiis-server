const { Utils } = require("../../../../../utils/Utils");
const { Data_Origins } = require("../../../../../../database/models/Data_Origins");
const { Countries } = require("../../../../../../database/models/Countries");
const { PcEstado } = require("../../../../../../database/models/winthor/PcEstado");
const { Countries_Integration_Controller } = require("../../countries/integrations/Countries_Integration_Controller");
const { States } = require("../../../../../../database/models/States");
const { RegistersController } = require("../../../RegistersController");

/**
 * class to handle winthor people integrations
 * @created 2023-09-08
 */
class States_Integration_Controller extends RegistersController {

    static async integrateWinthorPcEstadoToState(winthorStateCode,transaction) {           
        Utils.log('yyyy');
        if (Utils.hasValue(winthorStateCode)) {
            let pcestado = await PcEstado.getModel().findOne({
                raw : true,
                where:{
                    UF:winthorStateCode
                },
            });
            if (!pcestado) throw new Error(`state not found in pcestado: ${winthorStateCode}`);

            let country = await Countries.getModel().findOne({
                raw:true,
                where:{
                    id:pcestado.CODPAIS
                }
            });

            if (!country) {
                country = await Countries_Integration_Controller.integrateWinthorPcPaisToCountry(pcestado.CODPAIS);
                if (!country) {
                    throw new Error(`country ${pcestado.CODPAIS} not found`);
                }
            }
                                       
            let queryParams = {
                where: {
                    country_id: country.id,
                    sigla: pcestado.UF
                }
            };
            if (transaction) queryParams.transaction = transaction;

            let state = await States.getModel().findOne(queryParams);
            let options = {};
            if (transaction) options.transaction = transaction;

            //try preserve winthor code, if unique or primary key viloated, then raise exception here
            if (state) {
                if (state.name != pcestado.ESTADO) {
                    state.name = pcestado.ESTADO;
                    await state.save(options);                
                }
            } else {
                state = await States.getModel().create({                    
                    data_origin_id: Data_Origins.WINTHOR,
                    country_id: country.id,
                    name: pcestado.ESTADO,
                    sigla: pcestado.UF
                },options)
            }
            return state;
        } else {
            throw new Error("winthorStateCode is empty");
        }

    }



    static async integrateWinthorStates(req,res,next) {
        try {
            let identifiers = req.body.identifiers || []; 
            Utils.log(identifiers,Utils.typeOf(identifiers));
            if (Utils.typeOf(identifiers) != 'array') identifiers = identifiers.split(',');                    
            if (identifiers.length > 0) {
                res.data = [];
                for(let key in identifiers) {
                    res.data.push(await States_Integration_Controller.integrateWinthorPcEstadoToState(identifiers[key]));
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
                    switch((origin.name || origin).trim().toLowerCase()) {                        
                        case "winthor":
                            return this.integrateWinthorStates(req,res,next);
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
module.exports = {States_Integration_Controller}