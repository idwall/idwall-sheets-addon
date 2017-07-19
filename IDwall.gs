/**
 * IDwall POST API wrapper
 */
function apiPost_(endpoint, payload){
  
  // Avoid unecessary calls to the API
  if (getToken() === '') {
    return {
      'error': 'Unauthorized',
      'message': 'Token de autenticação não especificado'
    }
  }
  
  var url = 'https://api-v2.idwall.co' + endpoint
  var headers = {
    Authorization: getToken(),
  }
  
  var response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    muteHttpExceptions: true,
    payload : JSON.stringify(payload),
    headers: headers,
  });
  
  var result = JSON.parse(response.getContentText())  
 
  if (result.status_code != 200) showError_(JSON.stringify(result), "POST error")
 
  return result
}

/**
 * IDwall GET API wrapper
 */
function apiGet_(endpoint){
  
  // Avoid unecessary calls to the API
  if (getToken() === '') {
    return {
      'error': 'Unauthorized',
      'message': 'Token de autenticação não especificado'
    }
  }
  
  var url = 'https://api-v2.idwall.co' + endpoint
  var headers = {
    Authorization: getToken(),
  }
  
  var response = UrlFetchApp.fetch(url, {
    method: 'get',
    contentType: 'application/json',
    muteHttpExceptions: true,
    headers: headers,
  });
  
  var result = JSON.parse(response.getContentText())  
 
  if (result.status_code != 200) showError_(JSON.stringify(result), "GET error")
 
  return result
  
}

/**
 * Get details result
 */
function apiGetDetails_(url, header) {
  
  var result = apiGet_(url)
  
  if (result.error) return result.message || result.error
  
  return resultToArray_(result.result, header)
  
}

/**
 * Get "itens" result
 */
function apiGetList_(url, header) {
  
  var result = apiGet_(url) 
  
  if (result.error) return result.message || result.error
  
  return resultItensToArray_(result.result, header)
  
}

/**
 * Get "dados" result
 */
function apiGetDados_(url, header) {
  
  var result = apiGet_(url) 
  
  if (result.error) return result.message || result.error
  
  return resultDadosToArray_(result.result, header)
  
}

/**
 * IDwall Token management
 */
function getToken(){
  return PropertiesService.getDocumentProperties().getProperty('IDwallToken') || ''
}

function setToken(setToken){
  PropertiesService.getDocumentProperties().setProperty('IDwallToken', setToken)
}

function requestNewToken() {
  
  var ui = SpreadsheetApp.getUi()
  var response = ui.prompt('Configuração IDwall', 'Digite seu Token da IDwall:', ui.ButtonSet.OK);
  if (response.getSelectedButton() != ui.Button.OK){
    return false;
  }
  setToken(response.getResponseText())
  
}
