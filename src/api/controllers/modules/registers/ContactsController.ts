import Contacts from "../../../database/models/Contacts.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class ContactsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Contacts;
    }

    static {
        this.configureRequestHandlers();
    }
}
