
import Utils from "../../../../../dist/api/controllers/utils/Utils";
import ModelsController from "../../../../../dist/api/controllers/database/ModelsController";
import Parameters from "../../../../../dist/api/controllers/modules/registers/ParametersController";
import HelperTestController from "../../HelperTestContoller";

const stringTest = 'TEST';

describe(Parameters.name, () => {
   
   
    beforeAll(async ()=>{
        await ModelsController.initModels();
    });

    //test class model name is correctly seted to table model name
    test('table class model name', () => {
        let tableClassModel = Parameters.getTableClassModel();
        expect(Utils.hasValue(tableClassModel)).toBeTruthy();
        let tableModelClassName = tableClassModel?.name;
        expect(Utils.hasValue(tableModelClassName)).toBeTruthy();
        let tableName = tableClassModel?.tableName;
        expect(Utils.hasValue(tableName)).toBeTruthy();
        expect(tableModelClassName.trim().toLowerCase()).toEqual(tableName.trim().toLowerCase());
    });


    test('put', async () => {
        //Create parent register(Data_Types)
        let resultDataType = await HelperTestController.Data_TypesInsert(`${stringTest}_parent`)
        expect(Utils.hasValue(resultDataType)).toBeTruthy()
        expect(resultDataType.success).toBeTruthy()
        
        //create table register
        let result = await Parameters._put({
            name: stringTest,
            data_type_id: resultDataType.data.id
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
    
        result = await Parameters._get({
            where:{
                name: stringTest,
                data_type_id: resultDataType.data.id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy()
        expect(result[0].name).toBe(stringTest);
    })



    test('get', async () => {
        //search parent register(Data_Types)
        let resultDataType = await HelperTestController.Data_TypesGet(`${stringTest}_parent`)
        expect(Utils.hasValue(resultDataType)).toBeTruthy()
        
        //search table register
        let result = await Parameters._get({
            where: { 
                name : stringTest,
                data_type_id: resultDataType[0].id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(stringTest);
    })
        //update table register
    test('patch', async () => {
        
        //search parent register(Data_Types)
        let resultDataType = await HelperTestController.Data_TypesGet(`${stringTest}_parent`)
        expect(Utils.hasValue(resultDataType)).toBeTruthy()
       
        //search table register
        let id = null;
        let result = await Parameters._get({
            where: { 
                name : stringTest,
                data_type_id: resultDataType[0].id 
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;


        //update table register
        result = await Parameters._patch({
            where: {
                id: id,
            },
            values:{
                name: `${stringTest}_UPDATED`,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //search table register
        result = await Parameters._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(`${stringTest}_UPDATED`);
    });

    //delete table register
    test('delete', async () => {
        
        let id = null;
        let resultDataType = await HelperTestController.Data_TypesGet(`${stringTest}_parent`)
        expect(Utils.hasValue(resultDataType)).toBeTruthy()
        

        let result = await Parameters._get({
            where:{
                name: `${stringTest}_UPDATED`,
                data_type_id: resultDataType[0].id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;
        
        
        result = await Parameters._delete({
            where:{
                id:id,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await Parameters._get({
            where:{
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeFalsy();

        //delete table register (Data_Type)
        await HelperTestController.Data_TypesDelete(resultDataType[0].id)
    
    });
})