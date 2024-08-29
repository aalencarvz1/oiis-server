'use strict';

/*imports*/
const {  DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { IdentifiersTypes } = require("./IdentifiersTypes");

/**
 * class model
 */
class GroupsMovements extends BaseTableModel {
  static ID = 9011;
  static model = null;
  static fields = {
    ...GroupsMovements.getBaseTableModelFields(),...{           
      IDIDENTIFIERTYPE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDENTIFIER:{
        type: DataTypes.STRING(256)
      }
    }
  };
  
  static uniqueFields = [
    Sequelize.literal(`(COALESCE(IDIDENTIFIERTYPE,0))`),
    Sequelize.literal(`(COALESCE(IDENTIFIER,'NULL'))`)
  ];

  static constraints = [...(GroupsMovements.getBaseTableModelConstraints() || []),...[
    {
      name: GroupsMovements.name.toUpperCase() + '_U1',
      fields: [...GroupsMovements.getBaseTableModelUniqueFields(),...GroupsMovements.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
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


module.exports = {GroupsMovements}