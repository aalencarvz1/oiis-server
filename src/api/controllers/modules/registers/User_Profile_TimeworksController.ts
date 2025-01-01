import User_Profile_Timeworks from "../../../database/models/User_Profile_Timeworks.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class User_Profile_TimeworksController extends BaseRegistersController {
    static getTableClassModel() : any {
        return User_Profile_Timeworks;
    }

    static {
        this.configureRequestHandlers();
    }
}
