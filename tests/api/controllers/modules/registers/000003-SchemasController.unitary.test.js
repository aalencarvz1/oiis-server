import SchemasController from "../../../../../dist/api/controllers/modules/registers/SchemasController";
import Utils from "../../../../../dist/api/controllers/utils/Utils";
import ModelsController from "../../../../../dist/api/controllers/database/ModelsController";

const stringTest = 'TEST';

describe(SchemasController.name, () => {

    //initialize models, necessary to user controllers of models
    beforeAll(async ()=>{
        await ModelsController.initModels();
    });



    //test class model name is correctly seted to table model name
    test('table class model name', () => {
        let tableClassModel = SchemasController.getTableClassModel();
        expect(Utils.hasValue(tableClassModel)).toBeTruthy();
        let tableModelClassName = tableClassModel?.name;
        expect(Utils.hasValue(tableModelClassName)).toBeTruthy();
        let tableName = tableClassModel?.tableName;
        expect(Utils.hasValue(tableName)).toBeTruthy();
        expect(tableModelClassName.trim().toLowerCase()).toEqual(tableName.trim().toLowerCase());
    });



    //test put (insert)
    test('put', async () => {
        let result = await SchemasController._put({
            name: stringTest,
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get inserted register to confirm persistency
        result = await SchemasController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(stringTest);
    });



    //test get (select) inserted register
    test('get', async () => {
        let result = await SchemasController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(stringTest);
    });    



    //test patch(update) inserted register    
    test('patch', async () => {
        let id = null;

        //get register to update, previous inserted by put test
        let result = await SchemasController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        //update register
        result = await SchemasController._patch({
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
        result = await SchemasController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();

        //test persistency of updated register
        expect(result[0].name).toBe(`${stringTest}_UPDATED`);
    });



    //test delete inserted register
    test('delete', async () => {
        let id = null;

        //get register to delete, previous inserted by put test
        let result = await SchemasController._get({
            where:{
                name: `${stringTest}_UPDATED`,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        //update register
        result = await SchemasController._delete({
            where: {
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get register updated to confirm if has uupdated
        result = await SchemasController._get({
            where:{
                id:id
            }
        });

        //test persistensy of delete
        expect(Utils.hasValue(result)).toBeFalsy();
    });
    
});
