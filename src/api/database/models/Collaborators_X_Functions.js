'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Collaborator_Functions } = require("./Collaborator_Functions");
const { Collaborator_Contracts } = require("./Collaborator_Contracts");


/**
 * class model
 */
class Collaborators_X_Functions extends BaseTableModel {
  static id = 6003;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Collaborators_X_Functions.getBaseTableModelFields(),...{           
      IDCONTRACT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDFUNCTION:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      STARTDATE:{
        type: DataTypes.DATE,
      },
      ENDDATE:{
        type: DataTypes.DATE,
      },     
      ISTIMECONTROLLED: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:1
      },      
      OBSERVATIONS:{
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'IDCONTRACT',
    'IDFUNCTION',
    Sequelize.literal(`(COALESCE(STARTDATE,'1900-01-01'))`)
  ];

  static constraints = [...(Collaborators_X_Functions.getBaseTableModelConstraints() || []),...[
    {
      name: Collaborators_X_Functions.tableName + '_u1',
      fields: [...Collaborators_X_Functions.getBaseTableModelUniqueFields(),...Collaborators_X_Functions.uniqueFields],
      type:"unique"
    },{
      name: Collaborators_X_Functions.tableName + '_c_1',
      fields:['ISTIMECONTROLLED'],
      type:"check",
      where:{
        ISTIMECONTROLLED: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDCONTRACT'],
      type: 'foreign key',
      references: { 
          table: Collaborator_Contracts,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDFUNCTION'],
      type: 'foreign key',
      references: { 
          table: Collaborator_Functions,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Collaborators_X_Functions}