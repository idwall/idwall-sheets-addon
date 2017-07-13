/**
* Transform a JSON list (`[{},{},...]`) into multidimensional array
 *
 * @param {string} json_string JSON string
 * @param {boolean} header Include header row
 * @customfunction
 */
function PARSEJSONLIST(json_string, header){
  
  var items = JSON.parse(json_string)
  var rows = []
    
  // Adds a header row
  if (header && items.length > 0) {
    var headerArray = []
    for(var column in items[0]) headerArray.push(column) 
    rows.push(headerArray)
  }  
  
  for(var row in items) {
    var rowArray = []
    for(var column in items[row]) rowArray.push(items[row][column])
    rows.push(rowArray)
  }
  
  return rows
  
}

/**
 * Transform an IDwall list Object into an multidimensional array
 *
 * @access private
 * @param {Object} result Expected format: { dados: {} }
 * @param {boolean} header Include header row
 * @return Multidimensional array
 */
function resultDadosToArray_(result, header){

  var items = result.dados
  return resultToArray_(items, header)

}

/**
 * Transform an IDwall list Object into an multidimensional array
 *
 * @access private
 * @param {Object} result Expected format: { itens: [] }
 * @param {boolean} header Include header row
 * @return Multidimensional array
 */
function resultItensToArray_(result, header){

  var items = result.itens
  var rows = []
  
  if (items.length === 0) return 'Nenhum item encontrado.'
  
  // Adds a header row
  if (header && items.length > 0) {
    var headerArray = []
    for(var column in items[0]) headerArray.push(column) 
    rows.push(headerArray)
  }  
  
  for(var row in items) {
    var rowArray = []
    for(var column in items[row]) rowArray.push(items[row][column])
    rows.push(rowArray)
  }
  
  return rows

}

/**
 * Transform an IDwall details Object into an multidimensional array
 *
 * @access private
 * @param {Object} result Expected format: { key: value }
 * @param {boolean} header Include header row
 * @return Multidimensional array
 */
function resultToArray_(result, header){
   
  if (!result) return 'Nenhum item encontrado.'
  
  var rowArray = []
  for (var column in result) {
    
    var item = []
    if (header) {
      item.push(column)
    }
    
    if (typeof result[column] === 'object') {
      
      var stringData = JSON.stringify(result[column])
      item.push(stringData)
      rowArray.push(item)
      
    } else {
      
      item.push(result[column])
      rowArray.push(item)
    
    }
    
  }
  
  return transpose_(rowArray)
  
}

/**
 * Transpose a multidimensional array
 *
 * @access private
 * @param {Object} a Multidimensional array
 * @return Transposed multidimensional array
 */
function transpose_(a) {
  return Object.keys(a[0]).map(function (c) { return a.map(function (r) { return r[c] }) })
}

/**
 * Show error message
 */
function showError_(message, title) {
  if (title) SpreadsheetApp.getActiveSpreadsheet().toast(message, title)
  else SpreadsheetApp.getActiveSpreadsheet().toast(message)
}


