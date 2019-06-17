const electron = require('electron');
const {app, ipcMain, BrowserWindow, ipcRenderer} = electron;
const path = require('path');
const url = require('url');
var usb = require('usb')
var fs = require('fs'); 
const serialport = require("serialport");
var serial_port = new serialport("/dev/ttyACM0", {baudRate: 115200});
var Desktop_serial_port = new serialport("/dev/ttyUSB0", {baudRate: 115200});

const isDev = require("electron-is-dev");

var MYport;
var MYport2;
serialport.list(function(err, ports) {
  ports.forEach(function(port) {
    console.log('port comName: ' + port.comName);
    console.log('port pnpID: ' + port.pnpId);
    console.log('port manufacturer: ' + port.manufacturer);
    if(port.manufacturer == "Cypress Semiconductor"){
      console.log('Found controller')
      MYport = port.comName.toString();
      // console.log('testing to see if this works for open')
      // mainWindow.webContents.send('unmounted', 'alive');
    }
    else if(port.manufacturer == "FTDI"){
      console.log('Found desktop')
      MYport2 = port.comName.toString();
    }
  });
  serial_port = new SerialPort(MYport,{baudRate: 115200});
  Desktop_serial_port = new SerialPort(MYport2,{baudRate: 115200});
});

//checking connection with controller
serialport.list(function(err, ports) {
  ports.forEach(function(port) {
    console.log('port comName: ' + port.comName);
    console.log('port pnpID: ' + port.pnpId);
    console.log('port manufacturer: ' + port.manufacturer);
    if(port.manufacturer == "Cypress Semiconductor"){
      console.log('testing to see if this works for open')
      mainWindow.webContents.send('unmounted', 'alive');
    }
  });
});

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ 
    width: 320, 
    height: 260, 
    frame: false, 
    resizable: false,
    x:0,
    y:0,
    disableAutoHideCursor: true,
    show:false
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
})


  // and load the index.html of the app.
  //const startUrl = (isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  const startUrl = (`file://${path.join(__dirname, '../build/index.html')}`);
  // = process.env.ELECTRON_START_URL || url.format({
  //  pathname: path.join(__dirname, '/../public/index.html'),
  //  protocol: 'file:',
  //  slashes: true
  //});
  mainWindow.loadURL(startUrl);
  // Open the DevTools.
  mainWindow.webContents.openDevTools({detach: true});

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});

app.on('ready', () => {
  // mainWindow.webContents.on('did-finish-load', () => {
  //   var child_process = require('child_process');
  //   var activePorts = child_process.execSync('nmcli -t -f NAME connection show --active').toString();
  //   mainWindow.webContents.send('wifi-connection', activePorts);
  //   //checking connection with controller
  //   serialport.list(function(err, ports) {
  //     ports.forEach(function(port) {
  //       console.log('port comName: ' + port.comName);
  //       if(port.manufacturer == "Cypress Semiconductor"){
  //         mainWindow.webContents.send('unmounted', 'alive');
  //       }
  //     });
  //   });
  // })
})

ipcMain.on('reconnect-wifi', (event, SSID, PASS) => {
  // const exec = require("child_process").exec;
  // var child_process = require('child_process');
  // var connected1 = child_process.execSync('nmcli -t -f NAME connection show --active').toString();
  // console.log('is it connected? ' + connected1);
  // var splitting = connected1.split("\n");
  // //not connected to saved SSID
  // if (splitting[0] !== SSID){
  //   console.log("disconnecting to all wifi");
  //   // disconnect to all excpet ethernet
  //   var savedTYPE1 = child_process.execSync('nmcli -t -f TYPE connection show').toString();
  //   var savedUUID1 = child_process.execSync('nmcli -t -f UUID connection show').toString();
  //   var specificUUID1 = savedUUID1.split("\n");
  //   var type1;
  //   var splittingType1 = savedTYPE1.split("\n");
  //   for(var z = 0; z < splittingType1.length -1; z++){
  //     type1 = savedTYPE1.split("\n");
  //     typeOfInternet1 = type1[z].split("-").slice(2);
  //     if (typeOfInternet1 == 'wireless'){
  //       exec("nmcli connection delete uuid " + specificUUID1[z]);
  //     }
  //   }
  //   // connect to wifi
  //   console.log("connecting to wifi " + SSID);
  //   exec("nmcli d wifi connect " +  SSID + " password " + PASS + " ");
  // }
})

//Rendering called on start up
ipcMain.on('open-new-window', (event, fileName, SSID, PASS) => {
  //let win2 = new BrowserWindow({width: 320, height: 260, frame: false, show: false, 
  //  resizable: false, transparent: true, x:0, y:0, disableAutoHideCursor: true})
  switch (fileName) {
    case "boot":
    
      //win2.loadURL(`file://${__dirname}/../public/` + fileName + `.html`)
      //win2.once('ready-to-show', () => {
      //  win2.show()
      //})
      //win2.webContents.openDevTools();
      
      // WIFI
      // const exec = require("child_process").exec;
      // var child_process = require('child_process');

      // //exec("modprobe bcmdhd");
      // //exec("nmcli d wifi connect " + SSID +  " password " + PASS);
      // ////exec("nmcli d disconnect wlan0");
      
      // var nameWifi = child_process.execSync('nmcli -t -f NAME connection show --active').toString();
      // console.log(nameWifi);
      // var splitM = nameWifi.split("\n");
      // //if not connected to wifi OR already on the saved network
      // if (splitM[0] !== SSID){
      //   // disconnect to all excpet ethernet
      //   console.log("disconnecting to wifi");
      //   var savedTYPE = child_process.execSync('nmcli -t -f TYPE connection show').toString();
      //   var savedUUID = child_process.execSync('nmcli -t -f UUID connection show').toString();
      //   var specificUUID = savedUUID.split("\n");
      //   var type;
      //   var splittingType = savedTYPE.split("\n");
      //   for(var i = 0; i < splittingType.length -1; i++){
      //     type = savedTYPE.split("\n");
      //     typeOfInternet = type[i].split("-").slice(2);
      //     if (typeOfInternet == 'wireless'){
      //       exec("nmcli connection delete uuid " + specificUUID[i]);
      //     }
      //   }
      //   // connect to wifi
      //   console.log("connecting to wifi " + SSID);
      //   exec("nmcli d wifi connect " +  SSID + " password " + PASS + " ");
      // }
      // var connected = child_process.execSync('nmcli -t -f NAME connection show --active').toString();
      // console.log('the wifi is connected: ' + connected);
      // break;
    default:
  }
})

//switches states when clicked on a different tab
ipcMain.on('switch_tabs', (event, arg) => {
  mainWindow.webContents.send('tab-event2', arg);
})

ipcMain.on('on_off_switch', (event, arg) => {
  if(arg === 0){
    console.log('switch is off');
    console.log(arg);
  }else{
    console.log('switch is on');
    console.log(arg);
  }
  //depending on the input call
  if(arg===1){
    //turn on these outputs
    serial_port.write(Buffer.from([126, 73, 1, 79,0,0,128,13,10]));
  }else if(arg===2){
     //turn on these outputs
    serial_port.write(Buffer.from([126, 73, 1, 79,255,255,255,13,10])); // ALL LEDS
  }else if(arg===3){
     //turn on these outputs
    serial_port.write(Buffer.from([126, 73, 1, 79,0,0,128,13,10]));
  }else if(arg===4){
     //turn on these outputs
    serial_port.write(Buffer.from([126, 73, 1, 79,0,0,128,13,10]));
  }else if(arg===5){
     //turn on these outputs
    serial_port.write(Buffer.from([126, 73, 1, 79,0,0,128,13,10]));
  }else if(arg===6){
     //turn on these outputs
    serial_port.write(Buffer.from([126, 73, 1, 79,0,0,128,13,10]));
  }else if(arg===7){
     //turn on these outputs
    serial_port.write(Buffer.from([126, 73, 1, 79,0,0,128,13,10]));
  }else if(arg===8){
     //turn on these outputs
    serial_port.write(Buffer.from([126, 73, 1, 79,0,0,128,13,10]));
  }else{
    //turn off all outputs
    serial_port.write(Buffer.from([126, 73, 1, 79,0,0,0,13,10]));
  }
})

ipcMain.on('manualSlideSwitch', (event, arg) => {
  if(arg === 0){
    console.log('slideswitch is off');
  }else if(arg === 2){
    console.log('slideswitch is MODE1');
  }else if(arg === 1){
    console.log('slideswitch is MODE2');
  }else if(arg === 4){
    console.log('slideswitch is MODE3');
  }
  //depending on the mode
  if(arg===4){
    //turn on these outputs
    serial_port.write(Buffer.from([126, 73, 1, 79,0,0,128,13,10]));
  }else if(arg===2){
     //turn on these outputs
    serial_port.write(Buffer.from([126, 73, 1, 79,0,0,128,13,10]));
  }else if(arg===0){
     //turn on these outputs
    serial_port.write(Buffer.from([126, 73, 1, 79,0,0,128,13,10]));
  }else{
    //turn off all outputs
    serial_port.write(Buffer.from([126, 73, 1, 79,0,0,0,13,10]));
  }
})

ipcMain.on('speaker', (event, arg) => {
  //console.log(arg)
})
ipcMain.on('audio', (event, arg) => {
  //console.log(arg)
})
ipcMain.on('wigwag', (event, arg) => {
  //console.log(arg)
})

ipcMain.on('lightBarActivate', (event, arg) => {
  //console.log(arg)
})

//turns the correct outputs on but its sending the same packet to the firmware???
ipcMain.on('outputs', (event, number1, number2, number3) => {
  //console.log(number1, number2, number3)
  serial_port.write(Buffer.from([126, 74, 1, 79, number1, number2, number3, 13,10]));
})

//send to firmware to turn on
ipcMain.on('packet-sending', (event, led16r, led16g, led16b, led15r, led15g, led15b, led14r, led14g, led14b, led13r, led13g, led13b, led12r, 
  led12g, led12b, led11r, led11g, led11b, led10r, led10g, led10b, led9r, led9g, led9b, led8r, led8g, led8b, led7r, led7g, led7b, led6r, led6g, led6b, 
  led5r, led5g, led5b, led4r, led4g, led4b, led3r, led3g, led3b, led2r, led2g, led2b, led1r, led1g, led1b) => {

  // console.log( 'LED 16: ' + led16r, led16g, led16b, 'LED 15: ' + led15r, led15g, led15b, 'LED 14: ' + led14r, led14g, led14b, 'LED 13: ' + led13r, led13g, led13b, 'LED 12: ' + led12r, 
  // led12g, led12b, 'LED 11: ' + led11r, led11g, led11b, 'LED 10: ' + led10r, led10g, led10b, 'LED 9: ' + led9r, led9g, led9b, 'LED 8: ' + led8r, led8g, led8b, 'LED 7: ' + led7r, led7g, led7b, 'LED 6: ' + led6r, led6g, led6b, 
  // 'LED 5: ' + led5r, led5g, led5b, 'LED 4: ' + led4r, led4g, led4b, 'LED 3: ' + led3r, led3g, led3b, 'LED 2: ' + led2r, led2g, led2b, 'LED 1: ' + led1r, led1g, led1b + "\n\n")

  // serial_port.write(Buffer.from([0, 0, 126, 73, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,26,
  //   27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 13,10]));

  serial_port.write(Buffer.from([0, 0, 126, 73, led16r, led16g, led16b, led15r, led15g, led15b, led14r, led14g, led14b, led13r, led13g, led13b, led12r, 
    led12g, led12b, led11r, led11g, led11b, led10r, led10g, led10b, led9r, led9g, led9b, led8r, led8g, led8b, led7r, led7g, led7b, led6r, led6g, led6b, 
    led5r, led5g, led5b, led4r, led4g, led4b, led3r, led3g, led3b, led2r, led2g, led2b, led1r, led1g, led1b, 13,10]));
})

ipcMain.on('unmount', (event, data) => {
  //console.log(data)
  Desktop_serial_port.write(Buffer.from([126, 77, 1, data, 13, 10]));
})

///////////////////Send and Receive From PSOC///////////////////
serial_port.on('readable', function(){
  var readBufferSerialData = serial_port.read();
  console.log('Data: ', readBufferSerialData);
  mainWindow.webContents.send('asynchronous-serialData', readBufferSerialData);
});

//reciving JSON file
Desktop_serial_port.on('data', function (data) {
  console.log(`Received ${data.length} bytes of data.`);
  console.log(data.toString());
  var BufferData = data.toString();
  movedata(BufferData);
});

//receving data in chuncks
//so appending all data to a file
var str = '';
function movedata(textFile){
  str = str + textFile; 
  //once file gets to the end, save
  //clear variable for the next file to be sent in and rewrite old states
  console.log('total string length: '  + str.length)
  if(str.length > 15000){
    fs.writeFile(__dirname + '/../public/posts.json',  str, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
    str = '';
    console.log("the string is now empty: " + str + " <--")
  }
}

usb.on("detach", function () {
  console.log("detach")
  if(Desktop_serial_port.isOpen === true && serial_port.isOpen === true){
    serialport.list(function(err, ports) {
      var count = 0;
      var count1 = 0;
      for (var z = 0; z < ports.length -1; z++) {
        if(ports[z].comName === serial_port.path){
          count = 1;
        }
        else if(ports[z].comName === Desktop_serial_port.path){
          count1 = 1;
        }
      }
      if(count === 0 && count1 === 1){
        serial_port.close();
        console.log('closing controller ports')
        console.log('1testing to see if this works')
        mainWindow.webContents.send('unmounted', 'dead');
      }else if(count1 === 0 && count === 1){
        Desktop_serial_port.close();
        console.log('closing desktop ports')
      }
    })
  }
  else if(serial_port.isOpen !== true){
    console.log('testing to see if this works1')
    mainWindow.webContents.send('unmounted', 'dead');
  }
  else{
    console.log('port is already closed')
  }
})

usb.on('attach', function(){
  serial_port.open(function (err) {
    if (err) {
      return console.log('Error opening port: ', err.message)
    }
  })
  Desktop_serial_port.open(function (err) {
    if (err) {
      return console.log('Error opening port: ', err.message)
    }
  })
  //checking connection with controller
  serialport.list(function(err, ports) {
    ports.forEach(function(port) {
      console.log('port comName: ' + port.comName);
      if(port.manufacturer == "Cypress Semiconductor"){
        console.log('testing to see if this works for open')
        mainWindow.webContents.send('unmounted', 'alive');
      }
    });
  });
});