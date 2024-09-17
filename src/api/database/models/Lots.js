'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Identifier_Types } = require("./Identifier_Types");
const { Suppliers } = require("./Suppliers");

/**
 * class model
 */
class Lots extends BaseTableModel {
  static id = 8014;
  static tableName = this.name.toLowerCase();
  static model = null;

  static WITHOUT_LOT = 1;

  static fields = {
    ...Lots.getBaseTableModelFields(),...{           
      IDSUPPLIER:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      identifier_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      identifier:{
        type: DataTypes.STRING(256),
        allowNull:false
      },      
      PRODUCTIONDATE:{
        type: DataTypes.DATE
      },      
      expiration_date:{
        type: DataTypes.DATE
      }
    }
  };
  
  static uniqueFields = [
    'IDSUPPLIER',
    'identifier_type_id',
    'identifier'
  ];

  static constraints = [...(Lots.getBaseTableModelConstraints() || []),...[
    {
      name: Lots.tableName + '_u1',
      fields: [...Lots.getBaseTableModelUniqueFields(),...Lots.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDSUPPLIER'],
      type: 'foreign key',
      references: { 
          table: Suppliers,
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
    }
  ]];
  
};


module.exports = {Lots}