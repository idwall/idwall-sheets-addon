var ColorsEnum = Object.freeze({
  BLACK:"#333333",
  GRAY:"#CCCCCC",
  WHITE:"#FFFFFF",
  LIGHT_GRAY: "#EEEEEE",
  LIGHT_GRAY: "#EEEEEE",
  BLUE: "#0000FF"
})

// Prompt matrix code
function sheetReport(){
  
  var ui = SpreadsheetApp.getUi()
  var response = ui.prompt('Relatório IDwall', 'Digite o código da Matriz:', ui.ButtonSet.OK)
  
  if (response.getSelectedButton() != ui.Button.OK){
    ui.alert('Você precisa fornecer o código da Matriz para continuar.')
  }

  newReport(response.getResponseText())
  
}

// Sets up a spreadsheet for data input
function newReport(matrix) {
    
  // Get matrix parameters
  var details = apiGet_('/matrizes/' + matrix)
  
  if (details.status_code == 200) {
    
    var detailsObj = details.result.parametros
    
    var rowsNome = new Array()    
    var rowsTitulo = new Array()

    for(var row in detailsObj) {
      rowsNome.push(detailsObj[row]['nome'])
      rowsTitulo.push(detailsObj[row]['titulo'])
    }
    
    // Set values in spreadsheet
    SpreadsheetApp.getActiveSpreadsheet().insertSheet(matrix)
    var sheet = SpreadsheetApp.getActive().getSheetByName(matrix)
    
    // Title
    var rangeTitle = sheet.getRange(1,1)
    var rangeTitleFull = sheet.getRange(1,1,1,rowsNome.length)
    rangeTitle.setValue(details.result.titulo)
    rangeTitleFull.setFontSize(14)
    rangeTitleFull.setFontWeight("bold")
    rangeTitleFull.setBackground(ColorsEnum.BLACK)
    rangeTitleFull.setFontColor(ColorsEnum.WHITE)
    rangeTitleFull.merge()
    
    var rangeDescricao = sheet.getRange(2,1)
    var rangeDescricaoFull = sheet.getRange(2,1,1,rowsNome.length)
    rangeDescricao.setValue(details.result.descricao)
    rangeDescricaoFull.setFontStyle("italic")
    rangeDescricaoFull.setBackground(ColorsEnum.BLACK)
    rangeDescricaoFull.setFontColor(ColorsEnum.GRAY)
    rangeDescricaoFull.merge()
    
    // Parameters
    var rangeParametersName = sheet.getRange(4,1,1,rowsNome.length)
    rangeParametersName.setValues([rowsNome])
    rangeParametersName.setFontStyle("italic")
    rangeParametersName.setFontColor(ColorsEnum.GRAY)
    rangeParametersName.setBackground(ColorsEnum.LIGHT_GRAY)

    var rangeParametersTitulo = sheet.getRange(3,1,1,rowsNome.length)
    rangeParametersTitulo.setValues([rowsTitulo])
    rangeParametersTitulo.setBackground(ColorsEnum.LIGHT_GRAY)
    
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
  var dataRange = sheet.getRange(4, 1, sheet.getLastRow(), sheet.getLastColumn())
  var dataValues = dataRange.getValues()
  var matrix = SpreadsheetApp.getActiveSheet().getName()
  
  // Loop rows
  for (var r = 1; r < dataValues.length-3; r++) {    

    var parameters = {}
    
    // Loop columns
    for (var c = 0; c < dataValues[r].length; c++) {
      if (dataValues[0][c] != '' && dataValues[r][c] != '') {
        parameters[dataValues[0][c]] = dataValues[r][c]
      }
    }
    
    // Create Reports
    var result = createReport_(matrix, parameters)
    
    if (result.status_code == 200) {
      dataRange.offset(r, c, 1, 1).setValue(result.result.numero)
    } else {
      dataRange.offset(r, c, 1, 1).setValue(JSON.stringify(result))
    }
    
  }
  
  // Format
  dataRange.offset(-3, dataRange.getLastColumn(), 2, 1).setBackground(ColorsEnum.BLACK)
  dataRange.offset(-1, dataRange.getLastColumn(), 2, 1).setBackground(ColorsEnum.BLUE)
  dataRange.offset(-1, dataRange.getLastColumn(), 1, 1).setValue(new Date())

}
