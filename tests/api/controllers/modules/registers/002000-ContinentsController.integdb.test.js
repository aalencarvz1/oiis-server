import Utils from "../../../../../dist/api/controllers/utils/Utils";
import ContinentsController from "../../../../../dist/api/controllers/modules/registers/ContinentsController";
import HelperTestController from "../../HelperTestController";
import Continents from "../../../../../dist/api/database/models/Continents";

const stringTest = 'TEST_001034';

describe(ContinentsController.name, () => {
   
   
    beforeAll(async ()=>{
       //await ModelsController.initModels();
       await HelperTestController.initBasicModels();
        await Continents.initModel();
    });

    //test class model name is correctly seted to table model name
    test('table class model name', () => {
        let tableClassModel = ContinentsController.getTableClassModel();
        expect(Utils.hasValue(tableClassModel)).toBeTruthy();
        let tableModelClassName = tableClassModel?.name;
        expect(Utils.hasValue(tableModelClassName)).toBeTruthy();
        let tableName = tableClassModel?.tableName;
        expect(Utils.hasValue(tableName)).toBeTruthy();
        expect(tableModelClassName.trim().toLowerCase()).toEqual(tableName.trim().toLowerCase());
    });

    test('put without data', async () => {
        let result = await ContinentsController._put({}) 
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/^[a-z0-9._]+\s+cannot\s+be\s+null$/i);
    });


    test('put', async () => {

        let result = await ContinentsController._put({
            name: stringTest
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
    
        result = await ContinentsController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy()
        expect(result[0].name).toBe(stringTest);
    })

    test('put Duplicate', async () => {
        let result = await ContinentsController._put({
            name:stringTest,
        })
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/^[a-z0-9._]+\s+must\s+be\s+unique$/);
    });

    test('get', async () => {
        let result = await ContinentsController._get({
            where: { 
                name : stringTest 
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(stringTest);
    })

    test('patch', async () => {
        let id = null;

        let result = await ContinentsController._get({
            where: { 
                name : stringTest 
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        result = await ContinentsController._patch({
            where: {
                id: id
            },
            values:{
                name: `${stringTest}_UPDATED`,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await ContinentsController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();

        expect(result[0].name).toBe(`${stringTest}_UPDATED`);
    

        //REVERT UPDATE

        result = await ContinentsController._patch({
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
        result = await ContinentsController._get({
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

        let result = await ContinentsController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;
        
        
        result = await ContinentsController._delete({
            where:{
                id:id,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await ContinentsController._get({
            where:{
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeFalsy();
    });

})