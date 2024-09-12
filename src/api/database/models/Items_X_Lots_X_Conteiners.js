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
class Items_X_Lots_X_Conteiners extends BaseTableModel {
  static id = 8020;
  static tableName = this.name.toLowerCase();
  static model = null;

  static WITHOUT_CONTEINER = 1;

  static fields = {
    ...Items_X_Lots_X_Conteiners.getBaseTableModelFields(),...{           
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

  static constraints = [...(Items_X_Lots_X_Conteiners.getBaseTableModelConstraints() || []),...[
    {
      name: Items_X_Lots_X_Conteiners.tableName + '_u1',
      fields: [...Items_X_Lots_X_Conteiners.getBaseTableModelUniqueFields(),...Items_X_Lots_X_Conteiners.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDITEM'],
      type: 'foreign key',
      references: { 
          table: Items,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDLOT'],
      type: 'foreign key',
      references: { 
          table: Lots,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCONTEINER'],
      type: 'foreign key',
      references: { 
          table: Conteiners,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  

  

};


module.exports = {Items_X_Lots_X_Conteiners}