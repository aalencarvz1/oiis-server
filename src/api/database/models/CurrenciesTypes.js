'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class CurrenciesTypes extends BaseTableModel {
  static id = 1030;

  static tableName = this.name.toLowerCase();

  static DOLAR = 1;
  static BRL = 2;

  static model = null;
  static fields = {
    ...CurrenciesTypes.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      SYMBOL:{
        type: DataTypes.STRING(10)
      },
      ISPHYSICAL: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(CurrenciesTypes.getBaseTableModelConstraints() || []),...[
    {
      name: CurrenciesTypes.tableName + '_u1',
      fields: [...CurrenciesTypes.getBaseTableModelUniqueFields(),...CurrenciesTypes.uniqueFields],
      type:"unique"
    },{
      name: CurrenciesTypes.tableName + '_c_1',
      fields:['ISPHYSICAL'],
      type:"check",
      where:{
        ISPHYSICAL: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};


module.exports = {CurrenciesTypes}