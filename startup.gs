function onInstall(e) {
  onOpen(e);
}

function onOpen(e) {
  SpreadsheetApp.getUi()
    .createMenu('IDwall')
    .addItem('Configurar Token', 'requestNewToken')
    .addToUi();
}