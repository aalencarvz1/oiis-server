'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { ValuesNames } = require("./ValuesNames");
const { DataTables } = require("./DataTables");
const { Contexts } = require("./Contexts");

/**
 * class model
 */
class DatasValues extends BaseTableModel {
  static id = 1004;
  static model = null;
  static fields = {
    ...DatasValues.getBaseTableModelFields(),...{     
      IDTABLE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      IDREG:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      IDVALUENAME:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },      
      IDCONTEXT:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      VALUE:{
        type: DataTypes.STRING(256)
      },
      ORDERNUM:{
        type: DataTypes.BIGINT
      },
      STARTMOMENT:{
        type: DataTypes.DATE
      },
      ENDMOMENT:{
        type: DataTypes.DATE
      }
    }
  };
  
  static uniqueFields = [
    'IDTABLE',
    'IDREG',
    'IDVALUENAME',
    Sequelize.literal(`(COALESCE(IDCONTEXT,0))`),
    Sequelize.literal(`(COALESCE(VALUE,'NULL'))`),
    Sequelize.literal(`(COALESCE(ORDERNUM,0))`),
    Sequelize.literal(`(COALESCE(STARTMOMENT,'1900-01-01'))`)
  ];

  static constraints = [...(DatasValues.getBaseTableModelConstraints() || []),...[
    {
      name: DatasValues.name.toLowerCase() + '_u1',
      fields: [...DatasValues.getBaseTableModelUniqueFields(),...DatasValues.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys() || []),...[
    {
      fields: ['IDTABLE'],
      type: 'foreign key',
      references: { 
          table: DataTables,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDVALUENAME'],
      type: 'foreign key',
      references: { 
          table: ValuesNames,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDCONTEXT'],
      type: 'foreign key',
      references: { 
          table: Contexts,
          field: 'id'
      },
      onUpdate: 'cascade'
    }

  ]];
  
};


module.exports = {DatasValues}