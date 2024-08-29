'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Countries } = require("./Countries");

/**
 * class model
 */
class States extends BaseTableModel {
  static ID = 2002;
  static model = null;
  static fields = {
    ...States.getBaseTableModelFields(),...{           
      IDCOUNTRY:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
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
    'IDCOUNTRY',
    'NAME'
  ];

  static constraints = [...(States.getBaseTableModelConstraints() || []),...[
    {
      name: States.name.toUpperCase() + '_U1',
      fields: [...States.getBaseTableModelUniqueFields(),...States.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDCOUNTRY'],
      type: 'foreign key',
      references: { 
          table: Countries,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {States}