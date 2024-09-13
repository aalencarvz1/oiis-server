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
class Conteiner_Type_Dimensions extends BaseTableModel {
  static id = 8003;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Conteiner_Type_Dimensions.getBaseTableModelFields(),...{           
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
      observations:{
        type:DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'IDCONTEINERTYPE',
    'IDDIMENSIONTYPE'
  ];

  static constraints = [...(Conteiner_Type_Dimensions.getBaseTableModelConstraints() || []),...[
    {
      name: Conteiner_Type_Dimensions.tableName + '_u1',
      fields: [...Conteiner_Type_Dimensions.getBaseTableModelUniqueFields(),...Conteiner_Type_Dimensions.uniqueFields],
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
      fields: ['IDDIMENSIONTYPE'],
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


module.exports = {Conteiner_Type_Dimensions}