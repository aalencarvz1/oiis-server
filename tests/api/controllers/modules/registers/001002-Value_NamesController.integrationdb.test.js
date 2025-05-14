import Value_NamesController from "../../../../../dist/api/controllers/modules/registers/Value_NamesController";
import Utils from "../../../../../dist/api/controllers/utils/Utils";
import Value_Names from "../../../../../dist/api/database/models/Value_Names";
import HelperTestController from "../../HelperTestController";

const stringTest = 'TEST_001002';

describe(Value_NamesController.name, () => {

    //initialize models, necessary to user controllers of models
    beforeAll(async ()=>{
        //await ModelsController.initModels();
        await HelperTestController.initBasicModels();
        await Value_Names.initModel();
    });



    //test class model name is correctly seted to table model name
    test('table class model name', () => {
        let tableClassModel = Value_NamesController.getTableClassModel();
        expect(Utils.hasValue(tableClassModel)).toBeTruthy();
        let tableModelClassName = tableClassModel?.name;
        expect(Utils.hasValue(tableModelClassName)).toBeTruthy();
        let tableName = tableClassModel?.tableName;
        expect(Utils.hasValue(tableName)).toBeTruthy();
        expect(tableModelClassName.trim().toLowerCase()).toEqual(tableName.trim().toLowerCase());
    });

     test('put without data', async () => {
            let result = await Value_NamesController._put({}) 
            expect(Utils.hasValue(result)).toBeTruthy();
            expect(result.success).toBeFalsy();
            expect(result.message).toMatch(/^[a-z0-9._]+\s+cannot\s+be\s+null$/i);
        });
    

    //test put (insert)
    test('put', async () => {
        let result = await Value_NamesController._put({
            name:stringTest,
        })
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
    });

    test('put Duplicate', async () => {

        let result = await Value_NamesController._put({
    
            name:stringTest,
            
        })
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/^[a-z0-9._]+\s+must\s+be\s+unique$/);
    });


    //test get (select) inserted register
    test('get', async () => {
        let result = await Value_NamesController._get({
            where:{
                name:stringTest
            }
        })
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(stringTest);
    });    



    //test patch(update) inserted register    
    test('patch', async () => {
        let id = null;

        //get register to update, previous inserted by put test
        let result = await Value_NamesController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        //update register
         result = await Value_NamesController._patch({
            where: {
                id: id
            },
            values:{
                name: `${stringTest}_UPDATED`,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get register updated to confirm if has uupdated
        result = await Value_NamesController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();

        //test persistency of updated register
        expect(result[0].name).toBe(`${stringTest}_UPDATED`);


        ///
         //REVERT update register
         result = await Value_NamesController._patch({
            where: {
                id: id
            },
            values:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get register REVERT updated to confirm if has uupdated
        result = await Value_NamesController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();

        //test persistency of updated register
        expect(result[0].name).toBe(stringTest);
    });



    //test delete inserted register
    test('delete', async () => {
       
        let id = null;

        //get register to delete, previous inserted by put test
        let result = await Value_NamesController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        //update register
        result = await Value_NamesController._delete({
            where: {
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get register updated to confirm if has uupdated
        result = await Value_NamesController._get({
            where:{
                id:id
            }
        });

        //test persistensy of delete
        expect(Utils.hasValue(result)).toBeFalsy();

    });
    
});
