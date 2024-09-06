'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { DataTables } = require("./DataTables");


/**
 * class model
 */
class CommissionsEntitiesCodes extends BaseTableModel {
  static id = 9050;
  static model = null;
  static fields = {
    ...CommissionsEntitiesCodes.getBaseTableModelFields(),...{                 
      IDTABLEENTITY:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
      },
      IDREGISTERENTITY:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
      },
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      DESCRIPTION:{
        type: DataTypes.TEXT
      },
      MINIMALVALUE:{
        type: DataTypes.DECIMAL(32,10)
      }
    }
  };
  
  static uniqueFields = [
    'IDTABLEENTITY',
    'IDREGISTERENTITY',
    'name'
  ];

  static constraints = [...(CommissionsEntitiesCodes.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['IDTABLEENTITY'],
    type: 'foreign key',
    references: { 
        table: DataTables,
        field: 'id'
    },
    onUpdate: 'cascade'
  }]];

};


module.exports = {CommissionsEntitiesCodes}