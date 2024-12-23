'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseWinthorIntegrationTableModel } = require("./BaseWinthorIntegrationTableModel");
const { Integration_Tables } = require("./Integration_Tables");

/**
 * class model
 */
class Integration_Columns extends BaseWinthorIntegrationTableModel {
  static id = 35003;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    creator_user_id: {
      type: DataTypes.BIGINT.UNSIGNED,                
      allowNull: false,
      defaultValue:1 
    },
    created_at : {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updater_user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
    },
    updated_at : {
        type: DataTypes.DATE
    },  
    integration_table_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull:false
    },
    column_name:{
      type: DataTypes.STRING(255),
      allowNull:false
    },      
    integrate:{
      type: DataTypes.INTEGER(1),
      allowNull:false,
      defaultValue:1
    },
    integrate_insert:{
      type: DataTypes.INTEGER(1),
      allowNull:false,
      defaultValue:1
    },
    integrate_update:{
      type: DataTypes.INTEGER(1),
      allowNull:false,
      defaultValue:1
    }           
  };
  
  static uniqueFields = [
    'integration_table_id',
    'column_name'
  ];

  static constraints = [{
    name: Integration_Columns.tableName + '_u1',
    fields: Integration_Columns.uniqueFields,
    type:"unique"
  },{
    name: Integration_Columns.tableName + '_c_1',
    fields:['integrate'],
    type:"check",
    where:{
      integrate: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: Integration_Columns.tableName + '_c_2',
    fields:['integrate_insert'],
    type:"check",
    where:{
      integrate_insert: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: Integration_Columns.tableName + '_c_3',
    fields:['integrate_update'],
    type:"check",
    where:{
      integrate_update: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  }];

  static foreignsKeys = [{
    fields: ['integration_table_id'],
    type: 'foreign key',
    references: { 
        table: Integration_Tables,
        field: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }];
  
  
};


module.exports = {Integration_Columns}
