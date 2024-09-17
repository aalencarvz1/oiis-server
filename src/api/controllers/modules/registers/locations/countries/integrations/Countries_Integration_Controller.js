const { Utils } = require("../../../../../utils/Utils");
const { Data_Origins } = require("../../../../../../database/models/Data_Origins");
const { PcPais } = require("../../../../../../database/models/winthor/PcPais");
const { Countries } = require("../../../../../../database/models/Countries");
const { Continents } = require("../../../../../../database/models/Continents");
const { RegistersController } = require("../../../RegistersController");

/**
 * class to handle winthor people integrations
 * @created 2023-09-08
 */
class Countries_Integration_Controller extends RegistersController {

    static async integrateWinthorPcPaisToCountry(winthorCountryCode,transaction) {           
        Utils.log('yyyy');
        if (Utils.hasValue(winthorCountryCode)) {
            let pcpais = await PcPais.getModel().findOne({
                raw : true,
                where:{
                    CODPAIS:winthorCountryCode
                },
            });
            if (!pcpais) throw new Error(`country not found in pcpais: ${winthorCountryCode}`);

            let continent = await Continents.getModel().findOne({
                raw:true,
                where:{
                    id:Continents.SOUTH_AMERICA
                }
            });

            if (!continent) {
                continent = await Continents.getModel().create({
                    id: Continents.SOUTH_AMERICA,
                    sigla: 'AL',
                    name: 'SOUTH AMERICA'
                });
            }
                                       
            let queryParams = {
                where: {
                    continent_id: continent.id,
                    id: winthorCountryCode
                }
            };
            if (transaction) queryParams.transaction = transaction;

            let country = await Countries.getModel().findOne(queryParams);
            let options = {};
            if (transaction) options.transaction = transaction;

            //try preserve winthor code, if unique or primary key viloated, then raise exception here
            if (country) {
                if (country.name != pcpais.DESCRICAO) {
                    country.name = pcpais.DESCRICAO;
                    await country.save(options);                
                }
            } else {
                country = await Countries.getModel().create({                    
                    id : winthorCountryCode,
                    data_origin_id: Data_Origins.WINTHOR,
                    continent_id: continent.id,
                    name: pcpais.DESCRICAO,
                    sigla: pcpais.DESCRICAO.substring(0,2)
                },options)
            }
            return country;
        } else {
            throw new Error("winthorCountryCode is empty");
        }

    }



    static async integrateWinthorCountries(req,res,next) {
        try {
            let identifiers = req.body.identifiers || []; 
            Utils.log(identifiers,Utils.typeOf(identifiers));
            if (Utils.typeOf(identifiers) != 'array') identifiers = identifiers.split(',');                    
            if (identifiers.length > 0) {
                res.data = [];
                for(let key in identifiers) {
                    res.data.push(await Countries_Integration_Controller.integrateWinthorPcPaisToCountry(identifiers[key]));
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
                            return this.integrateWinthorCountries(req,res,next);
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
module.exports = {Countries_Integration_Controller}