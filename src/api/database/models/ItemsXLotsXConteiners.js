'use strict';
/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Lots } = require("./Lots");
const { Items } = require("./Items");
const { Conteiners } = require("./Conteiners");


/**
 * class model
 */
class ItemsXLotsXConteiners extends BaseTableModel {
  static ID = 8020;
  static model = null;

  static WITHOUT_CONTEINER = 1;

  static fields = {
    ...ItemsXLotsXConteiners.getBaseTableModelFields(),...{           
      IDITEM:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDLOT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDCONTEINER:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      OBSERVATIONS:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'IDITEM',
    'IDLOT',
    'IDCONTEINER'
  ];

  static constraints = [...(ItemsXLotsXConteiners.getBaseTableModelConstraints() || []),...[
    {
      name: ItemsXLotsXConteiners.name.toUpperCase() + '_U1',
      fields: [...ItemsXLotsXConteiners.getBaseTableModelUniqueFields(),...ItemsXLotsXConteiners.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDITEM'],
      type: 'foreign key',
      references: { 
          table: Items,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDLOT'],
      type: 'foreign key',
      references: { 
          table: Lots,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCONTEINER'],
      type: 'foreign key',
      references: { 
          table: Conteiners,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  

  

};


module.exports = {ItemsXLotsXConteiners}