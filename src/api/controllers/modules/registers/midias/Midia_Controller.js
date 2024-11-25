const { Utils } = require("../../../utils/Utils");
const { Midias } = require("../../../../database/models/Midias");
const { Tables } = require("../../../../database/models/Tables");
const { RegistersController } = require("../RegistersController");

/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2023-09-05
 */
class Midia_Controller extends RegistersController{


    static async uploadFile(req,res,next){
        Utils.logi(Midia_Controller.name,'uploadFile');
        try {  
            if (req.files && req.files.length > 0 && req.body.registers) {                
                let rMidias = [];
                let registers = req.body.registers || {};

                if (registers && typeof registers != 'object') registers = JSON.parse(registers);
                let tablesRefs = {};
                let midia = null;

                for(let key in registers) {
                    let file = req.files.filter(el=>el.originalname.trim().toLowerCase() == registers[key].name.trim().toLowerCase())[0];
                    if (Utils.hasValue(file)) {
                        tablesRefs[registers[key].table_name] = tablesRefs[registers[key].table_name] || await Tables.getModel().findOne({
                            raw:true,
                            where:{
                                name: registers[key].table_name.trim().toLowerCase()
                            }
                        });

                        if (registers[key].server_id) {
                            midia = await Midias.getModel().findOne({
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
                            midia = await Midias.getModel().create({
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
        } catch (e) {
            Utils.logError(e);
            res.sendResponse(517,false,e.message || e,null,e);
        }
        Utils.logf(Midia_Controller.name,'uploadFile');
    }    
}

module.exports = {Midia_Controller}