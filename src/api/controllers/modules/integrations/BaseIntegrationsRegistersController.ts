import DataSwap from "../../data/DataSwap.js";
import Utils from "../../utils/Utils.js";

export default class BaseIntegrationsRegistersController {
    /**
     * generic method to integrate winthor register
     * @static
     * @async     
     * @param {Object} params 
     * @returns {DataSwap}
     * @created 2024-02-03
     */
    static async integrateRegisters(params: any) : Promise<any> {
        let result = new DataSwap();
        try {
            if (params.registersIds) {
                if (Utils.typeOf(params.registersIds) != 'array') params.registersIds = params.registersIds.toString().split(',');
                if (typeof params.getIntegratedsByOriginIds == 'function') {
                    result.data = await params.getIntegratedsByOriginIds(params.registersIds,{raw:params.getDataToUpdate?false:true});
                    if (result.data && result.data.length > 0) {

                        //update preexistent registers
                        if (params.getDataToUpdate) {
                            for(let k in result.data) {
                                let dataToUpdate = await params.getDataToUpdate(result.data[k]?.dataValues || result.data[k]);
                                
                                if (dataToUpdate && dataToUpdate.length > 0) {
                                    let hasUpdate = false;
                                    for(let k2 in dataToUpdate[0]) {
                                        if (k2 != 'id' && result.data[k][k2] != dataToUpdate[0][k2]) {
                                            result.data[k][k2] = dataToUpdate[0][k2];
                                            hasUpdate = true;
                                        }
                                    }
                                    if (hasUpdate) await result.data[k].save();
                                }
                            } 
                        }

                        //all registers preexists
                        if (result.data.length == params.registersIds.length) {                            
                            if (params?.raw !== false && params.getDataToUpdate) {
                                for(let k in result.data) {
                                    result.data[k] = result.data[k].dataValues;
                                }
                            }
                            result.success = true;
                        } else {
                            //some registers preexists and some registers not exists
                            let toCreate = [];
                            for(let k in params.registersIds) {
                                let preExists = await params.getIntegratedsByOriginIds([params.registersIds[k]]);
                                if (!(preExists && preExists.length > 0)) {
                                    toCreate.push(params.registersIds[k]); 
                                }
                            }                            
                            if (toCreate.length > 0) {
                                let newParams : any = {};
                                for(let k in params) {
                                    newParams[k] = params[k];
                                }
                                newParams.registersIds = toCreate;

                                //recurse with only not preexists registers
                                await BaseIntegrationsRegistersController.integrateRegisters(newParams);


                                result.data = await params.getIntegratedsByOriginIds(params.registersIds,{raw:Utils.firstValid([params?.raw,true])});
                                if (result.data && result.data.length > 0) {
                                    if (result.data.length == params.registersIds.length) {
                                        result.success = true;
                                    } else {
                                        throw new Error('some of the records were not created');
                                    }
                                } else {
                                    throw new Error('records were not created');
                                }
                            } else {
                                throw new Error('not has registers to create');
                            }
                        }
                    } else {

                        //create if all registers not exists
                        if (typeof params.getBulkDataToCreate == 'function') {
                            let bulkRegs = await params.getBulkDataToCreate(params.registersIds);
                            if (bulkRegs && bulkRegs.length) {
                                if (params.tableClassModel) {
                                    await params.tableClassModel.bulkCreate(bulkRegs);
                                    result.data = await params.getIntegratedsByOriginIds(params.registersIds,{raw:Utils.firstValid([params?.raw,true])});
                                    if (result.data && result.data.length > 0) {
                                        if (result.data.length == params.registersIds.length) {
                                            result.success = true;
                                        } else {
                                            throw new Error('some of the records were not created');
                                        } 
                                    } else {
                                        throw new Error('records were not created');
                                    }
                                } else {
                                    throw new Error('missing parameter property (params.tableClassModel)');            
                                }
                            } else {
                                throw new Error('obted bulk registers is empty');
                            }
                        } else {
                            throw new Error('missing parameter property (params.getBulkDataToCreate)');    
                        }
                    }
                } else {
                    throw new Error('missing parameter property (params.getIntegratedsByOriginIds)');    
                }
            } else {
                throw new Error('missing parameter property (params.registersIds)');
            }
        } catch (e) {
            result.setException(e);
        }
        return result;
    }
}