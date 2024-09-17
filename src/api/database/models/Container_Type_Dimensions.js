'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Measurement_Units } = require("./Measurement_Units");
const { Identifier_Types } = require("./Identifier_Types");
const { Container_Types } = require("./Container_Types");

/**
 * class model
 */
class Container_Type_Dimensions extends BaseTableModel {
  static id = 8003;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Container_Type_Dimensions.getBaseTableModelFields(),...{           
      container_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      dimension_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      measurement_unit_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      value:{
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
    'container_type_id',
    'dimension_type_id'
  ];

  static constraints = [...(Container_Type_Dimensions.getBaseTableModelConstraints() || []),...[
    {
      name: Container_Type_Dimensions.tableName + '_u1',
      fields: [...Container_Type_Dimensions.getBaseTableModelUniqueFields(),...Container_Type_Dimensions.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['container_type_id'],
      type: 'foreign key',
      references: { 
          table: Container_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['dimension_type_id'],
      type: 'foreign key',
      references: { 
          table: Identifier_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['measurement_unit_id'],
      type: 'foreign key',
      references: { 
          table: Measurement_Units,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Container_Type_Dimensions}