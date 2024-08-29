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
  static ID = 30801;
  static model = null;
  static fields = {
    ...MeasXMeasOrigins.getBaseTableModelFields(),...{           
      /*idorigindata:{
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
      name: MeasXMeasOrigins.name.toUpperCase() + '_U1',
      fields: [...MeasXMeasOrigins.getBaseTableModelUniqueFields(),...MeasXMeasOrigins.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    /*{
      fields: ['idorigindata'],
      type: 'foreign key',
      references: { 
          table: OriginsDatas,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },*/
    {
      fields: ['IDSUPPLIER'],
      type: 'foreign key',
      references: { 
          table: Suppliers,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },{
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


module.exports = {MeasXMeasOrigins}