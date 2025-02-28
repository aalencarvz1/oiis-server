'use strict';

import { QueryInterface } from "sequelize";
import Measurement_Units from "../models/Measurement_Units.js";
import Record_Status from "../models/Record_Status.js";
import Users from "../models/Users.js";
import Data_Origins from "../models/Data_Origins.js";
import Greatnesses from "../models/Greatnesses.js";


/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface: QueryInterface, Sequelize: any) {    
    await queryInterface.bulkInsert(Measurement_Units.tableName,[{
      id: Measurement_Units.UN,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      greatness_id: Greatnesses.QUANTITY,
      name : 'UNIT',
      sigla: 'UN',
      is_scalar: 1
    },{
      id: Measurement_Units.WT,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      greatness_id: Greatnesses.MASS,
      name : 'WEIGHT',
      sigla: 'WT',
      is_scalar: 1
    },{
      id: Measurement_Units.VL,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      greatness_id: Greatnesses.VOLUM,
      name : 'VALUE',
      sigla: 'VL',
      is_scalar: 1
    },{
      id: Measurement_Units.DT,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      greatness_id: Greatnesses.VOLUM,
      name : 'DISTINCT ITEM',
      sigla: 'DT',
      is_scalar: 1
    },{
      id: Measurement_Units.PC,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      greatness_id: Greatnesses.QUANTITY,
      name : 'PIECE',
      sigla: 'PC',
      is_scalar: 1
    },{
      id: Measurement_Units.L,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      greatness_id: Greatnesses.VOLUM,
      name : 'LITER',
      sigla: 'L',
      is_scalar: 1
    },{
      id: Measurement_Units.PKG,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      greatness_id: Greatnesses.QUANTITY,
      name : 'PACKAGE',
      sigla: 'PK',
      is_scalar: 1
    },{
      id: Measurement_Units.BOX,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      greatness_id: Greatnesses.QUANTITY,
      name : 'BOX',
      sigla: 'BX',
      is_scalar: 1
    },{
      id: Measurement_Units.BCK,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      greatness_id: Greatnesses.QUANTITY,
      name : 'BUCKET',
      sigla: 'BK',
      is_scalar: 1
    },{
      id: Measurement_Units.CAN,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      greatness_id: Greatnesses.QUANTITY,
      name : 'CAN',
      sigla: 'CN',
      is_scalar: 1
    },{
      id: Measurement_Units.BAG,
      status_reg_id: Record_Status.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      greatness_id: Greatnesses.QUANTITY,
      name : 'BAG',
      sigla: 'BG',
      is_scalar: 1
    }],{
      ignoreDuplicates:true
    });  
  },

  async down (queryInterface: QueryInterface, Sequelize: any) {
     await queryInterface.bulkDelete(Data_Origins.tableName, {});
  }
};
