'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { MeasurementsUnits } = require("./MeasurementsUnits");
const { IdentifiersTypes } = require("./IdentifiersTypes");
const { ConteinersTypes } = require("./ConteinersTypes");

/**
 * class model
 */
class ConteinersTypesDimensions extends BaseTableModel {
  static id = 8003;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...ConteinersTypesDimensions.getBaseTableModelFields(),...{           
      IDCONTEINERTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDDIMENSIONTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      IDMEASUREMENTUNIT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      VALUE:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:0
      },
      OBSERVATIONS:{
        type:DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'IDCONTEINERTYPE',
    'IDDIMENSIONTYPE'
  ];

  static constraints = [...(ConteinersTypesDimensions.getBaseTableModelConstraints() || []),...[
    {
      name: ConteinersTypesDimensions.tableName + '_u1',
      fields: [...ConteinersTypesDimensions.getBaseTableModelUniqueFields(),...ConteinersTypesDimensions.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDCONTEINERTYPE'],
      type: 'foreign key',
      references: { 
          table: ConteinersTypes,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDDIMENSIONTYPE'],
      type: 'foreign key',
      references: { 
          table: IdentifiersTypes,
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


module.exports = {ConteinersTypesDimensions}