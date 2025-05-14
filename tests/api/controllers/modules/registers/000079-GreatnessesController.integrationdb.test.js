import Utils from "../../../../../dist/api/controllers/utils/Utils";
import GreatnessesController from "../../../../../dist/api/controllers/modules/registers/GreatnessesController";
import HelperTestController from "../../HelperTestController";
import Greatnesses from "../../../../../dist/api/database/models/Greatnesses";

const stringTest = 'TEST_000079';
const sigla = 'TST';
describe(GreatnessesController.name, () => {
   
   
    beforeAll(async ()=>{
        //await ModelsController.initModels();
        await HelperTestController.initBasicModels();
        await Greatnesses.initModel();
    });

    //test class model name is correctly seted to table model name
    test('table class model name', () => {
        let tableClassModel = GreatnessesController.getTableClassModel();
        expect(Utils.hasValue(tableClassModel)).toBeTruthy();
        let tableModelClassName = tableClassModel?.name;
        expect(Utils.hasValue(tableModelClassName)).toBeTruthy();
        let tableName = tableClassModel?.tableName;
        expect(Utils.hasValue(tableName)).toBeTruthy();
        expect(tableModelClassName.trim().toLowerCase()).toEqual(tableName.trim().toLowerCase());
    });

    test('put without data', async () => {
        let result = await GreatnessesController._put({}) 
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/^[a-z0-9._]+\s+cannot\s+be\s+null$/i);
    });

    //Insert data in table
    test('put', async () => {
        await HelperTestController.GreatnessesControllerInsert(stringTest,sigla)
    })

    test('put Duplicate', async () => {
        let result = await GreatnessesController._put({
            name:stringTest,
            sigla: sigla
        })
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/^[a-z0-9._]+\s+must\s+be\s+unique$/);
    });

    test('get', async () => {
        await HelperTestController.GreatnessesControllerGet(stringTest,sigla)
    })

    test('patch', async () => {
        let id = null;

        let result = await GreatnessesController._get({
            where: { 
                name : stringTest,
                sigla: sigla
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        result = await GreatnessesController._patch({
            where: {
                id: id
            },
            values:{
                name: `${stringTest}_UPDATED`,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await GreatnessesController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();

        expect(result[0].name).toBe(`${stringTest}_UPDATED`);
    

        //REVERT UPDATE

        result = await GreatnessesController._patch({
            where: {
                id: id
            },
            values:{
                name:stringTest,
                sigla: sigla
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
        //get register REVERTED updated to confirm if has uupdated
        result = await GreatnessesController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        //test persistency of updated register
        expect(result[0].name).toBe(stringTest);
    });


    test('delete', async () => {
        await HelperTestController.GreatnessesControllerDelete(stringTest,sigla)
    });

})