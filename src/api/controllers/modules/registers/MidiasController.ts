import { NextFunction, Request, Response } from "express";
import Midias from "../../../database/models/Midias.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class MidiasController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Midias;
    }

    static async uploadFile(req: Request, res: Response, next: NextFunction) {
        try {
            throw new Error("do re-implement");
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    static {
        this.configureRequestHandlers();
        [
            this.uploadFile
        ].forEach(el=>Object.defineProperty(el, "__isRequestHandler", {
            value: true,
            writable: false,
            configurable: false,
            enumerable: false, // Mantém a propriedade oculta em loops
        }));

    }
}
