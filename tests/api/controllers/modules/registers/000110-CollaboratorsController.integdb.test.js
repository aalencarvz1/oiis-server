import Utils from "../../../../../dist/api/controllers/utils/Utils";
import ModelsController from "../../../../../dist/api/controllers/database/ModelsController";
import CollaboratorsController from "../../../../../dist/api/controllers/modules/registers/CollaboratorsController";
import HelperTestController from "../../HelperTestController";
import Collaborators from "../../../../../dist/api/database/models/Collaborators";
import People from "../../../../../dist/api/database/models/People";

const stringTest = 'TEST_000110';
const stringDoc = '14.524.110-5';
describe(CollaboratorsController.name, () => {
   
   
    beforeAll(async ()=>{
        //await ModelsController.initModels();
        await HelperTestController.initBasicModels();
        await Collaborators.initModel();
        
    });

    //test class model name is correctly seted to table model name
    test('table class model name', () => {
        let tableClassModel = CollaboratorsController.getTableClassModel();
        expect(Utils.hasValue(tableClassModel)).toBeTruthy();
        let tableModelClassName = tableClassModel?.name;
        expect(Utils.hasValue(tableModelClassName)).toBeTruthy();
        let tableName = tableClassModel?.tableName;
        expect(Utils.hasValue(tableName)).toBeTruthy();
        expect(tableModelClassName.trim().toLowerCase()).toEqual(tableName.trim().toLowerCase());
    });

    test('put without data', async () => {
        let result = await CollaboratorsController._put({}) 
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/^missing\s+data$/i);
    });


    test('put', async () => {
       
        let resultPeople =  await HelperTestController.PeopleControllerInsert(`${stringTest}_COLABORATOR_INSERT`,stringDoc);
        let id = resultPeople.data.id
        await People.initAssociations.bind(People)();
        await Collaborators.initAssociations.bind(Collaborators)();

        let result = await CollaboratorsController._put({
                people_id:id,
                alias:stringTest
        })
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
    })

    test('put Duplicate', async () => {
        let resultPeople = await HelperTestController.PeopleControllerGet(`${stringTest}_COLABORATOR_INSERT`,stringDoc);
        

        let result = await CollaboratorsController._put({
                people_id:resultPeople[0].id,
                alias:stringTest
        })
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/^[a-z0-9._]+\s+must\s+be\s+unique$/);
    });

    test('get', async () => {
        let resultPeople = await HelperTestController.PeopleControllerGet(`${stringTest}_COLABORATOR_INSERT`,stringDoc);
        let result = await CollaboratorsController._get({
            where: { 
                alias: stringTest,
                people_id:resultPeople[0].id
                
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].alias).toBe(stringTest);
    })

    test('patch', async () => {
        let resultPeople = await HelperTestController.PeopleControllerGet(`${stringTest}_COLABORATOR_INSERT`,stringDoc);
        let id = null;

        let result = await CollaboratorsController._get({
            where: { 
                alias: stringTest,
                people_id:resultPeople[0].id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        result = await CollaboratorsController._patch({
            where: {
                id: id
            },
            values:{
                alias: `${stringTest}_UPDATED`,
                
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await CollaboratorsController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
       
        expect(result[0].alias).toBe(`${stringTest}_UPDATED`);

        //REVERT UPDATE

        result = await CollaboratorsController._patch({
            where: {
                id: id
            },
            values:{
                alias:stringTest,
                
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
        //get register REVERTED updated to confirm if has uupdated
        result = await CollaboratorsController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        //test persistency of updated register
        expect(result[0].alias).toBe(stringTest);
    });


    test('delete', async () => {
        let resultPeople = await HelperTestController.PeopleControllerGet(`${stringTest}_COLABORATOR_INSERT`,stringDoc);
        
        let id = null;

        let result = await CollaboratorsController._get({
            where:{
                alias: stringTest,
                people_id:resultPeople[0].id
                
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;
        
        
        result = await CollaboratorsController._delete({
            where:{
                id:id,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await CollaboratorsController._get({
            where:{
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeFalsy();
        await HelperTestController.PeopleControllerDelete(`${stringTest}_COLABORATOR_INSERT`,stringDoc);
    });

})