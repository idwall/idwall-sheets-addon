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
  
  return JSON.parse(response.getContentText())
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
  
  return JSON.parse(response.getContentText())

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
