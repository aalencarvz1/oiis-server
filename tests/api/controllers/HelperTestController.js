import Data_TypesController from "../../../dist/api/controllers/modules/registers/Data_TypesController";
import GreatnessesController from "../../../dist/api/controllers/modules/registers/GreatnessesController";
import ParametersController from "../../../dist/api/controllers/modules/registers/ParametersController";
import Parameters_ValueController from "../../../dist/api/controllers/modules/registers/Parameter_ValuesController";
import Utils from "../../../dist/api/controllers/utils/Utils";
import Identifier_TypesController from "../../../dist/api/controllers/modules/registers/Identifier_TypesController";

export default class HelperTestController {
    //Get Data_types
    static async Data_TypesGet(name) {
        return await Data_TypesController._get({
            where:{
                name:name
            }
        })
    }
    //Insert Data_types
    static async Data_TypesInsert(name,checkResult) {
        let result = await Data_TypesController._put({
                    name: name
        });
        if(checkResult){
            expect(Utils.hasValue(result)).toBeTruthy();
            expect(result.success).toBeTruthy();
        
            result = await Data_TypesController._get({
                where:{
                    name: name,
                }
            });
            expect(Utils.hasValue(result)).toBeTruthy()
            expect(result[0].name).toBe(name);
        }
        return result;
    }
    //Delete Data_types
    static async Data_TypesDelete(id) {
        return await Data_TypesController._delete({
            where:{
                id: id
            }
        })
    }
    //Get Parameters
    static async ParametersGet(name) {
        return await ParametersController._get({
            where:{
                name:name
            }
        })
    }
    //Insert Parameters
    static async ParametersInsert(parameter_id) {
        return await ParametersController._put({
                    parameter_id: parameter_id
                });
    }
    //Delete Parameters
    static async ParametersDelete(id) {
        return await ParametersController._delete({
            where:{
                id: id
            }
        })
    }
    //Insert Parameters_ValuesController
    static async ParameterCompletInsert(name) {
        let resultDataType = await HelperTestController.Data_TypesInsert(`${name}_parent`)
        expect(Utils.hasValue(resultDataType)).toBeTruthy()
        expect(resultDataType.success).toBeTruthy()
        
        //create table register
        let result = await ParametersController._put({
            name: name,
            data_type_id: resultDataType.data.id
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
    
        let resultGet = await ParametersController._get({
            where:{
                name: name,
                data_type_id: resultDataType.data.id
            }
        });
        expect(Utils.hasValue(resultGet)).toBeTruthy();
        expect(resultGet[0].name).toBe(name);

        return result;
    }
    //Delete Parameters_ValuesController
    static async ParameterCompletDelete(name) {
        let id = null;
        let resultDataType = await HelperTestController.Data_TypesGet(`${name}_PARENT`)
        expect(Utils.hasValue(resultDataType)).toBeTruthy()
        

        let result = await ParametersController._get({
            where:{
                name: name,
                data_type_id: resultDataType[0].id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;
        
        
        result = await ParametersController._delete({
            where:{
                id:id,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await ParametersController._get({
            where:{
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeFalsy();

        //delete table register (Data_Type)
        await HelperTestController.Data_TypesDelete(resultDataType[0].id)
    }
    //Insert Greatnesses
    static async GreatnessesControllerInsert(stringTest,sigla){
        let result = await GreatnessesController._put({
            name: stringTest,
            sigla: sigla
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
    
        result = await GreatnessesController._get({
            where:{
                name: stringTest,
                sigla: sigla
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy()
        expect(result[0].name).toBe(stringTest);

        return result;
    }
  
    static async GreatnessesControllerGet(stringTest,sigla){
          let result = await GreatnessesController._get({
            where: { 
                name : stringTest,
                sigla: sigla
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(stringTest);
        return result;
    }



    //Delete Greatnesses
    static async GreatnessesControllerDelete(stringTest,sigla){
        let id = null;

        let result = await GreatnessesController._get({
            where:{
                name: stringTest,
                sigla: sigla
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;
        
        
        result = await GreatnessesController._delete({
            where:{
                id:id,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await GreatnessesController._get({
            where:{
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeFalsy();
    }
    //Insert Parameters_ValuesController
    
    //Get Parameters_ValuesController
    static async Parameters_ValuesControllerGet(stringTest){
        let resultGetParameter = await HelperTestController.ParametersGet(`${stringTest}_PARENT`)
        expect(Utils.hasValue(resultGetParameter)).toBeTruthy();


        //search table register
        let result = await Parameters_ValueController._get({
            where: { 
                parameter_id : resultGetParameter[0].id,
                
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].parameter_id).toBe(resultGetParameter[0].id);
    }
    //Delete parameters_ValuesController
    static async Parameters_ValuesControllerDelete(stringTest){
        let id = null;

        let result = await Parameters_ValueController._get({
            where:{
                value: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;
        
        
        result = await Parameters_ValueController._delete({
            where:{
                id:id,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await Parameters_ValueController._get({
            where:{
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeFalsy();

        //delete table register (Data_Type)
        await HelperTestController.ParameterCompletDelete(`${stringTest}_PARENT`)
    }

    //Insert Identifier_Types
    static async Identifier_TypesInsert(stringTest){
         let result = await Identifier_TypesController._put({
            name: stringTest
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
    
        result = await Identifier_TypesController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy()
        expect(result[0].name).toBe(stringTest);
        return result;
    }

    //Get Identifier_Types
    static async Identifier_TypesGet(stringTest){
          let result = await Identifier_TypesController._get({
            where: { 
                name : stringTest 
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(stringTest);
        return result;
    }
    //Delete Identifer
    static async Identifier_TypesDelete(stringTest){
        let id = null;

        let result = await Identifier_TypesController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;
        
        
        result = await Identifier_TypesController._delete({
            where:{
                id:id,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await Identifier_TypesController._get({
            where:{
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeFalsy();
    }
}