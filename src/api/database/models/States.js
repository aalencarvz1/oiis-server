'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Countries } = require("./Countries");

/**
 * class model
 */
class States extends BaseTableModel {
  static id = 2002;
  static model = null;
  static fields = {
    ...States.getBaseTableModelFields(),...{           
      IDCOUNTRY:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      name:{
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
    'name'
  ];

  static constraints = [...(States.getBaseTableModelConstraints() || []),...[
    {
      name: States.name.toLowerCase() + '_u1',
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
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {States}