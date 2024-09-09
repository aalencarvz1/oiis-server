'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Users } = require("./Users");
const { Contexts } = require("./Contexts");
const { Routines } = require("./Routines");
const { PowersTypes } = require("./PowersTypes");
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
      IDPOWERTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDACCESSPROFILE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDUSER:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDCONTEXT:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDTABLE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDMODULE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDROUTINE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      STARTDATE:{
        type: DataTypes.DATE
      },
      ENDDATE:{
        type: DataTypes.DATE
      },
      ALLOWEDACCESS: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },
      ALLOWEDSEARCH: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },
      ALLOWEDREAD: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },
      ALLOWEDUPDATE: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },
      ALLOWEDCREATE: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },
      ALLOWEDDELETE: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },
      OBSERVATIONS: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'IDPOWERTYPE',
    Sequelize.literal(`(COALESCE(IDACCESSPROFILE,0))`),
    Sequelize.literal(`(COALESCE(IDUSER,0))`),
    Sequelize.literal(`(COALESCE(IDCONTEXT,0))`),
    Sequelize.literal(`(COALESCE(IDTABLE,0))`),
    Sequelize.literal(`(COALESCE(IDMODULE,0))`),
    Sequelize.literal(`(COALESCE(IDROUTINE,0))`),
    Sequelize.literal(`(COALESCE(STARTDATE,'1900-01-01'))`)
  ];

  static constraints = [...(Permissions.getBaseTableModelConstraints() || []),...[
    {
      name: Permissions.tableName + '_u1',
      fields: [...Permissions.getBaseTableModelUniqueFields(),...Permissions.uniqueFields],
      type:"unique"
    },{
      name: Permissions.tableName + '_c_1',
      fields:['ALLOWEDACCESS'],
      type:"check",
      where:{
        ALLOWEDACCESS: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Permissions.tableName + '_c_2',
      fields:['ALLOWEDSEARCH'],
      type:"check",
      where:{
        ALLOWEDSEARCH: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Permissions.tableName + '_c_3',
      fields:['ALLOWEDREAD'],
      type:"check",
      where:{
        ALLOWEDREAD: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Permissions.tableName + '_c_4',
      fields:['ALLOWEDUPDATE'],
      type:"check",
      where:{
        ALLOWEDUPDATE: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Permissions.tableName + '_c_5',
      fields:['ALLOWEDCREATE'],
      type:"check",
      where:{
        ALLOWEDCREATE: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Permissions.tableName + '_c_6',
      fields:['ALLOWEDDELETE'],
      type:"check",
      where:{
        ALLOWEDDELETE: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDPOWERTYPE'],
      type: 'foreign key',
      references: { 
          table: PowersTypes,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDACCESSPROFILE'],
      type: 'foreign key',
      references: { 
          table: Access_Profiles,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDUSER'],
      type: 'foreign key',
      references: { 
          table: Users,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCONTEXT'],
      type: 'foreign key',
      references: { 
          table: Contexts,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDTABLE'],
      type: 'foreign key',
      references: { 
          table: Tables,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDMODULE'],
      type: 'foreign key',
      references: { 
          table: Modules,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDROUTINE'],
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
