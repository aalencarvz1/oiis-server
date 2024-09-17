'use strict';
/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Logistic_Orders } = require("./Logistic_Orders");
const { Financial_Value_Forms } = require("./Financial_Value_Forms");
const { Currencies } = require("./Currencies");
const { Financial_Value_Mov_Types } = require("./Financial_Value_Mov_Types");


/**
 * class model
 */
class Logistic_Orders_X_Dest_Values extends BaseTableModel {
  static id = 12007;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Logistic_Orders_X_Dest_Values.getBaseTableModelFields(),...{    
      logistic_order_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },       
      logistic_order_financial_value_form_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      currenty_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },      
      financial_value_mov_type_dest:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },      
      destinated_value:{
        type: DataTypes.DECIMAL(32,10)
      },
      numeric_order:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        defaultValue:1
      },
      observations:{
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'logistic_order_id',
    'logistic_order_financial_value_form_id',
    'financial_value_mov_type_dest',
    'numeric_order'
  ];

  static constraints = [...(Logistic_Orders_X_Dest_Values.getBaseTableModelConstraints() || []),...[
    {
      name: Logistic_Orders_X_Dest_Values.tableName + '_u1',
      fields: [...Logistic_Orders_X_Dest_Values.getBaseTableModelUniqueFields(),...Logistic_Orders_X_Dest_Values.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['logistic_order_id'],
      type: 'foreign key',
      references: { 
          table: Logistic_Orders,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['logistic_order_financial_value_form_id'],
      type: 'foreign key',
      references: { 
          table: Financial_Value_Forms,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['currenty_type_id'],
      type: 'foreign key',
      references: { 
          table: Currencies,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['financial_value_mov_type_dest'],
      type: 'foreign key',
      references: { 
          table: Financial_Value_Mov_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Logistic_Orders_X_Dest_Values}