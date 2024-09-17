'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Postal_Codes } = require("./Postal_Codes");
const { Postal_Codes_X_Streets } = require("./Postal_Codes_X_Streets");

/**
 * class model
 */
class Postal_Codes_X_Paths extends BaseTableModel {
  static id = 2010;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Postal_Codes_X_Paths.getBaseTableModelFields(),...{                 
      postal_code_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      postal_code_x_street_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      latitude:{
        type: DataTypes.DECIMAL(18,10)
      },
      longitude:{
        type: DataTypes.DECIMAL(18,10)
      },
      start_number:{
        type: DataTypes.STRING(256)
      },
      end_number:{
        type: DataTypes.STRING(256)
      }
    }
  };
  
  static uniqueFields = [
    'postal_code_id',
    Sequelize.literal(`(COALESCE(postal_code_x_street_id,0))`),
    Sequelize.literal(`(COALESCE(latitude,0))`),
    Sequelize.literal(`(COALESCE(longitude,0))`),
    Sequelize.literal(`(COALESCE(start_number,'NULL'))`),
    Sequelize.literal(`(COALESCE(end_number,'NULL'))`),
  ];

  static constraints = [...(Postal_Codes_X_Paths.getBaseTableModelConstraints() || []),...[
    {
      name: Postal_Codes_X_Paths.tableName + '_u1',
      fields: [...Postal_Codes_X_Paths.getBaseTableModelUniqueFields(),...Postal_Codes_X_Paths.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['postal_code_id'],
      type: 'foreign key',
      references: { 
          table: Postal_Codes,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['postal_code_x_street_id'],
      type: 'foreign key',
      references: { 
          table: Postal_Codes_X_Streets,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Postal_Codes_X_Paths}