
import Utils from "../../../../../dist/api/controllers/utils/Utils";
import ModelsController from "../../../../../dist/api/controllers/database/ModelsController";
import ParametersController from "../../../../../dist/api/controllers/modules/registers/ParametersController";
import HelperTestController from "../../HelperTestController";

const stringTest = 'TEST1';

describe(ParametersController.name, () => {
   
   
    beforeAll(async ()=>{
        await ModelsController.initModels();
    });

    //test class model name is correctly seted to table model name
    test('table class model name', () => {
        let tableClassModel = ParametersController.getTableClassModel();
        expect(Utils.hasValue(tableClassModel)).toBeTruthy();
        let tableModelClassName = tableClassModel?.name;
        expect(Utils.hasValue(tableModelClassName)).toBeTruthy();
        let tableName = tableClassModel?.tableName;
        expect(Utils.hasValue(tableName)).toBeTruthy();
        expect(tableModelClassName.trim().toLowerCase()).toEqual(tableName.trim().toLowerCase());
    });

     test('put without data', async () => {
                let result = await HelperTestController.ParametersInsert({}) 
                expect(Utils.hasValue(result)).toBeTruthy();
                expect(result.success).toBeFalsy();
                expect(result.message).toMatch(/^[a-z0-9._]+\s+cannot\s+be\s+null$/i);
            });


     test('put', async () => {
        //Create parent register(Data_Types)
        await HelperTestController.ParameterCompletInsert(stringTest)
    })
    test('put Duplicate', async () => {
        let result = await ParametersController._put({
            name:stringTest,
        })
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/^[a-z0-9._]+\s+cannot\s+be\s+null$/i);
    });



    test('get', async () => {
        //search parent register(Data_Types)
        let resultDataType = await HelperTestController.Data_TypesGet(`${stringTest}_parent`)
        expect(Utils.hasValue(resultDataType)).toBeTruthy()
        
        //search table register
        let result = await ParametersController._get({
            where: { 
                name : stringTest,
                data_type_id: resultDataType[0].id,
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
        let result = await ParametersController._get({
            where: { 
                name : stringTest,
                data_type_id: resultDataType[0].id 
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;


        //update table register
        result = await ParametersController._patch({
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
        result = await ParametersController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(`${stringTest}_UPDATED`);

        //             //                   //
        //REVERT update table register
        result = await ParametersController._patch({
            where: {
                id: id,
            },
            values:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

         //get register REVERTED updated to confirm if has uupdated
        result = await ParametersController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        //test persistency of updated register
        expect(result[0].name).toBe(stringTest);
    });

    //delete table register
    test('delete', async () => {
        await HelperTestController.ParameterCompletDelete(stringTest);
    });
})