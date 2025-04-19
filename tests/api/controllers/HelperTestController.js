import Data_TypesController from "../../../dist/api/controllers/modules/registers/Data_TypesController";
import GreatnessesController from "../../../dist/api/controllers/modules/registers/GreatnessesController";
import ParametersController from "../../../dist/api/controllers/modules/registers/ParametersController";
import Utils from "../../../dist/api/controllers/utils/Utils";

export default class HelperTestController {

    static async Data_TypesGet(name) {
        return await Data_TypesController._get({
            where:{
                name:name
            }
        })
    }

    static async Data_TypesInsert(name) {
        return await Data_TypesController._put({
                    name: name
                });
    }

    static async Data_TypesDelete(id) {
        return await Data_TypesController._delete({
            where:{
                id: id
            }
        })
    }
    static async ParametersGet(name) {
        return await ParametersController._get({
            where:{
                name:name
            }
        })
    }

    static async ParametersInsert(parameter_id) {
        return await ParametersController._put({
                    parameter_id: parameter_id
                });
    }

    static async ParametersDelete(id) {
        return await ParametersController._delete({
            where:{
                id: id
            }
        })
    }
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
        expect(Utils.hasValue(resultGet)).toBeTruthy()
        expect(resultGet[0].name).toBe(name);

        return result;
    }

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
    //Insert table register (000080-Greatnesses)
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
    }
}