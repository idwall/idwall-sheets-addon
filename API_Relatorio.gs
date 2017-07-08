// Prompt matrix code
function sheetReport(){

  var matrixList = apiGetList_('/matrizes')
  var matrixText = ''
  
  for (var item in matrixList) matrixText += '\n [' + matrixList[item][1] + '] ' + matrixList[item][2]
  
  var ui = SpreadsheetApp.getUi()
  var response = ui.prompt('Relatório IDwall', 'Digite o código da Matriz:\n' + matrixText, ui.ButtonSet.OK)
  
  if (response.getSelectedButton() != ui.Button.OK){
    ui.alert('Você precisa fornecer o código da Matriz para continuar.')
  }

  newReport(response.getResponseText())
  
}

// Sets up a spreadsheet for data input
function newReport(matrix) {
    
  // Get matrix parameters
  var details = apiGet_('/matrizes/' + matrix)
  
  if (details.status_code != 200) {
    
    var ui = SpreadsheetApp.getUi()
    ui.alert(details)
    
  } else {
    
    var detailsObj = details.result.parametros
    
    var rows = []
    
    for(var row in detailsObj) {
      rows.push(detailsObj[row]['nome'])
    }
    var rowsArray = [rows]
    
    // Set values in spreadsheet
    SpreadsheetApp.getActiveSpreadsheet().insertSheet(matrix)
    var sheet = SpreadsheetApp.getActive().getSheetByName(matrix)
    sheet.getRange(1,1,1,rowsArray[0].length).setValues(rowsArray)
    
  }
  
}

// Send data to IDwall
function createReport_(matrix, parameters){
  
  var payload = {
    "matriz": matrix,
    "parametros": parameters
  }
  
  return apiPost_('/relatorios', payload)
  
}

// Prepare data to send
function sendReports_() {

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  var dataRange = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
  var dataValues = dataRange.getValues()
  var matrix = sheet.getName()
  
  // Loop rows
  for (var r = 1; r < dataValues.length; r++) {    

    var parameters = {}
    
    // Loop columns
    for (var c = 0; c < dataValues[r].length; c++) {
      parameters[dataValues[0][c]] = dataValues[r][c] 
    }
    
    // Create Reports
    var result = createReport_(matrix, parameters)
    
    if (result.status_code == 200) {
      dataRange.offset(r, c, 1, 1).setValue(result.result.numero)
    } else {
      dataRange.offset(r, c, 1, 1).setValue(JSON.stringify(result))
    }
    
  }

}
