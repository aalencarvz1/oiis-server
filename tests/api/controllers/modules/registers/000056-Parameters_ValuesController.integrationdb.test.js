
import Utils from "../../../../../dist/api/controllers/utils/Utils";
import ModelsController from "../../../../../dist/api/controllers/database/ModelsController";
import Parameters_ValueController from "../../../../../dist/api/controllers/modules/registers/Parameter_ValuesController";
import HelperTestController from "../../HelperTestController";

const stringTest = 'TEST';

describe(Parameters_ValueController.name, () => {
   
   
    beforeAll(async ()=>{
        await ModelsController.initModels();
    });

    //test class model name is correctly seted to table model name
    test('table class model name', () => {
        let tableClassModel = Parameters_ValueController.getTableClassModel();
        expect(Utils.hasValue(tableClassModel)).toBeTruthy();
        let tableModelClassName = tableClassModel?.name;
        expect(Utils.hasValue(tableModelClassName)).toBeTruthy();
        let tableName = tableClassModel?.tableName;
        expect(Utils.hasValue(tableName)).toBeTruthy();
        expect(tableModelClassName.trim().toLowerCase()).toEqual(tableName.trim().toLowerCase());
    });

     test('put without data', async () => {
            let result = await Parameters_ValueController._put({}) 
            expect(Utils.hasValue(result)).toBeTruthy();
            expect(result.success).toBeFalsy();
            expect(result.message).toMatch(/^[a-z0-9._]+\s+cannot\s+be\s+null$/i);
        });
    
    test('put', async () => {
        await HelperTestController.Parameters_ValuesControllerInsert(stringTest);
       
    })

    test('put Duplicate', async () => {
        let result = await Parameters_ValueController._put({
            name:stringTest,
        })
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/^[a-z0-9._]+\s+cannot\s+be\s+null$/i);
    });



    test('get', async () => {
        await HelperTestController.Parameters_ValuesControllerGet(stringTest);
    })
        //update table register
    test('patch', async () => {
        //get parent Register
        let resultGetParameter = await HelperTestController.ParametersGet(`${stringTest}_PARENT`)
        expect(Utils.hasValue(resultGetParameter)).toBeTruthy();
       
        //search table register
        let id = null;
        let result = await Parameters_ValueController._get({
            where: { 
                parameter_id : resultGetParameter[0].id,
                
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;


        //update table register
        result = await Parameters_ValueController._patch({
            where: {
                id: id,
            },
            values:{
                value: `${stringTest}1`,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //search table register
        result = await Parameters_ValueController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();

        expect(result[0].value).toBe(`${stringTest}1`);

        //              //                        //

         // REVERT update table register
         result = await Parameters_ValueController._patch({
            where: {
                id: id,
            },
            values:{
                value: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

         //get register REVERTED updated to confirm if has uupdated
        result = await Parameters_ValueController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        //test persistency of updated register
        expect(result[0].value).toBe(stringTest);
    });

    //delete table register
    test('delete', async () => {
        
     await HelperTestController.Parameters_ValuesControllerDelete(stringTest);

    });

})