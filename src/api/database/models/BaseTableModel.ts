import { Sequelize, DataTypes, Model, Op, QueryInterface, QueryTypes } from "sequelize";
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
    declare id: number | undefined;
    declare parent_id?: number; //to "nested" registers or hierarquic representations
    declare status_reg_id: number;
    declare creator_user_id: number | undefined;
    declare created_at: Date | undefined;
    declare updater_user_id?: number;
    declare updated_at?: Date;
    declare data_origin_id?: number; //to indicate external origin of record
    declare id_at_origin?: string; //to indicate id on external origin
    declare source_id?: number; //to indicate source of record, ex.: a record duplicated from other
    declare deleted_at?: Date;
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
                type: DataTypes.DATE
            },
            data_origin_id: {
                type: DataTypes.BIGINT.UNSIGNED,                
                allowNull: false,
                defaultValue:1
            },
            id_at_origin: {
                type: DataTypes.STRING(256)
            },
            source_id: {
                type: DataTypes.BIGINT.UNSIGNED
            },
            deleted_at:{
                type: DataTypes.DATE
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
            table: 'record_status',
            field: 'id'
        },
        onUpdate: 'cascade'
    },{
        fields: ['creator_user_id'],
        type: 'foreign key',
        references: { 
            table: 'users',
            field: 'id'
        },
        onUpdate: 'cascade'
    },{
        fields: ['updater_user_id'],
        type: 'foreign key',
        references: { 
            table: 'users',
            field: 'id'
        },
        onUpdate: 'cascade'
    },{
        fields: ['data_origin_id'],
        type: 'foreign key',
        references: { 
            table: 'data_origins',
            field: 'id'
        },
        onUpdate: 'cascade'
    },{
        fields: ['source_id'],
        type: 'foreign key',
        references: { 
            table: this.tableName,
            field: 'id'
        },
        onUpdate: 'cascade'
    }];

    /*static getBaseTableModelForeignsKeys() : any[] {
        let result :any[] = JSON.parse(JSON.stringify(this.baseTableModelForeignsKeys));
        result[0].references.table = this.tableName;
        return result;
    }*/
    static getBaseTableModelForeignsKeys() : any[] {
        //Utils.logi(`${this.name}(BaseTableModel)`,'getBaseTableModelForeignsKeys');
        let result :any[] = [];
        for(let i = 0; i < this.baseTableModelForeignsKeys.length; i++) {
            result.push(this.baseTableModelForeignsKeys[i]);
        }        
        for(let i = 0; i < result.length; i++) { 
            //console.log('NNNNNNNNNNN',i,typeof result[i].references.table,result[i].references.table, this.tableName)
            if (typeof result[i].references.table == 'string' && (result[i].references.table === this.tableName || result[i].references.table === BaseTableModel.tableName)) {
                //console.log('adjusting base fk',i,result[i]);
                if (i == 0 || i == result.length-1) {
                    result[i] = JSON.parse(JSON.stringify(result[i])); //clone object to avoid change the original
                    result[i].references.table = this; //adjusts corret reference to model class 
                } else {
                    result[i].references.table = this; //adjusts corret reference to model class 
                    //console.log('NNNNNNNNNNN ADJUSTED STATIC PROPERTY',this.tableName, this.name, result[i], this.baseTableModelForeignsKeys );
                }                
                //console.log('adjusted base fk',i,result[i]);
            }
        }
        //Utils.logf(`${this.name}(BaseTableModel)`,'getBaseTableModelForeignsKeys');
        return result;
    }

    /**
     * @static
     * @abstract
     * @created 2025-04-13
     * @version 1.0.0
     */
    static getForeignKeys() : any[] {
        throw new Error(`abstract method not implement on ${this.tableName}`);
    }

    static getTableModelHooks = () => {
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
        let fks = this.getForeignKeys() || [];
        //console.log('fks',fks);
        for(let i = 0; i < fks.length; i++) {
            let foreignKey : any = {};
            if (typeof fks[i] === 'object') {
                for(let key in fks[i]) {
                    if (key.trim().toLowerCase() != 'references') {
                        foreignKey[key] = fks[i][key];
                    } else {
                        foreignKey[key] = {};
                        if (Utils.hasValue(fks[i][key].fields)) {
                            foreignKey[key].fields = fks[i][key].fields;
                        } else {
                            foreignKey[key].field = fks[i][key].field;
                        }
                        if (Utils.hasValue(fks[i][key].table)) {
                            if (typeof fks[i][key].table == 'string') {
                                foreignKey[key].table = fks[i][key].table.toLowerCase();
                            } else {
                                foreignKey[key].table = fks[i][key].table.tableName;
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
                await queryInterface.sequelize.query(fks[i]);  
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
        //Utils.logi(`${this.name}(BaseTableModel)`,'associates');
        let tableRefClassModel = null;
        try {
            let fks = this.getForeignKeys() || [];
            //console.log('fks',fks);
            for(let i = 0; i < fks.length; i++) {
                //console.log(`fk ${i}`,fks[i]);
                tableRefClassModel = fks[i].references.table || this; //for re-declare if necessary
                //console.log('tableRefClassModel',typeof tableRefClassModel, tableRefClassModel);
                /*
                @deprecated 2025-04-14 - not use this hard load file, changed models logic to adjust it
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
                }*/    
                let model = null;
                let columnForeign = fks[i].fields.join(',');
                let belongsToParams  = {
                    foreignKey : columnForeign,
                    targetKey : fks[i].references.fields?.join(',') || fks[i].references.field
                };
                let hasManyParams = {
                    sourceKey: fks[i].references.fields?.join(',') || fks[i].references.field,
                    foreignKey : columnForeign
                };
                //console.log(tableRefClassModel);
                if (tableRefClassModel.tableName.trim() == this.tableName.trim().toLowerCase()) {
                    model = this;
                } else {
                    model = tableRefClassModel;
                }                
                if (model) {
                    //console.log('hasMany params',this.tableName,model?.tableName, hasManyParams);
                    let hasMany = model.hasMany(this,hasManyParams);
                    let belongsTo = this.belongsTo(model,belongsToParams);
                }                
            }            
        } catch(e) {
            Utils.logError(e);
            throw e;
        } 
        //Utils.logf(`${this.name}(BaseTableModel)`,'associates');
    }

    /**
     * init model inherithed
     * @static (pay attention to bindings)
     * @created 2023-11-10
     */
    static async initModel(pSequelize?: any) : Promise<void> {
        //Utils.logi(`${this.name}(BaseTableModel)`,'initModel');
        try {
            pSequelize = pSequelize || this.getConnection();  
            if (pSequelize) {
                this.getForeignKeys(); //ajust foreign keys if necessary(string table name -> object table model)
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
                    hooks: this.getTableModelHooks()
                });
            }
            if (Utils.hasValue(this.removeAttr)) {
                this.removeAttribute(this.removeAttr);
            } 
            //if (!Utils.hasValue(this.associations)) await this.associates();           
        } catch (e) {
            Utils.logError(e);
        }
        //Utils.logf(`${this.name}(BaseTableModel)`,'initModel');
    }    
      
    static async initAssociations() {
        //Utils.logi(`${this.name}(BaseTableModel)`,'initAssociations');
        await this.associates();
        //Utils.logf(`${this.name}(BaseTableModel)`,'initAssociations');
    }

    /**
     * create data of model inherithed of this if not exists
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async createIfNotExists(queryParams: any , newValues?: any) {
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

    static async getOneByID(id?: number | string) : Promise<any> {
        let result = null;
        if (Utils.hasValue(id)) {
            result = await this.getData({queryParams:{where:{id:id}}});
            if (result && result.length) {
                result = result[0];
            }
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
            reg = await this.findOneWithTransactionOrNot(params);
        } else if (values.id) { 
            params.where = {id:values.id}
            reg = await this.findOneWithTransactionOrNot({where:params.where,transaction:params.transaction});
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
                    reg = await this.findOneWithTransactionOrNot({where:params.where,transaction:params.transaction});
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
                    where: where
                });
                return true;
            } else {
                throw new Error('no data found');
            }
        } else {
            throw new Error('missing data');
        }
    }


    /**
     * get record according where property in current transaction or not
     * @created 2025-01-15
     * @version 1.0.0
     */
    static async findOneWithTransactionOrNot(params: any) : Promise<any> {
        let result = null;
        result = await this.findOne(params);

        //check if register eixsts out of current transaction
        if (!Utils.hasValue(result) && Utils.hasValue(params.transaction)) {
            let transactionTemp = params.transaction;
            params.transaction = null;
            delete params.transaction;
            result = await this.findOne(params);
            params.transaction = transactionTemp; //restore transaction
        }
        return result;
    }


    /**
     * get record according where property or create according where and values properties if not exists
     * @created 2024-02-01
     * @version 3.0.0
     * @updates
     *  -2025-01-14 - @version 2.0.0 - implemented unique constraint checks and preventions of concurrent process
     *  -2025-01-15 - @version 3.0.0 - by default returns data record, optionaly DataSwap: when return data, then re-throw errors, else, errors returned in DataSwap object
     */
    static async getOrCreate(params: any) : Promise<any> {
        let result = null;
        try {
            let queryParams = params.queryParams || params || {};
            queryParams.transaction = queryParams.transaction || params.transaction;

            result = await this.findOneWithTransactionOrNot(queryParams);

            //if record not exists, then create
            if (!Utils.hasValue(result)) {
                try {
                    let useWhereAsValues = Utils.firstValid([params.useWhereAsValues,true]);
                    let paramsToCreateMethod : any = {};

                    if (useWhereAsValues) {
                        paramsToCreateMethod = {...queryParams.where,...(queryParams.values||{})};
                    } else {
                        paramsToCreateMethod = queryParams.values||{};
                    }

                    if (params.createMethod)  {                        
                        if (params.transaction) {
                            paramsToCreateMethod.transaction = params.transaction;
                        } 
                        result = await params.createMethod.bind(this)(paramsToCreateMethod);
                    } else {
                        result = await this.create(paramsToCreateMethod,{transaction:params.transaction});
                        if (Utils.hasValue(result)) {
                            if (queryParams.raw)
                                result = result.dataValues;
                        } else throw new Error(`error on create register with ${JSON.parse(paramsToCreateMethod)}`);
                    }
                } catch (createError: any) {

                    /**
                     * Recursive(only 1)
                     * prevent unique violated when record is created by other concurrent process
                     * @created 2025-01-14
                     * */
                    if (createError.name?.toLowerCase().indexOf('unique') > -1
                        || createError.constructor?.name?.toLowerCase().indexOf('unique') > -1
                    ) {
                        if (!params[`${this.name}_getOrCreate_inRecursion`]) {
                            Utils.log(this.name, 'getOrCreate','recursing by unique constraint violated', params.where);
                            params[`${this.name}_getOrCreate_inRecursion`] = true; //only 1 recursive call
                            return await this.getOrCreate(params);
                        } else {
                            throw createError;
                        }
                    } else {
                        throw createError;
                    }
                }
            } 
            if (params?.returnDataSwap && !(result instanceof DataSwap)) {
                let dataTemp = result;
                result = new DataSwap();
                result.data = dataTemp;
                result.success = true;
            } else if (!params?.returnDataSwap && (result instanceof DataSwap)) {
                if (result.success) {
                    result = result.data;
                } else {
                    result.throw();
                }
            }
        } catch (e: any) {
            if (params?.returnDataSwap) {
                result = new DataSwap();
                result.setException(e);
            } else {
                throw e; //re-throw
            }
        }
        return result;
    }


    /**
     * save existent register or create if not exists according where property of params
     * @created 2024-02-01
     * @version 1.1.0
     */
    static async saveOrCreate(params: any) {
        let result = new DataSwap();
        try {
            let queryParams = params.queryParams || params || {};
            result.data = await this.findOneWithTransactionOrNot(queryParams);
            if (!Utils.hasValue(result.data)) {
                let useWhereAsValues = Utils.firstValid([params.useWhereAsValues,true]);
                let paramsToCreateMethod : any = {};

                if (useWhereAsValues) {
                    paramsToCreateMethod = {...queryParams.where,...(queryParams.values||{})};
                } else {
                    paramsToCreateMethod = queryParams.values||{};
                }

                if (params.createMethod) 
                    result = await params.createMethod.bind(this)(paramsToCreateMethod,params);

                    if (!(result instanceof DataSwap)) {
                        let resultTemp = result;
                        result = new DataSwap();
                        result.data = resultTemp;
                        result.success = true;
                    }

                else {
                    result.data = await this.create(paramsToCreateMethod,params.transaction ? {transaction: params.transaction} : {});
                    if (Utils.hasValue(result.data)) {
                        result.success = true;
                    } else throw new Error(`error on create register with ${JSON.parse(paramsToCreateMethod)}`);
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
