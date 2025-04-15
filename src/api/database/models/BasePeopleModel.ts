import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Utils from "../../controllers/utils/Utils.js";
import People from "./People.js";

/**
 * class model
 */
export default class BasePeopleModel extends BaseTableModel {

  //table fieldas
  declare people_id: number;
  declare alias: string;
  declare observations: string;
  
  
  /**
   * @static
   * @override
   * @created 2023-11-10
   */
  static getBaseTableModelFields = () => {
    return {
      ...BaseTableModel.getBaseTableModelFields(),
      ...{
        people_id:{
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull:false
        },
        alias: {
          type: DataTypes.STRING(2000)
        },
        observations: {
          type: DataTypes.TEXT
        }
      }
    };
  };


  /**
   * @static
   * @override
   * @created 2023-11-10
   */
  static getBaseTableModelUniqueFields = () => {
      return [
          ...(BaseTableModel.getBaseTableModelUniqueFields() || []),
          'people_id'
      ];
  };


  /**
   * @override
   * @created 2025-04-14
   * @version 1.0.0
   */
  static getBaseTableModelForeignsKeys() : any[] {
    let result :any[] = [];
    let superResult = super.getBaseTableModelForeignsKeys();
    for(let i = 0; i < superResult.length; i++) {
        result.push(superResult[i]);
    }        
    result.push({
      fields: ['people_id'],
      type: 'foreign key',
      references: { 
          table: People,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
    return result;
  }

  
  
  
  static async addIdPeopleToReqQueryParams(params: any) {
    params = params || {};
    let queryParams = params.queryParams || params;
    let people = await People.updateOrCreatePeopleByIdentifierDocAndGet(queryParams);          
    if (params.queryParams) {
      params.queryParams.people_id = people.id;
    } else {
      params.people_id = people.id;
    }
    return params;
  }

  /**
   * this is a base method of others classes. if called on derived classes, USE BINDING LOGIC
   * @static (pay attention to bindings)
   * @async (pay attention to await)
   * @override
   * @created 2023-11-09
   */
  static async getData(params: any) {
    params = params || {};
    params.includePeople = Utils.firstValid([params.includePeople,true]);
    if (params.includePeople) {
        params.queryParams = People.include(params.queryParams,this);
    }
    return await BaseTableModel.getData.bind(this)(params);
  }


    /**
   * this is a base method of others classes. if called on derived classes, USE BINDING LOGIC
   * @static (pay attention to bindings)
   * @async (pay attention to await)
   * @override
   * @created 2023-11-09
   */
  static async createData(params: any) {
    let queryParams = params.queryParams || params || {};
    if (!queryParams.people_id) {
      await this.addIdPeopleToReqQueryParams(params);
    }
    return await BaseTableModel.createData.bind(this)(params);
  }
  static putData = this.createData;

  /**
   * update entity type people
   * @static (pay attention to bindings)
   * @async (pay attention to await)
   * @override
   *   * @created 2023-11-10
   */
  static async updateData(params: any) {
    let queryParams = params.queryParams || params.values || params.where ||  params || {};
    if (Object.keys(queryParams).indexOf('people_id') > -1 && !Utils.hasValue(queryParams.people_id)) {
      await this.addIdPeopleToReqQueryParams(params);
    }
    return await BaseTableModel.updateData.bind(this)(params);
  }
  static patchData = this.updateData;
  
};
  