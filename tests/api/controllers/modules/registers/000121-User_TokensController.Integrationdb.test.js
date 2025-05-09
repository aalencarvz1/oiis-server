import Utils from "../../../../../dist/api/controllers/utils/Utils";
import ModelsController from "../../../../../dist/api/controllers/database/ModelsController";
import UserTokensController from "../../../../../dist/api/controllers/modules/registers/User_TokensController";
import HelperTestController from "../../HelperTestController";


const emailTest = 'jumbotesteUserTokens@test.com';
const passwordTest = 'Test123e21UserTokens';

describe(UserTokensController.name, () => {
   
   
    beforeAll(async ()=>{
        await ModelsController.initModels();
        await HelperTestController.UserInsert(emailTest,passwordTest);
        //await HelperTestController.initBasicModels();
        //await Users.initModel();
    });

    //test class model name is correctly seted to table model name
    test('table class model name', () => {
        let tableClassModel = UserTokensController.getTableClassModel();
        expect(Utils.hasValue(tableClassModel)).toBeTruthy();
        let tableModelClassName = tableClassModel?.name;
        expect(Utils.hasValue(tableModelClassName)).toBeTruthy();
        let tableName = tableClassModel?.tableName;
        expect(Utils.hasValue(tableName)).toBeTruthy();
        expect(tableModelClassName.trim().toLowerCase()).toEqual(tableName.trim().toLowerCase());
    });

   test('put without data', async () => {
        let result = await UserTokensController._put({}) 
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/(^missing\s+data$|^[a-z0-9._]+\s+cannot\s+be\s+null$)/i);
    });


    test('put', async () => {
        let UserGet = await HelperTestController.UserGet(emailTest);

        let result = await UserTokensController._put({
            user_id:UserGet[0].id,
            token:passwordTest
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
    
        result = await UserTokensController._get({
            where:{
                user_id:UserGet[0].id,
                
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy()
        expect(result[0].user_id).toBe(UserGet[0].id);
    })

    test('put Duplicate', async () => {
        let UserGet = await HelperTestController.UserGet(emailTest);
    
        let result = await UserTokensController._put({
            user_id:UserGet[0].id,
            token:passwordTest
        })
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/^[a-z0-9._]+\s+must\s+be\s+unique$/);
    });

    test('get', async () => {
        let UserGet = await HelperTestController.UserGet(emailTest);

        let result = await UserTokensController._get({
            where: { 
                user_id:UserGet[0].id,
                
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].user_id).toBe(UserGet[0].id);
    })

    test('patch', async () => {
        let UserGet = await HelperTestController.UserGet(emailTest);
        let id = null;
       
        let result = await UserTokensController._get({
            where: { 
                user_id:UserGet[0].id,
                
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        result = await UserTokensController._patch({
            where: {
                id: id
            },
            values:{
                token:`${passwordTest}_UPDATED`,
            },
            includePeople:false
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await UserTokensController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();

        expect(result[0].token).toBe(`${passwordTest}_UPDATED`);
    

        //REVERT UPDATE

        result = await UserTokensController._patch({
            where: {
                id: id
            },
            values:{
                token:passwordTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
        //get register REVERTED updated to confirm if has uupdated
        result = await UserTokensController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        //test persistency of updated register
        expect(result[0].token).toBe(passwordTest);
    });


    test('delete', async () => {
        let id = null;
        let UserGet = await HelperTestController.UserGet(emailTest);

        let result = await UserTokensController._get({
            where:{
                user_id:UserGet[0].id,
               
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;
        
        
        result = await UserTokensController._delete({
            where:{
                id:id,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await UserTokensController._get({
            where:{
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeFalsy();
    });
    afterAll(async ()=>{
       await HelperTestController.UserDelete(emailTest)
    })
})