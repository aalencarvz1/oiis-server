const { Sequelize, Op } = require("sequelize");
const { Utils } = require("../../../../utils/Utils");
const { IdentifiersTypes } = require("../../../../../database/models/IdentifiersTypes");
const { EpPessoas } = require("../../../../../database/models/ep/EpPessoas");
const { EpClientes } = require("../../../../../database/models/ep/EpClientes");
const { OriginsDatas } = require("../../../../../database/models/OriginsDatas");
const { DatasRelationships } = require("../../../../../database/models/DatasRelationships");
const { DataRelationshipTypes } = require("../../../../../database/models/DataRelationshipTypes");
const { Users } = require("../../../../../database/models/Users");
const { AccessesProfiles } = require("../../../../../database/models/AccessesProfiles");
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
                        ['COD','ID'],
                        [Sequelize.literal(`${OriginsDatas.EP}`),'IDORIGINDATA'],
                        ['COD','IDONORIGINDATA'],
                        [Sequelize.literal(`case when EPPESSOAS.CODTIPODOCIDENTIFICADOR = 1 AND LENGTH(EPPESSOAS.CODDOCIDENTIFICADOR) <= 11 then ${IdentifiersTypes.CPF} else ${IdentifiersTypes.CNPJ} end`),'IDIDENTIFIERDOCTYPE'],
                        [Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CODDOCIDENTIFICADOR'),'[^0-9]',''),'DECIMAL(32)'),'IDENTIFIERDOC'],
                        ['NOMERAZAO','NAME'],
                        ['FANTASIA','FANTASY']
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
                                Sequelize.col(`${EpPessoas.name.toUpperCase()}.CODTIPODOCIDENTIFICADOR`),
                                el.CODTIPODOCIDENTIFICADOR
                            ));
                        }
                        if (el.CODDOCIDENTIFICADOR) {
                            and.push(Sequelize.where(
                                Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col(`${EpPessoas.name.toUpperCase()}.CODDOCIDENTIFICADOR`),'[^0-9]',''),'DECIMAL(32)'),
                                '=',
                                Sequelize.cast(Sequelize.fn('regexp_replace',el.CODDOCIDENTIFICADOR,'[^0-9]',''),'DECIMAL(32)')
                            ));
                        }
                    } else {
                        and.push(Sequelize.where(
                            Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col(`${EpPessoas.name.toUpperCase()}.CODDOCIDENTIFICADOR`),'[^0-9]',''),'DECIMAL(32)'),
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
                                Sequelize.where(Sequelize.col(`${EpPessoas.name.toUpperCase()}.COD`), Sequelize.col(`${EpClientes.name.toUpperCase()}.CODPESSOA`))
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
                        ['COD','ID'],
                        [Sequelize.literal(`${OriginsDatas.EP}`),'IDORIGINDATA'],
                        ['CODPESSOA','IDONORIGINDATA'],
                        ['CODPESSOA','IDPEOPLE']
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
        if (req?.user.IDACCESSPROFILE == AccessesProfiles.SUPERVISOR) {
            let dataRel = await DatasRelationships.getModel().findAll({
                raw:true,
                where:{
                    IDRELATIONSHIPTYPE: [DataRelationshipTypes.EP_ID],
                    IDTABLE1: Users.ID,
                    IDREG1: req.user.ID,
                    IDTABLE2: EpTrabalhadores.ID
                }
            });
            if (dataRel && dataRel.length) {
                dataRel = dataRel.map(el=>el.IDREG2);
                //EpVendedores.initAssociations();
                let sellers = await EpVendedores.getModel().findAll({
                    raw:true,
                    attributes:[
                        Sequelize.col(`${EpVendedores.name.toUpperCase()}.COD`)
                    ],
                    include:[{
                        required:true,
                        model:EpTrabalhadores.getModel(),
                        attributes:[],
                        on:[
                            Sequelize.where(Sequelize.col(`${EpTrabalhadores.name.toUpperCase()}.COD`),Sequelize.col(`${EpVendedores.name.toUpperCase()}.CODTRABALHADOR`)),
                            Sequelize.where(Sequelize.col(`${EpTrabalhadores.name.toUpperCase()}.CODSUP`),'in',dataRel),
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
            let dataRel = await DatasRelationships.getModel().findAll({
                raw:true,
                where:{
                    IDRELATIONSHIPTYPE: [DataRelationshipTypes.EP_ID],
                    IDTABLE1: Users.ID,
                    IDREG1: req?.user.ID ,
                    IDTABLE2: EpVendedores.ID
                }
            });
            if (dataRel && dataRel.length) {
                rcas = dataRel.map(el=>el.IDREG2).join(',');
            }
        }
        if (!rcas) rcas = `select ev.cod from ep.epvendedores ev`;
        return rcas;
    }
}

module.exports = {EpIntegrationsRegistersController}