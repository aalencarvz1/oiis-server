'use strict';

import { QueryInterface } from 'sequelize';
import  Continents  from '../models/Continents.js';
import  Data_Origins  from '../models/Data_Origins.js';
import  Record_Status  from '../models/Record_Status.js';
import  Users  from '../models/Users.js';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {    
    await queryInterface.bulkInsert(Continents.tableName,[{      
      id:Continents.AMERICA,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      name : 'AMERICA',
      sigla:'AM'
    },{      
      id:Continents.SOUTH_AMERICA,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      parent_id: Continents.AMERICA,
      name : 'SOUTH AMERICA',
      sigla:'AL'
    }],{
      ignoreDuplicates:true
    });
     
  },

  async down(queryInterface: QueryInterface, Sequelize: any) {
     await queryInterface.bulkDelete(Continents.tableName, {});
  }
};
