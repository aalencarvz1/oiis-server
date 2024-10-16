'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Users } = require("./Users");
const { Contexts } = require("./Contexts");
const { Routines } = require("./Routines");
const { Power_Types } = require("./Power_Types");
const { Access_Profiles } = require("./Access_Profiles");
const { Tables } = require("./Tables");
const { Modules } = require("./Modules");

/**
 * class model
 */
class Permissions extends BaseTableModel {
  static id = 7003;
  static tableName = this.name.toLowerCase();
  static model = null;

  static SYSTEM = 1;

  static fields = {
    ...Permissions.getBaseTableModelFields(),...{           
      power_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      access_profile_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      user_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      context_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      table_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      module_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      routine_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      start_date:{
        type: DataTypes.DATE
      },
      end_date:{
        type: DataTypes.DATE
      },
      allowed_access: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },
      allowed_search: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },
      allowed_read: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },
      allowed_update: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },
      allowed_create: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },
      allowed_delete: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },
      observations: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'power_type_id',
    Sequelize.literal(`(COALESCE(access_profile_id,0))`),
    Sequelize.literal(`(COALESCE(user_id,0))`),
    Sequelize.literal(`(COALESCE(context_id,0))`),
    Sequelize.literal(`(COALESCE(table_id,0))`),
    Sequelize.literal(`(COALESCE(module_id,0))`),
    Sequelize.literal(`(COALESCE(routine_id,0))`),
    Sequelize.literal(`(COALESCE(start_date,'1900-01-01'))`)
  ];

  static constraints = [...(Permissions.getBaseTableModelConstraints() || []),...[
    {
      name: Permissions.tableName + '_u1',
      fields: [...Permissions.getBaseTableModelUniqueFields(),...Permissions.uniqueFields],
      type:"unique"
    },{
      name: Permissions.tableName + '_c_1',
      fields:['allowed_access'],
      type:"check",
      where:{
        allowed_access: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Permissions.tableName + '_c_2',
      fields:['allowed_search'],
      type:"check",
      where:{
        allowed_search: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Permissions.tableName + '_c_3',
      fields:['allowed_read'],
      type:"check",
      where:{
        allowed_read: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Permissions.tableName + '_c_4',
      fields:['allowed_update'],
      type:"check",
      where:{
        allowed_update: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Permissions.tableName + '_c_5',
      fields:['allowed_create'],
      type:"check",
      where:{
        allowed_create: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Permissions.tableName + '_c_6',
      fields:['allowed_delete'],
      type:"check",
      where:{
        allowed_delete: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['power_type_id'],
      type: 'foreign key',
      references: { 
          table: Power_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['access_profile_id'],
      type: 'foreign key',
      references: { 
          table: Access_Profiles,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['user_id'],
      type: 'foreign key',
      references: { 
          table: Users,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['context_id'],
      type: 'foreign key',
      references: { 
          table: Contexts,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['table_id'],
      type: 'foreign key',
      references: { 
          table: Tables,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['module_id'],
      type: 'foreign key',
      references: { 
          table: Modules,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['routine_id'],
      type: 'foreign key',
      references: { 
          table: Routines,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};

module.exports = {Permissions}
