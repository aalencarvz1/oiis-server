import TextsController from "../../../../../dist/api/controllers/modules/registers/TextsController";
import Utils from "../../../../../dist/api/controllers/utils/Utils";
import Texts from "../../../../../dist/api/database/models/Texts";
import HelperTestController from "../../HelperTestController";

const stringTest = 'TEST_TEXT';

describe(TextsController.name, () => {

    //initialize models, necessary to user controllers of models
    beforeAll(async ()=>{
        //await ModelsController.initModels();
        await HelperTestController.initBasicModels();
        await Texts.initModel();
    });



    //test class model name is correctly seted to table model name
    test('table class model name', () => {
        let tableClassModel = TextsController.getTableClassModel();
        expect(Utils.hasValue(tableClassModel)).toBeTruthy();
        let tableModelClassName = tableClassModel?.name;
        expect(Utils.hasValue(tableModelClassName)).toBeTruthy();
        let tableName = tableClassModel?.tableName;
        expect(Utils.hasValue(tableName)).toBeTruthy();
        expect(tableModelClassName.trim().toLowerCase()).toEqual(tableName.trim().toLowerCase());
    });

     test('put without data', async () => {
            let result = await TextsController._put({}) 
            expect(Utils.hasValue(result)).toBeTruthy();
            expect(result.success).toBeFalsy();
            expect(result.message).toMatch(/^[a-z0-9._]+\s+cannot\s+be\s+null$/i);
        });
    

    //test put (insert)
    test('put', async () => {
        
        await HelperTestController.TextInsert(stringTest);
    });
    test('put Duplicate', async () => {
        let TextResult = await HelperTestController.TextGet(stringTest);

        let result = await TextsController._put({
            
            language_id:TextResult[0].language_id,
            text:stringTest,
            
        })
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/^[a-z0-9._]+\s+must\s+be\s+unique$/);
    });


    //test get (select) inserted register
    test('get', async () => {
       await HelperTestController.TextGet(stringTest);
    });    



    //test patch(update) inserted register    
    test('patch', async () => {
        let id = null;

        //get register to update, previous inserted by put test
        let result = await TextsController._get({
            where:{
                text: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        //update register
        result = await TextsController._patch({
            where: {
                id: id
            },
            values:{
                text: `${stringTest}_UPDATED`,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get register updated to confirm if has uupdated
        result = await TextsController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();

        //test persistency of updated register
        expect(result[0].text).toBe(`${stringTest}_UPDATED`);


        ///
         //REVERT update register
         result = await TextsController._patch({
            where: {
                id: id
            },
            values:{
                text: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get register REVERT updated to confirm if has uupdated
        result = await TextsController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();

        //test persistency of updated register
        expect(result[0].text).toBe(stringTest);
    });



    //test delete inserted register
    test('delete', async () => {
        await HelperTestController.TextDelete(stringTest);
        await HelperTestController.LanguagensDelete(stringTest);
    });
    
});
