# Funções IDwall para Google Sheets (BETA)

Este Add-on adiciona as funcionalidades dos endpoints GET da API IDwall como funções do Google Sheets:

* `=IDWALL_RELATORIOSDETALHES(numero_do_relatorio, header)`  
Retorna detalhes do Relatório
* `=IDWALL_RELATORIOSVALIDACOES(numero_do_relatorio, header)`  
Retorna validações do Relatório
* `=IDWALL_RELATORIOSDADOS(numero_do_relatorio, header)`  
Retorna dados do Relatório
* `=IDWALL_RELATORIOSPARAMETROS(numero_do_relatorio, header)`  
Retorna parâmetros do Relatório
* `=IDWALL_RELATORIOSCONSULTAS(numero_do_relatorio, header)`  
Retorna consultas do Relatório especificado
* `=IDWALL_RELATORIOSLISTA(page, rows, header)`  
Listar Relatórios gerados pelo usuário
* `=IDWALL_PESSOASLISTA(page, rows, header, busca)`  
Listar Pessoas - Retorna lista de pessoas consultadas pelo usuário.
* `=IDWALL_PESSOASDETALHES(cpf, page, rows, header)`  
Detalhar Pessoa - Informações gerais de todos os protocolos relacionados à determinado CPF.
* `=IDWALL_EMPRESASLISTA(page, rows, header, busca)`  
Listar Empresas - Retorna lista de empresas consultadas pelo usuário.
* `=IDWALL_EMPRESASDETALHES(cnpj, page, rows, header)`  
Detalhar Empresa - Informações gerais de todos os protocolos relacionados à determinado CNPJ.
* `=IDWALL_MATRIZESLISTA(header)`  
Listar Matrizes - Retorna lista de matrizes disponíveis para o usuário. 
* `=IDWALL_MATRIZESDETALHES(codigo_da_matriz, header)`  
Detalhar Matriz
* `=IDWALL_USUARIO(header)`  
Perfil do usuário

## Enviando alterações

Recomenda-se utilizar o plugin do Chrome [Google Apps Script Github Assistant](https://chrome.google.com/webstore/detail/google-apps-script-github/lfjcgcmkmjjlieihflfhjopckgpelofo) para fazer o push do cógido para o repositório.
