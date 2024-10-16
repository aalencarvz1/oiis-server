'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Data_Types } = require("./Data_Types");

/**
 * class model
 */
console.log('Parameters - antes declaracao classe, antes exportacao');
class Parameters extends BaseTableModel {
  static id = 55;

  static tableName = this.name.toLowerCase();

  static HAS_WINTHOR_INTEGRATION = 1;
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
      data_type_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull : false,
      },
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      default_value: {
        type: DataTypes.STRING(256)
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Parameters.getBaseTableModelConstraints() || []),...[
    {
      name: Parameters.tableName + '_u1',
      fields: [...Parameters.getBaseTableModelUniqueFields(),...Parameters.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['data_type_id'],
      type: 'foreign key',
      references: { 
          table: Data_Types,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};

console.log('Parameters - apos declaracao classe, antes exportacao');



module.exports = {Parameters}

console.log('Parameters - apos declaracao classe, apos exportacao');