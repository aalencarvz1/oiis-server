import { DataTypes, Model, Op, QueryInterface, QueryTypes, Sequelize } from "sequelize";
import DBConnectionManager from "../DBConnectionManager.js";
import Utils from "../../controllers/utils/Utils.js";
import { Request } from "express";
import DataSwap from "../../controllers/data/DataSwap.js";
import DatabaseUtils from "../../controllers/database/DatabaseUtils.js";
import config from "../config/config.js";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";

/**
 * class model
 */
export default class BaseTableModel extends Model { 


    //table fields
    declare id: number;
    declare parent_id: number;
    declare status_reg_id: number;
    declare creator_user_id: number;
    declare created_at: Date;
    declare updater_user_id: number;
    declare updated_at: Date;
    declare data_origin_id: number;
    declare id_at_origin: string;
    declare deleted_at: Date;
    declare is_sys_rec: number;


    static configDB : any = (config as any)[process.env.NODE_ENV || 'development'];
    static schema = this.configDB?.database;  
    static id : number;
    static tableName : string = this.name.toLowerCase();
    static model : Model | null; 
    static fields : any;
    static constraints : any[];
    static foreignsKeys: any[];
    static getConnection: Function = DBConnectionManager.getDefaultDBConnection;

    static primaryKeysFieldsNames : any;
    static removeAttr:any;
    static __dirname = path.dirname(fileURLToPath(import.meta.url));
    
    
    
    static getBaseTableModelFields = () => {
        return {
            id: {
                type : DataTypes.BIGINT.UNSIGNED,                
                autoIncrement : true,
                primaryKey: true,               
                allowNull: false 
            },
            parent_id: {
                type: DataTypes.BIGINT.UNSIGNED
            },
            status_reg_id: {
                type: DataTypes.BIGINT.UNSIGNED,                
                allowNull: false,
                defaultValue:1 
            },
            creator_user_id: {
                type: DataTypes.BIGINT.UNSIGNED,                
                allowNull: false,
                defaultValue:1 
            },
            created_at : {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            updater_user_id: {
                type: DataTypes.BIGINT.UNSIGNED,
            },
            updated_at : {
                type: DataTypes.DATE,
                allowNull: true
            },
            data_origin_id: {
                type: DataTypes.BIGINT.UNSIGNED,                
                allowNull: false,
                defaultValue:1
            },
            id_at_origin: {
                type: DataTypes.STRING(256)
            },
            deleted_at:{
                type: DataTypes.DATE,
                allowNull : true
            },
            is_sys_rec: {
                type: DataTypes.INTEGER({
                    precision:0,
                    decimals:0,
                    scale:1
                }),
                allowNull: false,
                defaultValue:0
            }
        }; 
    }
    
    static getBaseTableModelConstraints = () => {
        return [
            {
                fields:['is_sys_rec'],
                type:"check",
                where:{
                    is_sys_rec: {
                        [Op.in]: [0,1]
                    }
                }
            }
        ];
    };

    static getBaseTableModelUniqueFields = () => {
        return [
            Sequelize.literal(`(COALESCE(parent_id,0))`),
            'status_reg_id',
            'data_origin_id'
        ];
    };   
    
    static baseTableModelForeignsKeys = [{
        fields: ['parent_id'],
        type: 'foreign key',
        references: { 
            table: this.tableName,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
    },{
        fields: ['status_reg_id'],
        type: 'foreign key',
        references: { 
            table: 'Record_Status',
            field: 'id'
        },
        onUpdate: 'cascade'
    },{
        fields: ['creator_user_id'],
        type: 'foreign key',
        references: { 
            table: 'Users',
            field: 'id'
        },
        onUpdate: 'cascade'
    },{
        fields: ['updater_user_id'],
        type: 'foreign key',
        references: { 
            table: 'Users',
            field: 'id'
        },
        onUpdate: 'cascade'
    },{
        fields: ['data_origin_id'],
        type: 'foreign key',
        references: { 
            table: 'Data_Origins',
            field: 'id'
        },
        onUpdate: 'cascade'
    }];

    static getBaseTableModelForeignsKeys() : any[] {
        let result :any[] = JSON.parse(JSON.stringify(this.baseTableModelForeignsKeys));
        result[0].references.table = this.tableName;
        return result;
    }

    static getBaseTableModelInitHooks = () => {
        return {
            beforeCreate : (record: any, options: any) => {
                record.dataValues.created_at = Sequelize.literal('current_timestamp');//new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');                
            },
            beforeUpdate : (record: any, options: any) => {
                record.dataValues.updated_at = Sequelize.literal('current_timestamp');//new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');        
            }
        };
    }

    static getPrimaryKeysFieldsNames() : any{
        if (!Utils.hasValue(this.primaryKeysFieldsNames)) {
            this.primaryKeysFieldsNames = this.primaryKeysFieldsNames || [];
            for(let k in this.fields) {
                if (this.fields[k].primaryKey) {
                this.primaryKeysFieldsNames.push(k);
                }
            } 
        }
        return this.primaryKeysFieldsNames;
    }

    /**
     * run migrations constraints of inherited model
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async migrateConstraints(queryInterface: QueryInterface) {
        if (this.constraints && (this.constraints||[]).length > 0) {
            for(let i in this.constraints) {
                if (typeof this.constraints[i] === 'object') {
                    if (!this.constraints[i].name) {
                        this.constraints[i].name = this.tableName + '_c' + i;
                    }
                    await queryInterface.addConstraint(this.tableName, this.constraints[i]);
                } else {
                    await queryInterface.sequelize.query(this.constraints[i]);
                }
            }
        }
    }

    /**
     * run migrations foreign keys of inherited model
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async migrateForeignKeyContraint(queryInterface: QueryInterface, pClassModelRef?: typeof BaseTableModel) {
        for(let i in (this.foreignsKeys || [])) {
            let foreignKey : any = {};
            if (typeof this.foreignsKeys[i] === 'object') {
                for(let key in this.foreignsKeys[i]) {
                    if (key.trim().toLowerCase() != 'references') {
                        foreignKey[key] = this.foreignsKeys[i][key];
                    } else {
                        foreignKey[key] = {};
                        if (Utils.hasValue(this.foreignsKeys[i][key].fields)) {
                            foreignKey[key].fields = this.foreignsKeys[i][key].fields;
                        } else {
                            foreignKey[key].field = this.foreignsKeys[i][key].field;
                        }
                        if (Utils.hasValue(this.foreignsKeys[i][key].table)) {
                            if (typeof this.foreignsKeys[i][key].table == 'string') {
                                foreignKey[key].table = this.foreignsKeys[i][key].table.toLowerCase();
                            } else {
                                foreignKey[key].table = this.foreignsKeys[i][key].table.tableName;
                            }
                        } else {
                            foreignKey[key].table = this.tableName;
                        }
                    }
                }
                foreignKey.references.table = foreignKey.references.table.split('.');
                foreignKey.references.table = foreignKey.references.table[1] || foreignKey.references.table[0];
                if (foreignKey.references.table.trim().toLowerCase().indexOf('base') === 0 && foreignKey.references.table.trim().toLowerCase().indexOf('model') > -1) {
                    foreignKey.references.table = this.tableName;
                }

                //migrate all foreign keys or only specific model ref parameter
                if (!pClassModelRef || (foreignKey.references.table.trim().toLowerCase() == (pClassModelRef as any).tableName.trim())) {
                    if (!foreignKey.name) {
                        foreignKey.name = this.tableName + '_fk' + i;
                    }
                    await queryInterface.addConstraint(this.tableName, foreignKey);                
                }
            } else {
                await queryInterface.sequelize.query(this.foreignsKeys[i]);  
            }
        }        
    }

    
    /**
     * run migrations of inherited model
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async runUpMigration(queryInterface: QueryInterface, options?: any) {
        options = options || {};
        await queryInterface.createTable(this.tableName, this.fields);
        await this.migrateConstraints(queryInterface);    
        await queryInterface.bulkInsert('tables',[{      
            id:this.id,
            created_at: new Date(),
            is_sys_rec : 1,
            data_connection_id : this.configDB?.id,
            schema_id : this.configDB?.id,
            name : this.tableName
        }]);
        if (Object.keys(options).indexOf('migrateForeignKeyContraint') == -1) options.migrateForeignKeyContraint = true;
        if (options.migrateForeignKeyContraint == true) {
            await this.migrateForeignKeyContraint(queryInterface);              
        }
    }


    /**
     * init associations of inherited model to other model
     * @static (pay attention to bindings)
     * @created 2023-11-10
     */
    static async associates() {
        let tableRefClassModel = null;
        try {
            for(let i in (this.foreignsKeys || [])) {

                tableRefClassModel = this.foreignsKeys[i].references.table || this; //for re-declare if necessary
                if (typeof tableRefClassModel == 'string') {

                    if (tableRefClassModel.trim().toLocaleLowerCase().indexOf('base') === 0 && tableRefClassModel.trim().toLocaleLowerCase().indexOf('model') > -1) {
                        tableRefClassModel = this.tableName;
                    }

                    //require.cache is case sensitive, avoid reload cached model
                    let fullPath = path.join(this.__dirname,(tableRefClassModel.toLowerCase().indexOf('pc') === 0 ? 'winthor/':'') + tableRefClassModel + ".js");
                    const fileUrl = pathToFileURL(fullPath);
                    const module = await import(fileUrl.href);

                
                    let realKey = Utils.getKey(module,tableRefClassModel);
                    if (Utils.hasValue(realKey)) {
                        tableRefClassModel = module[realKey];
                    } else if (Utils.hasValue(module.default)) {
                        tableRefClassModel = module.default;
                    } else {
                        tableRefClassModel = module;
                    }
                }    
                let model = null;
                let columnForeign = this.foreignsKeys[i].fields.join(',');
                let belongsToParams  = {
                    foreignKey : columnForeign,
                    targetKey : this.foreignsKeys[i].references.fields?.join(',') || this.foreignsKeys[i].references.field
                };
                let hasManyParams = {
                    sourceKey: this.foreignsKeys[i].references.fields?.join(',') || this.foreignsKeys[i].references.field,
                    foreignKey : columnForeign
                };
                if (tableRefClassModel.tableName.trim() == this.tableName.trim().toLowerCase()) {
                    model = this;
                } else {
                    model = tableRefClassModel;
                }                
                if (model) {
                    let hasMany = model.hasMany(this,hasManyParams);
                    let belongsTo = this.belongsTo(model,belongsToParams);
                }                
            }            
        } catch(e) {
            Utils.logError(e);
            throw e;
        } 
    }

    /**
     * init model inherithed
     * @static (pay attention to bindings)
     * @created 2023-11-10
     */
    static initModel(pSequelize?: any) : void {
        try {
            pSequelize = pSequelize || this.getConnection();  
            if (pSequelize) {
                this.init(this.fields,{
                    sequelize: pSequelize,
                    underscored:false,
                    freezeTableName:true,
                    modelName:this.tableName,
                    tableName:this.tableName,
                    name:{
                        singular:this.tableName,
                        plural:this.tableName
                    },
                    timestamps:false,
                    hooks: this.getBaseTableModelInitHooks()
                });
            }
            if (Utils.hasValue(this.removeAttr)) {
                this.removeAttribute(this.removeAttr);
            } 
            if (!Utils.hasValue(this.associations))
                this.associates();           
        } catch (e) {
            Utils.logError(e);
        }
    }    
      
    static async initAssociations() {
        await this.associates();
    }

    /**
     * create data of model inherithed of this if not exists
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async createIfNotExists(queryParams: any , newValues: any) {
        let reg : any = await this.findOne(queryParams);
        if(!reg && queryParams.transaction) {
            let transactionTemp = queryParams.transaction;
            queryParams.transaction = undefined;
            delete queryParams.transaction;
            reg = await this.findOne(queryParams);
            queryParams.transaction = transactionTemp;
        }
        if (!reg) {
            let options : any = {};            
            if (queryParams.transaction) options.transaction = queryParams.transaction;        
            let values = newValues || queryParams.where;
            reg = await this.create(values,options);
        }
        return reg;
    }

    static async getOneByID(id: number | string) {
        let result = await this.getData({queryParams:{where:{id:id}}});
        if (result && result.length) {
            result = result[0];
        }
        return result;
    }

    /**
     * create data of model inherithed of this
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async createData(params: any,returnRaw: boolean = true) {
        let queryParams = params.queryParams?.values || params.values || params.queryParams || params || {};
        let result = await this.create(queryParams);
        if (typeof this.getData === 'function' && returnRaw !== false && Object.keys(this.fields).indexOf('id') > -1) return await this.getOneByID(result.id) || result
        else return result;
    }
    static putData = this.createData;


    /**
     * get data of model inherithed of this
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async getData(params: any, req?: Request) {
        let queryParams = await DatabaseUtils.prepareQueryParams(params.queryParams || params || {});
        if (queryParams.raw !== false) queryParams.raw = true; 
        if (queryParams.query) {
            return await this.getConnection().query(queryParams.query,{raw:queryParams.raw,type:QueryTypes.SELECT});
        } else {
            if (((this as any).accessLevel || 1) == 2 && Utils.hasValue(params.req || req)) {
                queryParams.where = queryParams.where || {};
                queryParams.where.creator_user_id = (params.req || req).user?.id
            }
            return await this.findAll(queryParams);
        }        
    }    


    /**
     * update data of model inherithed of this
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async updateData(params: any) {
        let reg : any = null;
        let values = params.values || params.queryParams?.values || params.queryParams || params ;                
        params.where = params.where || params.queryParams?.where || null;
        let primaryKeysFieldsNames = this.getPrimaryKeysFieldsNames();
        if (Utils.hasValue(params.where)) {
            reg = await this.findOne(params);
        } else if (values.id) { 
            params.where = {id:values.id}
            reg = await this.findOne({where:params.where,transaction:params.transaction});
        } else {            
            
            if (primaryKeysFieldsNames.length > 0) {
                params.where = {};
                let keys = Object.keys(values).join(',').trim().toLowerCase().split(',');
                let ind = -1;
                for(let k in primaryKeysFieldsNames) {
                    ind = keys.indexOf(primaryKeysFieldsNames[k].trim().toLowerCase());
                    if (ind > -1) {
                        params.where[Object.keys(values)[ind]] = values[Object.keys(values)[ind]];
                    }
                }
                if (Object.keys(params.where).length > 0) {
                    reg = await this.findOne({where:params.where,transaction:params.transaction});
                } else {
                    throw new Error('missing data (primary key)');    
                }
            } else {
                throw new Error('missing data (primary key)');
            }
        }
        let hasPrimaryKeyOnUpdate = false;
        let valuesToUpdate : any = {};
        if (reg) {
            for(let key in values) {
                if (key != 'id' && key != 'where') {
                    if (reg[key] != values[key]) {
                        reg[key] = values[key];
                        valuesToUpdate[key] = values[key];
                        
                        /*sequelize nao atualiza estes campos se forem chaves primarias, 
                        verificar apos o save se houve alteracao de campos chaves primarias e fazer update via query e nao via 
                        save nestes casos

                        testar dica do chatgpt sequelize.queryGenerator.updateQuery, que gera a query sem executala*/

                        if (Utils.hasValue(primaryKeysFieldsNames) && !hasPrimaryKeyOnUpdate) {
                            for(let ks in primaryKeysFieldsNames) {
                                if (primaryKeysFieldsNames[ks].trim().toLowerCase() == key.trim().toLowerCase()) {
                                    if (reg[key] != values[key]) {
                                        hasPrimaryKeyOnUpdate = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (hasPrimaryKeyOnUpdate) {
                const updateSQL = (this as any).queryGenerator.updateQuery(
                    this.getTableName(),
                    valuesToUpdate,
                    params.where,
                    this
                );
                Utils.log(updateSQL);
                let resultUpdate = await this.getConnection().query(updateSQL,{type:QueryTypes.UPDATE,transaction:params.transaction});                
                if (Utils.hasValue(resultUpdate) && resultUpdate[0]?.rowsAffected >= 1) {
                    if (typeof this.getData === 'function' && Object.keys(this.fields).indexOf('id') > -1) return await this.getOneByID(reg.id) || reg.dataValues
                    else return values;
                } else {
                    throw new Error(`error on update data with query: ${updateSQL}`);
                }
            } else {
                if (params.transaction) { 
                    await reg.save({transaction:params.transaction});
                } else {
                    await reg.save();
                }
            }
            if (typeof this.getData === 'function' && Object.keys(this.fields).indexOf('id') > -1) return await this.getOneByID(reg.id) || reg.dataValues
            else return reg.dataValues;
        } else {
            throw new Error('no data found');
        }
    }
    static patchData = this.updateData;


    /**
     * delete data of model inherithed of this
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     * @version 1.1.0
     */
    static async deleteData(params: any){
        let queryParams = await DatabaseUtils.prepareQueryParams(params.queryParams || params || {});
        if (Utils.hasValue(queryParams.where) || Utils.hasValue(queryParams.id) || Utils.hasValue(queryParams.identifiers)) {
            let where = {};
            if (Utils.hasValue(queryParams.where)) {
                where = queryParams.where;
            } else if (Utils.hasValue(queryParams.id)) {
                where = {
                    id: {
                        [Op.in]: Utils.toArray(queryParams.id)
                    } 
                }
            } else if (Utils.hasValue(queryParams.identifiers)) {
                where = {
                    id: {
                        [Op.in]: Utils.toArray(queryParams.identifiers)
                    } 
                }
            }
            let regs = await this.findAll({
                where:where
            });
            if (regs && regs.length) {
                await this.destroy({
                    where:where
                });
                return true;
            } else {
                throw new Error('no data found');
            }
        } else {
            throw new Error('missing data');
        }
    }

    static async getOrCreate(params: any) {
        let result = new DataSwap();
        try {
            let queryParams = params.queryParams || params || {};
            queryParams.raw = queryParams.raw !== false ? true : queryParams.raw;
            queryParams.limit = queryParams.limit || 1;
            queryParams.transaction = queryParams.transaction || params.transaction;
            result.data = await this.findOne(queryParams);
            if (!result.data) {
                if (params.createMethod)  {
                    let paramsToCreateMethod = {...queryParams.where,...(queryParams.values||{})};
                    if (params.transaction) {
                        paramsToCreateMethod.transaction = params.transaction;
                    } 
                    result = await params.createMethod.bind(this)(paramsToCreateMethod);
                } else {
                    result.data = await this.create({...queryParams.where,...(queryParams.values||{})},{transaction:params.transaction});
                    if (result.data) {
                        if (queryParams.raw)
                            result.data = result.data.dataValues;
                        result.success = true;
                    } else throw new Error(`error on create register with ${JSON.parse({...queryParams.where,...(queryParams.values||{})})}`);
                }
            } else {
                result.success = true;
            }
        } catch (e) {
            Utils.logError(e);
            result.setException(e);
        }
        return result;
    }

    static async saveOrCreate(params: any) {
        let result = new DataSwap();
        try {
            let queryParams = params.queryParams || params || {};
            result.data = await this.findOne(queryParams);
            if (!result.data) {
                if (params.createMethod) 
                    result = await params.createMethod.bind(this)({...queryParams.where,...(queryParams.values||{})},params);
                else {
                    result.data = await this.create({...queryParams.where,...(queryParams.values||{})},params.transaction ? {transaction: params.transaction} : {});
                    if (result.data) {
                        result.success = true;
                    } else throw new Error(`error on create register with ${JSON.parse({...queryParams.where,...(queryParams.values||{})})}`);
                }
            } else {
                await this.updateData({
                    values:{...result.data.dataValues,...(queryParams.values||{})},
                    where:queryParams.where,
                    transaction: params.transaction
                });
                result.success = true;
            }
        } catch (e) {
          result.setException(e);
        }
        return result;
    }

    static getQueryFields(){
        return Object.keys(this.fields).map(el=>Sequelize.col(el));
    }

};
