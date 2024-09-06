'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class StatusSync extends BaseTableModel {
  static id = 66;
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
      name: StatusSync.name.toLowerCase() + '_u1',
      fields: [...StatusSync.getBaseTableModelUniqueFields(),...StatusSync.uniqueFields],
      type:"unique"
    },{
      name: StatusSync.name.toLowerCase() + '_c_1',
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