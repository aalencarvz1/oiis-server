'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { CommissionsEntitiesCodes } = require("./CommissionsEntitiesCodes");


/**
 * class model
 */
class CommissionsItems extends BaseTableModel {
  static id = 9051;
  static model = null;

  static fields = {
    ...CommissionsItems.getBaseTableModelFields(),...{           
      IDCOMMISSIONENTITYCODE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      NAME: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      DESCRIPTION:{
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'IDCOMMISSIONENTITYCODE',
    'NAME'
  ];

  static constraints = [...(CommissionsItems.getBaseTableModelConstraints() || []),...[
    {
      name: CommissionsItems.name.toLowerCase() + '_u1',
      fields: [...CommissionsItems.getBaseTableModelUniqueFields(),...CommissionsItems.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDCOMMISSIONENTITYCODE'],
      type: 'foreign key',
      references: { 
          table: CommissionsEntitiesCodes,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};

module.exports = {CommissionsItems}
