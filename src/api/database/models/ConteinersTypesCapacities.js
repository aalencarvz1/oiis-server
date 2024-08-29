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
class ConteinersTypesCapacities extends BaseTableModel {
  static ID = 8004;
  static model = null;
  static fields = {
    ...ConteinersTypesCapacities.getBaseTableModelFields(),...{           
      IDCONTEINERTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDCAPACITYTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      IDMEASUREMENTUNIT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      CAPACITY:{
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
    'IDCAPACITYTYPE'
  ];

  static constraints = [...(ConteinersTypesCapacities.getBaseTableModelConstraints() || []),...[
    {
      name: ConteinersTypesCapacities.name.toUpperCase() + '_U1',
      fields: [...ConteinersTypesCapacities.getBaseTableModelUniqueFields(),...ConteinersTypesCapacities.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDCONTEINERTYPE'],
      type: 'foreign key',
      references: { 
          table: ConteinersTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCAPACITYTYPE'],
      type: 'foreign key',
      references: { 
          table: IdentifiersTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDMEASUREMENTUNIT'],
      type: 'foreign key',
      references: { 
          table: MeasurementsUnits,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {ConteinersTypesCapacities}