'use strict';

import { QueryInterface } from "sequelize";
import Access_Profiles from "../models/Access_Profiles.js";
import Record_Status from "../models/Record_Status.js";
import Data_Origins from "../models/Data_Origins.js";
import Users from "../models/Users.js";

/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Access_Profiles.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});

    await queryInterface.bulkInsert(Access_Profiles.tableName,[{      
      id:Access_Profiles.SYSTEM,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name:'SYSTEM',
      allow_access_to_all_module_routines:1
    }]); 
    await Access_Profiles.migrateForeignKeyContraint(queryInterface,Access_Profiles);  
    await Access_Profiles.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Access_Profiles.migrateForeignKeyContraint(queryInterface,Data_Origins);  
  },

  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Access_Profiles.tableName);
  }
};