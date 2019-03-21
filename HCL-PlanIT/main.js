/*
This is a link to the API for working with electron js.
https://electronjs.org/docs/api
In order to open the JavaScript code as a desktop Application,
download Node js unto your computer and run the Command
"npm start" in this folder to run the code. The command looks for
the "main" js file specified in package.json and runs it.

I found this youtube channel, Traversy Media, and he has a couple of
nice tutorials on JavaScript and the electron API.
https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA
*/

//Get required modules
const electron = require('electron');
const url = require('url');
const remote = electron.remote;
const path = require('path');
const {app, BrowserWindow, Menu} = require('electron');


//Window Declarations
let logInWin;
let mainAppWin;

//logInWindow Listeners
let isLoggedIn;

//For when login is frameless
/*const closeBtn = document.getElementById('closeBtn');
closeBtn.addEventListener('click', function (event) {
    var window = BrowserWindow.getFocusedWindow();
    window.close();
});*/


//Menus
const nullMenuTemplate = [
  {label: ""}
];

/*Create log in window for the application*/
function createLogInWin (){
  //Set window properties
  logInWin = new BrowserWindow({
    //frame: false,
    width: 700,
    height: 600,
    resizable: false,
    show: false,
    center:true
  });
  /*Waits to load up page contents before displaying it all at once.
    According to the electron BrowserWindow API, it removes
    visual flashes.*/
  logInWin.once('ready-to-show', () => {
    logInWin.show();
  });
  //Loads the contents of index.html to this window.
  logInWin.loadURL(url.format({
    pathname: path.join(__dirname, 'login.html'),
    protocol: 'file:',
    slashes:true
  }));

  //Open DevTools when app opens
  //logInWin.webContents.openDevTools()

  /*FIXME: logInWin.setMenu(null) wasn't working right for me so
  I made this work around*/
  const logInMenu = Menu.buildFromTemplate(nullMenuTemplate);
  logInWin.setMenu(logInMenu);

  /*Dereferences logInWin object once its closed*/
  logInWin.on('closed', () => {
    logInWin = null;
  });
}

//Temp Function
function validateCredentials() {
     createMainAppWin();
}

function createMainAppWin (){

  mainAppWin = new BrowserWindow({
    parent: top,
    modal: true,
    width: 700,
    height: 600,
    resizable: false,
    show: false,
    center:true
  });
  mainAppWin.once('ready-to-show', () => {
    logInWin.show();
  });
  mainAppWin.loadURL(url.format({
    pathname: path.join(__dirname, 'main_content.html'),
    protocol: 'file:',
    slashes:true
  }));
  const mainAppWinMenu = Menu.buildFromTemplate(nullMenuTemplate);
  mainAppWin.setMenu(mainAppWinMenu);
  mainAppWin.on('closed', () => {
      mainAppWin = null;
  });
}

/*Handles the core application processes*/
function main() {
  //Application opens on LogIn window
  app.on('ready', createLogInWin);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
      app.quit();
    }
  });

  app.on('activate', () => {
    if (logInWin === null) {
      createLogInWin();
    }
  })
}

main();
