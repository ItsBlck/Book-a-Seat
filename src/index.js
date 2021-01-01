const { app, BrowserWindow } = require('electron');
const path = require('path');
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

process.env.NODE_ENV = 'production';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1500,
    height: 900,
    resizable: false,
    titleBarStyle: 'hidden'
  });
  mainWindow.setMenu(null);
  // and load the index.html of the app.
    var firebaseConfig = {
      apiKey: "AIzaSyCXZjU9JlbThavMd6E9vWlYKj93tdlT9og",
      authDomain: "bookaseat-7dc24.firebaseapp.com",
      projectId: "bookaseat-7dc24",
      storageBucket: "bookaseat-7dc24.appspot.com",
      messagingSenderId: "687700833742",
      appId: "1:687700833742:web:5691fb4c4e0a9e3d71a79f",
      measurementId: "G-P6LHMC59XR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  mainWindow.loadFile(path.join(__dirname, 'login.html'));

  // Open the DevTools.
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

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
