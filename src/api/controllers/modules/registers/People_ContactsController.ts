import People_Contacts from "../../../database/models/People_Contacts.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class People_ContactsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return People_Contacts;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
