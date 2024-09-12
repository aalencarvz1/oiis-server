const { Sequelize } = require("sequelize");
const { PcTabDev } = require("../../../../../../database/models/winthor/PcTabDev");
const { Logistic_Reasons } = require("../../../../../../database/models/Logistic_Reasons");
const { Utils } = require("../../../../../utils/Utils");
const { DatabaseUtils } = require("../../../../../database/DatabaseUtils");
const DBConnectionManager = require("../../../../../../database/DBConnectionManager");
const { Data_Origins } = require("../../../../../../database/models/Data_Origins");
const { RegistersController } = require("../../../RegistersController");

/**
 * class to handle winthor people integrations
 * @created 2023-09-08
 */
class Logistic_Reasons_Integration_Controller extends RegistersController {

    static async integrateWinthorPcTabDevToLogisticReason(winthorCode,transaction) {        
        if (Utils.hasValue(winthorCode)) {
            
            let pcTabDev = await PcTabDev.getModel().findOne({
                raw:true,
                where:{
                    CODDEVOL: winthorCode
                }
            });

            if (!pcTabDev) throw new Error(`coddevol not found in PCTABDEV: ${winthorCode}`);           

            let queryParams = {
                where:{
                    id:winthorCode
                }
            };
            if (transaction) queryParams.transaction = transaction;
            
            let logisticReason = await Logistic_Reasons.getModel().findOne(queryParams);
            let options = {};
            if (transaction) options.transaction = transaction;            

            //preserve winthor code, if violate primary key or unique, raise here
            if (logisticReason) {
                if (logisticReason.name != pcTabDev.MOTIVO) logisticReason.name = pcTabDev.MOTIVO;
                if (logisticReason.SIGLAMOVTYPE != pcTabDev.TIPO) logisticReason.SIGLAMOVTYPE = pcTabDev.TIPO;            
                await logisticReason.save(options);
            } else {
                logisticReason = await Logistic_Reasons.getModel().create({
                    id: pcTabDev.CODDEVOL,
                    data_origin_id: Data_Origins.WINTHOR,
                    id_at_origin: pcTabDev.CODDEVOL,                    
                    name: pcTabDev.MOTIVO,
                    SIGLAMOVTYPE: pcTabDev.TIPO
                },options);
            }
            return logisticReason;
        } else {
            throw new Error("winthorCode is empty");
        }
    }


    static async integrateByWinthor(req,res,next) {
        try {
            let identifiers = req.body.identifiers || []; 
            Utils.log(identifiers,Utils.typeOf(identifiers));
            if (Utils.typeOf(identifiers) != 'array') identifiers = identifiers.split(',');                    
            if (identifiers.length > 0) {
                identifiers = identifiers.map(el=>Utils.hasValue(el)?el:'null');
                res.data = [];
                let integrations = await PcTabDev.getModel().findAll({
                    raw:true,
                    where:{
                        CODDEVOL : {
                            [Sequelize.Op.in] : identifiers
                        }
                    }
                });
                if (!integrations || !integrations?.length) throw new Error(`identifiers not found: ${identifiers.join(',')}`);
                for(let key in integrations) {
                    await DBConnectionManager.getDefaultDBConnection().transaction(async (transaction) => {
                        let item = await Logistic_Reasons_Integration_Controller.integrateWinthorPcTabDevToLogisticReason(integrations[key].CODDEVOL,transaction);
                        if (!item) throw new Error("logistic reason is null as return of integration logistic reason");                     
                        res.data.push(item.dataValues);
                    });
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

    static async get(req,res,next) {
        try {
            let origin = req.body.origin || "";
            let queryParams = DatabaseUtils.prepareQueryParams(req.body.queryParams || {});
            queryParams.raw = true;
            switch((origin.name || origin).trim().toLowerCase()) {
                case "winthor":                            
                    queryParams.where = queryParams.where || {};     
                    queryParams.raw = true;                       
                    res.data = await PcTabDev.getModel().findAll(queryParams);
                    res.sendResponse(200,true);
                    break; 
                default:
                    throw new Error(`origin not expected: ${(origin.name || origin)}`);
            }
        } catch (e) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    static integrate(req,res,next) {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin).trim().toLowerCase()) {
                case "winthor":
                    this.integrateByWinthor(req,res,next);
                    break; 
                default:
                    throw new Error(`origin not expected: ${(origin.name || origin)}`);
            }
        } catch (e) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

}
module.exports = {Logistic_Reasons_Integration_Controller}