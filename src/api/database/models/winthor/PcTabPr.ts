'use strict';


import { DataTypes } from 'sequelize';
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import Utils from '../../../controllers/utils/Utils.js';
import PcProdut from './PcProdut.js';
import PcRegiao from './PcRegiao.js';

/**
 * class model
 */
export default class PcTabPr extends BaseWinthorTableModel {

  //table fields
  declare CODPROD: string;
  declare NUMREGIAO: string;
  declare PTABELA?: string;
  declare PVENDA?: string;
  declare PERDESCMAX?: string;
  declare PERDESCMAXTAB?: string;
  declare POFERTA?: string;
  declare POFERTATAB?: string;
  declare MARGEM?: string;
  declare DTULTALTPVENDA?: Date;
  declare EXCLUIDO?: string;
  declare PTABELA1?: string;
  declare PTABELA2?: string;
  declare PTABELA3?: string;
  declare PTABELA4?: string;
  declare PTABELA5?: string;
  declare PTABELA6?: string;
  declare PTABELA7?: string;
  declare PVENDA1?: string;
  declare PVENDA2?: string;
  declare PVENDA3?: string;
  declare PVENDA4?: string;
  declare PVENDA5?: string;
  declare PVENDA6?: string;
  declare PVENDA7?: string;
  declare CODST?: string;
  declare MARGEM_ESP?: string;
  declare PFRETE?: string;
  declare TABELAEMITIDA?: string;
  declare PERDESCMAXESP?: string;
  declare PERDESCAUTOR?: string;
  declare COTAITEM?: string;
  declare QTDESCAUTOR?: string;
  declare POFERTAAUX?: string;
  declare PERDESCAUTORTAB?: string;
  declare COTAITEMTAB?: string;
  declare QTDESCAUTORTAB?: string;
  declare PERDESCMAXBALCAO?: string;
  declare PERDESCMAXTABBALCAO?: string;
  declare PERDESCFOB?: string;
  declare PTABELAMED?: string;
  declare PVENDAMED?: string;
  declare PTABELAMED1?: string;
  declare PTABELAMED2?: string;
  declare PTABELAMED3?: string;
  declare PTABELAMED4?: string;
  declare PTABELAMED5?: string;
  declare PTABELAMED6?: string;
  declare PTABELAMED7?: string;
  declare PVENDAMED1?: string;
  declare PVENDAMED2?: string;
  declare PVENDAMED3?: string;
  declare PVENDAMED4?: string;
  declare PVENDAMED5?: string;
  declare PVENDAMED6?: string;
  declare PVENDAMED7?: string;
  declare DESCONTAFRETE?: string;
  declare DTINICIOPTABELA?: Date;
  declare PTABELAFUTURO?: string;
  declare DTULTALTPTABELAFUTURO?: Date;
  declare DTULTALTPTABELA?: Date;
  declare PCOMREP1?: string;
  declare PCOMREP2?: string;
  declare PCOMREP3?: string;
  declare PERCACRESCIMOFRETE?: string;
  declare DTEMISSAOETIQ?: Date;
  declare NUMSEQATU?: string;
  declare PRECOFAB?: string;
  declare ATUALIZAR?: string;
  declare PTABELAATAC?: string;
  declare PTABELAATAC1?: string;
  declare PTABELAATAC2?: string;
  declare PTABELAATAC3?: string;
  declare PTABELAATAC4?: string;
  declare PTABELAATAC5?: string;
  declare PTABELAATAC6?: string;
  declare PTABELAATAC7?: string;
  declare PVENDAATAC?: string;
  declare PVENDAATAC1?: string;
  declare PVENDAATAC2?: string;
  declare PVENDAATAC3?: string;
  declare PVENDAATAC4?: string;
  declare PVENDAATAC5?: string;
  declare PVENDAATAC6?: string;
  declare PVENDAATAC7?: string;
  declare PRECOANTERIORATAC?: string;
  declare VLACRESFRETEKG?: string;
  declare DTINICIOVALIDADE?: Date;
  declare DTFIMVALIDADE?: Date;
  declare INDICEPRECO?: string;
  declare DTIMPORTINTEGRACAO?: Date;
  declare PERCIPIVENDATAB?: string;
  declare VLPAUTAIPIVENDATAB?: string;
  declare VLIPIPORKGVENDATAB?: string;
  declare PRECOMAXCONSUM?: string;
  declare DTULTATUPVENDA?: Date;
  declare DTULTALTERSRVPRC?: Date;
  declare PRECOMAXCONSUMTAB?: string;
  declare VLSTTAB?: string;
  declare VLST?: string;
  declare PERCDESCSIMPLESNAC?: string;
  declare CODTRIBPISCOFINS?: string;
  declare PRECOREVISTA?: string;
  declare DTVALPREVISTA?: Date;
  declare ROTINA?: string;
  declare MATRICULA?: string;
  declare OBS?: string;
  declare PERDESCMAXIDEALTAB?: string;
  declare PERDESCMAXPOSSIVELTAB?: string;
  declare PERCCOMGARANTIDATAB?: string;
  declare PERDESCMAXAVISTATAB?: string;
  declare PERDESCMAXIDEAL?: string;
  declare PERCCOMGARANTIDA?: string;
  declare PERDESCMAXAVISTA?: string;
  declare PERDESCMAXPOSSIVEL?: string;
  declare VLIPITAB?: string;
  declare VLIPI?: string;
  declare PERCCOM?: string;
  declare CUSTOPRECIFIC?: string;
  declare CUSTOPRECIFICTAB?: string;
  declare VLULTENTMES?: string;
  declare PTABELASEMIMPOSTO1?: string;
  declare PTABELASEMIMPOSTO2?: string;
  declare PTABELASEMIMPOSTO3?: string;
  declare PTABELASEMIMPOSTO4?: string;
  declare PTABELASEMIMPOSTO5?: string;
  declare PTABELASEMIMPOSTO6?: string;
  declare PTABELASEMIMPOSTO7?: string;
  declare PVENDASEMIMPOSTO1?: string;
  declare PVENDASEMIMPOSTO2?: string;
  declare PVENDASEMIMPOSTO3?: string;
  declare PVENDASEMIMPOSTO4?: string;
  declare PVENDASEMIMPOSTO5?: string;
  declare PVENDASEMIMPOSTO6?: string;
  declare PVENDASEMIMPOSTO7?: string;
  declare PTABELAATACSEMIMPOSTO1?: string;
  declare PTABELAATACSEMIMPOSTO2?: string;
  declare PTABELAATACSEMIMPOSTO3?: string;
  declare PTABELAATACSEMIMPOSTO4?: string;
  declare PTABELAATACSEMIMPOSTO5?: string;
  declare PTABELAATACSEMIMPOSTO6?: string;
  declare PTABELAATACSEMIMPOSTO7?: string;
  declare PVENDAATACSEMIMPOSTO1?: string;
  declare PVENDAATACSEMIMPOSTO2?: string;
  declare PVENDAATACSEMIMPOSTO3?: string;
  declare PVENDAATACSEMIMPOSTO4?: string;
  declare PVENDAATACSEMIMPOSTO5?: string;
  declare PVENDAATACSEMIMPOSTO6?: string;
  declare UTILIZARIOLOG?: string;
  declare PVENDAATACSEMIMPOSTO7?: string;
  declare CALCULARIPI?: string;
  declare FORMULA?: string;
  declare REGPRECIFICADA?: string;
  declare VLFCPSTTAB?: string;
  declare VLFCPST?: string;
  declare CALCULARFECPSTVENDA?: string;
  declare PRECOMINIMOVENDA?: string;
  declare PRECOMINIMOTABELA_AUX?: string;
  declare PRECOMINIMOVENDA_AUX?: string;
  declare PRECOMINIMOTABELA?: string;
  declare VLULTENTCONTSEMSTTAB?: string;
  declare VLULTENTCONTSEMST?: string;
  declare IONSYNC?: string;
  declare FORMULA_ID?: string;
  declare REGRAALTERARDESCONTO?: string;
  declare CODFILIALINTEGRACAO?: string;
  declare DTALTERC5?: string;
  declare UTILIZAMULTIPLO?: string;


  static id = 30210;
  static tableName = this.name.toUpperCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;


  static fields = {            
    CODPROD: {
      type: DataTypes.STRING(22),
      primaryKey: true,
      allowNull: false		
    },
    NUMREGIAO: {
      type: DataTypes.STRING(22),
      primaryKey: true,
      allowNull: false		
    },
    PTABELA: {
      type: DataTypes.STRING(22)		
    },
    PVENDA: {
      type: DataTypes.STRING(22)		
    },
    PERDESCMAX: {
      type: DataTypes.STRING(22)		
    },
    PERDESCMAXTAB: {
      type: DataTypes.STRING(22)		
    },
    POFERTA: {
      type: DataTypes.STRING(22)		
    },
    POFERTATAB: {
      type: DataTypes.STRING(22)		
    },
    MARGEM: {
      type: DataTypes.STRING(22)		
    },
    DTULTALTPVENDA: {
      type: DataTypes.DATE		
    },
    EXCLUIDO: {
      type: DataTypes.STRING(1)		
    },
    PTABELA1: {
      type: DataTypes.STRING(22)		
    },
    PTABELA2: {
      type: DataTypes.STRING(22)		
    },
    PTABELA3: {
      type: DataTypes.STRING(22)		
    },
    PTABELA4: {
      type: DataTypes.STRING(22)		
    },
    PTABELA5: {
      type: DataTypes.STRING(22)		
    },
    PTABELA6: {
      type: DataTypes.STRING(22)		
    },
    PTABELA7: {
      type: DataTypes.STRING(22)		
    },
    PVENDA1: {
      type: DataTypes.STRING(22)		
    },
    PVENDA2: {
      type: DataTypes.STRING(22)		
    },
    PVENDA3: {
      type: DataTypes.STRING(22)		
    },
    PVENDA4: {
      type: DataTypes.STRING(22)		
    },
    PVENDA5: {
      type: DataTypes.STRING(22)		
    },
    PVENDA6: {
      type: DataTypes.STRING(22)		
    },
    PVENDA7: {
      type: DataTypes.STRING(22)		
    },
    CODST: {
      type: DataTypes.STRING(22)		
    },
    MARGEM_ESP: {
      type: DataTypes.STRING(22)		
    },
    PFRETE: {
      type: DataTypes.STRING(22)		
    },
    TABELAEMITIDA: {
      type: DataTypes.STRING(1)		
    },
    PERDESCMAXESP: {
      type: DataTypes.STRING(22)		
    },
    PERDESCAUTOR: {
      type: DataTypes.STRING(22)		
    },
    COTAITEM: {
      type: DataTypes.STRING(22)		
    },
    QTDESCAUTOR: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
    },
    POFERTAAUX: {
      type: DataTypes.STRING(22)		
    },
    PERDESCAUTORTAB: {
      type: DataTypes.STRING(22)		
    },
    COTAITEMTAB: {
      type: DataTypes.STRING(22)		
    },
    QTDESCAUTORTAB: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
    },
    PERDESCMAXBALCAO: {
      type: DataTypes.STRING(22)		
    },
    PERDESCMAXTABBALCAO: {
      type: DataTypes.STRING(22)		
    },
    PERDESCFOB: {
      type: DataTypes.STRING(22)		
    },
    PTABELAMED: {
      type: DataTypes.STRING(22)		
    },
    PVENDAMED: {
      type: DataTypes.STRING(22)		
    },
    PTABELAMED1: {
      type: DataTypes.STRING(22)		
    },
    PTABELAMED2: {
      type: DataTypes.STRING(22)		
    },
    PTABELAMED3: {
      type: DataTypes.STRING(22)		
    },
    PTABELAMED4: {
      type: DataTypes.STRING(22)		
    },
    PTABELAMED5: {
      type: DataTypes.STRING(22)		
    },
    PTABELAMED6: {
      type: DataTypes.STRING(22)		
    },
    PTABELAMED7: {
      type: DataTypes.STRING(22)		
    },
    PVENDAMED1: {
      type: DataTypes.STRING(22)		
    },
    PVENDAMED2: {
      type: DataTypes.STRING(22)		
    },
    PVENDAMED3: {
      type: DataTypes.STRING(22)		
    },
    PVENDAMED4: {
      type: DataTypes.STRING(22)		
    },
    PVENDAMED5: {
      type: DataTypes.STRING(22)		
    },
    PVENDAMED6: {
      type: DataTypes.STRING(22)		
    },
    PVENDAMED7: {
      type: DataTypes.STRING(22)		
    },
    DESCONTAFRETE: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    DTINICIOPTABELA: {
      type: DataTypes.DATE		
    },
    PTABELAFUTURO: {
      type: DataTypes.STRING(22)		
    },
    DTULTALTPTABELAFUTURO: {
      type: DataTypes.DATE		
    },
    DTULTALTPTABELA: {
      type: DataTypes.DATE		
    },
    PCOMREP1: {
      type: DataTypes.STRING(22)		
    },
    PCOMREP2: {
      type: DataTypes.STRING(22)		
    },
    PCOMREP3: {
      type: DataTypes.STRING(22)		
    },
    PERCACRESCIMOFRETE: {
      type: DataTypes.STRING(22)		
    },
    DTEMISSAOETIQ: {
      type: DataTypes.DATE		
    },
    NUMSEQATU: {
      type: DataTypes.STRING(22)		
    },
    PRECOFAB: {
      type: DataTypes.STRING(22)		
    },
    ATUALIZAR: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    PTABELAATAC: {
      type: DataTypes.STRING(22)		
    },
    PTABELAATAC1: {
      type: DataTypes.STRING(22)		
    },
    PTABELAATAC2: {
      type: DataTypes.STRING(22)		
    },
    PTABELAATAC3: {
      type: DataTypes.STRING(22)		
    },
    PTABELAATAC4: {
      type: DataTypes.STRING(22)		
    },
    PTABELAATAC5: {
      type: DataTypes.STRING(22)		
    },
    PTABELAATAC6: {
      type: DataTypes.STRING(22)		
    },
    PTABELAATAC7: {
      type: DataTypes.STRING(22)		
    },
    PVENDAATAC: {
      type: DataTypes.STRING(22)		
    },
    PVENDAATAC1: {
      type: DataTypes.STRING(22)		
    },
    PVENDAATAC2: {
      type: DataTypes.STRING(22)		
    },
    PVENDAATAC3: {
      type: DataTypes.STRING(22)		
    },
    PVENDAATAC4: {
      type: DataTypes.STRING(22)		
    },
    PVENDAATAC5: {
      type: DataTypes.STRING(22)		
    },
    PVENDAATAC6: {
      type: DataTypes.STRING(22)		
    },
    PVENDAATAC7: {
      type: DataTypes.STRING(22)		
    },
    PRECOANTERIORATAC: {
      type: DataTypes.STRING(22)		
    },
    VLACRESFRETEKG: {
      type: DataTypes.STRING(22)		
    },
    DTINICIOVALIDADE: {
      type: DataTypes.DATE		
    },
    DTFIMVALIDADE: {
      type: DataTypes.DATE		
    },
    INDICEPRECO: {
      type: DataTypes.STRING(22),
      defaultValue: 1	
    },
    DTIMPORTINTEGRACAO: {
      type: DataTypes.DATE		
    },
    PERCIPIVENDATAB: {
      type: DataTypes.STRING(22)		
    },
    VLPAUTAIPIVENDATAB: {
      type: DataTypes.STRING(22)		
    },
    VLIPIPORKGVENDATAB: {
      type: DataTypes.STRING(22)		
    },
    PRECOMAXCONSUM: {
      type: DataTypes.STRING(22)		
    },
    DTULTATUPVENDA: {
      type: DataTypes.DATE		
    },
    DTULTALTERSRVPRC: {
      type: DataTypes.DATE		
    },
    PRECOMAXCONSUMTAB: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
    },
    VLSTTAB: {
      type: DataTypes.STRING(22)		
    },
    VLST: {
      type: DataTypes.STRING(22)		
    },
    PERCDESCSIMPLESNAC: {
      type: DataTypes.STRING(22)		
    },
    CODTRIBPISCOFINS: {
      type: DataTypes.STRING(22)		
    },
    PRECOREVISTA: {
      type: DataTypes.STRING(22)		
    },
    DTVALPREVISTA: {
      type: DataTypes.DATE,
      defaultValue: null	
    },
    ROTINA: {
      type: DataTypes.STRING(40)		
    },
    MATRICULA: {
      type: DataTypes.STRING(22)		
    },
    OBS: {
      type: DataTypes.STRING(80)		
    },
    PERDESCMAXIDEALTAB: {
      type: DataTypes.STRING(22)		
    },
    PERDESCMAXPOSSIVELTAB: {
      type: DataTypes.STRING(22)		
    },
    PERCCOMGARANTIDATAB: {
      type: DataTypes.STRING(22)		
    },
    PERDESCMAXAVISTATAB: {
      type: DataTypes.STRING(22)		
    },
    PERDESCMAXIDEAL: {
      type: DataTypes.STRING(22)		
    },
    PERCCOMGARANTIDA: {
      type: DataTypes.STRING(22)		
    },
    PERDESCMAXAVISTA: {
      type: DataTypes.STRING(22)		
    },
    PERDESCMAXPOSSIVEL: {
      type: DataTypes.STRING(22)		
    },
    VLIPITAB: {
      type: DataTypes.STRING(22)		
    },
    VLIPI: {
      type: DataTypes.STRING(22)		
    },
    PERCCOM: {
      type: DataTypes.STRING(22)		
    },
    CUSTOPRECIFIC: {
      type: DataTypes.STRING(22)		
    },
    CUSTOPRECIFICTAB: {
      type: DataTypes.STRING(22)		
    },
    VLULTENTMES: {
      type: DataTypes.STRING(22)		
    },
    PTABELASEMIMPOSTO1: {
      type: DataTypes.STRING(22)		
    },
    PTABELASEMIMPOSTO2: {
      type: DataTypes.STRING(22)		
    },
    PTABELASEMIMPOSTO3: {
      type: DataTypes.STRING(22)		
    },
    PTABELASEMIMPOSTO4: {
      type: DataTypes.STRING(22)		
    },
    PTABELASEMIMPOSTO5: {
      type: DataTypes.STRING(22)		
    },
    PTABELASEMIMPOSTO6: {
      type: DataTypes.STRING(22)		
    },
    PTABELASEMIMPOSTO7: {
      type: DataTypes.STRING(22)		
    },
    PVENDASEMIMPOSTO1: {
      type: DataTypes.STRING(22)		
    },
    PVENDASEMIMPOSTO2: {
      type: DataTypes.STRING(22)		
    },
    PVENDASEMIMPOSTO3: {
      type: DataTypes.STRING(22)		
    },
    PVENDASEMIMPOSTO4: {
      type: DataTypes.STRING(22)		
    },
    PVENDASEMIMPOSTO5: {
      type: DataTypes.STRING(22)		
    },
    PVENDASEMIMPOSTO6: {
      type: DataTypes.STRING(22)		
    },
    PVENDASEMIMPOSTO7: {
      type: DataTypes.STRING(22)		
    },
    PTABELAATACSEMIMPOSTO1: {
      type: DataTypes.STRING(22)		
    },
    PTABELAATACSEMIMPOSTO2: {
      type: DataTypes.STRING(22)		
    },
    PTABELAATACSEMIMPOSTO3: {
      type: DataTypes.STRING(22)		
    },
    PTABELAATACSEMIMPOSTO4: {
      type: DataTypes.STRING(22)		
    },
    PTABELAATACSEMIMPOSTO5: {
      type: DataTypes.STRING(22)		
    },
    PTABELAATACSEMIMPOSTO6: {
      type: DataTypes.STRING(22)		
    },
    PTABELAATACSEMIMPOSTO7: {
      type: DataTypes.STRING(22)		
    },
    PVENDAATACSEMIMPOSTO1: {
      type: DataTypes.STRING(22)		
    },
    PVENDAATACSEMIMPOSTO2: {
      type: DataTypes.STRING(22)		
    },
    PVENDAATACSEMIMPOSTO3: {
      type: DataTypes.STRING(22)		
    },
    PVENDAATACSEMIMPOSTO4: {
      type: DataTypes.STRING(22)		
    },
    PVENDAATACSEMIMPOSTO5: {
      type: DataTypes.STRING(22)		
    },
    PVENDAATACSEMIMPOSTO6: {
      type: DataTypes.STRING(22)		
    },
    UTILIZARIOLOG: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    PVENDAATACSEMIMPOSTO7: {
      type: DataTypes.STRING(22)		
    },
    CALCULARIPI: {
      type: DataTypes.STRING(1)		
    },
    FORMULA: {
      type: DataTypes.STRING(4000)		
    },
    REGPRECIFICADA: {
      type: DataTypes.STRING(1)		
    },
    VLFCPSTTAB: {
      type: DataTypes.STRING(22)		
    },
    VLFCPST: {
      type: DataTypes.STRING(22)		
    },
    CALCULARFECPSTVENDA: {
      type: DataTypes.STRING(1)		
    },
    PRECOMINIMOVENDA: {
      type: DataTypes.STRING(22)		
    },
    PRECOMINIMOTABELA_AUX: {
      type: DataTypes.STRING(22)		
    },
    PRECOMINIMOVENDA_AUX: {
      type: DataTypes.STRING(22)		
    },
    PRECOMINIMOTABELA: {
      type: DataTypes.STRING(22)		
    },
    VLULTENTCONTSEMSTTAB: {
      type: DataTypes.STRING(22)		
    },
    VLULTENTCONTSEMST: {
      type: DataTypes.STRING(22)		
    },
    IONSYNC: {
      type: DataTypes.STRING(1)		
    },
    FORMULA_ID: {
      type: DataTypes.STRING(50)		
    },
    REGRAALTERARDESCONTO: {
      type: DataTypes.STRING(1)		
    },
    CODFILIALINTEGRACAO: {
      type: DataTypes.STRING(22)		
    },
    DTALTERC5: {
      type: DataTypes.STRING(11)		
    },
    UTILIZAMULTIPLO: {
      type: DataTypes.STRING(1)		
    },
  };

  static foreignsKeys : any[] = [];


  /**
     * @override
     * @created 2025-04-14
     * @version 1.0.0
     */
    static getForeignKeys(): any[] {
      //Utils.logi(this.name,'getForeignKeys');
      let result : any = this.foreignsKeys;
      if (!this.adjustedForeignKeys || !Utils.hasValue(this.foreignsKeys)) {
        result = super.getForeignKeys();
        result.push({
          fields: ['NUMREGIAO'],
          type: 'foreign key',
          references: { 
              table: PcRegiao,
              field: 'NUMREGIAO'
          }
        });
        result.push({
          fields: ['CODPROD'],
          type: 'foreign key',
          references: { 
              table: PcProdut,
              field: 'CODPROD'
          }
        });
      }
      //Utils.logf(this.name,'getForeignKeys');
      return result;
    }    
 
};