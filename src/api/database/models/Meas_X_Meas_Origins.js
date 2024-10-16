'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Measurement_Units } = require("./Measurement_Units");
const { Suppliers } = require("./Suppliers");

/**
 * class model
 */
class Meas_X_Meas_Origins extends BaseTableModel {
  static id = 30801;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Meas_X_Meas_Origins.getBaseTableModelFields(),...{           
      /*data_origin_id:{
        type: DataTypes.BIGINT.UNSIGNED
      }, already exists*/
      supplier_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      origin_measurement_unit:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      measurement_unit_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    Sequelize.literal(`(COALESCE(supplier_id,0))`),
    'origin_measurement_unit'
  ];

  static constraints = [...(Meas_X_Meas_Origins.getBaseTableModelConstraints() || []),...[
    {
      name: Meas_X_Meas_Origins.tableName + '_u1',
      fields: [...Meas_X_Meas_Origins.getBaseTableModelUniqueFields(),...Meas_X_Meas_Origins.uniqueFields],
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
      fields: ['supplier_id'],
      type: 'foreign key',
      references: { 
          table: Suppliers,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
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


module.exports = {Meas_X_Meas_Origins}