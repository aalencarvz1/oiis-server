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
      parent_id: {
        type: DataTypes.BIGINT.UNSIGNED
      }, 
      routine_type_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      module_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      }, 
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      }, 
      icon: {
        type: DataTypes.TEXT
      }, 
      view_path: {
        type: DataTypes.TEXT
      }, 
      numeric_order: {
        type: DataTypes.BIGINT.UNSIGNED
      },
      show_in_menu: {
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
    Sequelize.literal(`(COALESCE(parent_id,0))`),
    'name'
  ];

  static constraints = [...(Routines.getBaseTableModelConstraints() || []),...[
    {
      name: Routines.tableName + '_u1',
      fields: Routines.uniqueFields,
      type:"unique"
    },{
      name: Routines.tableName + '_c_1',
      fields:['show_in_menu'],
      type:"check",
      where:{
        show_in_menu: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['parent_id'],
      type: 'foreign key',
      references: { 
          table: Routines,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['routine_type_id'],
      type: 'foreign key',
      references: { 
          table: Routine_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['module_id'],
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