import config from "../../../dist/api/database/config/config";
import Data_TypesController from "../../../dist/api/controllers/modules/registers/Data_TypesController";
import GreatnessesController from "../../../dist/api/controllers/modules/registers/GreatnessesController";
import ParametersController from "../../../dist/api/controllers/modules/registers/ParametersController";
import Parameters_ValueController from "../../../dist/api/controllers/modules/registers/Parameter_ValuesController";
import Utils from "../../../dist/api/controllers/utils/Utils";
import Identifier_TypesController from "../../../dist/api/controllers/modules/registers/Identifier_TypesController";
import PeopleController from "../../../dist/api/controllers/modules/registers/PeopleController";
import Data_Types from "../../../dist/api/database/models/Data_Types";
import Parameters from "../../../dist/api/database/models/Parameters";
import Greatnesses from "../../../dist/api/database/models/Greatnesses";
import Identifier_Types from "../../../dist/api/database/models/Identifier_Types";
import People from "../../../dist/api/database/models/People";
import Record_Status from "../../../dist/api/database/models/Record_Status";
import Users from "../../../dist/api/database/models/Users";
import Data_Origins from "../../../dist/api/database/models/Data_Origins";
import UsersController from "../../../dist/api/controllers/modules/registers/UsersController";
import User_Profile_TimeworksController from "../../../dist/api/controllers/modules/registers/User_Profile_TimeworksController";
import Routine_TypesController from "../../../dist/api/controllers/modules/registers/Routine_TypesController";
import ModulesController from "../../../dist/api/controllers/modules/registers/ModulesController";
import RoutineController from "../../../dist/api/controllers/modules/registers/RoutinesController";
import Routine_Types from "../../../dist/api/database/models/Routine_Types";
import Modules from "../../../dist/api/database/models/Modules";
import Routines from "../../../dist/api/database/models/Routines";
import LanguagesController from "../../../dist/api/controllers/modules/registers/LanguagesController";
import Languages from "../../../dist/api/database/models/Languages";
import TextsController from "../../../dist/api/controllers/modules/registers/TextsController";
import Texts from "../../../dist/api/database/models/Texts";
import TablesController from "../../../dist/api/controllers/modules/registers/TablesController";
import Tables from "../../../dist/api/database/models/Tables";
import Relationship_TypesController from "../../../dist/api/controllers/modules/registers/Relationship_TypesController";
import Relationships from "../../../dist/api/database/models/Relationships";
import Relationship_Types from "../../../dist/api/database/models/Relationship_Types";
import Value_NamesController from "../../../dist/api/controllers/modules/registers/Value_NamesController";
import RelationshipsController from "../../../dist/api/controllers/modules/registers/RelationshipsController";
import Relationship_Values from "../../../dist/api/database/models/Relationship_Values";
import Relationship_ValuesController from "../../../dist/api/controllers/modules/registers/Relationship_ValuesController";

export default class HelperTestController {

    static async initBasicModels(){
        await Record_Status.initModel();
        await Users.initModel();
        await Data_Origins.initModel();
    }

    static async TableInsert(stringTest) {
        Tables.initModel();

        let dbConfig = config[`${process.env.NODE_ENV||'development'}`];
        let result = await TablesController._put({
            data_connection_id: dbConfig.id,
            schema_id: dbConfig.id,
            name: stringTest,
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get inserted register to confirm persistency
        result = await TablesController._get({
            where:{
                data_connection_id: dbConfig.id,
                schema_id: dbConfig.id,
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(stringTest);
        return result;
    }

    static async TableGet(stringTest){
        let dbConfig = config[`${process.env.NODE_ENV||'development'}`];
        let result = await TablesController._get({
            where:{
                data_connection_id: dbConfig.id,
                schema_id: dbConfig.id,
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(stringTest);
        return result;
    }

    static async TableDelete(stringTest) {
        Tables.initModel();
        let id = null;
        let dbConfig = config[`${process.env.NODE_ENV||'development'}`];

        //get register to delete, previous inserted by put test
        let result = await TablesController._get({
            where:{
                data_connection_id: dbConfig.id,
                schema_id: dbConfig.id,
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        //update register
        result = await TablesController._delete({
            
            where: {
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get register updated to confirm if has uupdated
        result = await TablesController._get({
            where:{
                id:id
            }
        });

        //test persistensy of delete
        expect(Utils.hasValue(result)).toBeFalsy();
    }

    //Get Data_types
    static async Data_TypesGet(name) {
        return await Data_TypesController._get({
            where:{
                name:name
            }
        })
    }
    //Insert Data_types
    static async Data_TypesInsert(name,checkResult) {
        await Data_Types.initModel();

        let result = await Data_TypesController._put({
                    name: name
        });
        if(checkResult){
            expect(Utils.hasValue(result)).toBeTruthy();
            expect(result.success).toBeTruthy();
        
            result = await Data_TypesController._get({
                where:{
                    name: name,
                }
            });
            expect(Utils.hasValue(result)).toBeTruthy()
            expect(result[0].name).toBe(name);
        }
        return result;
    }
    //Delete Data_types
    static async Data_TypesDelete(stringTest) {
        await Data_Types.initModel();
         let id = null;

        let result = await Data_TypesController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;
        
        
        result = await Data_TypesController._delete({
            where:{
                id:id,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await Data_TypesController._get({
            where:{
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeFalsy();
        return result;
    }
    //Get Parameters
    static async ParametersGet(name) {
        return await ParametersController._get({
            where:{
                name:name
            }
        })
    }
    //Insert Parameters
    static async ParametersInsert(parameter_id) {
        await Parameters.initModel();

        return await ParametersController._put({
                    parameter_id: parameter_id
                });
    }
    //Delete Parameters
    static async ParametersDelete(id) {
        return await ParametersController._delete({
            where:{
                id: id
            }
        })
    }
    //Insert Parameters_ValuesController
    static async ParameterCompletInsert(name) {
        await Parameters.initModel();

        let resultDataType = await HelperTestController.Data_TypesInsert(`${name}_parent`)
        expect(Utils.hasValue(resultDataType)).toBeTruthy()
        expect(resultDataType.success).toBeTruthy()
        
        //create table register
        let result = await ParametersController._put({
            name: name,
            data_type_id: resultDataType.data.id
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
    
        let resultGet = await ParametersController._get({
            where:{
                name: name,
                data_type_id: resultDataType.data.id
            }
        });
        expect(Utils.hasValue(resultGet)).toBeTruthy();
        expect(resultGet[0].name).toBe(name);

        return result;
    }
    //Delete Parameters_ValuesController
    static async ParameterCompletDelete(name) {
        let id = null;
        let resultDataType = await HelperTestController.Data_TypesGet(`${name}_PARENT`)
        expect(Utils.hasValue(resultDataType)).toBeTruthy()
        

        let result = await ParametersController._get({
            where:{
                name: name,
                data_type_id: resultDataType[0].id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;
        
        
        result = await ParametersController._delete({
            where:{
                id:id,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await ParametersController._get({
            where:{
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeFalsy();

        //delete table register (Data_Type)
        await HelperTestController.Data_TypesDelete(resultDataType[0].name)
    }
    //Insert Greatnesses
    static async GreatnessesControllerInsert(stringTest,sigla){
        await Greatnesses.initModel();

        let result = await GreatnessesController._put({
            name: stringTest,
            sigla: sigla
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
    
        result = await GreatnessesController._get({
            where:{
                name: stringTest,
                sigla: sigla
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy()
        expect(result[0].name).toBe(stringTest);

        return result;
    }
  
    static async GreatnessesControllerGet(stringTest,sigla){
          let result = await GreatnessesController._get({
            where: { 
                name : stringTest,
                sigla: sigla
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(stringTest);
        return result;
    }



    //Delete Greatnesses
    static async GreatnessesControllerDelete(stringTest,sigla){
        let id = null;

        let result = await GreatnessesController._get({
            where:{
                name: stringTest,
                sigla: sigla
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;
        
        
        result = await GreatnessesController._delete({
            where:{
                id:id,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await GreatnessesController._get({
            where:{
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeFalsy();
    }
    //Insert Parameters_ValuesController
    
    //Get Parameters_ValuesController
    static async Parameters_ValuesControllerGet(stringTest){
        let resultGetParameter = await HelperTestController.ParametersGet(`${stringTest}_PARENT`)
        expect(Utils.hasValue(resultGetParameter)).toBeTruthy();


        //search table register
        let result = await Parameters_ValueController._get({
            where: { 
                parameter_id : resultGetParameter[0].id,
                
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].parameter_id).toBe(resultGetParameter[0].id);
    }
    //Delete parameters_ValuesController
    static async Parameters_ValuesControllerDelete(stringTest){
        let id = null;

        let result = await Parameters_ValueController._get({
            where:{
                value: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;
        
        
        result = await Parameters_ValueController._delete({
            where:{
                id:id,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await Parameters_ValueController._get({
            where:{
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeFalsy();

        //delete table register (Data_Type)
        await HelperTestController.ParameterCompletDelete(`${stringTest}_PARENT`)
    }

    //Insert Identifier_Types
    static async Identifier_TypesInsert(stringTest){
        await Identifier_Types.initModel();

         let result = await Identifier_TypesController._put({
            name: stringTest
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
    
        result = await Identifier_TypesController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy()
        expect(result[0].name).toBe(stringTest);
        return result;
    }

    //Get Identifier_Types
    static async Identifier_TypesGet(stringTest){
          let result = await Identifier_TypesController._get({
            where: { 
                name : stringTest 
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(stringTest);
        return result;
    }
    //Delete Identifer
    static async Identifier_TypesDelete(stringTest){
        await Identifier_Types.initModel();

        let id = null;

        let result = await Identifier_TypesController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;
        
        
        result = await Identifier_TypesController._delete({
            where:{
                id:id,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await Identifier_TypesController._get({
            where:{
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeFalsy();
    }
    static async PeopleControllerInsert(stringTest,stringDoc){
        await People.initModel();

        let InsertParent = await HelperTestController.Identifier_TypesInsert(`${stringTest}_PEOPLE_INSERT`);

        let result = await PeopleController._put({
            name: stringTest,
            identifier_doc_type_id:InsertParent[0].id,
            identifier_doc: stringDoc
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
    
        let resultGet = await PeopleController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(resultGet)).toBeTruthy()
        expect(resultGet[0].name).toBe(stringTest);

        return result;
    }

    static async PeopleControllerGet(stringTest,stringDoc){
            let InsertParent = await HelperTestController.Identifier_TypesGet(`${stringTest}_PEOPLE_INSERT`);
           let result = await PeopleController._get({
                where: { 
                    name: stringTest,
                    identifier_doc_type_id:InsertParent[0].id,
                    identifier_doc: stringDoc
                }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(stringTest);
        return result;
    };

    static async PeopleControllerDelete(stringTest,stringDoc){
        let InsertParent = await HelperTestController.Identifier_TypesGet(`${stringTest}_PEOPLE_INSERT`);
        let id = null;

        let result = await PeopleController._get({
            where:{
                name: stringTest,
                identifier_doc_type_id:InsertParent[0].id,
                identifier_doc: stringDoc
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;
        
        
        result = await PeopleController._delete({
            where:{
                id:id,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await PeopleController._get({
            where:{
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeFalsy();


        await HelperTestController.Identifier_TypesDelete(`${stringTest}_PEOPLE_INSERT`)
    }


    //Insert User
    static async UserInsert(emailTest,passwordTest){
        
    let result = await UsersController._put({
        email:emailTest,
        password:passwordTest
    },false,false);
    expect(Utils.hasValue(result)).toBeTruthy();
    expect(result.success).toBeTruthy();

    result = await UsersController._get({
        where:{
            email:emailTest,
            
        }
    });
    expect(Utils.hasValue(result)).toBeTruthy()
    expect(result[0].email).toBe(emailTest);
    return result;
    }

///UserGet
    static async UserGet(emailTest){
        let result = await UsersController._get({
            where: { 
                email:emailTest,
                
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].email).toBe(emailTest);
        return result;
    }
    
    static async UserDelete(emailTest){
        let id = null;
///UserDelete
        let result = await UsersController._get({
            where:{
                email:emailTest,
               
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;
        
        
        result = await UsersController._delete({
            where:{
                id:id,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await UsersController._get({
            where:{
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeFalsy();
    }
    static async User_Profiles_TimeworksInsert(emailTest,nameTest,passwordTest){
       
        let UserGet = await HelperTestController.UserInsert(emailTest,passwordTest);

        let result = await User_Profile_TimeworksController._put({
            user_id:UserGet[0].id,
            name:nameTest
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
    
        result = await User_Profile_TimeworksController._get({
            where:{
                user_id:UserGet[0].id,
                
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy()
        expect(result[0].user_id).toBe(UserGet[0].id);
        return result;
    }
    static async User_Profiles_TimeworksDelete(emailTest){
        
        let id = null;
        let UserGet = await HelperTestController.UserGet(emailTest);

        let result = await User_Profile_TimeworksController._get({
            where:{
                user_id:UserGet[0].id,
               
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;
        
        
        result = await User_Profile_TimeworksController._delete({
            where:{
                id:id,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await User_Profile_TimeworksController._get({
            where:{
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeFalsy();

        await HelperTestController.UserDelete(emailTest)
    }

    static async User_Profiles_TimeworksGet(emailTest){
        let UserGet = await HelperTestController.UserGet(emailTest);
        let result = await User_Profile_TimeworksController._get({
            where: { 
                user_id:UserGet[0].id,
                
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].user_id).toBe(UserGet[0].id);
        return result;
    }


    static async Rountine_TypeInsert(stringTest) {
            await Routine_Types.initModel();

        let result = await Routine_TypesController._put({
            name: stringTest,
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get inserted register to confirm persistency
        result = await Routine_TypesController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(stringTest);
        return result;
    }

    static async RoutineTypeDelete(stringTest){
        let id = null;

        //get register to delete, previous inserted by put test
        let result = await Routine_TypesController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        //update register
        result = await Routine_TypesController._delete({
            where: {
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get register updated to confirm if has uupdated
        result = await Routine_TypesController._get({
            where:{
                id:id
            }
        });

        //test persistensy of delete
        expect(Utils.hasValue(result)).toBeFalsy();
    }


    static async ModulesInsert(stringTest){
        await Modules.initModel();

         let result = await ModulesController._put({
            name: stringTest,
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get inserted register to confirm persistency
        result = await ModulesController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(stringTest);
        return result;
    }
    
    static async ModulesDelete(stringTest){
        await Modules.initModel();
        let id = null;

        //get register to delete, previous inserted by put test
        let result = await ModulesController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        //update register
        result = await ModulesController._delete({
            where: {
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get register updated to confirm if has uupdated
        result = await ModulesController._get({
            where:{
                id:id
            }
        });

        //test persistensy of delete
        expect(Utils.hasValue(result)).toBeFalsy();
    }

    static async RoutinesCompletInsert(stringTest){
        await Routines.initModel();

        let resultRoutine = await this.Rountine_TypeInsert(`${stringTest}_ROUTINE`);
        let resultModules = await this.ModulesInsert(`${stringTest}_ROUTINE`);
    
        let result = await RoutineController._put({
            routine_type_id:resultRoutine[0].id,
            module_id:resultModules[0].id,
            name:stringTest
        })
        expect(result).toBeTruthy();
        expect(result.success).toBeTruthy();

        result = await RoutineController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(stringTest);
        return result;
    }

    static async RoutineCompletDelete(stringTest){
        await Routines.initModel();

        let id = null;

        //get register to delete, previous inserted by put test
        let result = await RoutineController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        //update register
        result = await RoutineController._delete({
            where: {
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get register updated to confirm if has uupdated
        result = await RoutineController._get({
            where:{
                id:id
            }
        });

        //test persistensy of delete
        expect(Utils.hasValue(result)).toBeFalsy();
        
        await this.ModulesDelete(`${stringTest}_ROUTINE`);
        await this.RoutineTypeDelete(`${stringTest}_ROUTINE`)
    }

    static async RoutineGet(stringTest){
        let result = await RoutineController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(stringTest);
        return result;
    }

    static async LanguagensInsert(stringTest){
        await Languages.initModel();

    let result = await LanguagesController._put({
            name: stringTest,
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get inserted register to confirm persistency
        result = await LanguagesController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(stringTest);
        return result;
    }

    static async LanguagensGet(stringTest){
        await Languages.initModel();

        let result = await LanguagesController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(stringTest);
        return result;
    }

    static async LanguagensDelete(stringTest){
        await Languages.initModel();
        let id = null;

        //get register to delete, previous inserted by put test
        let result = await LanguagesController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        //update register
        result = await LanguagesController._delete({
            where: {
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get register updated to confirm if has uupdated
        result = await LanguagesController._get({
            where:{
                id:id
            }
        });

        //test persistensy of delete
        expect(Utils.hasValue(result)).toBeFalsy();
    }


    static async TextInsert(stringTest){
        await Texts.initModel();
        let resultLanguagens = await this.LanguagensInsert(stringTest);

        let result = await TextsController._put({
            language_id:resultLanguagens[0].id,
            text: stringTest,
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get inserted register to confirm persistency
        result = await TextsController._get({
            where:{
                language_id:resultLanguagens[0].id,
                text: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].text).toBe(stringTest);
        return result;
    }

    static async TextGet(stringTest){
        await Texts.initModel();
        let resultLanguagens = await this.LanguagensGet(stringTest);
        
        let result = await TextsController._get({
            where:{
                language_id:resultLanguagens[0].id,
                text: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].text).toBe(stringTest);
        return result;
    }


    static async TextDelete(stringTest){
        let id = null;
        

        //get register to delete, previous inserted by put test
        let result = await TextsController._get({
            where:{
                text: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        //update register
        result = await TextsController._delete({
            where: {
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get register updated to confirm if has uupdated
        result = await TextsController._get({
            where:{
                id:id
            }
        });

        //test persistensy of delete
        expect(Utils.hasValue(result)).toBeFalsy();
    }

    static async RelationShipsTypesInsert(stringTest) {
        await Relationship_Types.initModel();

        let result = await Relationship_TypesController._put({
                name:stringTest
        })
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
        return result;
    }

    static async RelationShipsTypesGet(stringTest) {
        await Relationship_Types.initModel();

        let result = await Relationship_TypesController._get({
            where:{
                name:stringTest
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].name).toBe(stringTest);
        return result;
    }

    static async RelationShipsTypesDelete(stringTest) {
        await Relationship_Types.initModel();
        let id = null;

        //get register to delete, previous inserted by put test
        let result = await Relationship_TypesController._get({
            where:{
                name: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        //update register
        result = await Relationship_TypesController._delete({
            where: {
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get register updated to confirm if has uupdated
        result = await Relationship_TypesController._get({
            where:{
                id:id
            }
        });

        //test persistensy of delete
        expect(Utils.hasValue(result)).toBeFalsy();
    }

    static async RelationShipsInsert(stringTest){
        let ResultRelationShipsTypes = await this.RelationShipsTypesInsert(stringTest);
        let ResultTable = await this.TableInsert(stringTest);
        await Relationships.initModel();


        console.log("RESULTRELATIONSHIPSTYPES",ResultRelationShipsTypes.data)
        console.log("RESULTTABLE",ResultTable[0])


        let result = await RelationshipsController._put({
        
            relationship_type_id:ResultRelationShipsTypes.data.id,
            table_1_id:ResultTable[0].id,
            table_2_id:ResultTable[0].id,
            description:stringTest,
                
                
        })
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
        return result;
    }

    static async RelationShipsGet(stringTest){
        let ResultRelationShipsTypes = await this.RelationShipsTypesGet(stringTest);
        let ResultTable = await this.TableGet(stringTest);
        await Relationships.initModel();
        

        let result = await RelationshipsController._get({
            where:{
                relationship_type_id:ResultRelationShipsTypes[0].id,
                table_1_id:ResultTable[0].id,
                table_2_id:ResultTable[0].id,
                
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].description).toBe(stringTest);
    }

    static async RelationShipsDelete(stringTest){
          await Relationships.initModel();
         let id = null;

        //get register to delete, previous inserted by put test
        let result = await RelationshipsController._get({
            where:{
                description: stringTest,
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        id = result[0].id;

        //update register
        result = await RelationshipsController._delete({
            where: {
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get register updated to confirm if has uupdated
        result = await RelationshipsController._get({
            where:{
                id:id
            }
        });

        //test persistensy of delete
        expect(Utils.hasValue(result)).toBeFalsy();
        
        await HelperTestController.RelationShipsTypesDelete(stringTest);
        await HelperTestController.TableDelete(stringTest);
    }

    static async complementRelationShip_ValueInsert(stringTest){
        await Relationship_Values.initModel()
        let resultRelatioship = await this.RelationShipsInsert(stringTest);
        let resultIdentifierType = await this.Identifier_TypesInsert(stringTest);
        let resultDataType = await this.Data_TypesInsert(stringTest,true);

        let result = await Relationship_ValuesController._put({
            data_relationship_id:resultRelatioship.data.id,
            identifier_type_id:resultIdentifierType[0].id,
            data_type_id:resultDataType[0].id,
            value:stringTest
        })
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();
        return result;
    }

    static async complementRelationShip_ValueGet(stringTest){
        let result = await Relationship_ValuesController._get({
            where:{
                value:stringTest
            }
        })
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result[0].value).toBe(stringTest);
        return result;
    }

    static async complementRelationShip_ValueDelete(stringTest){
        await Relationship_Values.initModel()
         let id = null;

        //get register to delete, previous inserted by put test
        let result = await this.complementRelationShip_ValueGet(stringTest);

        id = result[0].id;

        //update register
        result = await Relationship_ValuesController._delete({
            where: {
                id: id
            }
        });
        expect(Utils.hasValue(result)).toBeTruthy();
        expect(result.success).toBeTruthy();

        //get register updated to confirm if has uupdated
        result = await Relationship_ValuesController._get({
            where:{
                id:id
            }
        });

        //test persistensy of delete
        expect(Utils.hasValue(result)).toBeFalsy();
        
        await this.RelationShipsDelete(stringTest);
        await this.Identifier_TypesDelete(stringTest);
        await this.Data_TypesDelete(stringTest);
    }
}