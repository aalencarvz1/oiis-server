'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class Data_Types extends BaseTableModel {
  static id = 50;

  static tableName = this.name.toLowerCase();

  static ANY = 1;
  static STRING = 2;
  static INTEGER = 3;  
  static BOOLEAN = 4;
  static ARRAY = 5;
  static OBJECT = 6;
  static NUMBER = 7;
  static DATE = 8;
  static TIME = 9;
  static DATETIME = 10;

  static model = null;
  static fields = {
    ...Data_Types.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      is_bool:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      is_text:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      is_number:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      is_array:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      is_object:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      is_decimal:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      is_date:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      is_time:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      is_other:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Data_Types.getBaseTableModelConstraints() || []),...[{
    name: Data_Types.tableName + '_u1',
    fields: [...Data_Types.getBaseTableModelUniqueFields(),...Data_Types.uniqueFields],
    type:"unique"
  },{
    name: Data_Types.tableName + '_c_1',
    fields:['is_bool'],
    type:"check",
    where:{
      is_bool: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  },{
    name: Data_Types.tableName + '_c_2',
    fields:['is_text'],
    type:"check",
    where:{
      is_text: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  },{
    name: Data_Types.tableName + '_c_3',
    fields:['is_number'],
    type:"check",
    where:{
      is_number: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  },{
    name: Data_Types.tableName + '_c_4',
    fields:['is_array'],
    type:"check",
    where:{
      is_array: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  },{
    name: Data_Types.tableName + '_c_5',
    fields:['is_object'],
    type:"check",
    where:{
      is_object: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  },{
    name: Data_Types.tableName + '_c_6',
    fields:['is_decimal'],
    type:"check",
    where:{
      is_decimal: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  },{
    name: Data_Types.tableName + '_c_7',
    fields:['is_date'],
    type:"check",
    where:{
      is_date: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  },{
    name: Data_Types.tableName + '_c_8',
    fields:['is_time'],
    type:"check",
    where:{
      is_time: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  },{
    name: Data_Types.tableName + '_c_9',
    fields:['is_other'],
    type:"check",
    where:{
      is_other: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};



module.exports = {Data_Types}