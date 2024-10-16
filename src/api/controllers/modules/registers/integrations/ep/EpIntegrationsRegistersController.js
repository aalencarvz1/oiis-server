const { Sequelize, Op } = require("sequelize");
const { Utils } = require("../../../../utils/Utils");
const { Identifier_Types } = require("../../../../../database/models/Identifier_Types");
const { EpPessoas } = require("../../../../../database/models/ep/EpPessoas");
const { EpClientes } = require("../../../../../database/models/ep/EpClientes");
const { Data_Origins } = require("../../../../../database/models/Data_Origins");
const { Relationships } = require("../../../../../database/models/Relationships");
const { Relationship_Types } = require("../../../../../database/models/Relationship_Types");
const { Users } = require("../../../../../database/models/Users");
const { Access_Profiles } = require("../../../../../database/models/Access_Profiles");
const { EpVendedores } = require("../../../../../database/models/ep/EpVendedores");
const { EpTrabalhadores } = require("../../../../../database/models/ep/EpTrabalhadores");
const { RegistersController } = require("../../RegistersController");


/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2023-25-08
 */
class EpIntegrationsRegistersController extends RegistersController{


    /*************************************************
     * INIT PEOPLE INTEGRATIONS
     *************************************************/    
    static async getPeopleByIdentifiersDocs(identifiersDocs, options) {
        let result = null;
        try {
            if (identifiersDocs) {
                if (Utils.typeOf(identifiersDocs) != 'array') identifiersDocs = identifiersDocs.toString().split(',');
                let whereIdentifiersDocs = identifiersDocs.map(el=>{
                    let r = {};
                    let and = [];
                    if (typeof el == 'object') {
                        if (el.CODTIPODOCIDENTIFICADOR) {
                            and.push(Sequelize.where(
                                Sequelize.col(`CODTIPODOCIDENTIFICADOR`),
                                el.CODTIPODOCIDENTIFICADOR
                            ));
                        }
                        if (el.CODDOCIDENTIFICADOR) {
                            and.push(Sequelize.where(
                                Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CODDOCIDENTIFICADOR'),'[^0-9]',''),'DECIMAL(32)'),
                                '=',
                                Sequelize.cast(Sequelize.fn('regexp_replace',el.CODDOCIDENTIFICADOR,'[^0-9]',''),'DECIMAL(32)')
                            ));
                        }
                    } else {
                        and.push(Sequelize.where(
                            Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CODDOCIDENTIFICADOR'),'[^0-9]',''),'DECIMAL(32)'),
                            '=',
                            Sequelize.cast(Sequelize.fn('regexp_replace',el,'[^0-9]',''),'DECIMAL(32)')
                        ));
                    }
                    r[Sequelize.Op.and] = and;
                    return r;
                });

                let findParams = {
                    raw:true,
                    where:{
                        [Sequelize.Op.or]:whereIdentifiersDocs
                    }
                };
                if (options && options?.attributes) {
                    findParams.attributes = options.attributes;
                }
                result = await EpPessoas.getModel().findAll(findParams);
            }
        } catch (e) {
            Utils.log(e);
        }
        return result;
    }

    static async getPeopleByIdentifierDocToIntegrate(identifiersDocs) {
        let result = null;
        try {
            result = await EpIntegrationsRegistersController.getPeopleByIdentifiersDocs(
                identifiersDocs,{
                    attributes:[
                        ['COD','id'],
                        [Sequelize.literal(`${Data_Origins.EP}`),'data_origin_id'],
                        ['COD','id_at_origin'],
                        [Sequelize.literal(`case when EPPESSOAS.CODTIPODOCIDENTIFICADOR = 1 AND LENGTH(EPPESSOAS.CODDOCIDENTIFICADOR) <= 11 then ${Identifier_Types.CPF} else ${Identifier_Types.CNPJ} end`),'identifier_doc_type_id'],
                        [Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CODDOCIDENTIFICADOR'),'[^0-9]',''),'DECIMAL(32)'),'identifier_doc'],
                        ['NOMERAZAO','name'],
                        ['FANTASIA','fantasy']
                    ]
                }
            )
        } catch (e) {
            Utils.log(e);
        }
        return result;
    }     
    /*************************************************
     * END PEOPLE INTEGRATIONS
     *************************************************/    




    /*************************************************
     * INIT CLIENTS INTEGRATIONS
     *************************************************/    
    static async getClientsByIdentifiersDocs(identifiersDocs, options) {
        let result = null;
        try {
            if (identifiersDocs) {
                if (Utils.typeOf(identifiersDocs) != 'array') identifiersDocs = identifiersDocs.toString().split(',');
                let whereIdentifiersDocs = identifiersDocs.map(el=>{
                    let r = {};
                    let and = [];
                    if (typeof el == 'object') {
                        if (el.CODTIPODOCIDENTIFICADOR) {
                            and.push(Sequelize.where(
                                Sequelize.col(`${EpPessoas.tableName}.CODTIPODOCIDENTIFICADOR`),
                                el.CODTIPODOCIDENTIFICADOR
                            ));
                        }
                        if (el.CODDOCIDENTIFICADOR) {
                            and.push(Sequelize.where(
                                Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col(`${EpPessoas.tableName}.CODDOCIDENTIFICADOR`),'[^0-9]',''),'DECIMAL(32)'),
                                '=',
                                Sequelize.cast(Sequelize.fn('regexp_replace',el.CODDOCIDENTIFICADOR,'[^0-9]',''),'DECIMAL(32)')
                            ));
                        }
                    } else {
                        and.push(Sequelize.where(
                            Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col(`${EpPessoas.tableName}.CODDOCIDENTIFICADOR`),'[^0-9]',''),'DECIMAL(32)'),
                            '=',
                            Sequelize.cast(Sequelize.fn('regexp_replace',el,'[^0-9]',''),'DECIMAL(32)')
                        ));
                    }
                    r[Sequelize.Op.and] = and;
                    return r;
                });
                //EpClientes.initAssociations();
                let findParams = {
                    raw:true,
                    where:{
                        [Sequelize.Op.or]:whereIdentifiersDocs
                    },
                    include:[{
                        raw:true,
                        required:true,
                        model:EpPessoas.getModel(),
                        attributes:[],
                        on:{
                            [Op.and]: [
                                Sequelize.where(Sequelize.col(`${EpPessoas.tableName}.COD`), Sequelize.col(`${EpClientes.tableName}.CODPESSOA`))
                            ]
                        }
                    }]
                };
                if (options && options?.attributes) {
                    findParams.attributes = options.attributes;
                }
                result = await EpClientes.getModel().findAll(findParams);
            }
        } catch (e) {
            Utils.log(e);
        }
        return result;
    }


    static async getClientsByIdentifierDocToIntegrate(identifiersDocs) {
        let result = null;
        try {
            result = await EpIntegrationsRegistersController.getClientsByIdentifiersDocs(
                identifiersDocs,{
                    attributes:[
                        ['COD','id'],
                        [Sequelize.literal(`${Data_Origins.EP}`),'data_origin_id'],
                        ['CODPESSOA','id_at_origin'],
                        ['CODPESSOA','people_id']
                    ]
                }
            )
        } catch (e) {
            Utils.log(e);
        }
        return result;
    } 
    /*************************************************
     * END CLIENTS INTEGRATIONS
     *************************************************/ 
    

    static async getRcasCodes(req) {
        let rcas = null;
        if (req?.user.access_profile_id == Access_Profiles.SUPERVISOR) {
            let dataRel = await Relationships.getModel().findAll({
                raw:true,
                where:{
                    relationship_type_id: [Relationship_Types.EP_ID],
                    table_1_id: Users.id,
                    record_1_id: req.user.id,
                    table_2_id: EpTrabalhadores.id
                }
            });
            if (dataRel && dataRel.length) {
                dataRel = dataRel.map(el=>el.record_2_id);
                //EpVendedores.initAssociations();
                let sellers = await EpVendedores.getModel().findAll({
                    raw:true,
                    attributes:[
                        Sequelize.col(`${EpVendedores.tableName}.COD`)
                    ],
                    include:[{
                        required:true,
                        model:EpTrabalhadores.getModel(),
                        attributes:[],
                        on:[
                            Sequelize.where(Sequelize.col(`${EpTrabalhadores.tableName}.COD`),Sequelize.col(`${EpVendedores.tableName}.CODTRABALHADOR`)),
                            Sequelize.where(Sequelize.col(`${EpTrabalhadores.tableName}.CODSUP`),'in',dataRel),
                        ]
                    }],
                    where:{
                        CONTABILIZARVENDAS:1
                    }
                });
                if (sellers && sellers.length) {
                    rcas = sellers.map(el=>el.COD).join(',');
                }
            }
        } else {
            let dataRel = await Relationships.getModel().findAll({
                raw:true,
                where:{
                    relationship_type_id: [Relationship_Types.EP_ID],
                    table_1_id: Users.id,
                    record_1_id: req?.user.id ,
                    table_2_id: EpVendedores.id
                }
            });
            if (dataRel && dataRel.length) {
                rcas = dataRel.map(el=>el.record_2_id).join(',');
            }
        }
        if (!rcas) rcas = `select ev.cod from EP.EPVENDEDORES ev`;
        return rcas;
    }
}

module.exports = {EpIntegrationsRegistersController}