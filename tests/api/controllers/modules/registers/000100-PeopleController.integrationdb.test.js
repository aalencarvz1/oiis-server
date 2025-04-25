import Utils from "../../../../../dist/api/controllers/utils/Utils";
import ModelsController from "../../../../../dist/api/controllers/database/ModelsController";
import People from "../../../../../dist/api/controllers/modules/registers/PeopleController";
import HelperTestController from "../../HelperTestController";

const stringTest = 'TEST';
const stringDoc = '14.524.123-5';
describe(People.name, () => {
   
   
    beforeAll(async ()=>{
        await ModelsController.initModels();

        await HelperTestController.Identifier_TypesInsert(stringTest);
    });

    //test class model name is correctly seted to table model name
    test('table class model name', () => {
        let tableClassModel = People.getTableClassModel();
        expect(Utils.hasValue(tableClassModel)).toBeTruthy();
        let tableModelClassName = tableClassModel?.name;
        expect(Utils.hasValue(tableModelClassName)).toBeTruthy();
        let tableName = tableClassModel?.tableName;
        expect(Utils.hasValue(tableName)).toBeTruthy();
        expect(tableModelClassName.trim().toLowerCase()).toEqual(tableName.trim().toLowerCase());
    });

    test('put without data', async () => {
        let result = await People._put({}) 
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/^[a-z0-9._]+\s+cannot\s+be\s+null$/i);
    });


    test('put', async () => {
       
        let InsertParent = await HelperTestController.Identifier_TypesGet(stringTest);

        let result = await People._put({
            name: stringTest,
            identifier_doc_type_id:InsertParent[0].id,
            identifier_doc: stringDoc
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
    
        result = await People._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy()
        expect(result[0].name).toBe(stringTest);
    })

    test('put Duplicate', async () => {
        let InsertParent = await HelperTestController.Identifier_TypesGet(stringTest);

        let result = await People._put({
            name:stringTest,
            identifier_doc_type_id:InsertParent[0].id,
            identifier_doc: stringDoc
        })
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/^[a-z0-9._]+\s+must\s+be\s+unique$/);
    });

    test('get', async () => {
        let result = await People._get({
            where: { 
                name: stringTest,
                identifier_doc: stringDoc
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(stringTest);
    })

    test('patch', async () => {
        let id = null;

        let result = await People._get({
            where: { 
                name: stringTest,
                identifier_doc: stringDoc            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        result = await People._patch({
            where: {
                id: id
            },
            values:{
                name: `${stringTest}_UPDATED`,
                identifier_doc: `${stringDoc}_UPDATED`
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await People._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
       
        expect(result[0].name).toBe(`${stringTest}_UPDATED`);
        expect(result[0].identifier_doc).toBe(`${stringDoc}_UPDATED`)

        //REVERT UPDATE

        result = await People._patch({
            where: {
                id: id
            },
            values:{
                name:stringTest,
                identifier_doc:stringDoc
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
        //get register REVERTED updated to confirm if has uupdated
        result = await People._get({
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

        let result = await People._get({
            where:{
                name: stringTest,
                identifier_doc: stringDoc
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;
        
        
        result = await People._delete({
            where:{
                id:id,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await People._get({
            where:{
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeFalsy();
    });

    afterAll(async() => {
        await HelperTestController.Identifier_TypesDelete(stringTest);
    })

})