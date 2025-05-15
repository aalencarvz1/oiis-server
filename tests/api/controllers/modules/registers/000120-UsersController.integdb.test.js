import Utils from "../../../../../dist/api/controllers/utils/Utils";
import ModelsController from "../../../../../dist/api/controllers/database/ModelsController";
import UserController from "../../../../../dist/api/controllers/modules/registers/UsersController";
import Users from "../../../../../dist/api/database/models/Users";
import HelperTestController from "../../HelperTestController";
import People from "../../../../../dist/api/database/models/People";

const emailTest = 'jumboteste_TEST_0000120@test.com';
const passwordTest = 'Test123e21';

describe(UserController.name, () => {
   
   
    beforeAll(async ()=>{
        await ModelsController.initModels();
        //await HelperTestController.initBasicModels();
        //await Users.initModel();
    });

    //test class model name is correctly seted to table model name
    test('table class model name', () => {
        let tableClassModel = UserController.getTableClassModel();
        expect(Utils.hasValue(tableClassModel)).toBeTruthy();
        let tableModelClassName = tableClassModel?.name;
        expect(Utils.hasValue(tableModelClassName)).toBeTruthy();
        let tableName = tableClassModel?.tableName;
        expect(Utils.hasValue(tableName)).toBeTruthy();
        expect(tableModelClassName.trim().toLowerCase()).toEqual(tableName.trim().toLowerCase());
    });

   test('put without data', async () => {
        let result = await UserController._put({},false,false) 
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/(^missing\s+data$|^[a-z0-9._]+\s+cannot\s+be\s+null$)/i);
    });


    test('put', async () => {
        await HelperTestController.UserInsert(emailTest,passwordTest);
    })

   test('put Duplicate', async () => {
        let result = await UserController._put({
            email:emailTest,
            password:passwordTest,
        },false,false)
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeFalsy();
        expect(result.message).toMatch(/^[a-z0-9._]+\s+must\s+be\s+unique$/);
    });

    test('get', async () => {
        await HelperTestController.UserGet(emailTest)
    })

    test('patch', async () => {
        let id = null;
       
        let result = await UserController._get({
            where: { 
                email:emailTest,
                
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        result = await UserController._patch({
            where: {
                id: id
            },
            values:{
                email: `${emailTest}_UPDATED`,
            },
            includePeople:false
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await UserController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();

        expect(result[0].email).toBe(`${emailTest}_UPDATED`);
    

        //REVERT UPDATE

        result = await UserController._patch({
            where: {
                id: id
            },
            values:{
                email:emailTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
        //get register REVERTED updated to confirm if has uupdated
        result = await UserController._get({
            where:{
                id:id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        //test persistency of updated register
        expect(result[0].email).toBe(emailTest);
    });


    test('delete', async () => {
       await HelperTestController.UserDelete(emailTest);
    });

})