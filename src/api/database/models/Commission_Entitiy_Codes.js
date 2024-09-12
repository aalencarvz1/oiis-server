'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Tables } = require("./Tables");


/**
 * class model
 */
class Commission_Entitiy_Codes extends BaseTableModel {
  static id = 9050;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Commission_Entitiy_Codes.getBaseTableModelFields(),...{                 
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
      description:{
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

  static constraints = [...(Commission_Entitiy_Codes.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['IDTABLEENTITY'],
    type: 'foreign key',
    references: { 
        table: Tables,
        field: 'id'
    },
    onUpdate: 'cascade'
  }]];

};


module.exports = {Commission_Entitiy_Codes}