import Utils from "../../../../../dist/api/controllers/utils/Utils";
import ModelsController from "../../../../../dist/api/controllers/database/ModelsController";
import PeopleController from "../../../../../dist/api/controllers/modules/registers/PeopleController";
import HelperTestController from "../../HelperTestController";

const stringTest = 'TEST';
const stringDoc = '14.524.123-5';
describe(PeopleController.name, () => {
   
   
    beforeAll(async ()=>{
        await ModelsController.initModels();
    });

    //test class model name is correctly seted to table model name
    test('table class model name', () => {
        let tableClassModel = PeopleController.getTableClassModel();
        expect(Utils.hasValue(tableClassModel)).toBeTruthy();
        let tableModelClassName = tableClassModel?.name;
        expect(Utils.hasValue(tableModelClassName)).toBeTruthy();
        let tableName = tableClassModel?.tableName;
        expect(Utils.hasValue(tableName)).toBeTruthy();
        expect(tableModelClassName.trim().toLowerCase()).toEqual(tableName.trim().toLowerCase());
    });

    test('put without data', async () => {
        let result = await PeopleController._put({}) 
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/^[a-z0-9._]+\s+cannot\s+be\s+null$/i);
    });


    test('put', async () => {
       
       await HelperTestController.PeopleControllerInsert(stringTest,stringDoc);
    })

    test('put Duplicate', async () => {
        let InsertParent = await HelperTestController.Identifier_TypesGet(`${stringTest}_PEOPLE_INSERT`);

        let result = await PeopleController._put({
            name:stringTest,
            identifier_doc_type_id:InsertParent[0].id,
            identifier_doc: stringDoc
        })
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/^[a-z0-9._]+\s+must\s+be\s+unique$/);
    });

    test('get', async () => {
      await HelperTestController.PeopleControllerGet(stringTest,stringDoc)
    })

    test('patch', async () => {
        let InsertParent = await HelperTestController.Identifier_TypesGet(`${stringTest}_PEOPLE_INSERT`);
        let id = null;

        let result = await PeopleController._get({
            where: { 
                name: stringTest,
                identifier_doc_type_id:InsertParent[0].id,
                identifier_doc: stringDoc            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        result = await PeopleController._patch({
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

        result = await PeopleController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
       
        expect(result[0].name).toBe(`${stringTest}_UPDATED`);
        expect(result[0].identifier_doc).toBe(`${stringDoc}_UPDATED`)

        //REVERT UPDATE

        result = await PeopleController._patch({
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
        result = await PeopleController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        //test persistency of updated register
        expect(result[0].name).toBe(stringTest);
    });


    test('delete', async () => {
        await HelperTestController.PeopleControllerDelete(stringTest,stringDoc);
    });

})