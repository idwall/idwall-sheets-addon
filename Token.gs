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
    return ui.alert('Você precisa fornecer o Token para continuar.')
  }
  setToken(response.getResponseText())
  
}
