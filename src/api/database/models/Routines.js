'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { RoutinesTypes } = require("./RoutinesTypes");
const { Modules } = require("./Modules");


/**
 * class model
 */
class Routines extends BaseTableModel {
  static ID = 240;
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
      NAME: {
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
      DESCRIPTION: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [ 
    Sequelize.literal(`(COALESCE(IDSUP,0))`),
    'NAME'
  ];

  static constraints = [...(Routines.getBaseTableModelConstraints() || []),...[
    {
      name: Routines.name.toUpperCase() + '_U1',
      fields: Routines.uniqueFields,
      type:"unique"
    },{
      name: Routines.name.toUpperCase() + '_C_1',
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
          field: 'ID'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDROUTINETYPE'],
      type: 'foreign key',
      references: { 
          table: RoutinesTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDMODULE'],
      type: 'foreign key',
      references: { 
          table: Modules,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Routines}