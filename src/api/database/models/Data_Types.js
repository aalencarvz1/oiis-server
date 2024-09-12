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
      ISBOOLEAN:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISTEXT:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISNUMBER:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISARRAY:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISOBJECT:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISDECIMAL:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISDATE:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISTIME:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISOTHER:{
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
    fields:['ISBOOLEAN'],
    type:"check",
    where:{
      ISBOOLEAN: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  },{
    name: Data_Types.tableName + '_c_2',
    fields:['ISTEXT'],
    type:"check",
    where:{
      ISTEXT: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  },{
    name: Data_Types.tableName + '_c_3',
    fields:['ISNUMBER'],
    type:"check",
    where:{
      ISNUMBER: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  },{
    name: Data_Types.tableName + '_c_4',
    fields:['ISARRAY'],
    type:"check",
    where:{
      ISARRAY: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  },{
    name: Data_Types.tableName + '_c_5',
    fields:['ISOBJECT'],
    type:"check",
    where:{
      ISOBJECT: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  },{
    name: Data_Types.tableName + '_c_6',
    fields:['ISDECIMAL'],
    type:"check",
    where:{
      ISDECIMAL: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  },{
    name: Data_Types.tableName + '_c_7',
    fields:['ISDATE'],
    type:"check",
    where:{
      ISDATE: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  },{
    name: Data_Types.tableName + '_c_8',
    fields:['ISTIME'],
    type:"check",
    where:{
      ISTIME: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  },{
    name: Data_Types.tableName + '_c_9',
    fields:['ISOTHER'],
    type:"check",
    where:{
      ISOTHER: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};



module.exports = {Data_Types}