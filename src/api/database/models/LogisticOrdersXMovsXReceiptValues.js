'use strict';
/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { LogisticOrdersXMovs } = require("./LogisticOrdersXMovs");
const { LogisticOrders } = require("./LogisticOrders");
const { LogisticOrdersXItemsMovAmt } = require("./LogisticOrdersXItemsMovAmt");
const { FinancialValueForms } = require("./FinancialValueForms");
const { CurrenciesTypes } = require("./CurrenciesTypes");


/**
 * class model
 */
class LogisticOrdersXMovsXReceiptValues extends BaseTableModel {
  static ID = 12006;
  static model = null;
  static fields = {
    ...LogisticOrdersXMovsXReceiptValues.getBaseTableModelFields(),...{    
      IDLOGORDRECIPTREF:{
        type: DataTypes.BIGINT.UNSIGNED
      },       
      IDLOGISTICORDER:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },       
      IDLOGISTICORDERXMOV:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDFINANCIALVALUEFORM:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDLOGMOVXITEMMOVAMT:{
        type: DataTypes.BIGINT.UNSIGNED
      },            
      IDCURRENCYTYPEEXPECTED:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      EXPIRATIONDATE:{
        type: DataTypes.DATE
      },      
      EXPECTEDVALUE:{
        type: DataTypes.DECIMAL(32,10)
      },     
      OBSERVATIONSEXPECTED:{
        type: DataTypes.TEXT
      }, 
      IDCURRENCYTYPERECEIVED:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      RECEIVEDVALUE:{
        type: DataTypes.DECIMAL(32,10)
      },      
      RECEIVED_AT:{
        type: DataTypes.DATE
      },            
      OBSERVATIONSRECEIVED:{
        type: DataTypes.TEXT
      },
      ORDERNUM:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        defaultValue:1
      },
      PROOFS:{
        type: DataTypes.TEXT
      },
      CANCELED_AT:{
        type: DataTypes.DATE
      }, 
    }
  };
  
  static uniqueFields = [
    Sequelize.literal(`(COALESCE(IDLOGORDRECIPTREF,0))`),
    'IDLOGISTICORDER',
    Sequelize.literal(`(COALESCE(IDLOGISTICORDERXMOV,0))`),
    'IDFINANCIALVALUEFORM',
    Sequelize.literal(`(COALESCE(IDLOGMOVXITEMMOVAMT,0))`),
    'IDCURRENCYTYPEEXPECTED',
    'ORDERNUM'
  ];

  static constraints = [...(LogisticOrdersXMovsXReceiptValues.getBaseTableModelConstraints() || []),...[
    {
      name: LogisticOrdersXMovsXReceiptValues.name.toUpperCase() + '_U1',
      fields: [...LogisticOrdersXMovsXReceiptValues.getBaseTableModelUniqueFields(),...LogisticOrdersXMovsXReceiptValues.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDLOGORDRECIPTREF'],
      type: 'foreign key',
      references: { 
          table: LogisticOrdersXMovsXReceiptValues,
          field: 'ID'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['IDLOGISTICORDER'],
      type: 'foreign key',
      references: { 
          table: LogisticOrders,
          field: 'ID'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['IDLOGISTICORDERXMOV'],
      type: 'foreign key',
      references: { 
          table: LogisticOrdersXMovs,
          field: 'ID'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['IDFINANCIALVALUEFORM'],
      type: 'foreign key',
      references: { 
          table: FinancialValueForms,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDLOGMOVXITEMMOVAMT'],
      type: 'foreign key',
      references: { 
          table: LogisticOrdersXItemsMovAmt,
          field: 'ID'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['IDCURRENCYTYPEEXPECTED'],
      type: 'foreign key',
      references: { 
          table: CurrenciesTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCURRENCYTYPERECEIVED'],
      type: 'foreign key',
      references: { 
          table: CurrenciesTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {LogisticOrdersXMovsXReceiptValues}