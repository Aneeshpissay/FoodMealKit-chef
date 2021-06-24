const { BrowserWindow, app } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/recipe-book-2387993-1992108.png',
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true
        },
        resizable: false
    })
    win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) createWindow();
})