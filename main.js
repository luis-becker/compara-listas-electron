const { app, BrowserWindow } = require('electron')
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1350,
    height: 750,
  })
  win.loadFile('comparadorDeListas.html')
}
app.whenReady().then(() => {
  createWindow()
})