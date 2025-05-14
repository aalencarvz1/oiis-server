import TranslatesController from "../../../../../dist/api/controllers/modules/registers/TranslatesController";
import Utils from "../../../../../dist/api/controllers/utils/Utils";
import Translates from "../../../../../dist/api/database/models/Translates";
import HelperTestController from "../../HelperTestController";

const stringTest = 'TEST_000250';

describe(TranslatesController.name, () => {

    //initialize models, necessary to user controllers of models
    beforeAll(async ()=>{
        //await ModelsController.initModels();
        await HelperTestController.initBasicModels();
        await Translates.initModel();
    });



    //test class model name is correctly seted to table model name
    test('table class model name', () => {
        let tableClassModel = TranslatesController.getTableClassModel();
        expect(Utils.hasValue(tableClassModel)).toBeTruthy();
        let tableModelClassName = tableClassModel?.name;
        expect(Utils.hasValue(tableModelClassName)).toBeTruthy();
        let tableName = tableClassModel?.tableName;
        expect(Utils.hasValue(tableName)).toBeTruthy();
        expect(tableModelClassName.trim().toLowerCase()).toEqual(tableName.trim().toLowerCase());
    });

     test('put without data', async () => {
            let result = await TranslatesController._put({}) 
            expect(Utils.hasValue(result)).toBeTruthy();
            expect(result.success).toBeFalsy();
            expect(result.message).toMatch(/^[a-z0-9._]+\s+cannot\s+be\s+null$/i);
        });
    

    //test put (insert)
    test('put', async () => {
       
       let textResult = await HelperTestController.TextInsert(stringTest);

        let result = await TranslatesController._put({
        
                language_id:textResult[0].language_id,
                text_id:textResult[0].id,
                translated:stringTest
            
        })
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
    });

    test('put Duplicate', async () => {
        let TextResult = await HelperTestController.TextGet(stringTest);

        let result = await TranslatesController._put({
            
            language_id:TextResult[0].language_id,
            text_id:TextResult[0].id,
            translated:stringTest,
            
        })
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/^[a-z0-9._]+\s+must\s+be\s+unique$/);
    });


    //test get (select) inserted register
    test('get', async () => {
        let textResult = await HelperTestController.TextGet(stringTest);
        

        let result = await TranslatesController._get({
            where:{
                language_id:textResult[0].language_id,
                text_id:textResult[0].id,
                translated:stringTest
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].translated).toBe(stringTest);
    });    



    //test patch(update) inserted register    
    test('patch', async () => {
        let id = null;

        //get register to update, previous inserted by put test
        let result = await TranslatesController._get({
            where:{
                translated: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        //update register
         result = await TranslatesController._patch({
            where: {
                id: id
            },
            values:{
                translated: `${stringTest}_UPDATED`,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get register updated to confirm if has uupdated
        result = await TranslatesController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();

        //test persistency of updated register
        expect(result[0].translated).toBe(`${stringTest}_UPDATED`);


        ///
         //REVERT update register
         result = await TranslatesController._patch({
            where: {
                id: id
            },
            values:{
                translated: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get register REVERT updated to confirm if has uupdated
        result = await TranslatesController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();

        //test persistency of updated register
        expect(result[0].translated).toBe(stringTest);
    });



    //test delete inserted register
    test('delete', async () => {
       
        let id = null;

        //get register to delete, previous inserted by put test
        let result = await TranslatesController._get({
            where:{
                translated: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        //update register
        result = await TranslatesController._delete({
            where: {
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get register updated to confirm if has uupdated
        result = await TranslatesController._get({
            where:{
                id:id
            }
        });

        //test persistensy of delete
        expect(Utils.hasValue(result)).toBeFalsy();
       
        await HelperTestController.TextDelete(stringTest);
        await HelperTestController.LanguagensDelete(stringTest);
        

    });
    
});
