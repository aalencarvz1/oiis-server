'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Collaborators } = require("./Collaborators");
const { ContractsTypes } = require("./ContractsTypes");


/**
 * class model
 */
class CollaboratorsContracts extends BaseTableModel {
  static ID = 6002;
  static model = null;
  static fields = {
    ...CollaboratorsContracts.getBaseTableModelFields(),...{           
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

  static constraints = [...(CollaboratorsContracts.getBaseTableModelConstraints() || []),...[
    {
      name: CollaboratorsContracts.name.toUpperCase() + '_U1',
      fields: [...CollaboratorsContracts.getBaseTableModelUniqueFields(),...CollaboratorsContracts.uniqueFields],
      type:"unique"
    },{
      name: CollaboratorsContracts.name.toUpperCase() + '_C_1',
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
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDCONTRACTTYPE'],
      type: 'foreign key',
      references: { 
          table: ContractsTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {CollaboratorsContracts}