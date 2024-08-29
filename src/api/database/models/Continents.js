'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Continents extends BaseTableModel {
  static ID = 2000;
  static model = null;

  static AMERICA = 1;
  static SOUTH_AMERICA = 2;

  static fields = {
    ...Continents.getBaseTableModelFields(),...{           
      IDSUP:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      NAME:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      SIGLA:{
        type: DataTypes.STRING(10)
      }
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(Continents.getBaseTableModelConstraints() || []),...[
    {
      name: Continents.name.toUpperCase() + '_U1',
      fields: [...Continents.getBaseTableModelUniqueFields(),...Continents.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys() || []),...[{
    fields: ['IDSUP'],
    type: 'foreign key',
    references: { 
        table: Continents,
        field: 'ID'
    },
    onUpdate: 'cascade'
  }]];
  
};


module.exports = {Continents}