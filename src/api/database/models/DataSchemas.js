'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class DataSchemas extends BaseTableModel {
  static id = 3;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...DataSchemas.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      ISDEFAULT: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(DataSchemas.getBaseTableModelConstraints() || []),...[
    {
      name: DataSchemas.tableName + '_u1',
      fields: [...DataSchemas.getBaseTableModelUniqueFields(),...DataSchemas.uniqueFields],
      type:"unique"
    },{
      name: DataSchemas.tableName + '_c_1',
      fields:['ISDEFAULT'],
      type:"check",
      where:{
        ISDEFAULT: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
    
};



module.exports = {DataSchemas}