
import Utils from "../../../../../dist/api/controllers/utils/Utils";
import ModelsController from "../../../../../dist/api/controllers/database/ModelsController";
import Action_Status from "../../../../../dist/api/controllers/modules/registers/Action_StatusController";

const stringTest = 'TEST';

describe(Action_Status.name, () => {
   
   
    beforeAll(async ()=>{
        await ModelsController.initModels();
    });

    //test class model name is correctly seted to table model name
    test('table class model name', () => {
        let tableClassModel = Action_Status.getTableClassModel();
        expect(Utils.hasValue(tableClassModel)).toBeTruthy();
        let tableModelClassName = tableClassModel?.name;
        expect(Utils.hasValue(tableModelClassName)).toBeTruthy();
        let tableName = tableClassModel?.tableName;
        expect(Utils.hasValue(tableName)).toBeTruthy();
        expect(tableModelClassName.trim().toLowerCase()).toEqual(tableName.trim().toLowerCase());
    });


    test('put', async () => {
        let result = await Action_Status._put({
            name: stringTest
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
    
        result = await Action_Status._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy()
        expect(result[0].name).toBe(stringTest);

    
    })

    test('get', async () => {
        let result = await Action_Status._get({
            where: { 
                name : stringTest 
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(stringTest);
    })

    test('patch', async () => {
        let id = null;

        let result = await Action_Status._get({
            where: { 
                name : stringTest 
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        result = await Action_Status._patch({
            where: {
                id: id
            },
            values:{
                name: `${stringTest}_UPDATED`,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await Action_Status._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();

        expect(result[0].name).toBe(`${stringTest}_UPDATED`);
    });


    test('delete', async () => {
        let id = null;

        let result = await Action_Status._get({
            where:{
                name: `${stringTest}_UPDATED`,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;
        
        
        result = await Action_Status._delete({
            where:{
                id:id,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await Action_Status._get({
            where:{
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeFalsy();
    });

})