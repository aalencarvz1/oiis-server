import Access_Profiles from "../../../database/models/Access_Profiles.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Access_ProfilesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Access_Profiles;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
