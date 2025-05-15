import Relationship_ValuesController from "../../../../../dist/api/controllers/modules/registers/Relationship_ValuesController";
import Utils from "../../../../../dist/api/controllers/utils/Utils";
import Relationship_Values from "../../../../../dist/api/database/models/Relationship_Values";
import HelperTestController from "../../HelperTestController";

const stringTest = 'TEST_001003';

describe(Relationship_ValuesController.name, () => {

    //initialize models, necessary to user controllers of models
    beforeAll(async ()=>{
        //await ModelsController.initModels();
        await HelperTestController.initBasicModels();
        await Relationship_Values.initModel();
    });



    //test class model name is correctly seted to table model name
    test('table class model name', () => {
        let tableClassModel = Relationship_ValuesController.getTableClassModel();
        expect(Utils.hasValue(tableClassModel)).toBeTruthy();
        let tableModelClassName = tableClassModel?.name;
        expect(Utils.hasValue(tableModelClassName)).toBeTruthy();
        let tableName = tableClassModel?.tableName;
        expect(Utils.hasValue(tableName)).toBeTruthy();
        expect(tableModelClassName.trim().toLowerCase()).toEqual(tableName.trim().toLowerCase());
    });

     test('put without data', async () => {
            let result = await Relationship_ValuesController._put({}) 
            expect(Utils.hasValue(result)).toBeTruthy();
            expect(result.success).toBeFalsy();
            expect(result.message).toMatch(/^[a-z0-9._]+\s+cannot\s+be\s+null$/i);
        });
    

    //test put (insert)
    test('put', async () => {
      await HelperTestController.complementRelationShip_ValueInsert(stringTest);
    });
    

    test('put Duplicate', async () => {
        let Relationship_ValuesResultInsert = await HelperTestController.complementRelationShip_ValueGet(stringTest);

        let result = await Relationship_ValuesController._put({
            data_relationship_id:Relationship_ValuesResultInsert[0].data_relationship_id,
            identifier_type_id:Relationship_ValuesResultInsert[0].identifier_type_id,
            data_type_id:Relationship_ValuesResultInsert[0].data_type_id,
            value:stringTest
        })
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/^[a-z0-9._]+\s+must\s+be\s+unique$/);
    });


    //test get (select) inserted register
    test('get', async () => {
        await HelperTestController.complementRelationShip_ValueGet(stringTest);
    });    



    //test patch(update) inserted register    
    test('patch', async () => {
        let id = null;

        //get register to update, previous inserted by put test
        let result = await Relationship_ValuesController._get({
            where:{
                value: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        //update register
         result = await Relationship_ValuesController._patch({
            where: {
                id: id
            },
            values:{
                value: `${stringTest}_UPDATED`,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get register updated to confirm if has uupdated
        result = await Relationship_ValuesController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();

        //test persistency of updated register
        expect(result[0].value).toBe(`${stringTest}_UPDATED`);


        ///
         //REVERT update register
         result = await Relationship_ValuesController._patch({
            where: {
                id: id
            },
            values:{
                value: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get register REVERT updated to confirm if has uupdated
        result = await Relationship_ValuesController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();

        //test persistency of updated register
        expect(result[0].value).toBe(stringTest);
    });



    //test delete inserted register
    test('delete', async () => {
        await HelperTestController.complementRelationShip_ValueDelete(stringTest);
    });
    
});
