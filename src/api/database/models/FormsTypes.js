'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class FormsTypes extends BaseTableModel {
  static ID = 1031;
  static model = null;
  static fields = {
    ...FormsTypes.getBaseTableModelFields(),...{           
      NAME:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      PATH:{
        type: DataTypes.STRING(2000)
      }
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(FormsTypes.getBaseTableModelConstraints() || []),...[
    {
      name: FormsTypes.name.toUpperCase() + '_U1',
      fields: [...FormsTypes.getBaseTableModelUniqueFields(),...FormsTypes.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};


module.exports = {FormsTypes}