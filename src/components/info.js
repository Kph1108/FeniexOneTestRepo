
/*eslint-env jquery*/
import React, { Component } from "react";
import "../css/info.css";
import buttonData from '../../public/posts.json';
const {ipcRenderer} = window.require('electron');

export class InfoTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: buttonData,
      tab: 'sys',
      run: true
    };
  }
  componentDidMount(){
    this.setState({run : false});
    ipcRenderer.on('tab-event2', (event, arg) => { this.handleEvent(event, arg)});
  }

  handleEvent (event, arg) {
    if(arg === 'sys'){
      this.setState({tab : 'sys'});
    }
    else{
      this.setState({tab : 'veh'});
    }
  }

  render() {
    const objects = this.state.buttons;
    var stringify = JSON.parse(objects);
    var once = this.state.run;

    // information button clicked
    function OutputWindow(e) {
      $("div.output").addClass("show");
      $("div.output").removeClass("hide");
      $("div.info").addClass("hide");
      $("div.info").removeClass("show");
      $("div.output").addClass("move-in-left");
      $("div.info").removeClass("move-in-right");
    }

    function home(e) {
      $("div.home").addClass("show");
      $("div.home").removeClass("hide");
      $("div.info").addClass("hide");
      $("div.info").removeClass("show");
      $("div.output").removeClass("show");
      $("div.output").addClass("hide");
      $("div.info").removeClass("move-in-right");
    }  

    //gets document render on page load
    $(document).ready(function () {
      if(document.getElementById('btnSI').clicked === true){
          $("#btnSI").trigger('click');
        }else if(document.getElementById('btnVI').clicked === true){
          $("#btnVI").trigger('click');
        }
    });

    //on page load have the left hand side tab clicked
    if(once){
      $( document ).ready(function(){
        $("#btnSI").trigger('click');
        //history.go(0);
      });
    }

    //System Inforamtion tab
    function sysInfo(e) {
      $('table#sysInfo').css({
        'display': 'table',
      });
      $('table#vehInfo').css({
        'display': 'none',
      });
      $('button.sysInfo').css({
        'color': '#00ffce',
        'background-color': '#2a363e',
        'padding-top': '10px',
        'padding-bottom': '5px',
      });
      $('button.vehInfo').css({
        'color': 'white',
        'background-color': 'transparent',
        'top': '-26px',
        'padding-top': 'unset',
        'margin-bottom': '-12px',
      });
      $('div.help').css({
        'height': '145%',
      });
      $('a.back').css({
        'margin-top': '50px',
      });
      $('#btnSI').addClass('one');
      $('#btnSI').removeClass('two');
      ipcRenderer.send('switch_tabs', 'sys')
    }

    //Vehical Inforamtion tab
    function vehInfo(e) {
      $('table#vehInfo').css({
        'display': 'table',
      });
      $('table#sysInfo').css({
        'display': 'none',
      });
      $('div.help').css({
        'height': '85%',
      });
      $('a.back').css({
        'margin-top': 'unset',
      });
      $('button.vehInfo').css({
        'color': '#00ffce',
        'background-color': '#2a363e',
        'padding': '9px 5px 6px 1px',
        'top': '-35px',
        'margin-bottom': '-22px',
        'right': '-167px',
      });
      $('button.sysInfo').css({
        'color': 'white',
        'background-color': 'transparent',
      });
      $('#btnSI').addClass('two');
      $('#btnSI').removeClass('one');
      ipcRenderer.send('switch_tabs', 'veh')
    }

    ////////////////////////////////////NICKS PACKET/////////////////////////////
    //objects.car.SYSrelayVoltage
    //objects.car.SYSrelayCurrent
    //objects.car.SYSSoftwareVersion
    //objects.car.SYSFirmwareVersion
    //objects.car.SYSTotalSystemHours
    var testing111 = 13

    //objects.car.VEHrelayVoltage
    //objects.car.VEHrelayCurrent
    var testing222 = 14

    
    return (
      <div className="info hide">
        <div className="help">
        <button type="button" className="sysInfo" id="btnSI" onClick={(e) => {sysInfo()}}>SYSTEM INFORMATION</button>
        <button type="button" className="vehInfo" id="btnVI" onClick={(e) => {vehInfo()}}>VEHICAL INFORMATION</button>
        <div className="scroll1">
            <table id="sysInfo">
              <tbody>
                <tr className="table2">
                    <td className="RV">Relay Voltage</td>
                    <td className="RV2">{testing111}</td>
                </tr>
                <tr className="table3">
                    <td className="RC">Relay Current</td>
                    <td className="RC2">{testing111}</td>
                </tr>
                <tr className="table4">
                    <td className="SV">Software Version</td>
                    <td className="SV2">{testing111}</td>
                </tr>
                <tr className="table5">
                    <td className="FV">Firmware Version</td>
                    <td className="FV2">{testing111}</td>
                </tr>
                <tr className="table6">
                    <td className="TSH">Total System Hours</td>
                    <td className="TSH2">{testing111} H</td>
                </tr>
                <tr className="table1" id="btnCurrOutput">
                    <th className="th">
                      <button type="button" className="currOutput" onClick={(e) => {OutputWindow()}}>Current Outputs</button>
                      <button type="button" className="currOutput2" onClick={(e) => {OutputWindow()}}>></button>
                    </th>
                </tr>
              </tbody>
            </table>
        </div>
        <div className="scroll2">
            <table id="vehInfo">
              <tbody>
                <tr className="table2">
                    <td className="RV">Relay Voltage</td>
                    <td className="RV2">{testing222}</td>
                </tr>
                <tr className="table3">
                    <td className="RC">Relay Current</td>
                    <td className="RC2">{testing222}</td>
                </tr>
              </tbody>
            </table>
        </div>
          <a id="close" onClick={(e) => {home()}} className="back">BACK</a>
        </div>
      </div>
    );
  }
}
