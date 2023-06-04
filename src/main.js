const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');
require('electron-reload')(__dirname);
require('update-electron-app')({
  repo: 'SahalMoh/AtmosfarDesktop',
  logger: require('electron-log'),
  notifyUser: true
})
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let bannerWindow;

function createBannerWindow() {
  bannerWindow = new BrowserWindow({
    width: 300,
    height: 350,
    frame: false,
    icon: path.join(__dirname, 'assets/icons/icon.png'),
    transparent: true,
    hasShadow: true,
    movable: true,
    resizable: false,
    sexy: true,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  bannerWindow.loadFile(path.join(__dirname, 'splash.html'));

  bannerWindow.once('close', () => {
    bannerWindow = null;
  });

  setTimeout(createWindow, 12500);
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minHeight: 480,
    minWidth: 854,
    show: false,
    autoHideMenuBar: true,
    roundedCorners: true,
    icon: path.join(__dirname, 'assets/icons/icon.png'),
    hasShadow: true,
    vibrancy: "ultra-dark",
    visualEffectState: "active",
    closable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration:true,
      contextIsolation:false,
      enableRemoteModule:true,
      devtools: !app.isPackaged,
      webSecurity: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  const packagePath = path.join(app.getAppPath(), './package.json');
  const packageData = JSON.parse(fs.readFileSync(packagePath));
  const appVersion = packageData.version;

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('app-version', appVersion);
  });
  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
  ipcMain.on('get-app-version', (event) => {
    const packagePath = path.join(app.getAppPath(), 'package.json');
    const packageData = JSON.parse(fs.readFileSync(packagePath));
    const appVersion = packageData.version;
  
    // Send the version number to the renderer process
    event.sender.send('app-version', appVersion);
  });
  
  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize();
    mainWindow.show();
    if (bannerWindow) {
      bannerWindow.close();
    }
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createBannerWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.