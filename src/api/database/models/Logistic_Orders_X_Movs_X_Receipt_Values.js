'use strict';
/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Logistic_Orders_X_Movs } = require("./Logistic_Orders_X_Movs");
const { Logistic_Orders } = require("./Logistic_Orders");
const { Logistic_Orders_X_Items_Mov_Amt } = require("./Logistic_Orders_X_Items_Mov_Amt");
const { Financial_Value_Forms } = require("./Financial_Value_Forms");
const { Currencies } = require("./Currencies");


/**
 * class model
 */
class Logistic_Orders_X_Movs_X_Receipt_Values extends BaseTableModel {
  static id = 12006;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Logistic_Orders_X_Movs_X_Receipt_Values.getBaseTableModelFields(),...{    
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

  static constraints = [...(Logistic_Orders_X_Movs_X_Receipt_Values.getBaseTableModelConstraints() || []),...[
    {
      name: Logistic_Orders_X_Movs_X_Receipt_Values.tableName + '_u1',
      fields: [...Logistic_Orders_X_Movs_X_Receipt_Values.getBaseTableModelUniqueFields(),...Logistic_Orders_X_Movs_X_Receipt_Values.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDLOGORDRECIPTREF'],
      type: 'foreign key',
      references: { 
          table: Logistic_Orders_X_Movs_X_Receipt_Values,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['IDLOGISTICORDER'],
      type: 'foreign key',
      references: { 
          table: Logistic_Orders,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['IDLOGISTICORDERXMOV'],
      type: 'foreign key',
      references: { 
          table: Logistic_Orders_X_Movs,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['IDFINANCIALVALUEFORM'],
      type: 'foreign key',
      references: { 
          table: Financial_Value_Forms,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDLOGMOVXITEMMOVAMT'],
      type: 'foreign key',
      references: { 
          table: Logistic_Orders_X_Items_Mov_Amt,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['IDCURRENCYTYPEEXPECTED'],
      type: 'foreign key',
      references: { 
          table: Currencies,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCURRENCYTYPERECEIVED'],
      type: 'foreign key',
      references: { 
          table: Currencies,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Logistic_Orders_X_Movs_X_Receipt_Values}