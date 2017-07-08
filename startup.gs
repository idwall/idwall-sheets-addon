function onInstall(e) {
   onOpen(e);
}

function onOpen(e) {
  installMenu()
}

function installMenu() {

  var ui = SpreadsheetApp.getUi();
    
    ui.createMenu('IDwall')
    .addItem('Gerar planilha de Relatórios', 'sheetReport')
    .addItem('Enviar Relatórios da planilha selecionada', 'sendReports_')
    .addSeparator()
    .addItem('Configurar Token', 'requestNewToken')
    .addToUi();

  
}
