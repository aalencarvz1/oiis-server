'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { GroupsMovements } = require("./GroupsMovements");
const { Movements } = require("./Movements");

/**
 * class model
 */
class GroupedsMovements extends BaseTableModel {
  static id = 9012;
  static model = null;
  static fields = {
    ...GroupedsMovements.getBaseTableModelFields(),...{           
      IDGROUPMOVEMENT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDMOV:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      ORDERNUM:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:0
      },
      PRECEDENCE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:0
      },
      OBSERVATIONS:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'IDGROUPMOVEMENT',
    'IDMOV'
  ];

  static constraints = [...(GroupedsMovements.getBaseTableModelConstraints() || []),...[
    {
      name: GroupedsMovements.name.toLowerCase() + '_u1',
      fields: [...GroupedsMovements.getBaseTableModelUniqueFields(),...GroupedsMovements.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDGROUPMOVEMENT'],
      type: 'foreign key',
      references: { 
          table: GroupsMovements,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDMOV'],
      type: 'foreign key',
      references: { 
          table: Movements,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {GroupedsMovements}