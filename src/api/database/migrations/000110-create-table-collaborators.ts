'use strict';

import { QueryInterface } from "sequelize";
import Collaborators from "../models/Collaborators.js";
import Record_Status from "../models/Record_Status.js";
import Users from "../models/Users.js";
import Data_Origins from "../models/Data_Origins.js";
import People from "../models/People.js";

/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await Collaborators.runUpMigration(queryInterface,{migrateForeignKeyContraint:false});          
    
    await queryInterface.bulkInsert(Collaborators.tableName,[{      
      id:Collaborators.SYSTEM,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      people_id : People.SYSTEM
    }]); 
    await Collaborators.migrateForeignKeyContraint(queryInterface,Collaborators);  
    await Collaborators.migrateForeignKeyContraint(queryInterface,Record_Status);  
    await Collaborators.migrateForeignKeyContraint(queryInterface,Data_Origins);  
    await Collaborators.migrateForeignKeyContraint(queryInterface,People);  
        
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable(Collaborators.tableName);
  }
};