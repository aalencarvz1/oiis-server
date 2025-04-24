import Utils from "../../../../../dist/api/controllers/utils/Utils";
import ModelsController from "../../../../../dist/api/controllers/database/ModelsController";
import Measurement_UnitsController from "../../../../../dist/api/controllers/modules/registers/Measurement_UnitsController";
import HelperTestController from "../../HelperTestController";

const stringTest = 'TEST';
const sigla = 'TST';

describe(Measurement_UnitsController
.name, () => {
   
   
    beforeAll(async ()=> {
        await ModelsController.initModels();
        
        await HelperTestController.GreatnessesControllerInsert(`${stringTest}_PARENT`,sigla);
    });

    //test class model name is correctly seted to table model name
    test('table class model name', () => {
        let tableClassModel = Measurement_UnitsController.getTableClassModel();
        expect(Utils.hasValue(tableClassModel)).toBeTruthy();
        let tableModelClassName = tableClassModel?.name;
        expect(Utils.hasValue(tableModelClassName)).toBeTruthy();
        let tableName = tableClassModel?.tableName;
        expect(Utils.hasValue(tableName)).toBeTruthy();
        expect(tableModelClassName.trim().toLowerCase()).toEqual(tableName.trim().toLowerCase());
    });

    test('put without data', async () => {
        let result = await Measurement_UnitsController._put({}) 
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/^[a-z0-9._]+\s+cannot\s+be\s+null$/i);
    });
    


    
    test('put', async () => {
        let resultInsert = await HelperTestController.GreatnessesControllerGet(`${stringTest}_PARENT`,sigla);
        //console.log("AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIII",resultInsert[0].id);

        let greatness_id = resultInsert[0].id;

        let result = await Measurement_UnitsController._put({
            name: stringTest,
            sigla: sigla,
            greatness_id:greatness_id
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

    })

    test('put Duplicate', async () => {
        let resultInsert = await HelperTestController.GreatnessesControllerGet(`${stringTest}_PARENT`,sigla);
        let greatness_id = resultInsert[0].id;

        let result = await Measurement_UnitsController._put({
            name:stringTest,
            sigla: sigla,
            greatness_id: greatness_id
        })
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/^[a-z0-9._]+\s+must\s+be\s+unique$/);
    });

    test('get', async () => {
        let resultParent = await HelperTestController.GreatnessesControllerGet(`${stringTest}_PARENT`,sigla)
        let greatness_id = resultParent[0].id;

        let result = await Measurement_UnitsController._get({
            where: { 
                name : stringTest,
                sigla: sigla,
                greatness_id: greatness_id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(stringTest);
    })

    test('patch', async () => {
        let resultParent = await HelperTestController.GreatnessesControllerGet(`${stringTest}_PARENT`,sigla);
        let greatness_id = resultParent[0].id;
        let id = null;

        let result = await Measurement_UnitsController._get({
            where: { 
                name : stringTest,
                sigla: sigla,
                greatness_id: greatness_id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        result = await Measurement_UnitsController._patch({
            where: {
                id: id
            },
            values:{
                name: `${stringTest}_UPDATED`,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await Measurement_UnitsController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();

        expect(result[0].name).toBe(`${stringTest}_UPDATED`);
    

        //REVERT UPDATE

        result = await Measurement_UnitsController._patch({
            
            where: {
                id: id
            },
            values:{
                name:stringTest,
                sigla: sigla,
                greatness_id: greatness_id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
        //get register REVERTED updated to confirm if has uupdated
        result = await Measurement_UnitsController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        //test persistency of updated register
        expect(result[0].name).toBe(stringTest);
    });


    test('delete', async () => {
        let resultParent = await HelperTestController.GreatnessesControllerGet(`${stringTest}_PARENT`,sigla)
        let greatness_id = resultParent[0].id;

        let id = null;

        let result = await Measurement_UnitsController._get({
            where:{
                name: stringTest,
                sigla: sigla,
                greatness_id:greatness_id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;
        
        
        result = await Measurement_UnitsController._delete({
            where:{
                id:id,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await Measurement_UnitsController._get({
            where:{
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeFalsy();
    });

    afterAll(async ()=>{
        await HelperTestController.GreatnessesControllerDelete(`${stringTest}_PARENT`,sigla);
    });

})