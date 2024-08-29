'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class CurrenciesTypes extends BaseTableModel {
  static ID = 1030;

  static DOLAR = 1;
  static BRL = 2;

  static model = null;
  static fields = {
    ...CurrenciesTypes.getBaseTableModelFields(),...{           
      NAME:{
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
      DESCRIPTION: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(CurrenciesTypes.getBaseTableModelConstraints() || []),...[
    {
      name: CurrenciesTypes.name.toUpperCase() + '_U1',
      fields: [...CurrenciesTypes.getBaseTableModelUniqueFields(),...CurrenciesTypes.uniqueFields],
      type:"unique"
    },{
      name: CurrenciesTypes.name.toUpperCase() + '_C_1',
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