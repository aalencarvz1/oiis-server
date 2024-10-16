const { BaseTableModel } = require("../../database/models/BaseTableModel");
const { Record_Status } = require("../../database/models/Record_Status");
const { Data_Origins } = require("../../database/models/Data_Origins");
const { Users } = require("../../database/models/Users");
const { Utils } = require("../utils/Utils");
/*
const { Errors } = require("../../database/models/Errors");
const { Logs } = require("../../database/models/Logs");
const { Tables } = require("../../database/models/Tables");
const { Connections } = require("../../database/models/Connections");
const { Schemas } = require("../../database/models/Schemas");
const { Contexts } = require("../../database/models/Contexts");
const { Entities_Types } = require("../../database/models/Entities_Types");
const { Data_Types } = require("../../database/models/Data_Types");
const { Action_Status } = require("../../database/models/Action_Status");
const { Parameters } = require("../../database/models/Parameters");
const { Parameter_Values } = require("../../database/models/Parameter_Values");
const { Sync_Status } = require("../../database/models/Sync_Status");
const { Identifier_Types } = require("../../database/models/Identifier_Types");
const { Greatnesses } = require("../../database/models/Greatnesses");
const { Measurement_Units } = require("../../database/models/Measurement_Units");
const { People } = require("../../database/models/People");
const { Collaborators } = require("../../database/models/Collaborators");
const { Access_Profiles } = require("../../database/models/Access_Profiles");
const { Processes } = require("../../database/models/Processes");
const { Routine_Types } = require("../../database/models/Routine_Types");
const { Languages } = require("../../database/models/Languages");
const { Texts } = require("../../database/models/Texts");
const { Routines } = require("../../database/models/Routines");
const { Routine_Contents } = require("../../database/models/Routine_Contents");
const { Translates } = require("../../database/models/Translates");
const { Modules } = require("../../database/models/Modules");
const { Relationship_Values } = require("../../database/models/Relationship_Values");
const { Value_Names } = require("../../database/models/Value_Names");
const { Relationships } = require("../../database/models/Relationships");
const { Relationship_Types } = require("../../database/models/Relationship_Types");
const { Contract_Types } = require("../../database/models/Contract_Types");
const { Form_Types } = require("../../database/models/Form_Types");
const { Continents } = require("../../database/models/Continents");
const { Street_Types } = require("../../database/models/Street_Types");
const { States } = require("../../database/models/States");
const { Cities } = require("../../database/models/Cities");
const { NeighborHoods } = require("../../database/models/NeighborHoods");
const { Countries } = require("../../database/models/Countries");
const { Address_Types } = require("../../database/models/Address_Types");
const { Streets } = require("../../database/models/Streets");
const { Postal_Codes_Streets } = require("../../database/models/Postal_Codes_Streets");
const { Postal_Codes } = require("../../database/models/Postal_Codes");
const { Contact_Types } = require("../../database/models/Contact_Types");
const { Postal_Codes_Paths } = require("../../database/models/Postal_Codes_Paths");
const { Addresses } = require("../../database/models/Addresses");
const { Contacts } = require("../../database/models/Contacts");
const { Companies } = require("../../database/models/Companies");
const { People_Addresses } = require("../../database/models/People_Addresses");
const { People_Contacts } = require("../../database/models/People_Contacts");
const { Business_Units } = require("../../database/models/Business_Units");
const { Warehouse_Address_Types } = require("../../database/models/Warehouse_Address_Types");
const { Warehouses } = require("../../database/models/Warehouses");
const { Warehouse_Addresses } = require("../../database/models/Warehouse_Addresses");
const { Warehouse_Address_Coordinates } = require("../../database/models/Warehouse_Address_Coordinates");
const { Warehouse_Address_Dimensions } = require("../../database/models/Warehouse_Address_Dimensions");
const { Suppliers } = require("../../database/models/Suppliers");
const { Collaborator_Functions } = require("../../database/models/Collaborator_Functions");
const { Clients } = require("../../database/models/Clients");
const { Warehouse_Address_Capacities } = require("../../database/models/Warehouse_Address_Capacities");
const { Collaborator_Contracts } = require("../../database/models/Collaborator_Contracts");
const { Collaborators_X_Functions } = require("../../database/models/Collaborators_X_Functions");
const { Power_Types } = require("../../database/models/Power_Types");
const { Permissions } = require("../../database/models/Permissions");
const { Container_Type_Dimensions } = require("../../database/models/Container_Type_Dimensions");
const { Container_Types } = require("../../database/models/Container_Types");
const { Packagings } = require("../../database/models/Packagings");
const { Gtin_Types } = require("../../database/models/Gtin_Types");
const { Container_Type_Capacities } = require("../../database/models/Container_Type_Capacities");
const { Ncms } = require("../../database/models/Ncms");
const { Item_Status } = require("../../database/models/Item_Status");
const { Items } = require("../../database/models/Items");
const { Containers } = require("../../database/models/Containers");
const { Lots } = require("../../database/models/Lots");
const { Stock_Entities } = require("../../database/models/Stock_Entities");
const { Items_Lots_Containers } = require("../../database/models/Items_Lots_Containers");
const { Item_Stocks } = require("../../database/models/Item_Stocks");
const { Stock_Entity_Relationship_Types } = require("../../database/models/Stock_Entity_Relationship_Types");
const { Item_Meas_Pack_Identif } = require("../../database/models/Item_Meas_Pack_Identif");
const { Item_Stock_Units } = require("../../database/models/Item_Stock_Units");
const { Movement_Types } = require("../../database/models/Movement_Types");
const { Movement_Status } = require("../../database/models/Movement_Status");
const { Movements } = require("../../database/models/Movements");
const { Commission_Entitiy_Codes } = require("../../database/models/Commission_Entitiy_Codes");
const { Commission_Items } = require("../../database/models/Commission_Items");
const { Commission_Values } = require("../../database/models/Commission_Values");
const { Objectives } = require("../../database/models/Objectives");
const { Conference_Types } = require("../../database/models/Conference_Types");
const { Movement_Entity_Relationship_Types } = require("../../database/models/Movement_Entity_Relationship_Types");
const { Movement_Groups } = require("../../database/models/Movement_Groups");
const { Movements_Groups } = require("../../database/models/Movements_Groups");
const { Movs_Items_Stocks } = require("../../database/models/Movs_Items_Stocks");
const { Movements_Entities } = require("../../database/models/Movements_Entities");
const { Item_Mov_Amount_Restrictions } = require("../../database/models/Item_Mov_Amount_Restrictions");
const { Item_Mov_Units } = require("../../database/models/Item_Mov_Units");
const { Item_Mov_Amounts } = require("../../database/models/Item_Mov_Amounts");
const { Meas_X_Meas_Origins } = require("../../database/models/Meas_X_Meas_Origins");
const { Packs_X_Packs_Origins } = require("../../database/models/Packs_X_Packs_Origins");
const { User_Tokens } = require("../../database/models/User_Tokens");
const { PcFilial } = require("../../database/models/winthor/PcFilial");
const { PcCidade } = require("../../database/models/winthor/PcCidade");
const { PcClient } = require("../../database/models/winthor/PcClient");
const { Task_Status } = require("../../database/models/Task_Status");
const { Tasks } = require("../../database/models/Tasks");
const { Tasks_Status_Users } = require("../../database/models/Tasks_Status_Users");
const { Tasks_Status_Users_Logs } = require("../../database/models/Tasks_Status_Users_Logs");
const { User_Profile_Timeworks } = require("../../database/models/User_Profile_Timeworks");
const { User_Timeworks } = require("../../database/models/User_Timeworks");
const { PcCob } = require("../../database/models/winthor/PcCob");
const { PcPrest } = require("../../database/models/winthor/PcPrest");
const { PcDocEletronico } = require("../../database/models/winthor/PcDocEletronico");
const { Logistic_Mov_Types } = require("../../database/models/Logistic_Mov_Types");
const { Logistic_Orders } = require("../../database/models/Logistic_Orders");
const { Logistic_Reasons } = require("../../database/models/Logistic_Reasons");
const { Logistic_Orders_Items_Mov_Amt } = require("../../database/models/Logistic_Orders_Items_Mov_Amt");
const { Logistic_Orders_Movs_Received_Values } = require("../../database/models/Logistic_Orders_Movs_Received_Values");
const { PcNfsaid } = require("../../database/models/winthor/PcNfsaid");
const { Logistic_Orders_Movs } = require("../../database/models/Logistic_Orders_Movs");
const { Logistic_Status } = require("../../database/models/Logistic_Status");
const { PcEmpr } = require("../../database/models/winthor/PcEmpr");
const { PcCarreg } = require("../../database/models/winthor/PcCarreg");
const { PcVeicul } = require("../../database/models/winthor/PcVeicul");
const { Financial_Value_Forms } = require("../../database/models/Financial_Value_Forms");
const { Apis } = require("../../database/models/Apis");
const { Api_Requests } = require("../../database/models/Api_Requests");
const { Api_Responses } = require("../../database/models/Api_Responses");
const { PcAtivi } = require("../../database/models/winthor/PcAtivi");
const { Midias } = require("../../database/models/Midias");
const { Logistic_Orders_Dest_Values } = require("../../database/models/Logistic_Orders_Dest_Values");
const { Financial_Value_Localization_Types } = require("../../database/models/Financial_Value_Localization_Types");
const { Financial_Value_Mov_Types } = require("../../database/models/Financial_Value_Mov_Types");
const { Logistic_Logs } = require("../../database/models/Logistic_Logs");
const { EpTrabalhadores } = require("../../database/models/ep/EpTrabalhadores");
const { EpVendedores } = require("../../database/models/ep/EpVendedores");
const { EpClientes } = require("../../database/models/ep/EpClientes");
const { EpPessoas } = require("../../database/models/ep/EpPessoas");
const { Run_Status } = require("../../database/models/Run_Status");
const { Api_Request_Calls } = require("../../database/models/Api_Request_Calls");
const { Report_Data_Founts } = require("../../database/models/Report_Data_Founts");
const { PcBairro } = require("../../database/models/winthor/PcBairro");
const { SjdTabpr_Origem } = require("../../database/models/sjd/SjdTabpr_Origem");
const { SjdProduto_Origem } = require("../../database/models/sjd/SjdProduto_Origem");
const { SjdTabpr_Origem_Log } = require("../../database/models/sjd/SjdTabpr_Origem_Log");
const { Report_Data_Fount_Items } = require("../../database/models/Report_Data_Fount_Items");
const { EpOrigensInfo } = require("../../database/models/ep/EpOrigensInfo");
const { EpCidades } = require("../../database/models/ep/EpCidades");
const { EpEmpresas } = require("../../database/models/ep/EpEmpresas");
const { EpFiliais } = require("../../database/models/ep/EpFiliais");
const { EpFornecedores } = require("../../database/models/ep/EpFornecedores");
const { EpRotasClientes } = require("../../database/models/ep/EpRotasClientes");
const { EpPracasClientes } = require("../../database/models/ep/EpPracasClientes");
const { EpRedesClientes } = require("../../database/models/ep/EpRedesClientes");
const { EpAtividadesClientes } = require("../../database/models/ep/EpAtividadesClientes");
const { EpDepartamentosProd } = require("../../database/models/ep/EpDeparamentosProd");
const { EpProdutos } = require("../../database/models/ep/EpProdutos");
const { EpNfsSaida } = require("../../database/models/ep/EpNfsSaida");
const { EpMovimentacoesSaida } = require("../../database/models/ep/EpMovimentacoesSaida");
const { EpNfsEnt } = require("../../database/models/ep/EpNfsEnt");
const { EpMovimentacoesEnt } = require("../../database/models/ep/EpMovimentacoesEnt");*/


/**
 * Class to handle start models (actualy using sequelize). This models require that it is initied, because
 * models is implemented as class models (according https://sequelize.org/docs/v6/core-concepts/model-basics/).
 * Init method in models not create fisical tables, these only initialize model and associations (FKs). Fisical tables
 * are created by run migrations commands (vide sequelize-cli module in https://github.com/sequelize/cli)
 * @author Alencar
 * @created 2023-08-10
 */
class ModelsController{


    /**
     * after a lot of tries, not was possible use cycle node import logic (export.done), then, this method is the solution.
     * @created 2024-08-16
     * @version 1.0.0
     */
    static adjustModelsCycleImport(){
        Utils.logi(`${this.name}`,`adjustModelsCycleImport`);
        if (typeof BaseTableModel.baseTableModelForeignsKeys[0].references.table == 'string')
            BaseTableModel.baseTableModelForeignsKeys[0].references.table = Record_Status;
        if (typeof BaseTableModel.baseTableModelForeignsKeys[1].references.table == 'string')
            BaseTableModel.baseTableModelForeignsKeys[1].references.table = Users;
        if (typeof BaseTableModel.baseTableModelForeignsKeys[2].references.table == 'string')
            BaseTableModel.baseTableModelForeignsKeys[2].references.table = Users;
        if (typeof BaseTableModel.baseTableModelForeignsKeys[3].references.table == 'string')
            BaseTableModel.baseTableModelForeignsKeys[3].references.table = Data_Origins;
        let cycleModels = [Record_Status,Users,Data_Origins];
        for(let k in cycleModels) {
            console.log('cycleModel',cycleModels[k]);
            if (typeof cycleModels[k].foreignsKeys[0].references.table == 'string')
                cycleModels[k].foreignsKeys[0].references.table = Record_Status;
            if (typeof cycleModels[k].foreignsKeys[1].references.table == 'string')
                cycleModels[k].foreignsKeys[1].references.table = Users;
            if (typeof cycleModels[k].foreignsKeys[2].references.table == 'string')
                cycleModels[k].foreignsKeys[2].references.table = Users;
            if (typeof cycleModels[k].foreignsKeys[3].references.table == 'string')
                cycleModels[k].foreignsKeys[3].references.table = Data_Origins;
        }        
        Utils.logf(`${this.name}`,`adjustModelsCycleImport`);
    }

    /**
     * Method to init models, need this to can use model as class, according sequelize documentation.
     * this method must have called on start server
     * @created 2023-08-10
     */
    static initModels(){    
        this.adjustModelsCycleImport();       
        /*Errors.getModel();
        Logs.getModel();
        Tables.getModel();
        Connections.getModel();
        Schemas.getModel();
        Contexts.getModel();
        Entities_Types.getModel();
        Data_Types.getModel();
        Action_Status.getModel();
        Parameters.getModel();
        Parameter_Values.getModel();
        Data_Origins.getModel();
        Record_Status.getModel();
        Sync_Status.getModel();
        Run_Status.getModel();
        Identifier_Types.getModel();
        Greatnesses.getModel();
        Measurement_Units.getModel();
        People.getModel();
        Collaborators.getModel();
        Access_Profiles.getModel();
        Users.getModel();
        User_Tokens.getModel();
        User_Profile_Timeworks.getModel();
        User_Timeworks.getModel();
        Processes.getModel();
        Routine_Types.getModel();
        Languages.getModel();
        Texts.getModel();
        Routines.getModel();
        Routine_Contents.getModel();
        Translates.getModel();
        Modules.getModel();
        Relationship_Values.getModel();
        Value_Names.getModel();
        Relationships.getModel();
        Relationship_Types.getModel();
        Contract_Types.getModel();
        Form_Types.getModel();        
        Financial_Value_Forms.getModel();      
        Financial_Value_Localization_Types.getModel();      
        Financial_Value_Mov_Types.getModel();      
        Continents.getModel();
        Street_Types.getModel();
        States.getModel();
        Cities.getModel();
        NeighborHoods.getModel();
        Countries.getModel();
        Address_Types.getModel();
        Streets.getModel();
        Postal_Codes_Streets.getModel();
        Postal_Codes.getModel();
        Contact_Types.getModel();
        Postal_Codes_Paths.getModel();
        Addresses.getModel();
        Contacts.getModel();
        Companies.getModel();
        People_Addresses.getModel();
        People_Contacts.getModel();
        Business_Units.getModel();
        Warehouse_Address_Types.getModel();
        Warehouses.getModel();
        Warehouse_Addresses.getModel();
        Warehouse_Address_Coordinates.getModel();
        Warehouse_Address_Dimensions.getModel();
        Suppliers.getModel();
        Collaborator_Functions.getModel();
        Clients.getModel();
        Warehouse_Address_Capacities.getModel();
        Collaborator_Contracts.getModel();
        Collaborators_X_Functions.getModel();
        Power_Types.getModel();
        Permissions.getModel();
        Container_Type_Dimensions.getModel();
        Container_Types.getModel();
        Packagings.getModel();
        Gtin_Types.getModel();
        Container_Type_Capacities.getModel();
        Ncms.getModel();
        Item_Status.getModel();
        Items.getModel();
        Containers.getModel();
        Lots.getModel();
        Stock_Entities.getModel();
        Items_Lots_Containers.getModel();
        Item_Stocks.getModel();
        Stock_Entity_Relationship_Types.getModel();
        Item_Meas_Pack_Identif.getModel();
        Item_Stock_Units.getModel();
        Movement_Types.getModel();
        Movement_Status.getModel();
        Movements.getModel();
        Commission_Entitiy_Codes.getModel();
        Commission_Items.getModel();
        Commission_Values.getModel();
        Objectives.getModel();
        Report_Data_Founts.getModel();
        Report_Data_Fount_Items.getModel();
        Conference_Types.getModel();
        Movement_Entity_Relationship_Types.getModel();
        Movement_Groups.getModel();
        Movements_Groups.getModel();
        Movs_Items_Stocks.getModel();
        Movements_Entities.getModel();
        Item_Mov_Amount_Restrictions.getModel();
        Item_Mov_Units.getModel();
        Item_Mov_Amounts.getModel();
        Logistic_Mov_Types.getModel();  
        
        Logistic_Status.getModel();        
        Logistic_Reasons.getModel();
        Logistic_Orders.getModel();
        Logistic_Orders_Movs.getModel();
        Logistic_Orders_Items_Mov_Amt.getModel();
        Logistic_Orders_Movs_Received_Values.getModel();
        Logistic_Orders_Dest_Values.getModel();        
        Logistic_Logs.getModel();        

        Task_Status.getModel();
        Tasks.getModel();
        Tasks_Status_Users.getModel();
        Tasks_Status_Users_Logs.getModel();
        Apis.getModel();
        Api_Requests.getModel();
        Api_Request_Calls.getModel();
        Api_Responses.getModel();
        Meas_X_Meas_Origins.getModel();
        Packs_X_Packs_Origins.getModel();   
        Midias.getModel();

        //WINTHOR MODELS
        PcEmpr.getModel();
        PcAtivi.getModel();   
        PcCidade.getModel();
        PcBairro.getModel();
        PcCob.getModel();   
        PcClient.getModel();
        PcFilial.getModel();
        PcVeicul.getModel();
        PcCarreg.getModel();           
        PcPrest.getModel();   
        PcDocEletronico.getModel();   
        PcNfsaid.getModel();

        EpOrigensInfo.getModel();
        EpTrabalhadores.getModel();
        EpVendedores.getModel();
        EpCidades.getModel();
        EpPessoas.getModel();
        EpEmpresas.getModel();
        EpFiliais.getModel();
        EpFornecedores.getModel();
        EpRotasClientes.getModel();
        EpPracasClientes.getModel();
        EpRedesClientes.getModel();        
        EpAtividadesClientes.getModel();
        EpClientes.getModel();
        EpDepartamentosProd.getModel();
        EpProdutos.getModel();
        EpNfsSaida.getModel();
        EpMovimentacoesSaida.getModel();
        EpNfsEnt.getModel();
        EpMovimentacoesEnt.getModel();

        SjdProduto_Origem.getModel();
        SjdTabpr_Origem.getModel();
        SjdTabpr_Origem_Log.getModel();*/
        

        setTimeout(ModelsController.initAssociations,1000);
    }


    /**
     * method to call all models associations init, 
     * @created 2023-08-10
     */
    static initAssociations(){
        /*Errors.initAssociations();
        Logs.initAssociations();
        Tables.initAssociations();
        Connections.initAssociations();
        Schemas.initAssociations();
        Contexts.initAssociations();
        Entities_Types.initAssociations();
        Data_Types.initAssociations();
        Action_Status.initAssociations();
        Parameters.initAssociations();
        Parameter_Values.initAssociations();
        Data_Origins.initAssociations();
        Record_Status.initAssociations();
        Sync_Status.initAssociations();
        Run_Status.initAssociations();
        Identifier_Types.initAssociations();
        Greatnesses.initAssociations();
        Measurement_Units.initAssociations();
        People.initAssociations();
        Collaborators.initAssociations();
        Access_Profiles.initAssociations();
        Users.initAssociations();
        User_Tokens.initAssociations();
        User_Profile_Timeworks.initAssociations();
        User_Timeworks.initAssociations();
        Processes.initAssociations();
        Routine_Types.initAssociations();
        Languages.initAssociations();
        Texts.initAssociations();
        Routines.initAssociations();
        Routine_Contents.initAssociations();
        Translates.initAssociations();
        Modules.initAssociations();
        Relationship_Values.initAssociations();
        Value_Names.initAssociations();
        Relationships.initAssociations();
        Relationship_Types.initAssociations();
        Contract_Types.initAssociations();
        Form_Types.initAssociations();     
        Financial_Value_Forms.initAssociations();      
        Financial_Value_Localization_Types.initAssociations();      
        Financial_Value_Mov_Types.initAssociations();      
        Continents.initAssociations();
        Street_Types.initAssociations();
        States.initAssociations();
        Cities.initAssociations();
        NeighborHoods.initAssociations();
        Countries.initAssociations();
        Address_Types.initAssociations();
        Streets.initAssociations();
        Postal_Codes_Streets.initAssociations();
        Postal_Codes.initAssociations();
        Contact_Types.initAssociations();
        Postal_Codes_Paths.initAssociations();
        Addresses.initAssociations();
        Contacts.initAssociations();
        Companies.initAssociations();
        People_Addresses.initAssociations();
        People_Contacts.initAssociations();
        Business_Units.initAssociations();
        Warehouse_Address_Types.initAssociations();
        Warehouses.initAssociations();
        Warehouse_Addresses.initAssociations();
        Warehouse_Address_Coordinates.initAssociations();
        Warehouse_Address_Dimensions.initAssociations();
        Suppliers.initAssociations();
        Collaborator_Functions.initAssociations();
        Clients.initAssociations();
        Warehouse_Address_Capacities.initAssociations();
        Collaborator_Contracts.initAssociations();
        Collaborators_X_Functions.initAssociations();
        Power_Types.initAssociations();
        Permissions.initAssociations();
        Container_Type_Dimensions.initAssociations();
        Container_Types.initAssociations();
        Packagings.initAssociations();
        Gtin_Types.initAssociations();
        Container_Type_Capacities.initAssociations();
        Ncms.initAssociations();
        Item_Status.initAssociations();
        Items.initAssociations();
        Containers.initAssociations();
        Lots.initAssociations();
        Stock_Entities.initAssociations();
        Items_Lots_Containers.initAssociations();
        Item_Stocks.initAssociations();
        Stock_Entity_Relationship_Types.initAssociations();
        Item_Meas_Pack_Identif.initAssociations();
        Item_Stock_Units.initAssociations();
        Movement_Types.initAssociations();
        Movement_Status.initAssociations();
        Movements.initAssociations();
        Commission_Entitiy_Codes.initAssociations();
        Commission_Items.initAssociations();
        Commission_Values.initAssociations();
        Objectives.initAssociations();
        Report_Data_Founts.initAssociations();
        Report_Data_Fount_Items.initAssociations();
        Conference_Types.initAssociations();
        Movement_Entity_Relationship_Types.initAssociations();
        Movement_Groups.initAssociations();
        Movements_Groups.initAssociations();
        Movs_Items_Stocks.initAssociations();
        Movements_Entities.initAssociations();
        Item_Mov_Amount_Restrictions.initAssociations();
        Item_Mov_Units.initAssociations();
        Item_Mov_Amounts.initAssociations();
        Logistic_Mov_Types.initAssociations();                
        Logistic_Status.initAssociations();        
        Logistic_Reasons.initAssociations();
        Logistic_Orders.initAssociations();
        Logistic_Orders_Movs.initAssociations();
        Logistic_Orders_Items_Mov_Amt.initAssociations();
        Logistic_Orders_Movs_Received_Values.initAssociations();
        Logistic_Orders_Dest_Values.initAssociations();
        Logistic_Logs.initAssociations();        
        Task_Status.initAssociations();
        Tasks.initAssociations();
        Tasks_Status_Users.initAssociations();
        Tasks_Status_Users_Logs.initAssociations();
        Apis.initAssociations();
        Api_Requests.initAssociations();
        Api_Request_Calls.initAssociations();
        Api_Responses.initAssociations();
        Meas_X_Meas_Origins.initAssociations();
        Packs_X_Packs_Origins.initAssociations();  
        Midias.initAssociations();


        //winthor models
        PcEmpr.initAssociations();
        PcAtivi.initAssociations();
        PcCob.initAssociations();   
        PcCidade.initAssociations();
        PcBairro.initAssociations();
        PcClient.initAssociations();
        PcFilial.initAssociations();  
        PcVeicul.initAssociations();
        PcCarreg.initAssociations();        
        PcPrest.initAssociations();   
        PcDocEletronico.initAssociations(); 
        PcNfsaid.initAssociations();


        EpOrigensInfo.initAssociations();
        EpTrabalhadores.initAssociations();
        EpVendedores.initAssociations();
        EpCidades.initAssociations();
        EpPessoas.initAssociations();
        EpEmpresas.initAssociations();
        EpFiliais.initAssociations();
        EpFornecedores.initAssociations();
        EpRotasClientes.initAssociations();
        EpPracasClientes.initAssociations();
        EpRedesClientes.initAssociations();        
        EpAtividadesClientes.initAssociations();
        EpClientes.initAssociations();
        EpDepartamentosProd.initAssociations();
        EpProdutos.initAssociations();
        EpNfsSaida.initAssociations();
        EpMovimentacoesSaida.initAssociations();
        EpNfsEnt.initAssociations();
        EpMovimentacoesEnt.initAssociations();

        SjdProduto_Origem.initAssociations();
        SjdTabpr_Origem.initAssociations();
        SjdTabpr_Origem_Log.initAssociations();*/


    }

}

module.exports = { ModelsController };
