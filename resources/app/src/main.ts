import { app, BrowserWindow, Tray, Menu, nativeImage, screen } from 'electron'
import * as path from 'path'
import { APP_p, ClickKey, icon_p, kLanguage, kSingleLanguage } from './appConfig'
import { res } from './res'
import { getLanguage, langueLocaleKArr } from './res/string/languageC'
import { baseW, baseH, ratio, setRatio } from './screenConfig'
import { changeLanguage } from './UI/utils/changeLanguage'


let mainWindow: BrowserWindow | null = null

const createWindow = () => {

  const icon = icon_p//path.join(__dirname, '..', 'company', 'company' + kCompany, 'icon.png')//(res.img['company_' + kCompany as keyof typeof res.img] as CompanyLogo).icon

  let image = nativeImage.createFromPath(path.join(__dirname, path.basename(icon)))

  const size = screen.getPrimaryDisplay().size
  const h = Math.round(size.height * 0.80)
  const r = h / baseH
  setRatio(r > 1 ? 1 : r)
  //const w = baseW * ratio
  //console.log(h, w)
  mainWindow = new BrowserWindow({
    //transparent: true,
    width: Math.round(baseW * ratio),
    height: Math.round(baseH * ratio),
    backgroundColor: '#121212',
    icon: image,
    //title: 'For Dev',
    frame: false,

    resizable: false,
    titleBarStyle: 'hidden',
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  })
  if (process.platform === 'darwin') {
    mainWindow.setWindowButtonVisibility(false)
  }
  if (!app.isPackaged)
    mainWindow.webContents.openDevTools()

  mainWindow.loadFile(path.join(path.dirname(__dirname), 'index.html'))
  mainWindow.on('closed', () => (mainWindow = null))
  mainWindow.on('ready-to-show', function () {
    if (mainWindow) mainWindow.show() // 初始化后再显示
  })
  mainWindow.webContents.on('crashed', (event, killed) => {
    // setImmediate(() => {
    //   if (mainWindow)
    //     mainWindow.reload();
    // })
  });
}
// app.commandLine.appendSwitch('high-dpi-support', '1.5')
// app.commandLine.appendSwitch('force-device-scale-factor', '1.5')

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      mainWindow.show()
    }
  })
}

//app.commandLine.appendSwitch("disable-renderer-backgrounding")
app.commandLine.appendSwitch("disable-background-timer-throttling")
app.on('ready', () => {
  //
  if (!ClickKey && !kSingleLanguage) {
    const sysLanguage = app.getLocale().toLowerCase();
    const lanage = getLanguage(sysLanguage)
    let tmp: string | boolean = lanage

    if (kLanguage && kLanguage.findIndex(v => v === lanage) === -1) {
      if (kLanguage.findIndex(v => v === langueLocaleKArr[0]) != -1) {
        tmp = langueLocaleKArr[1]
      } else {
        tmp = kLanguage[0]
      }
    }

    tmp = tmp === langueLocaleKArr[1]
      ? true
      : tmp === langueLocaleKArr[0]
        ? false
        : tmp

    changeLanguage(tmp)
  }

  addTray()

  createWindow()

  // 隐藏菜单栏
  const { Menu } = require('electron');
  if (app.isPackaged)
    Menu.setApplicationMenu(null);
  // hide menu for Mac
  if (process.platform !== 'darwin') {
    //app.dock.hide();
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})

let tray: Tray | undefined //防止GC
const addTray = () => {
  if (tray === undefined) {
    //const rootPath = path.dirname(__dirname)
    //const impagePath = res.img.APP.replace('file://', '')
    const icon = APP_p//(res.img['company_' + kCompany as keyof typeof res.img] as CompanyLogo).APP
    // console.log(icon)
    let image = nativeImage.createFromPath(icon)
    //console.log(path.join(__dirname, icon))
    image = image.resize({
      width: 18,
      height: 18
    })
    tray = new Tray(image)
    tray.addListener('click', v => {
      if (mainWindow) mainWindow.show()
    })
    tray.setContextMenu(
      Menu.buildFromTemplate([
        {
          label: res.text.显示(), click: () => {
            if (mainWindow) mainWindow.show()
          }
        },
        {
          label: res.text.隐藏(), click: () => {
            if (mainWindow) mainWindow.hide()
          }
        },
        { type: 'separator' },
        {
          label: res.text.退出(), click: () => {
            app.exit()
          }
        },
      ])
    )
  }
}


