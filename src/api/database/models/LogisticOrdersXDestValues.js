'use strict';
/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { LogisticOrders } = require("./LogisticOrders");
const { FinancialValueForms } = require("./FinancialValueForms");
const { CurrenciesTypes } = require("./CurrenciesTypes");
const { FinancialValueMovTypes } = require("./FinancialValueMovTypes");


/**
 * class model
 */
class LogisticOrdersXDestValues extends BaseTableModel {
  static ID = 12007;
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
      name: LogisticOrdersXDestValues.name.toUpperCase() + '_U1',
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
          field: 'ID'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['IDLOGORDFINANCIALVALUEFORM'],
      type: 'foreign key',
      references: { 
          table: FinancialValueForms,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCURRENCYTYPE'],
      type: 'foreign key',
      references: { 
          table: CurrenciesTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDFINANCIALVALUEMOVTYPEDEST'],
      type: 'foreign key',
      references: { 
          table: FinancialValueMovTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {LogisticOrdersXDestValues}