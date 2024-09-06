'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Clients } = require("./Clients");
const { Packagings } = require("./Packagings");
const { MeasurementsUnits } = require("./MeasurementsUnits");
const { Items } = require("./Items");

/**
 * class model
 */
class ItemsMovsXMLImportIdsConversions extends BaseTableModel {
  static id = 9038;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...ItemsMovsXMLImportIdsConversions.getBaseTableModelFields(),...{                 
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

  static constraints = [...(ItemsMovsXMLImportIdsConversions.getBaseTableModelConstraints() || []),...[]];

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
          table: MeasurementsUnits,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {ItemsMovsXMLImportIdsConversions}