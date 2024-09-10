'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Measurement_Units } = require("./Measurement_Units");
const { Suppliers } = require("./Suppliers");

/**
 * class model
 */
class MeasXMeasOrigins extends BaseTableModel {
  static id = 30801;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...MeasXMeasOrigins.getBaseTableModelFields(),...{           
      /*data_origin_id:{
        type: DataTypes.BIGINT.UNSIGNED
      }, already exists*/
      IDSUPPLIER:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      MEASUREMENTUNITORIGIN:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      IDMEASUREMENTUNIT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    Sequelize.literal(`(COALESCE(IDSUPPLIER,0))`),
    'MEASUREMENTUNITORIGIN'
  ];

  static constraints = [...(MeasXMeasOrigins.getBaseTableModelConstraints() || []),...[
    {
      name: MeasXMeasOrigins.tableName + '_u1',
      fields: [...MeasXMeasOrigins.getBaseTableModelUniqueFields(),...MeasXMeasOrigins.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    /*{
      fields: ['data_origin_id'],
      type: 'foreign key',
      references: { 
          table: Data_Origins,
          field: 'id'
      },
      onUpdate: 'cascade'
    },*/
    {
      fields: ['IDSUPPLIER'],
      type: 'foreign key',
      references: { 
          table: Suppliers,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
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


module.exports = {MeasXMeasOrigins}