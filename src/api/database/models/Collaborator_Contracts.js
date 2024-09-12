'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Collaborators } = require("./Collaborators");
const { Contract_Types } = require("./Contract_Types");


/**
 * class model
 */
class Collaborator_Contracts extends BaseTableModel {
  static id = 6002;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Collaborator_Contracts.getBaseTableModelFields(),...{           
      IDCOLLABORATOR:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDCONTRACTTYPE:{
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
    'IDCOLLABORATOR',
    'IDCONTRACTTYPE',
    Sequelize.literal(`(COALESCE(STARTDATE,'1900-01-01'))`)
  ];

  static constraints = [...(Collaborator_Contracts.getBaseTableModelConstraints() || []),...[
    {
      name: Collaborator_Contracts.tableName + '_u1',
      fields: [...Collaborator_Contracts.getBaseTableModelUniqueFields(),...Collaborator_Contracts.uniqueFields],
      type:"unique"
    },{
      name: Collaborator_Contracts.tableName + '_c_1',
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
      fields: ['IDCOLLABORATOR'],
      type: 'foreign key',
      references: { 
          table: Collaborators,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCONTRACTTYPE'],
      type: 'foreign key',
      references: { 
          table: Contract_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Collaborator_Contracts}