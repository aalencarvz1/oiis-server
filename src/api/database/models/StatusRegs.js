'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

/**
 * class model
 */
class StatusRegs extends BaseTableModel {
  static id = 65;
  static model = null;

  static ACTIVE = 1;
  static INACTIVE = 2;

  static fields = {
    ...StatusRegs.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      },
      ISACTIVE: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(StatusRegs.getBaseTableModelConstraints() || []),...[
    {
      name: StatusRegs.name.toLowerCase() + '_u1',
      fields: [...StatusRegs.getBaseTableModelUniqueFields(),...StatusRegs.uniqueFields],
      type:"unique"
    },{
      name: StatusRegs.name.toLowerCase() + '_c_1',
      fields:['ISACTIVE'],
      type:"check",
      where:{
        ISACTIVE: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};

module.exports = { StatusRegs };
