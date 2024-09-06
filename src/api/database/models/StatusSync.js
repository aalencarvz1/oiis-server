'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class StatusSync extends BaseTableModel {
  static id = 66;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...StatusSync.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      SYNCRONIZED: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(StatusSync.getBaseTableModelConstraints() || []),...[
    {
      name: StatusSync.tableName + '_u1',
      fields: [...StatusSync.getBaseTableModelUniqueFields(),...StatusSync.uniqueFields],
      type:"unique"
    },{
      name: StatusSync.tableName + '_c_1',
      fields:['SYNCRONIZED'],
      type:"check",
      where:{
        SYNCRONIZED: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
    
};



module.exports = {StatusSync}