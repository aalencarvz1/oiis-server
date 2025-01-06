import os

# Caminho para a pasta com os arquivos .ts
path = "D:\\PROJECTS\\INFORMATIC\\OIIS\\server\\src\\api\\controllers\\modules\\registers"

# Conteúdo base do arquivo
template = '''import __X__ from "../../../database/models/__X__.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class __X__Controller extends BaseRegistersController {
    static getTableClassModel() : any {
        return __X__;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
'''

# Itera sobre todos os arquivos na pasta
for file_name in os.listdir(path):
    if file_name.endswith(".ts"):
        # Obtém o nome do arquivo sem a extensão
        base_name = os.path.splitext(file_name)[0]
        
        # Remove a ocorrência de "Controller" do nome base
        base_name = base_name.replace("Controller", "")
        
        # Substitui __X__ no template pelo nome do arquivo
        content = template.replace("__X__", base_name)
        
        # Caminho completo do arquivo
        file_path = os.path.join(path, file_name)
        
        # Escreve o novo conteúdo no arquivo
        with open(file_path, "w", encoding="utf-8") as file:
            file.write(content)

print("Arquivos atualizados com sucesso!")
