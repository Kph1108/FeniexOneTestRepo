
/*eslint-env jquery*/
import React, { Component } from "react";
import "../css/styles.css";
import buttonData from "../../public/posts.json";
import { InfoTab } from "./../components/info"
import { OutputTab } from "./../components/output";
import { HomeButtons } from "./../components/Home";
const wifi = require(`../images/white-wifi.png`);
const no_wifi = require(`../images/no-wifi.png`);
const {ipcRenderer} = window.require('electron');
var oldSwitch = new Boolean(false);
var oldslideSwitchValues = new Uint8Array(1);

export class FormFeniex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: buttonData,
      imageWifi: no_wifi,
      boot: true
    };
  }
  
  // information button clicked
  InfoWindow() {
    $("div.info").addClass("show");
    $("div.info").removeClass("hide");
    $("div.home").addClass("hide");
    $("div.home").removeClass("show");
    $("div.output").addClass("hide");
    $("div.output").removeClass("show");
  }
  
  componentDidMount(){
    this.setState({boot : false});
    this.testConnection(this);
    ipcRenderer.on('wifi-connection', (event, arg) => { this.handleLoadWifi(event, arg)});
    ipcRenderer.on('asynchronous-serialData', (event, arg) => { this.handleLoadData(event, arg)});
  }

  //Connection status
  test(arg){
    if(arg === undefined || arg === '') {
       return 1;
    } else {
      return 0;
    }
  }

  handleLoadWifi (event, arg) {
    console.log('wifi: ' + arg)
    var wifiIMG = this.test(arg);
    if(wifiIMG === 0){
      console.log("Wifi");
      this.setState({imageWifi : wifi});
    }
    else{
      console.log("No Wifi");
      this.setState({imageWifi : no_wifi});
    }
  }

  handleLoadData(event, arg) {
    // console.log(arg);
    var slideSwitchValues = new Uint8Array(1);
    var on_off = new Boolean(false);
    slideSwitchValues[0] = parseInt(arg[4],10);
    on_off[0] = parseInt(arg[21],3);

    //input switch
    if(oldSwitch[0] !== on_off[0]){
      if(on_off[0] === 0){
        //console.log('switch is off');
      }else{
        //console.log('switch is on');
      }
      ipcRenderer.send('on_off_switch', on_off[0])
    }
    oldSwitch[0] = on_off[0];

    //slide switch
    if(oldslideSwitchValues[0]!== slideSwitchValues[0]){
      if(slideSwitchValues[0] === 0){
        //console.log('slideswitch is off');
      }else if(slideSwitchValues[0] ===2){
        //console.log('slideswitch is MODE1');
      }else if(slideSwitchValues[0] === 1){
        //console.log('slideswitch is MODE2');
      }else if(slideSwitchValues[0] === 4){
        //console.log('slideswitch is MODE3');
      }
      ipcRenderer.send('manualSlideSwitch', slideSwitchValues[0])
    }

    oldslideSwitchValues[0] = slideSwitchValues[0];
    
    if(slideSwitchValues[0] === 0){
      // console.log('this is switch OFF 0');
      $("p.mode1").removeClass("modeON");
      $("p.mode2").removeClass("modeON");
      $("p.mode3").removeClass("modeON");
    }else{
      $("p.mode1").removeClass("modeON");
      $("p.mode2").removeClass("modeON");
      $("p.mode3").removeClass("modeON");
    }
    if(slideSwitchValues[0] === 2){
      // console.log('this is switch 2');
      $("p.mode1").addClass("modeON");
    }else{
      $("p.mode1").removeClass("modeON");
    }
    if(slideSwitchValues[0] === 1){
      // console.log('this is switch 1');
      $("p.mode2").addClass("modeON");
    }else{
      $("p.mode2").removeClass("modeON");
    }
    if(slideSwitchValues[0] === 4){
      // console.log('this is switch 4');
      $("p.mode3").addClass("modeON");
    }else{
      $("p.mode3").removeClass("modeON");
    }
  }
  

  testConnection = (e) => {
    setInterval(function(){
      //parses the states of the buttons
      const objects = e.state.buttons;
      var stringify = JSON.parse(objects);
      var SSID = stringify.WifiSSID;
      var PASS = stringify.WifiPassword;
      console.log('reconnecting wifi');
      console.log(navigator.onLine);
      if(navigator.onLine){
        console.log("testing Wifi icon");
        e.setState({imageWifi : wifi});
      }
      else{
        console.log("testing No Wifi icon");
        e.setState({imageWifi : no_wifi});
      }
      ipcRenderer.send("reconnect-wifi", SSID, PASS);
    }, 5000);
  }

  render() {
    ///////////////////// RENDERER ///////////////////////////////
    const {ipcRenderer} = window.require('electron');
    const batt = require(`../images/battery.png`);
    const info = require(`../images/information.png`);
  

    //parses the states of the buttons
    const objects = this.state.buttons;
    var stringify = JSON.parse(objects);
    var SSID = stringify.WifiSSID;
    var PASS = stringify.WifiPassword;
    
    //opens user space boot
    //var that = this;
    //if(that.state.boot){
      //console.log('boot: ' + that.state.boot)
    //  ipcRenderer.send("open-new-window", "boot", SSID, PASS);
    //  $( document ).ready(function(){
    //    $('body').addClass("black-out");
    //    setTimeout(function(){ 
    //      $('body').removeClass("black-out");
    //     }, 2000);
    //  });
    //}
    
    //Check CO temp
    ////////////////////////////////////NICKS PACKET/////////////////////////////
    //var carbonMonoxide = objects.car.CO;
    var carbonMonoxide = 49;

    // if not okay, change green to red
    if(carbonMonoxide > 50){
      $(document).ready(function(){
        $("p.carbon").addClass('carbonBad');
      })
    }

    ////////////////////////////////////NICKS PACKET/////////////////////////////
    var temp = 90;
    //objects.car.temp
    var battery = 12;
    //objects.car.batteryVoltage
  
    return (
      <div>
        <header className='header'>
          <img className="wifi" id="wifiImage" src={this.state.imageWifi} alt="img" />
          <p className="temp">{temp} {'\u2109'}</p>
          <img className="battery" src={batt} alt="battery" />
          <p className="voltage">{battery} V</p>
          <p className="carbon">CO</p>
          <button type="button" className="info" id="btnEd" onClick={(e) => {this.InfoWindow();}}><img src={info} alt="button" /></button>
        </header>
        <div className="gradent-border"></div>

          <HomeButtons></HomeButtons>
          <InfoTab></InfoTab>
          <OutputTab></OutputTab>

        <footer>
          <p className="mode1">Mode 1</p>
          <p className="mode2">Mode 2</p>
          <p className="mode3">Mode 3</p>
        </footer>
      </div>
    );
  }
}