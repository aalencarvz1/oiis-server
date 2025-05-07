import { NextFunction, Request, Response } from "express";
import Midias from "../../../database/models/Midias.js";
import BaseRegistersController from "./BaseRegistersController.js";
import Utils from "../../utils/Utils.js";
import Tables from "../../../database/models/Tables.js";

export default class MidiasController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Midias;
    }

    /**
     * handle uploaded midia file(s) with multer
     * @requesthandler configured on api start, because configurations multer is needed
     * @midleware 
     * @created 2024-31-12
     * @version 1.0.0
     */
    static async upload_file(req: Request, res: Response, next: NextFunction) {
        try {
            let files : any = req.files;
            if (files && files.length > 0 && req.body.registers) {                
                let rMidias = [];
                let registers = req.body.registers || {};

                if (registers && typeof registers != 'object') registers = JSON.parse(registers);
                let tablesRefs : any = {};
                let midia : any = null;

                for(let key in registers) {
                    let file = files.filter((el: any)=>el.originalname.trim().toLowerCase() == registers[key].name.trim().toLowerCase())[0];
                    if (Utils.hasValue(file)) {
                        tablesRefs[registers[key].table_name] = tablesRefs[registers[key].table_name] || await Tables.findOne({
                            raw:true,
                            where:{
                                name: registers[key].table_name.trim().toLowerCase()
                            }
                        });

                        if (registers[key].server_id) {
                            midia = await Midias.findOne({
                                where:{
                                    id:registers[key].server_id
                                }
                            });
                            midia.table_ref_id = tablesRefs[registers[key].table_name].id;
                            midia.record_ref_id= registers[key].record_ref_id;
                            midia.name= file.filename;
                            midia.type= registers[key].type || file.mimetype;
                            midia.numeric_order= registers[key].numeric_order || 0;
                            midia.local_path=file.path;
                            await midia.save();
                        } else {
                            midia = await Midias.create({
                                table_ref_id : tablesRefs[registers[key].table_name].id,
                                record_ref_id: registers[key].record_ref_id,
                                name: file.filename,
                                type: registers[key].type || file.mimetype,
                                numeric_order: registers[key].numeric_order || 0,
                                local_path:file.path
                            });                    
                        }
                        rMidias.push({
                            id:registers[key].id,
                            server_id: midia.id
                        });
                    }
                }            
                
                res.data = rMidias;
                res.sendResponse(200,true);
            } else {
                throw new Error("no file(s) uploaded(s) or missing data");
            }
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
