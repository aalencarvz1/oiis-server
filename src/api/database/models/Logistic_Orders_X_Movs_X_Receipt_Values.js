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
      logistic_order_movement_receipt_value_ref_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },       
      logistic_order_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },       
      mov_logistic_order_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      financial_value_form_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      logistic_mov_item_mov_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },            
      expected_currency_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      expiration_date:{
        type: DataTypes.DATE
      },      
      expected_value:{
        type: DataTypes.DECIMAL(32,10)
      },     
      expected_value_notes:{
        type: DataTypes.TEXT
      }, 
      received_currency_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      received_value:{
        type: DataTypes.DECIMAL(32,10)
      },      
      received_at:{
        type: DataTypes.DATE
      },            
      received_notes:{
        type: DataTypes.TEXT
      },
      numeric_order:{
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
    Sequelize.literal(`(COALESCE(logistic_order_movement_receipt_value_ref_id,0))`),
    'logistic_order_id',
    Sequelize.literal(`(COALESCE(mov_logistic_order_id,0))`),
    'financial_value_form_id',
    Sequelize.literal(`(COALESCE(logistic_mov_item_mov_id,0))`),
    'expected_currency_id',
    'numeric_order'
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
      fields: ['logistic_order_movement_receipt_value_ref_id'],
      type: 'foreign key',
      references: { 
          table: Logistic_Orders_X_Movs_X_Receipt_Values,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['logistic_order_id'],
      type: 'foreign key',
      references: { 
          table: Logistic_Orders,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['mov_logistic_order_id'],
      type: 'foreign key',
      references: { 
          table: Logistic_Orders_X_Movs,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['financial_value_form_id'],
      type: 'foreign key',
      references: { 
          table: Financial_Value_Forms,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['logistic_mov_item_mov_id'],
      type: 'foreign key',
      references: { 
          table: Logistic_Orders_X_Items_Mov_Amt,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['expected_currency_id'],
      type: 'foreign key',
      references: { 
          table: Currencies,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['received_currency_id'],
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