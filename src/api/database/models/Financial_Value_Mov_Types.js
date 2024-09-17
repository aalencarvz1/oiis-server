'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Financial_Value_Mov_Types extends BaseTableModel {
  static id = 1034;
  static tableName = this.name.toLowerCase();
  static model = null;

  static TRANSFERENCE = 1; 
  static DEPOSIT = 2;
  static POUCH = 3; // MALOTE


  static fields = {
    ...Financial_Value_Mov_Types.getBaseTableModelFields(),...{
      parent_id:{
        type : DataTypes.BIGINT.UNSIGNED,                
      },
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      is_physical: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      is_eletronic: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      description: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    Sequelize.literal(`(COALESCE(parent_id,0))`),
    'name'
  ];

  static constraints = [...(Financial_Value_Mov_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Financial_Value_Mov_Types.tableName + '_u1',
      fields: [...Financial_Value_Mov_Types.getBaseTableModelUniqueFields(),...Financial_Value_Mov_Types.uniqueFields],
      type:"unique"
    },{
      name: Financial_Value_Mov_Types.tableName + '_c_1',
      fields:['is_physical'],
      type:"check",
      where:{
        is_physical: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Financial_Value_Mov_Types.tableName + '_c_3',
      fields:['is_eletronic'],
      type:"check",
      where:{
        is_eletronic: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['parent_id'],
    type: 'foreign key',
    references: { 
        table: Financial_Value_Mov_Types,
        field: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }]];


  static getIdByIntegrationId(idOnOrigin) {
    let result = Financial_Value_Mov_Types.DEPOSIT;
    switch(idOnOrigin.trim().toLowerCase()) {
      case 'DEPÓSITO':
      case 'DEPOSITO':
      case 'DEP':
      case 'DEPOSIT':
          result = Financial_Value_Mov_Types.DEPOSIT;
          break;
      case 'TRANSFERÊNCIA':
      case 'TRANSFERENCIA':
      case 'TRANSFERENCE':
      case 'TRANSF':
          result = Financial_Value_Mov_Types.TRANSFERENCE;
          break;
      case 'MALOTE':
      case 'MALOT':
      case 'POUCH':
          result = Financial_Value_Mov_Types.POUCH;
          break;
      default:
          result = Financial_Value_Mov_Types.DEPOSIT;
          break;
    }
    return result;
  }
  
};


module.exports = {Financial_Value_Mov_Types}