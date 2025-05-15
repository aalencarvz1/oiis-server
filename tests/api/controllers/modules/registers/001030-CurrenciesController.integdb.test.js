import Utils from "../../../../../dist/api/controllers/utils/Utils";
import CurrenciesController from "../../../../../dist/api/controllers/modules/registers/CurrenciesController";
import HelperTestController from "../../HelperTestController";
import Currencies from "../../../../../dist/api/database/models/Currencies";

const stringTest = 'TEST_001030';

describe(CurrenciesController.name, () => {
   
   
    beforeAll(async ()=>{
       //await ModelsController.initModels();
       await HelperTestController.initBasicModels();
        await Currencies.initModel();
    });

    //test class model name is correctly seted to table model name
    test('table class model name', () => {
        let tableClassModel = CurrenciesController.getTableClassModel();
        expect(Utils.hasValue(tableClassModel)).toBeTruthy();
        let tableModelClassName = tableClassModel?.name;
        expect(Utils.hasValue(tableModelClassName)).toBeTruthy();
        let tableName = tableClassModel?.tableName;
        expect(Utils.hasValue(tableName)).toBeTruthy();
        expect(tableModelClassName.trim().toLowerCase()).toEqual(tableName.trim().toLowerCase());
    });

    test('put without data', async () => {
        let result = await CurrenciesController._put({}) 
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/^[a-z0-9._]+\s+cannot\s+be\s+null$/i);
    });


    test('put', async () => {

        let result = await CurrenciesController._put({
            name: stringTest
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
    
        result = await CurrenciesController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy()
        expect(result[0].name).toBe(stringTest);
    })

    test('put Duplicate', async () => {
        let result = await CurrenciesController._put({
            name:stringTest,
        })
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/^[a-z0-9._]+\s+must\s+be\s+unique$/);
    });

    test('get', async () => {
        let result = await CurrenciesController._get({
            where: { 
                name : stringTest 
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(stringTest);
    })

    test('patch', async () => {
        let id = null;

        let result = await CurrenciesController._get({
            where: { 
                name : stringTest 
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        result = await CurrenciesController._patch({
            where: {
                id: id
            },
            values:{
                name: `${stringTest}_UPDATED`,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await CurrenciesController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();

        expect(result[0].name).toBe(`${stringTest}_UPDATED`);
    

        //REVERT UPDATE

        result = await CurrenciesController._patch({
            where: {
                id: id
            },
            values:{
                name:stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
        //get register REVERTED updated to confirm if has uupdated
        result = await CurrenciesController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        //test persistency of updated register
        expect(result[0].name).toBe(stringTest);
    });


    test('delete', async () => {
        let id = null;

        let result = await CurrenciesController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;
        
        
        result = await CurrenciesController._delete({
            where:{
                id:id,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await CurrenciesController._get({
            where:{
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeFalsy();
    });

})