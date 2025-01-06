import PcTabDev from "../../../../database/models/winthor/PcTabDev.js";
import WinthorBaseIntegrationsController from "./WinthorBaseIntegrationsController.js";

export default class PcTabDevController extends WinthorBaseIntegrationsController {
    static getTableClassModel() : any {
        return PcTabDev;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
