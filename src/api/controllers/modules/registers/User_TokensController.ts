import User_Tokens from "../../../database/models/User_Tokens.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class User_TokensController extends BaseRegistersController {
    static getTableClassModel() : any {
        return User_Tokens;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
