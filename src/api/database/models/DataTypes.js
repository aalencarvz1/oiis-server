'use strict';

/*imports*/
const { DataTypes: DataTypesSeq, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class DataTypes extends BaseTableModel {
  static ID = 50;

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
    ...DataTypes.getBaseTableModelFields(),...{
      NAME: {
        type: DataTypesSeq.STRING(256),
        allowNull: false
      },
      ISBOOLEAN:{
        type: DataTypesSeq.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISTEXT:{
        type: DataTypesSeq.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISNUMBER:{
        type: DataTypesSeq.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISARRAY:{
        type: DataTypesSeq.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISOBJECT:{
        type: DataTypesSeq.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISDECIMAL:{
        type: DataTypesSeq.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISDATE:{
        type: DataTypesSeq.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISTIME:{
        type: DataTypesSeq.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      ISOTHER:{
        type: DataTypesSeq.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      DESCRIPTION: {
        type: DataTypesSeq.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(DataTypes.getBaseTableModelConstraints() || []),...[{
    name: DataTypes.name.toUpperCase() + '_U1',
    fields: [...DataTypes.getBaseTableModelUniqueFields(),...DataTypes.uniqueFields],
    type:"unique"
  },{
    name: DataTypes.name.toUpperCase() + '_C_1',
    fields:['ISBOOLEAN'],
    type:"check",
    where:{
      ISBOOLEAN: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  },{
    name: DataTypes.name.toUpperCase() + '_C_2',
    fields:['ISTEXT'],
    type:"check",
    where:{
      ISTEXT: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  },{
    name: DataTypes.name.toUpperCase() + '_C_3',
    fields:['ISNUMBER'],
    type:"check",
    where:{
      ISNUMBER: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  },{
    name: DataTypes.name.toUpperCase() + '_C_4',
    fields:['ISARRAY'],
    type:"check",
    where:{
      ISARRAY: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  },{
    name: DataTypes.name.toUpperCase() + '_C_5',
    fields:['ISOBJECT'],
    type:"check",
    where:{
      ISOBJECT: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  },{
    name: DataTypes.name.toUpperCase() + '_C_6',
    fields:['ISDECIMAL'],
    type:"check",
    where:{
      ISDECIMAL: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  },{
    name: DataTypes.name.toUpperCase() + '_C_7',
    fields:['ISDATE'],
    type:"check",
    where:{
      ISDATE: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  },{
    name: DataTypes.name.toUpperCase() + '_C_8',
    fields:['ISTIME'],
    type:"check",
    where:{
      ISTIME: {
            [Sequelize.Op.in]: [0,1]
      }
    }
  },{
    name: DataTypes.name.toUpperCase() + '_C_9',
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



module.exports = {DataTypes}