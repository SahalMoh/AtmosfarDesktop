const { app, BrowserWindow, ipcMain, shell, Menu, Tray } = require('electron');
const path = require('path');
const fs = require('fs');
require('electron-reload')(__dirname);
require('update-electron-app')({
  repo: 'SahalMoh/AtmosfarDesktop',
  logger: require('electron-log'),
  notifyUser: true
})
if (require('electron-squirrel-startup')) {
  app.quit();
}

let bannerWindow;
let mainWindow;
let tray;

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
    devtools: false,
    webPreferences: {
      nodeIntegration: true,
      devtools: false,
    }
  });

  bannerWindow.loadFile(path.join(__dirname, 'splash.html'));

  bannerWindow.once('closed', () => {
    bannerWindow = null;
  });

  setTimeout(createMainWindow, 12500);
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
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
      devtools: false,
      webSecurity: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  const packagePath = path.join(app.getAppPath(), 'package.json');
  const packageData = JSON.parse(fs.readFileSync(packagePath));
  const appVersion = packageData.version;

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('app-version', appVersion);
  });

  ipcMain.on('get-app-version', (event) => {
    const packagePath = path.join(app.getAppPath(), 'package.json');
    const packageData = JSON.parse(fs.readFileSync(packagePath));
    const appVersion = packageData.version;
    event.sender.send('app-version', appVersion);
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize();
    mainWindow.show();
    if (bannerWindow) {
      bannerWindow.close();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  tray = new Tray(path.join(__dirname, 'assets/icons/icon.ico'));
  tray.setToolTip('Atmosfär');

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Atmosfär', enabled: false },
    { type: 'separator' },
    { label: 'Open GitHub Repository', click: openGitHubRepo },
    { label: 'Open Website', click: openWebsite },
  ]);

  tray.setContextMenu(contextMenu);
});

function openGitHubRepo() {
  shell.openExternal('https://github.com/SahalMoh/AtmosfarDesktop/');
}

function openWebsite() {
  shell.openExternal('https://atmosfar.netlify.app/');
}

function openMainWindow() {
  if (bannerWindow) {
    return;
  }
  
  if (mainWindow) {
    mainWindow.show();
  } else {
    createMainWindow();
  }
}

app.on('ready', () => {
  createBannerWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});