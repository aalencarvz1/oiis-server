import Campaign_Entities_Kpi_Result_ValuesController from "../../../../../dist/api/controllers/modules/registers/Campaign_Entities_Kpi_Result_ValuesController";
import Utils from "../../../../../dist/api/controllers/utils/Utils";

describe(Campaign_Entities_Kpi_Result_ValuesController.name, () => {

    test('table class model name', () => {
        let tableClassModel = Campaign_Entities_Kpi_Result_ValuesController.getTableClassModel();
        expect(Utils.hasValue(tableClassModel)).toBeTruthy();
        let tableModelClassName = tableClassModel?.name;
        expect(Utils.hasValue(tableModelClassName)).toBeTruthy();
        let tableName = tableClassModel?.tableName;
        expect(Utils.hasValue(tableName)).toBeTruthy();
        expect(tableModelClassName.trim().toLowerCase()).toEqual(tableName.trim().toLowerCase());
    });

    test('get', async () => {
        console.log('NODE ENV: ',process.env.NODE_ENV);
        let tableClassModel = Campaign_Entities_Kpi_Result_ValuesController.getTableClassModel();
        await tableClassModel.initModel();
        await tableClassModel.initAssociations();
        let result = await Campaign_Entities_Kpi_Result_ValuesController._get();
        expect(Utils.hasValue(result)).toBeTruthy();
    });
    
});
