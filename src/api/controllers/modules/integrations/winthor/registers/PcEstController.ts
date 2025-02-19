import { QueryTypes } from "sequelize";
import DBConnectionManager from "../../../../../database/DBConnectionManager.js";
import Relationships from "../../../../../database/models/Relationships.js";
import Users from "../../../../../database/models/Users.js";
import PcEst from "../../../../../database/models/winthor/PcEst.js";
import Utils from "../../../../utils/Utils.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";
import DatabaseUtils from "../../../../database/DatabaseUtils.js";
import PcProdut from "../../../../../database/models/winthor/PcProdut.js";
import Report_Data_Founts from "../../../../../database/models/Report_Data_Founts.js";

export default class PcEstController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcEst;
    }  


    static async getWithBrokerAndThird(params?:any) : Promise<void | PcEst[]> {
        let queryParams = params?.queryParams || params || {};
        let query = `
            with est_jumbo as (
                SELECT
                    f.codigo as codfilial,
                    ejf.codprod,
                    0 as HASBROKER,
                    0 as HASTERC,
                    nvl(ejf.qtestger,0)+nvl(ejr.qtestger,0) - ( nvl((
                        
                            /*obtem o estoque negativo nas demais filiais de venda retira que retiram desta*/
                            select
                                sum(case
                                    when nvl(ejf_outras.qtestger,0) < 0 then nvl(ejf_outras.qtestger,0) * -1
                                    else 0
                                end)
                            from
                                jumbo.pcfilial f_outras                
                                left outer join jumbo.pcfilialretira fr_outras on (
                                    fr_outras.codfilialvenda = f_outras.codigo
                                    and nvl(f_outras.USAESTOQUEDEPFECHADO,'N') = 'S'
                                )
                                join jumbo.pcest ejf_outras on (
                                    ejf_outras.codfilial = f_outras.codigo
                                )
                            where
                                fr_outras.codfilialretira = ejf.codfilial                            
                                and ejf_outras.codprod = ejf.codprod
                        ),0)
                    ) as qtest,
                    nvl(ejf.qtreserv,0) + nvl(ejr.qtreserv,0) as qtreserv,
                    nvl(ejf.qtbloqueada,0) + nvl(ejr.qtbloqueada,0) as qtbloqueada,
                    nvl(ejf.qtpendente,0) + nvl(ejr.qtpendente,0) as qtpendente,        
                    nvl(ejf.estmin,0) + nvl(ejr.estmin,0) as estmin,
                    0 as qtbroker,
                    0 as qtterc
                FROM
                    jumbo.pcfilial f                
                    left outer join jumbo.pcfilialretira fr on (
                        fr.codfilialvenda = f.codigo
                        and nvl(f.USAESTOQUEDEPFECHADO,'N') = 'S'
                    )
                    join jumbo.pcest ejf on (
                        ejf.codfilial = f.codigo
                    )
                    left outer join jumbo.pcest ejr on (
                        ejr.codfilial = fr.codfilialretira
                        and ejr.codprod = ejf.codprod
                    )  
            ),
            est_broker as (
                SELECT
                    f.codigo as codfilial,
                    nvl(eo.codprod_erp,eo.codprodorigem) as codprod,
                    1 as HASBROKER,
                    0 as HASTERC,
                    0 as qtest,
                    eo.qtreservada as qtreserv,
                    eo.qtbloqueada as qtbloqueada,
                    eo.qtpendentesaida as qtpendente,
                    0 as estmin,
                    eo.qtfisico as qtbroker,
                    0 as qtterc
                FROM
                    jumbo.pcfilial f
                    left outer join jumbo.pcfilialretira fr on (
                        fr.codfilialvenda = f.codigo
                        and nvl(f.USAESTOQUEDEPFECHADO,'N') = 'S'
                    )
                    join consulta.sjdestoque_origem eo on (
                        nvl(eo.codfilial_erp,eo.codfilialorigem) = nvl(fr.codfilialretira,f.codigo)
                    )

                where   
                    eo.codorigemdado = 1
            ),
            est_terc as (
                SELECT
                    f.codigo as codfilial,
                    et.codprod,
                    0 as HASBROKER,
                    1 as HASTERC,
                    0 as qtest,
                    0 as qtreserv,
                    0 as qtbloqueada,
                    0 as qtpendente,        
                    0 as estmin,
                    0 as qtbroker,
                    et.qt as qtterc        
                FROM
                    jumbo.pcfilial f
                    left outer join jumbo.pcfilialretira fr on (
                        fr.codfilialvenda = f.codigo
                        and nvl(f.USAESTOQUEDEPFECHADO,'N') = 'S'
                    )
                    join JUMBO.PRODUTOS_ARMAZENADOS_TERCEIROS et on (
                    et.codfilial = nvl(fr.codfilialretira,f.codigo)
                    )
                WHERE
                    NVL(et.qt,0) > 0
            )
            select 
                    to_char(e.codfilial) as codfilial,
                    e.codprod,
                    max(e.hasbroker) as hasbroker,
                    max(e.hasterc) as hasterc,
                    p.descricao,
                    p.unidade,
                    sum(nvl(e.qtest,0)) as qtest,
                    sum(nvl(e.estmin,0)) as estmin,
                    sum(nvl(e.qtreserv,0)) as qtreserv,
                    sum(nvl(e.qtbloqueada,0)) as qtbloqueada,
                    sum(nvl(e.qtpendente,0)) as qtpendente,
                    sum(nvl(e.qtbroker,0)) as qtbroker,
                    sum(nvl(e.qtterc,0)) as qtterc,
                    sum(nvl(e.qtest,0)) - (
                        sum(nvl(e.estmin,0))
                        + sum(nvl(e.qtreserv,0))
                        + sum(nvl(e.qtbloqueada,0))
                        + sum(nvl(e.qtpendente,0))
                    ) + (
                        sum(nvl(e.qtbroker,0))
                        + sum(nvl(e.qtterc,0))
                    ) as qtliq
                from (
                        select * from est_jumbo
                        union all    
                        select * from est_broker
                        union all    
                        select * from est_terc
                    ) e
                    join jumbo.pcprodut p on (p.codprod = e.codprod)
                    join jumbo.pcprodfilial pf on (pf.codfilial = e.codfilial and pf.codprod = e.codprod)    
                __WHERE__
                group by
                    e.codfilial,
                    e.codprod,
                    p.descricao,
                    p.unidade
                order by 
                    e.codfilial,
                    e.codprod;
        `;
        

        let filiais = await Relationships.findAll({
            raw: true,
            attributes:[
                'record_2_id'
            ],
            where:{
                table_1_id: Users.id,
                record_1_column: 'id',
                record_1_id: params.user.id,
                table_2_id: PcEst.id,
                record_2_column: 'CODFILIAL'
            }
        });
        if (Utils.hasValue(filiais)) {
            query = query.replace('__WHERE__',` where e.CODFILIAL IN (${filiais.map(el=>el.record_2_id).join(',')}) `);
        } else {
            query = query.replace('__WHERE__','');
        }


        return await DBConnectionManager.getWinthorDBConnection()?.query(
            query,{
                type: QueryTypes.SELECT
            }            
        )
    } 


    static async getWinthorPurchaseSuggestions(params?:any) : Promise<void | any[]> {

        let reportDataFountName = 'purchase suggestion';
        
        let query : any = await Report_Data_Founts.findOne({
            where:{
                name: reportDataFountName
            }
        });

        if (Utils.hasValue(query)) {
            query = query.get_value_from;
    
            let where = params?.queryParams?.where || params?.where || {};
            if (Utils.hasValue(where)) {
                where = DatabaseUtils.whereToString(where,PcProdut)
                query = query.replace('${where}',` where ${where} `);
            } else {
                query = query.replace('${where}',' ');
            }

            return await DBConnectionManager.getWinthorDBConnection()?.query(
                query,{
                raw:true,type:QueryTypes.SELECT
            });
        } else {
            throw new Error(`report data fount not found with name ${reportDataFountName}`);
        }
    }  
    
    static {
        this.configureDefaultRequestHandlers();
    }
}