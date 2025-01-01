import Midias from "../../../database/models/Midias.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class MidiasController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Midias;
    }

    static {
        this.configureRequestHandlers();
    }
}
