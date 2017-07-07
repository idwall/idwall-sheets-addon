function onOpen(e) {
  installMenu_()
}

function installMenu_() {
  SpreadsheetApp.getUi()
    .createMenu('IDwall')
    .addItem('Configurar Token', 'requestNewToken')
    .addItem('Gerar planilha de Relatórios', 'sheetReport')
    .addItem('Enviar Relatórios da planilha selecionada', 'sendReports_')
    .addToUi();
}
