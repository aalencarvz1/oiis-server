'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Routine_Types } = require("./Routine_Types");
const { Modules } = require("./Modules");


/**
 * class model
 */
class Routines extends BaseTableModel {
  static id = 240;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Routines.getBaseTableModelFields(),...{     
      IDSUP: {
        type: DataTypes.BIGINT.UNSIGNED
      }, 
      IDROUTINETYPE: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDMODULE: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      }, 
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      }, 
      ICON: {
        type: DataTypes.TEXT
      }, 
      VIEWPATH: {
        type: DataTypes.TEXT
      }, 
      ORDERNUM: {
        type: DataTypes.BIGINT.UNSIGNED
      },
      SHOWINMENU: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [ 
    Sequelize.literal(`(COALESCE(IDSUP,0))`),
    'name'
  ];

  static constraints = [...(Routines.getBaseTableModelConstraints() || []),...[
    {
      name: Routines.tableName + '_u1',
      fields: Routines.uniqueFields,
      type:"unique"
    },{
      name: Routines.tableName + '_c_1',
      fields:['SHOWINMENU'],
      type:"check",
      where:{
        SHOWINMENU: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDSUP'],
      type: 'foreign key',
      references: { 
          table: Routines,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDROUTINETYPE'],
      type: 'foreign key',
      references: { 
          table: Routine_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDMODULE'],
      type: 'foreign key',
      references: { 
          table: Modules,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Routines}