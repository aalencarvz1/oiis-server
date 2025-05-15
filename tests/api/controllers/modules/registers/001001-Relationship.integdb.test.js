import RelationshipsController from "../../../../../dist/api/controllers/modules/registers/RelationshipsController";
import Utils from "../../../../../dist/api/controllers/utils/Utils";
import Relationships from "../../../../../dist/api/database/models/Relationships";
import HelperTestController from "../../HelperTestController";

const stringTest = 'TEST_001001';

describe(RelationshipsController.name, () => {

    //initialize models, necessary to user controllers of models
    beforeAll(async ()=>{
        //await ModelsController.initModels();
        await HelperTestController.initBasicModels();
        await Relationships.initModel();
    });



    //test class model name is correctly seted to table model name
    test('table class model name', () => {
        let tableClassModel = RelationshipsController.getTableClassModel();
        expect(Utils.hasValue(tableClassModel)).toBeTruthy();
        let tableModelClassName = tableClassModel?.name;
        expect(Utils.hasValue(tableModelClassName)).toBeTruthy();
        let tableName = tableClassModel?.tableName;
        expect(Utils.hasValue(tableName)).toBeTruthy();
        expect(tableModelClassName.trim().toLowerCase()).toEqual(tableName.trim().toLowerCase());
    });

     test('put without data', async () => {
            let result = await RelationshipsController._put({}) 
            expect(Utils.hasValue(result)).toBeTruthy();
            expect(result.success).toBeFalsy();
            expect(result.message).toMatch(/^[a-z0-9._]+\s+cannot\s+be\s+null$/i);
        });
    

    //test put (insert)
    test('put', async () => {
        
      await HelperTestController.RelationShipsInsert(stringTest);
    });

    test('put Duplicate', async () => {
        let ResultRelationShipsTypes = await HelperTestController.RelationShipsTypesGet(stringTest);
        let ResultTable = await HelperTestController.TableGet(stringTest);

        let result = await RelationshipsController._put({
            
            relationship_type_id:ResultRelationShipsTypes[0].id,
            table_1_id:ResultTable[0].id,
            table_2_id:ResultTable[0].id,
            

            
        })
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/^[a-z0-9._]+\s+must\s+be\s+unique$/);
    });


    //test get (select) inserted register
    test('get', async () => {
        await HelperTestController.RelationShipsGet(stringTest);
    });    



    //test patch(update) inserted register    
    test('patch', async () => {
        let id = null;

        //get register to update, previous inserted by put test
        let result = await RelationshipsController._get({
            where:{
                description: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        //update register
         result = await RelationshipsController._patch({
            where: {
                id: id
            },
            values:{
                description: `${stringTest}_UPDATED`,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get register updated to confirm if has uupdated
        result = await RelationshipsController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();

        //test persistency of updated register
        expect(result[0].description).toBe(`${stringTest}_UPDATED`);


        ///
         //REVERT update register
         result = await RelationshipsController._patch({
            where: {
                id: id
            },
            values:{
                description: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get register REVERT updated to confirm if has uupdated
        result = await RelationshipsController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();

        //test persistency of updated register
        expect(result[0].description).toBe(stringTest);
    });



    //test delete inserted register
    test('delete', async () => {
        await HelperTestController.RelationShipsDelete(stringTest);
    });
    
});
