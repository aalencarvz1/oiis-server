'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class StatusSync extends BaseTableModel {
  static ID = 66;
  static model = null;
  static fields = {
    ...StatusSync.getBaseTableModelFields(),...{
      NAME: {
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
    'NAME'
  ];

  static constraints = [...(StatusSync.getBaseTableModelConstraints() || []),...[
    {
      name: StatusSync.name.toUpperCase() + '_U1',
      fields: [...StatusSync.getBaseTableModelUniqueFields(),...StatusSync.uniqueFields],
      type:"unique"
    },{
      name: StatusSync.name.toUpperCase() + '_C_1',
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