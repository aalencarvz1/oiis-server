import Utils from "../../../../../dist/api/controllers/utils/Utils";
import ModelsController from "../../../../../dist/api/controllers/database/ModelsController";
import User_TimeworksController from "../../../../../dist/api/controllers/modules/registers/User_TimeworksController";
import HelperTestController from "../../HelperTestController";


const emailTest = 'jumbotesteUserTimework@test.com';
const passwordTest = 'TestUserTimework';
const nameTest = 'TestUserTimework';
const start_atTest = '8:00';
const end_atTest = '12:00';
const week_day =  6;

describe(User_TimeworksController.name, () => {
   
   
    beforeAll(async ()=>{
        await ModelsController.initModels();
        //await HelperTestController.initBasicModels();
        //await Users.initModel();
    });

    //test class model name is correctly seted to table model name
    test('table class model name', () => {
        let tableClassModel = User_TimeworksController.getTableClassModel();
        expect(Utils.hasValue(tableClassModel)).toBeTruthy();
        let tableModelClassName = tableClassModel?.name;
        expect(Utils.hasValue(tableModelClassName)).toBeTruthy();
        let tableName = tableClassModel?.tableName;
        expect(Utils.hasValue(tableName)).toBeTruthy();
        expect(tableModelClassName.trim().toLowerCase()).toEqual(tableName.trim().toLowerCase());
    });

   test('put without data', async () => {
        let result = await User_TimeworksController._put({}) 
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/(^missing\s+data$|^[a-z0-9._]+\s+cannot\s+be\s+null$)/i);
    });


    test('put', async () => {
        let UserGet = await HelperTestController.User_Profiles_TimeworksInsert(emailTest,nameTest,passwordTest);

        let result = await User_TimeworksController._put({
            user_profile_time_work_id:UserGet[0].id,
            week_day:week_day,
            start_at:start_atTest,
            end_at:end_atTest,
            
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
    
        result = await User_TimeworksController._get({
            where:{
                user_profile_time_work_id:UserGet[0].id,
                
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy()
        expect(result[0].user_profile_time_work_id).toBe(UserGet[0].id);
    })

    test('put Duplicate', async () => {
        let UserGet = await HelperTestController.User_Profiles_TimeworksGet(emailTest);
    
        let result = await User_TimeworksController._put({
            user_profile_time_work_id:UserGet[0].id,
            week_day:week_day,
            start_at:start_atTest,
            end_at:end_atTest,
        
        })
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/^[a-z0-9._]+\s+must\s+be\s+unique$/);
    });

    test('get', async () => {
        let UserGet = await HelperTestController.User_Profiles_TimeworksGet(emailTest);
        let result = await User_TimeworksController._get({
            where: { 
                user_profile_time_work_id:UserGet[0].id,
                
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].user_profile_time_work_id).toBe(UserGet[0].id);
    })

    test('patch', async () => {
        let UserGet = await HelperTestController.User_Profiles_TimeworksGet(emailTest);
            let id = null;
       
        let result = await User_TimeworksController._get({
            where: { 
                user_profile_time_work_id:UserGet[0].id,
                
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        result = await User_TimeworksController._patch({
            where: {
                id: id
            },
            values:{
                start_at:`${start_atTest+1}`,
            },
            includePeople:false
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await User_TimeworksController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();

        expect(result[0].start_at).toBe(`${start_atTest+1}`);
    

        //REVERT UPDATE

        result = await User_TimeworksController._patch({
            where: {
                id: id
            },
            values:{
                start_at:`${start_atTest+1}`
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
        //get register REVERTED updated to confirm if has uupdated
        result = await User_TimeworksController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        //test persistency of updated register
        expect(result[0].start_at).toBe(`${start_atTest+1}`);
    });


    test('delete', async () => {
        let id = null;
        let UserGet = await HelperTestController.User_Profiles_TimeworksGet(emailTest);
        let result = await User_TimeworksController._get({
            where:{
                user_profile_time_work_id:UserGet[0].id,
               
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;
        
        
        result = await User_TimeworksController._delete({
            where:{
                id:id,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await User_TimeworksController._get({
            where:{
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeFalsy();
        await HelperTestController.User_Profiles_TimeworksDelete(emailTest);
    });
})