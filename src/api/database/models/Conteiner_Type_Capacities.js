'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Measurement_Units } = require("./Measurement_Units");
const { Identifier_Types } = require("./Identifier_Types");
const { Conteiner_Types } = require("./Conteiner_Types");

/**
 * class model
 */
class Conteiner_Type_Capacities extends BaseTableModel {
  static id = 8004;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Conteiner_Type_Capacities.getBaseTableModelFields(),...{           
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

  static constraints = [...(Conteiner_Type_Capacities.getBaseTableModelConstraints() || []),...[
    {
      name: Conteiner_Type_Capacities.tableName + '_u1',
      fields: [...Conteiner_Type_Capacities.getBaseTableModelUniqueFields(),...Conteiner_Type_Capacities.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDCONTEINERTYPE'],
      type: 'foreign key',
      references: { 
          table: Conteiner_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCAPACITYTYPE'],
      type: 'foreign key',
      references: { 
          table: Identifier_Types,
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


module.exports = {Conteiner_Type_Capacities}