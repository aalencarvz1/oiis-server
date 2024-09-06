'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Apis } = require("./Apis");
const { Utils } = require("../../controllers/utils/Utils");


/**
 * class model
 */
class ApisRequests extends BaseTableModel {
  static id = 20001;
  static model = null;

  static fields = {
    ...ApisRequests.getBaseTableModelFields(),...{            
      IDAPI: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      NAME: {
        type: DataTypes.STRING(256)
      },
      METHOD: {
        type: DataTypes.STRING(10),
      },
      ENDPOINT: {
        type: DataTypes.STRING(2000)
      },            
      AUTHORIZATION:{
        type: DataTypes.TEXT
      }, 
      REQUESTPARAMS:{
        type: DataTypes.TEXT
      }, 
      BODYPARAMS:{
        type: DataTypes.TEXT
      }, 
      WEBHOOK:{
        type: DataTypes.STRING(2000)
      }, 
      DESCRIPTION: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(ApisRequests.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['IDAPI'],
    type: 'foreign key',
    references: { 
        table: Apis,
        field: 'id'
    },    
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }]];

  static async createData(params) {
    params = params || {};  
    params.queryParams = params.queryParams || params || {};
    params.queryParams.REQUESTPARAMS = params.queryParams.REQUESTPARAMS || {};
    if (typeof params.queryParams.REQUESTPARAMS != 'object') params.queryParams.REQUESTPARAMS = JSON.parse(params.queryParams.REQUESTPARAMS);
    params.queryParams.REQUESTPARAMS.headers = params.queryParams.REQUESTPARAMS.headers || {};
    params.queryParams.REQUESTPARAMS.headers['Content-Type'] = params.queryParams.REQUESTPARAMS.headers['Content-Type'] || 'application/json';
    params.queryParams.REQUESTPARAMS.headers['Accept'] = params.queryParams.REQUESTPARAMS.headers['Accept'] || 'application/json';
    //params.queryParams.REQUESTPARAMS.headers['access-control-allow-origin'] = params.queryParams.REQUESTPARAMS.headers['access-control-allow-origin'] || '*';
    //params.queryParams.REQUESTPARAMS.headers['access-control-allow-headers'] = params.queryParams.REQUESTPARAMS.headers['access-control-allow-headers'] || 'Origin, X-Requested-With, Content-Type, Accept';
    params.queryParams.REQUESTPARAMS = JSON.stringify(params.queryParams.REQUESTPARAMS);
    let result = await BaseTableModel.createData.bind(ApisRequests)(params,false);
    if (!Utils.hasValue(result.WEBHOOK)) {      
      let apiBodyParams = result.BODYPARAMS || '{}';
      apiBodyParams = JSON.parse(apiBodyParams);
      if (Utils.hasValue(apiBodyParams.webhook)) {
        result.WEBHOOK = apiBodyParams.webhook;  
      } else {
        result.WEBHOOK = `http://${process.env.API_EXTERNAL_IP}:${process.env.API_PORT}/api/modules/webhooks/apisrequests/${result.id}/responses`;
        apiBodyParams.webhook = result.WEBHOOK;
        result.BODYPARAMS = JSON.stringify(apiBodyParams);
      }      
      await result.save();
      result = result.dataValues;
    }                  
    return result;
  }
  static putData = this.createData;

};


module.exports = {ApisRequests}