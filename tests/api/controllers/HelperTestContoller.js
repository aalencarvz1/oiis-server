import Data_TypesController from "../../../dist/api/controllers/modules/registers/Data_TypesController";

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
    static async ParametersGet(parameter_id) {
        return await Data_TypesController._get({
            where:{
                parameter_id:parameter_id
            }
        })
    }

    static async ParametersInsert(parameter_id) {
        return await Data_TypesController._put({
                    parameter_id: parameter_id
                });
    }

    static async ParametersDelete(id) {
        return await Data_TypesController._delete({
            where:{
                id: id
            }
        })
    }
}