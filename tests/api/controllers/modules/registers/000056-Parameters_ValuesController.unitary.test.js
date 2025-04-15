
import Utils from "../../../../../dist/api/controllers/utils/Utils";
import ModelsController from "../../../../../dist/api/controllers/database/ModelsController";
import Parameters_Value from "../../../../../dist/api/controllers/modules/registers/Parameter_ValuesController";
import HelperTestController from "../../HelperTestContoller";

const stringTest = 'TEST';

describe(Parameters_Value.name, () => {
   
   
    beforeAll(async ()=>{
        await ModelsController.initModels();
    });

    //test class model name is correctly seted to table model name
    test('table class model name', () => {
        let tableClassModel = Parameters_Value.getTableClassModel();
        expect(Utils.hasValue(tableClassModel)).toBeTruthy();
        let tableModelClassName = tableClassModel?.name;
        expect(Utils.hasValue(tableModelClassName)).toBeTruthy();
        let tableName = tableClassModel?.tableName;
        expect(Utils.hasValue(tableName)).toBeTruthy();
        expect(tableModelClassName.trim().toLowerCase()).toEqual(tableName.trim().toLowerCase());
    });


    test('put', async () => {
        //Create parent register(Parameters)
        let resultParameters = await HelperTestController.ParametersInsert(`${stringTest}_parent`)
        expect(Utils.hasValue(resultParameters)).toBeTruthy()
        expect(resultParameters.success).toBeTruthy()
        
        //create table register
        let result = await Parameters_Value._put({
            name: stringTest,
            parameters_id: resultParameters.data.id
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
    
        result = await Parameters_Value._get({
            where:{
                name: stringTest,
                parameters_id: resultParameters.data.id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(stringTest);
    })



    test('get', async () => {
        //search parent register(Parameters)
        let resultParameters = await HelperTestController.ParametersGet(`${stringTest}_parent`)
        expect(Utils.hasValue(resultParameters)).toBeTruthy()
        
        //search table register
        let result = await Parameters_Value._get({
            where: { 
                name : stringTest,
                parameters_id: resultParameters[0].id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(stringTest);
    })
        //update table register
    test('patch', async () => {
        
        //search parent register(Parameters)
        let resultParameters = await HelperTestController.ParametersGet(`${stringTest}_parent`);
        expect(Utils.hasValue(resultParameters)).toBeTruthy();
       
        //search table register
        let id = null;
        let result = await Parameters_Value._get({
            where: { 
                name : stringTest,
                parameters_id: resultParameters[0].id 
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;


        //update table register
        result = await Parameters_Value._patch({
            where: {
                id: id,
            },
            values:{
                name: `${stringTest}_UPDATED`,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //search table register
        result = await Parameters_Value._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();

        expect(result[0].name).toBe(`${stringTest}_UPDATED`);
    });

    //delete table register
    test('delete', async () => {
        
        let id = null;
        let resultParameters = await HelperTestController.ParametersGet(`${stringTest}_parent`)
        expect(Utils.hasValue(resultParameters)).toBeTruthy()
        

        let result = await Parameters_Value._get({
            where:{
                name: `${stringTest}_UPDATED`,
                parameters_id: resultParameters[0].id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;
        
        
        result = await Parameters_Value._delete({
            where:{
                id:id,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await Parameters_Value._get({
            where:{
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeFalsy();

        //delete table register (Data_Type)
        await HelperTestController.ParametersDelete(resultParameters[0].id)
    });

})