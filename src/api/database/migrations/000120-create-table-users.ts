'use strict';

import { QueryInterface } from "sequelize";
import bcrypt from "bcrypt";
import Users from "../models/Users.js";
import Record_Status from "../models/Record_Status.js";
import Data_Origins from "../models/Data_Origins.js";
import People from "../models/People.js";
import Access_Profiles from "../models/Access_Profiles.js";
import Tables from "../models/Tables.js";
import Connections from "../models/Connections.js";
import Schemas from "../models/Schemas.js";
import Contexts from "../models/Contexts.js";
import Entities_Types from "../models/Entities_Types.js";
import Data_Types from "../models/Data_Types.js";
import Action_Status from "../models/Action_Status.js";
import Parameters from "../models/Parameters.js";
import Parameter_Values from "../models/Parameter_Values.js";
import Sync_Status from "../models/Sync_Status.js";
import Run_Status from "../models/Run_Status.js";
import Identifier_Types from "../models/Identifier_Types.js";
import Greatnesses from "../models/Greatnesses.js";
import Measurement_Units from "../models/Measurement_Units.js";
import Collaborators from "../models/Collaborators.js";

/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Users.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});           
    
    await queryInterface.bulkInsert(Users.tableName,[{      
      id:Users.SYSTEM,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,      
      people_id : People.SYSTEM,
      access_profile_id : Access_Profiles.SYSTEM,
      email:process.env.SYSTEM_EMAIL || 'system@system',
      password: bcrypt.hashSync(process.env.SYSTEM_EMAIL_PASSWORD ||'system',((process as any).env.API_USER_PASSWORD_CRIPTSALT||10)-0)
    }]);     

    await Tables.migrateForeignKeyContraint(queryInterface,Users);  
    await Connections.migrateForeignKeyContraint(queryInterface,Users);  
    await Schemas.migrateForeignKeyContraint(queryInterface,Users);  
    await Contexts.migrateForeignKeyContraint(queryInterface,Users);  
    await Entities_Types.migrateForeignKeyContraint(queryInterface,Users);      
    await Data_Types.migrateForeignKeyContraint(queryInterface,Users);  
    await Action_Status.migrateForeignKeyContraint(queryInterface,Users);  
    await Parameters.migrateForeignKeyContraint(queryInterface,Users);  
    await Parameter_Values.migrateForeignKeyContraint(queryInterface,Users);  
    await Data_Origins.migrateForeignKeyContraint(queryInterface,Users);  
    await Record_Status.migrateForeignKeyContraint(queryInterface,Users);  
    await Sync_Status.migrateForeignKeyContraint(queryInterface,Users);  
    await Run_Status.migrateForeignKeyContraint(queryInterface,Users);  
    await Identifier_Types.migrateForeignKeyContraint(queryInterface,Users);  
    await Greatnesses.migrateForeignKeyContraint(queryInterface,Users);  
    await Measurement_Units.migrateForeignKeyContraint(queryInterface,Users);  
    await People.migrateForeignKeyContraint(queryInterface,Users);  
    await Collaborators.migrateForeignKeyContraint(queryInterface,Users);  
    await Access_Profiles.migrateForeignKeyContraint(queryInterface,Users);  
    await Users.migrateForeignKeyContraint.bind(Users)(queryInterface);  
        
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Users.tableName);
  }
};