const path = require("path");
const { Utils } = require("../../../../../utils/Utils");
const { RegistersController } = require("../../../RegistersController");


/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2023-25-08
 */
class BaseRFBIntegrationsRegistersController extends RegistersController {

    /**
     * @override
     * @returns 
     * @created 2024-07-17
     * @version 1.0.0
     * @todo override this in inherited registers controllers if directory returned is another
     */
    static getDatabaseModelsPath(){        
        return `${super.getDatabaseModelsPath()}${path.sep}extenal_datas`;
    }

    /**
     * @override
     * @returns 
     * @created 2024-07-17
     * @version 1.0.0
     * @todo override this in inherited registers controllers if directory returned is another
     */
    static getDirName(){
        return __dirname;
    }

    
    /**
     * Generic method to integrate files of rfb
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @created 2024-09-21
     * @override
     */
    static async integrate(req,res,next, tableClass, numberCols,textCols, dateCols, dateFormat,customHandlers) {
        Utils.logi(`${this.name}`,`integrate(${req.url})`);
        try {
            let lines = req.body.data;            
            if (Utils.hasValue(lines)) {
                let checkIfExistsAndUpdate = Utils.firstValid([req.body.checkIfExistsAndUpdate,false]);
                if (Utils.typeOf(lines) != 'array') {
                    Utils.toArray(lines,"\n");
                }
                numberCols = numberCols || [];
                textCols = textCols || [];
                dateCols = dateCols || [];
                dateFormat = dateFormat || "YYYYMMDD";
                customHandlers = customHandlers || {};
                let cols = Object.keys(tableClass.fields);
                let toCreate = [];
                for(let k in lines) {
                    if (Utils.hasValue(lines[k])) {
                        if (Utils.typeOf(lines[k]) != 'array') {
                            lines[k] = Utils.toArray(lines[k].trim(),'";"');
                        }

                        //remove aspas
                        for(let j in lines[k]) {
                            lines[k][j] = (lines[k][j]||'').replaceAll('"',"");                            
                        }

                        //number columns to number
                        for(let j in numberCols) {
                            if (Utils.hasValue(lines[k][numberCols[j]])) {
                                let previousStr = lines[k][numberCols[j]];

                                if (Utils.hasValue(customHandlers[numberCols[j]]) && Utils.hasValue(customHandlers[numberCols[j]].toNumber)) {
                                    lines[k][numberCols[j]] = customHandlers[numberCols[j]].toNumber(lines[k][numberCols[j]]);
                                } else {
                                    lines[k][numberCols[j]] = Utils.toNumber(lines[k][numberCols[j]]);    
                                    if (isNaN(lines[k][numberCols[j]]) || lines[k][numberCols[j]] == 'NaN') {
                                        Utils.log(lines[k]);
                                        throw new Error(`invalid number ${previousStr}`);
                                    }
                                }
                            } else {
                                lines[k][numberCols[j]] = null;
                            }
                        }

                        //number columns to number
                        for(let j in dateCols) {
                            if (Utils.hasValue(lines[k][dateCols[j]]) && lines[k][dateCols[j]] != '0') {
                                //console.log(lines[k],dateCols[j],lines[k][dateCols[j]]);
                                lines[k][dateCols[j]] = Utils.toDate(lines[k][dateCols[j]],dateFormat);    
                            } else {
                                lines[k][dateCols[j]] = null;
                            }
                        }
                        
                        //create model object
                        let newRegister = {};
                        for(let j in cols) {
                            if (Utils.hasValue(lines[k][j])) {
                                newRegister[cols[j]] = lines[k][j];
                            } else {
                                newRegister[cols[j]] = null;
                            }
                        }

                        //update if exists or storage to bulk create
                        if (checkIfExistsAndUpdate) {
                            newRegister = await tableClass.saveOrCreate({
                                where:{
                                    [cols[0]]:newRegister[cols[0]]
                                },
                                values:newRegister
                            });
                            if (!newRegister.success) {
                                res.setDataSwap(newRegister);
                                return res.sendResponse();
                                break;
                            }
                        } else {
                            toCreate.push(newRegister);
                        }
                    }
                }
                if (!checkIfExistsAndUpdate && Utils.hasValue(toCreate)) {
                    let updateFields = Object.keys(tableClass.fields);
                    updateFields.shift();
                    let result = await tableClass.getModel().bulkCreate(toCreate,{
                        updateOnDuplicate:updateFields
                    });
                    if (result.length != toCreate.length) {
                        throw new Error(`created ${result.length} of ${toCreate.length}`);
                    }                
                }
            }
            return res.sendResponse(200,true);
        } catch (e) {
            res.setException(e);            
            return res.sendResponse(517,false);
        }
        Utils.logf(`${this.name}`,`integrate(${req.url})`);
    }
}

module.exports = {BaseRFBIntegrationsRegistersController}