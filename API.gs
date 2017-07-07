/**
 * Retorna detalhes do Relatório
 *
 * @param {string} numero_do_relatorio Número do Relatório.
 * @param {boolean} header Inclui um cabeçalho no retorno.
 * @customfunction
 */
function IDW_DETALHARRELATORIO(numero_do_relatorio, header) {

  if (!numero_do_relatorio) throw "O número do Relatório deve ser informado."
  
  return apiGetDetails_('/relatorios/' + numero_do_relatorio, header)
  
}

/**
 * Retorna validações do Relatório
 *
 * @param {string} numero_do_relatorio Número do Relatório.
 * @param {boolean} header Inclui um cabeçalho no retorno.
 * @customfunction
 */
function IDW_VALIDACOESRELATORIO(numero_do_relatorio, header) {

  if (!numero_do_relatorio) throw "O número do Relatório deve ser informado."
  
  return apiGetDetails_('/relatorios/' + numero_do_relatorio + '/validacoes', header)
  
}

/**
 * Retorna dados do Relatório
 *
 * @param {string} numero_do_relatorio Número do Relatório.
 * @param {boolean} header Inclui um cabeçalho no retorno.
 * @customfunction
 */
function IDW_DADOSRELATORIO(numero_do_relatorio, header) {

  if (!numero_do_relatorio) throw "O número do Relatório deve ser informado."
  
  return apiGetDetails_('/relatorios/' + numero_do_relatorio + '/dados', header)
  
}

/**
 * Retorna parâmetros do Relatório
 *
 * @param {string} numero_do_relatorio Número do Relatório.
 * @param {boolean} header Inclui um cabeçalho no retorno.
 * @customfunction
 */
function IDW_PARAMETROSRELATORIO(numero_do_relatorio, header) {

  if (!numero_do_relatorio) throw "O número do Relatório deve ser informado."
  
  return apiGetDetails_('/relatorios/' + numero_do_relatorio + '/parametros', header)
  
}

/**
 * Retorna consultas do Relatório especificado
 *
 * @param {string} numero_do_relatorio Número do Relatório.
 * @param {boolean} header Inclui um cabeçalho no retorno.
 * @customfunction
 */
function IDW_CONSULTASRELATORIO(numero_do_relatorio, header) {

  if (!numero_do_relatorio) throw "O número do Relatório deve ser informado."
  
  return apiGetDetails_('/relatorios/' + numero_do_relatorio + '/consultas', header)
  
}

/**
 * Listar Relatórios gerados pelo usuário
 *
 * @param {integer} page Número da página.
 * @param {integer} rows Número de Relatórios por página. Deve ser um múltiplo de 25.
 * @param {boolean} header Inclui um cabeçalho no retorno.
 * @customfunction
 */
function IDW_LISTARRELATORIOS(page, rows, header) {

  if (!page) page = 1
  if (!rows) rows = 25
  
  rows = rows - (rows % 25)
  return apiGetList_('/relatorios?page=' + page + '&rows=' + rows, header) 
  
}

/**
 * Listar Pessoas - Retorna lista de pessoas consultadas pelo usuário.
 *
 * @param {integer} page Número da página.
 * @param {integer} rows Número de Relatórios por página. Deve ser um múltiplo de 25.
 * @param {boolean} header Inclui um cabeçalho no retorno.
 * @param {string} busca Parte do nome ou CPF para busca.
 * @customfunction
 */
function IDW_LISTARPESSOAS(page, rows, header, busca) {
  
  if (!page) page = 1
  if (!rows) rows = 25
  
  rows = rows - (rows % 25)
  
  var url = '/pessoas?page=' + page + '&rows=' + rows
  if (busca) url += '&busca=' + busca
  
  return apiGetList_(url, header) 
}

/**
 * Detalhar Pessoa - Informações gerais de todos os protocolos relacionados à determinado CPF.
 *
 * @param {string} cpf Número de CPF.
 * @param {integer} page Número da página.
 * @param {integer} rows Número de Relatórios por página. Deve ser um múltiplo de 25.
 * @param {boolean} header Inclui um cabeçalho no retorno.
 * @customfunction
 */
function IDW_DETALHARPESSOA(cpf, page, rows, header) {
  
  if (!page) page = 1
  if (!rows) rows = 25
  
  rows = rows - (rows % 25)
  
  return apiGetDados_('/pessoas/' + cpf + '?page=' + page + '&rows=' + rows, header) 
}

/**
 * Listar Empresas - Retorna lista de empresas consultadas pelo usuário.
 *
 * @param {integer} page Número da página.
 * @param {integer} rows Número de Relatórios por página. Deve ser um múltiplo de 25.
 * @param {boolean} header Inclui um cabeçalho no retorno.
 * @param {string} busca Parte do nome ou CNPJ para busca.
 * @customfunction
 */
function IDW_LISTAREMPRESAS(page, rows, header, busca) {
  
  if (!page) page = 1
  if (!rows) rows = 25
  
  rows = rows - (rows % 25)
  
  var url = '/empresas?page=' + page + '&rows=' + rows
  if (busca) url += '&busca=' + busca
  
  return apiGetList_(url, header) 
}

/**
 * Detalhar Empresa - Informações gerais de todos os protocolos relacionados à determinado CNPJ.
 *
 * @param {string} cnpj Número de CNPJ.
 * @param {integer} page Número da página.
 * @param {integer} rows Número de Relatórios por página. Deve ser um múltiplo de 25.
 * @param {boolean} header Inclui um cabeçalho no retorno.
 * @customfunction
 */
function IDW_DETALHAREMPRESA(cnpj, page, rows, header) {
  
  if (!page) page = 1
  if (!rows) rows = 25
  
  rows = rows - (rows % 25)
  
  return apiGetDados_('/empresas/' + cnpj + '?page=' + page + '&rows=' + rows, header) 
}

/**
 * Listar Matrizes - Retorna lista de matrizes disponíveis para o usuário.
 *
 * @param {boolean} header Inclui um cabeçalho no retorno,
 * @customfunction
 */
function IDW_LISTARMATRIZES(header) {
  return apiGetList_('/matrizes', header) 
}

/**
 * Detalhar Matriz
 *
 * @param {string} codigo_da_matriz Código da Matriz.
 * @param {boolean} header Inclui um cabeçalho no retorno.
 * @customfunction
 */
function IDW_DETALHARMATRIZ(codigo_da_matriz, header) {

  if (!codigo_da_matriz) throw "O código da matriz deve ser informado."
  
  return apiGetDetails_('/matrizes/' + codigo_da_matriz, header)
  
}

/**
 * Perfil do usuário
 *
 * @param {boolean} header Inclui um cabeçalho no retorno.
 * @customfunction
 */
function IDW_USUARIO(header) {
  
  return apiGetDetails_('/usuario', header)
  
}
