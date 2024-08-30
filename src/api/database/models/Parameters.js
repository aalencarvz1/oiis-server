'use strict';

/*imports*/
const { DataTypes : DataTypesSeq } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { DataTypes } = require("./DataTypes");

/**
 * class model
 */
console.log('Parameters - antes declaracao classe, antes exportacao');
class Parameters extends BaseTableModel {
  static ID = 55;

  static INTEGRATE_WINTHOR = 1;
  static LOGISTIC_INTEGRATE_AUTOMATIC_CLOSE_BOX_DRIVER = 2;
  static WMS_OUTPUT_INTEGRATION_CHECK_RCA = 3;
  static APPS_DELIVERY_MUST_CAPTURE_SIGNATURE	= 4;
  static APPS_DELIVERY_MUST_CAPTURE_SIGNATURE_BY_INVOICE	= 5;
  static APPS_DELIVERY_ONLY_ONE_DELIVERY_RUNNING = 6;
  static WINTHOR_INTEGRATION_NCM_CONSIDER_EXCEPTION_NULL_IF_NOT_EXISTS = 10;
  static COMMISSION_MIN_VAL = 9050;

  static model = null;
  static fields = {
    ...Parameters.getBaseTableModelFields(),...{
      IDDATATYPE: {
        type: DataTypesSeq.BIGINT.UNSIGNED,
        allowNull : false,
      },
      NAME: {
        type: DataTypesSeq.STRING(256),
        allowNull: false
      },
      DEFAULTVALUE: {
        type: DataTypesSeq.STRING(256)
      },
      DESCRIPTION: {
        type: DataTypesSeq.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(Parameters.getBaseTableModelConstraints() || []),...[
    {
      name: Parameters.name.toUpperCase() + '_U1',
      fields: [...Parameters.getBaseTableModelUniqueFields(),...Parameters.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDDATATYPE'],
      type: 'foreign key',
      references: { 
          table: DataTypes,
          field: 'ID'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};

console.log('Parameters - apos declaracao classe, antes exportacao');



module.exports = {Parameters}

console.log('Parameters - apos declaracao classe, apos exportacao');