'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class FormsTypes extends BaseTableModel {
  static id = 1031;
  static model = null;
  static fields = {
    ...FormsTypes.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      PATH:{
        type: DataTypes.STRING(2000)
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(FormsTypes.getBaseTableModelConstraints() || []),...[
    {
      name: FormsTypes.name.toLowerCase() + '_u1',
      fields: [...FormsTypes.getBaseTableModelUniqueFields(),...FormsTypes.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};


module.exports = {FormsTypes}