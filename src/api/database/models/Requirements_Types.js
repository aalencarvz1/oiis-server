'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Requirements_Types extends BaseTableModel {
  static id = 15019;
  static tableName = this.name.toLowerCase();
  static model = null;

  static FUNCTIONAL = 1;
  static NO_FUNCTIONAL = 2;

  static fields = {
    ...Requirements_Types.getBaseTableModelFields(),...{            
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      description: {
        type: DataTypes.TEXT
      },
      anotations: {
        type: DataTypes.TEXT
      },
      is_functional: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 1
      },
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Requirements_Types.getBaseTableModelConstraints() || []),...[{
    name: Requirements_Types.tableName + '_u1',
    fields: [...Requirements_Types.getBaseTableModelUniqueFields(),...Requirements_Types.uniqueFields],
    type:"unique"
  },{
    name: Requirements_Types.tableName + '_c_1',
    fields:['is_functional'],
    type:"check",
    where:{
      is_functional: {
            [Sequelize.Op.in]: [0,1]
        }
    }
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Requirements_Types}