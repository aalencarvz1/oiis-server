'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Contexts } = require("./Contexts");
const { DataTables } = require("./DataTables");

/**
 * class model
 */
class DatasHierarchies extends BaseTableModel {
  static ID = 1010;
  static model = null;
  static fields = {
    ...DatasHierarchies.getBaseTableModelFields(),...{           
      IDTABLEPARENT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDTABLESUBORDINATED:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDPARENT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDSUBORDINATED:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDCONTEXT:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      ORDERNUM:{
        type: DataTypes.BIGINT
      },
      STARTMOMENT:{
        type: DataTypes.DATE
      },
      ENDMOMENT:{
        type: DataTypes.DATE
      },
      OBSERVATIONS:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'IDTABLEPARENT',
    'IDTABLESUBORDINATED',
    'IDPARENT',
    'IDSUBORDINATED',
    'IDCONTEXT',
    Sequelize.literal(`(COALESCE(STARTMOMENT,'1900-01-01'))`)

  ];

  static constraints = [...(DatasHierarchies.getBaseTableModelConstraints() || []),...[
    {
      name: DatasHierarchies.name.toUpperCase() + '_U1',
      fields: [...DatasHierarchies.getBaseTableModelUniqueFields(),...DatasHierarchies.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys() || []),...[
    {
      fields: ['IDTABLEPARENT'],
      type: 'foreign key',
      references: { 
          table: DataTables,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDTABLESUBORDINATED'],
      type: 'foreign key',
      references: { 
          table: DataTables,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDCONTEXT'],
      type: 'foreign key',
      references: { 
          table: Contexts,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {DatasHierarchies}