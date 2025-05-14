import Utils from "../../../../../dist/api/controllers/utils/Utils";
import ModelsController from "../../../../../dist/api/controllers/database/ModelsController";
import User_Profile_TimeworksController from "../../../../../dist/api/controllers/modules/registers/User_Profile_TimeworksController";
import HelperTestController from "../../HelperTestController";


const emailTest = 'jumbotesteTEST_000122@test.com';
const passwordTest = 'TEST_000122asa';
const nameTest = 'TEST_000122';

describe(User_Profile_TimeworksController.name, () => {
   
   
    beforeAll(async ()=>{
        await ModelsController.initModels();
        
        //await HelperTestController.initBasicModels();
        //await Users.initModel();
    });

    //test class model name is correctly seted to table model name
    test('table class model name', () => {
        let tableClassModel = User_Profile_TimeworksController.getTableClassModel();
        expect(Utils.hasValue(tableClassModel)).toBeTruthy();
        let tableModelClassName = tableClassModel?.name;
        expect(Utils.hasValue(tableModelClassName)).toBeTruthy();
        let tableName = tableClassModel?.tableName;
        expect(Utils.hasValue(tableName)).toBeTruthy();
        expect(tableModelClassName.trim().toLowerCase()).toEqual(tableName.trim().toLowerCase());
    });

   test('put without data', async () => {
        let result = await User_Profile_TimeworksController._put({}) 
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/(^missing\s+data$|^[a-z0-9._]+\s+cannot\s+be\s+null$)/i);
    });


    test('put', async () => {
        
        await HelperTestController.User_Profiles_TimeworksInsert(emailTest,nameTest,passwordTest);
    })

    test('put Duplicate', async () => {
        let UserGet = await HelperTestController.UserGet(emailTest);
    
        let result = await User_Profile_TimeworksController._put({
            user_id:UserGet[0].id,
            name:nameTest
        })
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/^[a-z0-9._]+\s+must\s+be\s+unique$/);
    });

    test('get', async () => {
       await HelperTestController.User_Profiles_TimeworksGet(emailTest);
    })

    test('patch', async () => {
        let UserGet = await HelperTestController.UserGet(emailTest);
        let id = null;
       
        let result = await User_Profile_TimeworksController._get({
            where: { 
                user_id:UserGet[0].id,
                
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        result = await User_Profile_TimeworksController._patch({
            where: {
                id: id
            },
            values:{
                name:`${nameTest}_UPDATED`,
            },
            includePeople:false
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await User_Profile_TimeworksController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();

        expect(result[0].name).toBe(`${nameTest}_UPDATED`);
    

        //REVERT UPDATE

        result = await User_Profile_TimeworksController._patch({
            where: {
                id: id
            },
            values:{
                name:nameTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
        //get register REVERTED updated to confirm if has uupdated
        result = await User_Profile_TimeworksController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        //test persistency of updated register
        expect(result[0].name).toBe(nameTest);
    });


    test('delete', async () => {

        await HelperTestController.User_Profiles_TimeworksDelete(emailTest);

    });
})