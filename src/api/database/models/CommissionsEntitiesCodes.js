'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { DataTables } = require("./DataTables");


/**
 * class model
 */
class CommissionsEntitiesCodes extends BaseTableModel {
  static ID = 9050;
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
      NAME:{
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
    'NAME'
  ];

  static constraints = [...(CommissionsEntitiesCodes.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['IDTABLEENTITY'],
    type: 'foreign key',
    references: { 
        table: DataTables,
        field: 'ID'
    },
    onUpdate: 'cascade'
  }]];

};


module.exports = {CommissionsEntitiesCodes}