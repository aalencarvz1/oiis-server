'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { IdentifiersTypes } = require("./IdentifiersTypes");
const { Suppliers } = require("./Suppliers");

/**
 * class model
 */
class Lots extends BaseTableModel {
  static ID = 8014;
  static model = null;

  static WITHOUT_LOT = 1;

  static fields = {
    ...Lots.getBaseTableModelFields(),...{           
      IDSUPPLIER:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDIDENTIFIERTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDENTIFIER:{
        type: DataTypes.STRING(256),
        allowNull:false
      },      
      PRODUCTIONDATE:{
        type: DataTypes.DATE
      },      
      EXPIRATIONDATE:{
        type: DataTypes.DATE
      }
    }
  };
  
  static uniqueFields = [
    'IDSUPPLIER',
    'IDIDENTIFIERTYPE',
    'IDENTIFIER'
  ];

  static constraints = [...(Lots.getBaseTableModelConstraints() || []),...[
    {
      name: Lots.name.toUpperCase() + '_U1',
      fields: [...Lots.getBaseTableModelUniqueFields(),...Lots.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDSUPPLIER'],
      type: 'foreign key',
      references: { 
          table: Suppliers,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDIDENTIFIERTYPE'],
      type: 'foreign key',
      references: { 
          table: IdentifiersTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Lots}