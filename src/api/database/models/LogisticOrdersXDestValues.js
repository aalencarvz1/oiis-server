'use strict';
/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { LogisticOrders } = require("./LogisticOrders");
const { Financial_Value_Forms } = require("./Financial_Value_Forms");
const { Currencies } = require("./Currencies");
const { Financial_Value_Mov_Types } = require("./Financial_Value_Mov_Types");


/**
 * class model
 */
class LogisticOrdersXDestValues extends BaseTableModel {
  static id = 12007;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...LogisticOrdersXDestValues.getBaseTableModelFields(),...{    
      IDLOGISTICORDER:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },       
      IDLOGORDFINANCIALVALUEFORM:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDCURRENCYTYPE:{
        type: DataTypes.BIGINT.UNSIGNED
      },      
      IDFINANCIALVALUEMOVTYPEDEST:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },      
      DESTINATEDVALUE:{
        type: DataTypes.DECIMAL(32,10)
      },
      ORDERNUM:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        defaultValue:1
      },
      OBSERVATIONS:{
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'IDLOGISTICORDER',
    'IDLOGORDFINANCIALVALUEFORM',
    'IDFINANCIALVALUEMOVTYPEDEST',
    'ORDERNUM'
  ];

  static constraints = [...(LogisticOrdersXDestValues.getBaseTableModelConstraints() || []),...[
    {
      name: LogisticOrdersXDestValues.tableName + '_u1',
      fields: [...LogisticOrdersXDestValues.getBaseTableModelUniqueFields(),...LogisticOrdersXDestValues.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDLOGISTICORDER'],
      type: 'foreign key',
      references: { 
          table: LogisticOrders,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['IDLOGORDFINANCIALVALUEFORM'],
      type: 'foreign key',
      references: { 
          table: Financial_Value_Forms,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCURRENCYTYPE'],
      type: 'foreign key',
      references: { 
          table: Currencies,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDFINANCIALVALUEMOVTYPEDEST'],
      type: 'foreign key',
      references: { 
          table: Financial_Value_Mov_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {LogisticOrdersXDestValues}