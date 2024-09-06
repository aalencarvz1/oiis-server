const { BaseTableModel } = require("../../database/models/BaseTableModel");
const { StatusRegs } = require("../../database/models/StatusRegs");
const { OriginsDatas } = require("../../database/models/OriginsDatas");
const { Users } = require("../../database/models/Users");
const { Utils } = require("../utils/Utils");
/*
const { Errors } = require("../../database/models/Errors");
const { Logs } = require("../../database/models/Logs");
const { DataTables } = require("../../database/models/DataTables");
const { DataConnections } = require("../../database/models/DataConnections");
const { DataSchemas } = require("../../database/models/DataSchemas");
const { Contexts } = require("../../database/models/Contexts");
const { EntitiesTypes } = require("../../database/models/EntitiesTypes");
const { DataTypes } = require("../../database/models/DataTypes");
const { ActionStatus } = require("../../database/models/ActionStatus");
const { Parameters } = require("../../database/models/Parameters");
const { ParametersValues } = require("../../database/models/ParametersValues");
const { StatusSync } = require("../../database/models/StatusSync");
const { IdentifiersTypes } = require("../../database/models/IdentifiersTypes");
const { Greatnesses } = require("../../database/models/Greatnesses");
const { MeasurementsUnits } = require("../../database/models/MeasurementsUnits");
const { People } = require("../../database/models/People");
const { Collaborators } = require("../../database/models/Collaborators");
const { AccessProfiles } = require("../../database/models/AccessProfiles");
const { Processes } = require("../../database/models/Processes");
const { RoutinesTypes } = require("../../database/models/RoutinesTypes");
const { Languages } = require("../../database/models/Languages");
const { Texts } = require("../../database/models/Texts");
const { Routines } = require("../../database/models/Routines");
const { RoutinesContent } = require("../../database/models/RoutinesContent");
const { Translates } = require("../../database/models/Translates");
const { Modules } = require("../../database/models/Modules");
const { DatasRelationshipsValues } = require("../../database/models/DatasRelationshipsValues");
const { ValuesNames } = require("../../database/models/ValuesNames");
const { DatasRelationships } = require("../../database/models/DatasRelationships");
const { DataRelationshipTypes } = require("../../database/models/DataRelationshipTypes");
const { DatasHierarchies } = require("../../database/models/DatasHierarchies");
const { ContractsTypes } = require("../../database/models/ContractsTypes");
const { FormsTypes } = require("../../database/models/FormsTypes");
const { Continents } = require("../../database/models/Continents");
const { StreetTypes } = require("../../database/models/StreetTypes");
const { States } = require("../../database/models/States");
const { Cities } = require("../../database/models/Cities");
const { NeighborHoods } = require("../../database/models/NeighborHoods");
const { Countries } = require("../../database/models/Countries");
const { AddressTypes } = require("../../database/models/AddressTypes");
const { Streets } = require("../../database/models/Streets");
const { PostalCodesXStreets } = require("../../database/models/PostalCodesXStreets");
const { PostalCodes } = require("../../database/models/PostalCodes");
const { ContactsTypes } = require("../../database/models/ContactsTypes");
const { PostalCodesXPaths } = require("../../database/models/PostalCodesXPaths");
const { Addresses } = require("../../database/models/Addresses");
const { Contacts } = require("../../database/models/Contacts");
const { Companies } = require("../../database/models/Companies");
const { PeopleXAddresses } = require("../../database/models/PeopleXAddresses");
const { PeopleXContacts } = require("../../database/models/PeopleXContacts");
const { BusinessesUnits } = require("../../database/models/BusinessesUnits");
const { WarehousesAddressTypes } = require("../../database/models/WarehousesAddressTypes");
const { Warehouses } = require("../../database/models/Warehouses");
const { WarehousesAddresses } = require("../../database/models/WarehousesAddresses");
const { WarehousesAddressesCoordinates } = require("../../database/models/WarehousesAddressesCoordinates");
const { WarehousesAddressesDimensions } = require("../../database/models/WarehousesAddressesDimensions");
const { Suppliers } = require("../../database/models/Suppliers");
const { CollaboratorsFunctions } = require("../../database/models/CollaboratorsFunctions");
const { Clients } = require("../../database/models/Clients");
const { WarehousesAddressesCapacities } = require("../../database/models/WarehousesAddressesCapacities");
const { CollaboratorsContracts } = require("../../database/models/CollaboratorsContracts");
const { CollaboratorsXFunctions } = require("../../database/models/CollaboratorsXFunctions");
const { PowersTypes } = require("../../database/models/PowersTypes");
const { Permissions } = require("../../database/models/Permissions");
const { ConteinersTypesDimensions } = require("../../database/models/ConteinersTypesDimensions");
const { ConteinersTypes } = require("../../database/models/ConteinersTypes");
const { Packagings } = require("../../database/models/Packagings");
const { GtinsTypes } = require("../../database/models/GtinsTypes");
const { ConteinersTypesCapacities } = require("../../database/models/ConteinersTypesCapacities");
const { Ncms } = require("../../database/models/Ncms");
const { ItemsStatus } = require("../../database/models/ItemsStatus");
const { Items } = require("../../database/models/Items");
const { Conteiners } = require("../../database/models/Conteiners");
const { Lots } = require("../../database/models/Lots");
const { StocksEntities } = require("../../database/models/StocksEntities");
const { ItemsXLotsXConteiners } = require("../../database/models/ItemsXLotsXConteiners");
const { ItemsStocks } = require("../../database/models/ItemsStocks");
const { StocksEntitiesRelationshipsTypes } = require("../../database/models/StocksEntitiesRelationshipsTypes");
const { ItemsXMeaXPackXIdentif } = require("../../database/models/ItemsXMeaXPackXIdentif");
const { ItemsStocksUnits } = require("../../database/models/ItemsStocksUnits");
const { MovementsTypes } = require("../../database/models/MovementsTypes");
const { MovementsStatus } = require("../../database/models/MovementsStatus");
const { Movements } = require("../../database/models/Movements");
const { CommissionsEntitiesCodes } = require("../../database/models/CommissionsEntitiesCodes");
const { CommissionsItems } = require("../../database/models/CommissionsItems");
const { CommissionsValues } = require("../../database/models/CommissionsValues");
const { Objectives } = require("../../database/models/Objectives");
const { ConferencesTypes } = require("../../database/models/ConferencesTypes");
const { MovementsEntitiesRelationshipsTypes } = require("../../database/models/MovementsEntitiesRelationshipsTypes");
const { GroupsMovements } = require("../../database/models/GroupsMovements");
const { GroupedsMovements } = require("../../database/models/GroupedsMovements");
const { MovsXItemsStocks } = require("../../database/models/MovsXItemsStocks");
const { MovementsXEntities } = require("../../database/models/MovementsXEntities");
const { ItemsMovsAmountsRestrictions } = require("../../database/models/ItemsMovsAmountsRestrictions");
const { ItemsMovsUnits } = require("../../database/models/ItemsMovsUnits");
const { ItemsMovsAmounts } = require("../../database/models/ItemsMovsAmounts");
const { MeasXMeasOrigins } = require("../../database/models/MeasXMeasOrigins");
const { PacksXPacksOrigins } = require("../../database/models/PacksXPacksOrigins");
const { UsersTokens } = require("../../database/models/UsersTokens");
const { PcFilial } = require("../../database/models/winthor/PcFilial");
const { PcCidade } = require("../../database/models/winthor/PcCidade");
const { PcClient } = require("../../database/models/winthor/PcClient");
const { TasksStatus } = require("../../database/models/TasksStatus");
const { Tasks } = require("../../database/models/Tasks");
const { TasksXStatusXUsers } = require("../../database/models/TasksXStatusXUsers");
const { TasksXStatusXUsersLogs } = require("../../database/models/TasksXStatusXUsersLogs");
const { UsersProfilesTimesWork } = require("../../database/models/UsersProfilesTimesWork");
const { UsersTimesWork } = require("../../database/models/UsersTimesWork");
const { PcCob } = require("../../database/models/winthor/PcCob");
const { PcPrest } = require("../../database/models/winthor/PcPrest");
const { PcDocEletronico } = require("../../database/models/winthor/PcDocEletronico");
const { LogisticMovTypes } = require("../../database/models/LogisticMovTypes");
const { LogisticOrders } = require("../../database/models/LogisticOrders");
const { LogisticReasons } = require("../../database/models/LogisticReasons");
const { LogisticOrdersXItemsMovAmt } = require("../../database/models/LogisticOrdersXItemsMovAmt");
const { LogisticOrdersXMovsXReceiptValues } = require("../../database/models/LogisticOrdersXMovsXReceiptValues");
const { PcNfsaid } = require("../../database/models/winthor/PcNfsaid");
const { LogisticOrdersXMovs } = require("../../database/models/LogisticOrdersXMovs");
const { LogisticStatus } = require("../../database/models/LogisticStatus");
const { PcEmpr } = require("../../database/models/winthor/PcEmpr");
const { PcCarreg } = require("../../database/models/winthor/PcCarreg");
const { PcVeicul } = require("../../database/models/winthor/PcVeicul");
const { FinancialValueForms } = require("../../database/models/FinancialValueForms");
const { Apis } = require("../../database/models/Apis");
const { ApisRequests } = require("../../database/models/ApisRequests");
const { ApisResponses } = require("../../database/models/ApisResponses");
const { PcAtivi } = require("../../database/models/winthor/PcAtivi");
const { Midias } = require("../../database/models/Midias");
const { LogisticOrdersXDestValues } = require("../../database/models/LogisticOrdersXDestValues");
const { FinancialValueLocalizationsTypes } = require("../../database/models/FinancialValueLocalizationsTypes");
const { FinancialValueMovTypes } = require("../../database/models/FinancialValueMovTypes");
const { LogisticLogs } = require("../../database/models/LogisticLogs");
const { EpTrabalhadores } = require("../../database/models/ep/EpTrabalhadores");
const { EpVendedores } = require("../../database/models/ep/EpVendedores");
const { EpClientes } = require("../../database/models/ep/EpClientes");
const { EpPessoas } = require("../../database/models/ep/EpPessoas");
const { StatusRun } = require("../../database/models/StatusRun");
const { ApisRequestsCalls } = require("../../database/models/ApisRequestsCalls");
const { ReportsDatasFounts } = require("../../database/models/ReportsDatasFounts");
const { PcBairro } = require("../../database/models/winthor/PcBairro");
const { SjdTabpr_Origem } = require("../../database/models/sjd/SjdTabpr_Origem");
const { SjdProduto_Origem } = require("../../database/models/sjd/SjdProduto_Origem");
const { SjdTabpr_Origem_Log } = require("../../database/models/sjd/SjdTabpr_Origem_Log");
const { ReportsDatasFountsItems } = require("../../database/models/ReportsDatasFountsItems");
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
            BaseTableModel.baseTableModelForeignsKeys[0].references.table = StatusRegs;
        if (typeof BaseTableModel.baseTableModelForeignsKeys[1].references.table == 'string')
            BaseTableModel.baseTableModelForeignsKeys[1].references.table = Users;
        if (typeof BaseTableModel.baseTableModelForeignsKeys[2].references.table == 'string')
            BaseTableModel.baseTableModelForeignsKeys[2].references.table = Users;
        if (typeof BaseTableModel.baseTableModelForeignsKeys[3].references.table == 'string')
            BaseTableModel.baseTableModelForeignsKeys[3].references.table = OriginsDatas;
        let cycleModels = [StatusRegs,Users,OriginsDatas];
        for(let k in cycleModels) {
            console.log('cycleModel',cycleModels[k]);
            if (typeof cycleModels[k].foreignsKeys[0].references.table == 'string')
                cycleModels[k].foreignsKeys[0].references.table = StatusRegs;
            if (typeof cycleModels[k].foreignsKeys[1].references.table == 'string')
                cycleModels[k].foreignsKeys[1].references.table = Users;
            if (typeof cycleModels[k].foreignsKeys[2].references.table == 'string')
                cycleModels[k].foreignsKeys[2].references.table = Users;
            if (typeof cycleModels[k].foreignsKeys[3].references.table == 'string')
                cycleModels[k].foreignsKeys[3].references.table = OriginsDatas;
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
        DataTables.getModel();
        DataConnections.getModel();
        DataSchemas.getModel();
        Contexts.getModel();
        EntitiesTypes.getModel();
        DataTypes.getModel();
        ActionStatus.getModel();
        Parameters.getModel();
        ParametersValues.getModel();
        OriginsDatas.getModel();
        StatusRegs.getModel();
        StatusSync.getModel();
        StatusRun.getModel();
        IdentifiersTypes.getModel();
        Greatnesses.getModel();
        MeasurementsUnits.getModel();
        People.getModel();
        Collaborators.getModel();
        AccessProfiles.getModel();
        Users.getModel();
        UsersTokens.getModel();
        UsersProfilesTimesWork.getModel();
        UsersTimesWork.getModel();
        Processes.getModel();
        RoutinesTypes.getModel();
        Languages.getModel();
        Texts.getModel();
        Routines.getModel();
        RoutinesContent.getModel();
        Translates.getModel();
        Modules.getModel();
        DatasRelationshipsValues.getModel();
        ValuesNames.getModel();
        DatasRelationships.getModel();
        DataRelationshipTypes.getModel();
        DatasHierarchies.getModel();
        ContractsTypes.getModel();
        FormsTypes.getModel();        
        FinancialValueForms.getModel();      
        FinancialValueLocalizationsTypes.getModel();      
        FinancialValueMovTypes.getModel();      
        Continents.getModel();
        StreetTypes.getModel();
        States.getModel();
        Cities.getModel();
        NeighborHoods.getModel();
        Countries.getModel();
        AddressTypes.getModel();
        Streets.getModel();
        PostalCodesXStreets.getModel();
        PostalCodes.getModel();
        ContactsTypes.getModel();
        PostalCodesXPaths.getModel();
        Addresses.getModel();
        Contacts.getModel();
        Companies.getModel();
        PeopleXAddresses.getModel();
        PeopleXContacts.getModel();
        BusinessesUnits.getModel();
        WarehousesAddressTypes.getModel();
        Warehouses.getModel();
        WarehousesAddresses.getModel();
        WarehousesAddressesCoordinates.getModel();
        WarehousesAddressesDimensions.getModel();
        Suppliers.getModel();
        CollaboratorsFunctions.getModel();
        Clients.getModel();
        WarehousesAddressesCapacities.getModel();
        CollaboratorsContracts.getModel();
        CollaboratorsXFunctions.getModel();
        PowersTypes.getModel();
        Permissions.getModel();
        ConteinersTypesDimensions.getModel();
        ConteinersTypes.getModel();
        Packagings.getModel();
        GtinsTypes.getModel();
        ConteinersTypesCapacities.getModel();
        Ncms.getModel();
        ItemsStatus.getModel();
        Items.getModel();
        Conteiners.getModel();
        Lots.getModel();
        StocksEntities.getModel();
        ItemsXLotsXConteiners.getModel();
        ItemsStocks.getModel();
        StocksEntitiesRelationshipsTypes.getModel();
        ItemsXMeaXPackXIdentif.getModel();
        ItemsStocksUnits.getModel();
        MovementsTypes.getModel();
        MovementsStatus.getModel();
        Movements.getModel();
        CommissionsEntitiesCodes.getModel();
        CommissionsItems.getModel();
        CommissionsValues.getModel();
        Objectives.getModel();
        ReportsDatasFounts.getModel();
        ReportsDatasFountsItems.getModel();
        ConferencesTypes.getModel();
        MovementsEntitiesRelationshipsTypes.getModel();
        GroupsMovements.getModel();
        GroupedsMovements.getModel();
        MovsXItemsStocks.getModel();
        MovementsXEntities.getModel();
        ItemsMovsAmountsRestrictions.getModel();
        ItemsMovsUnits.getModel();
        ItemsMovsAmounts.getModel();
        LogisticMovTypes.getModel();  
        
        LogisticStatus.getModel();        
        LogisticReasons.getModel();
        LogisticOrders.getModel();
        LogisticOrdersXMovs.getModel();
        LogisticOrdersXItemsMovAmt.getModel();
        LogisticOrdersXMovsXReceiptValues.getModel();
        LogisticOrdersXDestValues.getModel();        
        LogisticLogs.getModel();        

        TasksStatus.getModel();
        Tasks.getModel();
        TasksXStatusXUsers.getModel();
        TasksXStatusXUsersLogs.getModel();
        Apis.getModel();
        ApisRequests.getModel();
        ApisRequestsCalls.getModel();
        ApisResponses.getModel();
        MeasXMeasOrigins.getModel();
        PacksXPacksOrigins.getModel();   
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
        DataTables.initAssociations();
        DataConnections.initAssociations();
        DataSchemas.initAssociations();
        Contexts.initAssociations();
        EntitiesTypes.initAssociations();
        DataTypes.initAssociations();
        ActionStatus.initAssociations();
        Parameters.initAssociations();
        ParametersValues.initAssociations();
        OriginsDatas.initAssociations();
        StatusRegs.initAssociations();
        StatusSync.initAssociations();
        StatusRun.initAssociations();
        IdentifiersTypes.initAssociations();
        Greatnesses.initAssociations();
        MeasurementsUnits.initAssociations();
        People.initAssociations();
        Collaborators.initAssociations();
        AccessProfiles.initAssociations();
        Users.initAssociations();
        UsersTokens.initAssociations();
        UsersProfilesTimesWork.initAssociations();
        UsersTimesWork.initAssociations();
        Processes.initAssociations();
        RoutinesTypes.initAssociations();
        Languages.initAssociations();
        Texts.initAssociations();
        Routines.initAssociations();
        RoutinesContent.initAssociations();
        Translates.initAssociations();
        Modules.initAssociations();
        DatasRelationshipsValues.initAssociations();
        ValuesNames.initAssociations();
        DatasRelationships.initAssociations();
        DataRelationshipTypes.initAssociations();
        DatasHierarchies.initAssociations();
        ContractsTypes.initAssociations();
        FormsTypes.initAssociations();     
        FinancialValueForms.initAssociations();      
        FinancialValueLocalizationsTypes.initAssociations();      
        FinancialValueMovTypes.initAssociations();      
        Continents.initAssociations();
        StreetTypes.initAssociations();
        States.initAssociations();
        Cities.initAssociations();
        NeighborHoods.initAssociations();
        Countries.initAssociations();
        AddressTypes.initAssociations();
        Streets.initAssociations();
        PostalCodesXStreets.initAssociations();
        PostalCodes.initAssociations();
        ContactsTypes.initAssociations();
        PostalCodesXPaths.initAssociations();
        Addresses.initAssociations();
        Contacts.initAssociations();
        Companies.initAssociations();
        PeopleXAddresses.initAssociations();
        PeopleXContacts.initAssociations();
        BusinessesUnits.initAssociations();
        WarehousesAddressTypes.initAssociations();
        Warehouses.initAssociations();
        WarehousesAddresses.initAssociations();
        WarehousesAddressesCoordinates.initAssociations();
        WarehousesAddressesDimensions.initAssociations();
        Suppliers.initAssociations();
        CollaboratorsFunctions.initAssociations();
        Clients.initAssociations();
        WarehousesAddressesCapacities.initAssociations();
        CollaboratorsContracts.initAssociations();
        CollaboratorsXFunctions.initAssociations();
        PowersTypes.initAssociations();
        Permissions.initAssociations();
        ConteinersTypesDimensions.initAssociations();
        ConteinersTypes.initAssociations();
        Packagings.initAssociations();
        GtinsTypes.initAssociations();
        ConteinersTypesCapacities.initAssociations();
        Ncms.initAssociations();
        ItemsStatus.initAssociations();
        Items.initAssociations();
        Conteiners.initAssociations();
        Lots.initAssociations();
        StocksEntities.initAssociations();
        ItemsXLotsXConteiners.initAssociations();
        ItemsStocks.initAssociations();
        StocksEntitiesRelationshipsTypes.initAssociations();
        ItemsXMeaXPackXIdentif.initAssociations();
        ItemsStocksUnits.initAssociations();
        MovementsTypes.initAssociations();
        MovementsStatus.initAssociations();
        Movements.initAssociations();
        CommissionsEntitiesCodes.initAssociations();
        CommissionsItems.initAssociations();
        CommissionsValues.initAssociations();
        Objectives.initAssociations();
        ReportsDatasFounts.initAssociations();
        ReportsDatasFountsItems.initAssociations();
        ConferencesTypes.initAssociations();
        MovementsEntitiesRelationshipsTypes.initAssociations();
        GroupsMovements.initAssociations();
        GroupedsMovements.initAssociations();
        MovsXItemsStocks.initAssociations();
        MovementsXEntities.initAssociations();
        ItemsMovsAmountsRestrictions.initAssociations();
        ItemsMovsUnits.initAssociations();
        ItemsMovsAmounts.initAssociations();
        LogisticMovTypes.initAssociations();                
        LogisticStatus.initAssociations();        
        LogisticReasons.initAssociations();
        LogisticOrders.initAssociations();
        LogisticOrdersXMovs.initAssociations();
        LogisticOrdersXItemsMovAmt.initAssociations();
        LogisticOrdersXMovsXReceiptValues.initAssociations();
        LogisticOrdersXDestValues.initAssociations();
        LogisticLogs.initAssociations();        
        TasksStatus.initAssociations();
        Tasks.initAssociations();
        TasksXStatusXUsers.initAssociations();
        TasksXStatusXUsersLogs.initAssociations();
        Apis.initAssociations();
        ApisRequests.initAssociations();
        ApisRequestsCalls.initAssociations();
        ApisResponses.initAssociations();
        MeasXMeasOrigins.initAssociations();
        PacksXPacksOrigins.initAssociations();  
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
