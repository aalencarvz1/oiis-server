'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Clients } = require("./Clients");
const { Packagings } = require("./Packagings");
const { Measurement_Units } = require("./Measurement_Units");
const { Items } = require("./Items");

/**
 * class model
 */
class Item_Mov_Xml_Import_Id_Conversions extends BaseTableModel {
  static id = 9038;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Item_Mov_Xml_Import_Id_Conversions.getBaseTableModelFields(),...{                 
      IDOWNERCLIENT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      DOCEMITENT:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      IDITEMORIGIN:{
        type: DataTypes.STRING(256),
        allowNull: false
      },
      FIELDXMLAMOUNT:{
        type: DataTypes.STRING(256),
        allowNull: false
      },
      IDITEM:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDPACKAGING:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDMEASUREMENTUNIT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      MULTIPLIER:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue: 1
      }
    }
  };
  
  static uniqueFields = [
    'IDOWNERCLIENT',
    'DOCEMITENT',
    'IDITEMORIGIN',
    'FIELDXMLAMOUNT'
  ];

  static constraints = [...(Item_Mov_Xml_Import_Id_Conversions.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDOWNERCLIENT'],
      type: 'foreign key',
      references: { 
          table: Clients,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDITEM'],
      type: 'foreign key',
      references: { 
          table: Items,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDPACKAGING'],
      type: 'foreign key',
      references: { 
          table: Packagings,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDMEASUREMENTUNIT'],
      type: 'foreign key',
      references: { 
          table: Measurement_Units,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Item_Mov_Xml_Import_Id_Conversions}