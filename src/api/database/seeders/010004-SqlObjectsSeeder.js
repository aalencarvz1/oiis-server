'use strict';
require('dotenv').config({ path: __dirname + "/../../../../.env" });
const configDB  = require("../../database/config/config");
const { SqlObjectsTypes } = require('../models/SqlObjectsTypes');
const { OriginsDatas } = require('../models/OriginsDatas');
const { StatusRegs } = require('../models/StatusRegs');
const { Users } = require('../models/Users');
const { SqlObjects } = require('../models/SqlObjects');
const { PcFilial } = require('../models/winthor/PcFilial');
const { Utils } = require('../../controllers/utils/Utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    

    let registers = [];

    await queryInterface.bulkInsert(SqlObjects.name.toLowerCase(),[{      
      id: configDB[`${process.env.NODE_ENV||'development'}`].id,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSQLOBJECTTYPE : SqlObjectsTypes.DATABASE,
      NAME : configDB[`${process.env.NODE_ENV||'development'}`].database,
    },{            
      id: configDB[`${process.env.NODE_ENV||'development'}`].id + 1,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSQLOBJECTTYPE : SqlObjectsTypes.USER,
      IDSUP : configDB[`${process.env.NODE_ENV||'development'}`].id,
      NAME : configDB[`${process.env.NODE_ENV||'development'}`].user || configDB[`${process.env.NODE_ENV||'development'}`].database,
    },{      
      id: configDB[`${process.env.NODE_ENV||'development'}`].id + 2,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSQLOBJECTTYPE : SqlObjectsTypes.SCHEMA,
      IDSUP : configDB[`${process.env.NODE_ENV||'development'}`].id + 1,
      NAME : configDB[`${process.env.NODE_ENV||'development'}`].schema || configDB[`${process.env.NODE_ENV||'development'}`]?.dialectOptions?.schema || configDB[`${process.env.NODE_ENV||'development'}`].database
    },{
      id: configDB["development_winthor"]?.id,      
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,
      IDSQLOBJECTTYPE : SqlObjectsTypes.DATABASE,
      NAME : 'WINT',
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });
    

    //JUMBO USER/SCHEMA
    let wintObject = await SqlObjects.getModel().findOne({
      raw:true,
      where: {
        IDSQLOBJECTTYPE : SqlObjectsTypes.DATABASE, 
        NAME: 'WINT',      
      }
    });
    if (Object.keys(wintObject||{}).length == 0) {
      await queryInterface.bulkInsert(SqlObjects.name.toLowerCase(),[{
        status_reg_id: StatusRegs.ACTIVE,
        creator_user_id : Users.SYSTEM,
        created_at: new Date(),
        data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
        is_sys_rec : 1,
        IDSQLOBJECTTYPE : SqlObjectsTypes.DATABASE,
        NAME : 'WINT',
      }],{
        ignoreDuplicates:true,
        updateOnDuplicate:null
      });

      wintObject = await SqlObjects.getModel().findOne({
        raw:true,
        where: {
          IDSQLOBJECTTYPE : SqlObjectsTypes.DATABASE, 
          NAME: 'WINT',      
        }
      });
    }
    
    let wintUserObject = await SqlObjects.getModel().findOne({raw:true,where: {
      IDSQLOBJECTTYPE : SqlObjectsTypes.USER, 
      IDSUP:wintObject.id, 
      NAME: 'JUMBO'
    }});

    if (Object.keys(wintUserObject||{}).length == 0) {
      await queryInterface.bulkInsert(SqlObjects.name.toLowerCase(),[{      
        status_reg_id: StatusRegs.ACTIVE,
        creator_user_id : Users.SYSTEM,
        created_at: new Date(),
        data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
        is_sys_rec : 1,
        IDSQLOBJECTTYPE : SqlObjectsTypes.USER,
        IDSUP : wintObject.id,
        NAME : 'JUMBO',
      }],{
        ignoreDuplicates:true,
        updateOnDuplicate:null
      });

      wintUserObject = await SqlObjects.getModel().findOne({raw:true,where: {
        IDSQLOBJECTTYPE : SqlObjectsTypes.USER, 
        IDSUP:wintObject.id, 
        NAME: 'JUMBO'
      }});
    }

    let wintSchemaObject = await SqlObjects.getModel().findOne({raw:true,where: {
      IDSQLOBJECTTYPE : SqlObjectsTypes.SCHEMA, 
      IDSUP:wintUserObject.id, 
      NAME: 'JUMBO'
    }});
    if (Object.keys(wintSchemaObject||{}).length == 0) {
      await queryInterface.bulkInsert(SqlObjects.name.toLowerCase(),[{      
        status_reg_id: StatusRegs.ACTIVE,
        creator_user_id : Users.SYSTEM,
        created_at: new Date(),
        data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
        is_sys_rec : 1,
        IDSQLOBJECTTYPE : SqlObjectsTypes.SCHEMA,
        IDSUP : wintUserObject.id,
        NAME : 'JUMBO',
      }],{
        ignoreDuplicates:true,
        updateOnDuplicate:null
      });

      wintSchemaObject = await SqlObjects.getModel().findOne({raw:true,where: {
        IDSQLOBJECTTYPE : SqlObjectsTypes.SCHEMA, 
        IDSUP:wintUserObject.id, 
        NAME: 'JUMBO'
      }});
    }

    //CONTINUAR AQUI, INCLUIR OS OPJETOS NECESSARIOS PARA FAZER OS COMANDOS SQL DIRETO DO WINTHOR (PCFILIAL, PCPRODUT,PCNFSAID,PCMOV,PCNFENT,PCEST,ETC. POR HORA FAZER SO DA JUMBO, MONTAR COMO MONTADO NO EP (INCLUIR PROCESSOS DE CUSTO/LUCRO E OBJETOS DESTES PROCESSOS (UTILIZANDO O SCHEMA JUMBO)))
    Utils.log('FL',wintSchemaObject);
    await queryInterface.bulkInsert(SqlObjects.name.toLowerCase(),[{      
      id: PcFilial.id,
      status_reg_id: StatusRegs.ACTIVE,
      creator_user_id : Users.SYSTEM,
      created_at: new Date(),
      data_origin_id : OriginsDatas.DEFAULT_ORIGINDATA,
      is_sys_rec : 1,      
      IDSQLOBJECTTYPE : SqlObjectsTypes.TABLE,
      IDSUP: wintSchemaObject.id,
      NAME : PcFilial.name.toUpperCase(),
    }],{
      ignoreDuplicates:true,
      updateOnDuplicate:null
    });

    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(SqlObjects.name.toLowerCase(), null, {});
  }
};
