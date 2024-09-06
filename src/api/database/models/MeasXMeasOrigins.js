'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { MeasurementsUnits } = require("./MeasurementsUnits");
const { Suppliers } = require("./Suppliers");

/**
 * class model
 */
class MeasXMeasOrigins extends BaseTableModel {
  static id = 30801;
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
      name: MeasXMeasOrigins.name.toLowerCase() + '_u1',
      fields: [...MeasXMeasOrigins.getBaseTableModelUniqueFields(),...MeasXMeasOrigins.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    /*{
      fields: ['data_origin_id'],
      type: 'foreign key',
      references: { 
          table: OriginsDatas,
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
          table: MeasurementsUnits,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {MeasXMeasOrigins}