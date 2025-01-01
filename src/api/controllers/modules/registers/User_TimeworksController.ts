import User_Timeworks from "../../../database/models/User_Timeworks.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class User_TimeworksController extends BaseRegistersController {
    static getTableClassModel() : any {
        return User_Timeworks;
    }

    static {
        this.configureRequestHandlers();
    }
}
