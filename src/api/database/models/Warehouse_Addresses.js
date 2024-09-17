'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Identifier_Types } = require("./Identifier_Types");
const { Warehouse_Address_Types } = require("./Warehouse_Address_Types");
const { Warehouses } = require("./Warehouses");
const { Form_Types } = require("./Form_Types");

/**
 * class model
 */
class Warehouse_Addresses extends BaseTableModel {
  static id = 3004;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Warehouse_Addresses.getBaseTableModelFields(),...{           
      IDWAREHOUSE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDWAREHOUSEADDRESSTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      identifier_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      identifier:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      IDFORMTYPE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      ISSTORABLE: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },
      ISPASSABLE: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      is_disponible: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },
      observations:{
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'IDWAREHOUSE',
    'identifier'
  ];

  static constraints = [...(Warehouse_Addresses.getBaseTableModelConstraints() || []),...[
    {
      name: Warehouse_Addresses.tableName + '_u1',
      fields: [...Warehouse_Addresses.getBaseTableModelUniqueFields(),...Warehouse_Addresses.uniqueFields],
      type:"unique"
    },{
      name: Warehouse_Addresses.tableName + '_c_1',
      fields:['ISSTORABLE'],
      type:"check",
      where:{
        ISSTORABLE: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Warehouse_Addresses.tableName + '_c_2',
      fields:['ISPASSABLE'],
      type:"check",
      where:{
        ISPASSABLE: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Warehouse_Addresses.tableName + '_c_3',
      fields:['is_disponible'],
      type:"check",
      where:{
        is_disponible: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDWAREHOUSE'],
      type: 'foreign key',
      references: { 
          table: Warehouses,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDWAREHOUSEADDRESSTYPE'],
      type: 'foreign key',
      references: { 
          table: Warehouse_Address_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['identifier_type_id'],
      type: 'foreign key',
      references: { 
          table: Identifier_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDFORMTYPE'],
      type: 'foreign key',
      references: { 
          table: Form_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Warehouse_Addresses}