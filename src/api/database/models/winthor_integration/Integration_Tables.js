'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseWinthorIntegrationTableModel } = require("./BaseWinthorIntegrationTableModel");

/**
 * class model
 */
class Integration_Tables extends BaseWinthorIntegrationTableModel {
  static id = 35002;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    id: {
      type : DataTypes.BIGINT.UNSIGNED,                
      primaryKey: true,
      allowNull: false 
    },
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
    schema_name:{
      type: DataTypes.STRING(255),
      allowNull:false
    },
    user_name:{
      type: DataTypes.STRING(255)
    },
    table_name:{
      type: DataTypes.STRING(255),
      allowNull:false
    },
    identifier_column:{
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
    },
    integrate_delete:{
      type: DataTypes.INTEGER(1),
      allowNull:false,
      defaultValue:1
    },
    integrate_on_demand:{
      type: DataTypes.INTEGER(1),
      allowNull:false,
      defaultValue:1
    },
    integrate_by_time:{
      type: DataTypes.STRING(2000)
    }
  };
  
  static uniqueFields = [
    'schema_name',
    'table_name'
  ];

  static constraints = [{
    name: Integration_Tables.tableName + '_u1',
    fields: Integration_Tables.uniqueFields,
    type:"unique"
  },{
    name: Integration_Tables.tableName + '_c_1',
    fields:['integrate'],
    type:"check",
    where:{
      integrate: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: Integration_Tables.tableName + '_c_2',
    fields:['integrate_insert'],
    type:"check",
    where:{
      integrate_insert: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: Integration_Tables.tableName + '_c_3',
    fields:['integrate_update'],
    type:"check",
    where:{
      integrate_update: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  },{
    name: Integration_Tables.tableName + '_c_4',
    fields:['integrate_delete'],
    type:"check",
    where:{
      integrate_delete: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  }];

  static foreignsKeys = [];
  
};


module.exports = {Integration_Tables}
