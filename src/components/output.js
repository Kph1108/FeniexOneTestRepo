/* global $ */
/*eslint-env jquery*/
import React, { Component } from "react";
import "../css/output.css";
import buttonData from '../../public/posts.json';

export class OutputTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: buttonData
    };
  }
  
  render() {  
    const objects = this.state.buttons;
    var stringify = JSON.parse(objects);

////////////////////////////////////NICKS PACKET/////////////////////////////
    var output1 = 100
    //stringify.car.Output.outputCurr1
    var output2 = 100
    //stringify.car.Output.outputCurr2
    var output3 = 100
    //stringify.car.Output.outputCurr3
    var output4 = 100
    //stringify.car.Output.outputCurr4
    var output5 = 100
    //stringify.car.Output.outputCurr5
    var output6 = 100
    //stringify.car.Output.outputCurr6
    var output7 = 100
    //stringify.car.Output.outputCurr7
    var output8 = 100
    //stringify.car.Output.outputCurr8
    var output9 = 100
    //stringify.car.Output.outputCurr9
    var output10 = 100
    //stringify.car.Output.outputCurr10
    var output11 = 100
    //stringify.car.Output.outputCurr11
    var output12 = 100
    //stringify.car.Output.outputCurr12
    var output13 = 100
    //stringify.car.Output.outputCurr13
    var output14 = 100
    //stringify.car.Output.outputCurr14
    var output15 = 100
    //stringify.car.Output.outputCurr15
    var output16 = 100
    //stringify.car.Output.outputCurr16
    var output17 = 100
    //stringify.car.Output.outputCurr17
    var output18 = 100
    //stringify.car.Output.outputCurr18
    var output19 = 100
    //stringify.car.Output.outputCurr19
    var output20 = 100
    //stringify.car.Output.outputCurr20
    var output21 = 100
    //stringify.car.Output.outputCurr21
    var output22 = 100
    //stringify.car.Output.outputCurr22
    var output23 = 100
    //stringify.car.Output.outputCurr23
    var output24 = 100
    //stringify.car.Output.outputCurr24
    var output25 = 100
    //stringify.car.Output.outputCurr25
    var output26 = 100
    //stringify.car.Output.outputCurr26
    var output27 = 100
    //stringify.car.Output.outputCurr27
    var output28 = 100
    //stringify.car.Output.outputCurr28
    var output29 = 100
    //stringify.car.Output.outputCurr29
    var output30 = 100
    //stringify.car.Output.outputCurr30
    var output31 = 100
    //stringify.car.Output.outputCurr31
    var output32 = 100
    //stringify.car.Output.outputCurr32
    
    // information button clicked
    function InfoWindow(e) {
      $("div.info").addClass("show");
      $("div.info").removeClass("hide");
      $("div.home").addClass("hide");
      $("div.home").removeClass("show");
      $("div.info").addClass("move-in-right");
      $("div.output").removeClass("move-in-left");
      $("div.output").removeClass("show");
      $("div.output").addClass("hide");
    }  

    return (
      <div className="output hide">
          <div className="wrapper">
            <p className="outputTitle">Output Percentage</p>
            <table className="output">
              <tbody>
                <tr className="ttable1">
                  <td className="Channels">CH 1:</td>
                  <td className="Channels2">{output1}</td>
                </tr>
                <tr className="ttable2">
                  <td className="Channels">CH 2:</td>
                  <td className="Channels2">{output2}</td>
                </tr>
                <tr className="ttable3">
                  <td className="Channels">CH 3:</td>
                  <td className="Channels2">{output3}</td>
                </tr>
                <tr className="ttable4">
                  <td className="Channels">CH 4:</td>
                  <td className="Channels2">{output4}</td>
                </tr>
                <tr className="ttable5">
                  <td className="Channels">CH 5:</td>
                  <td className="Channels2">{output5}</td>
                </tr>
                <tr className="ttable6">
                  <td className="Channels">CH 6:</td>
                  <td className="Channels2">{output6}</td>
                </tr>
                <tr className="ttable7">
                  <td className="Channels">CH 7:</td>
                  <td className="Channels2">{output7}</td>
                </tr>
                <tr className="ttable8">
                  <td className="Channels">CH 8:</td>
                  <td className="Channels2">{output8}</td>
                </tr>
                <tr className="ttable9">
                  <td className="Channels">CH 9:</td>
                  <td className="Channels2">{output9}</td>
                </tr>
                <tr className="ttable10">
                  <td className="Channels">CH 10:</td>
                  <td className="Channels2">{output10}</td>
                </tr>
                <tr className="ttable11">
                  <td className="Channels">CH 11:</td>
                  <td className="Channels2">{output11}</td>
                </tr>
                <tr className="ttable12">
                  <td className="Channels">CH 12:</td>
                  <td className="Channels2">{output12}</td>
                </tr>
                <tr className="ttable13">
                  <td className="Channels">CH 13:</td>
                  <td className="Channels2">{output13}</td>
                </tr>
                <tr className="ttable14">
                  <td className="Channels">CH 14:</td>
                  <td className="Channels2">{output14}</td>
                </tr>
                <tr className="ttable15">
                  <td className="Channels">CH 15:</td>
                  <td className="Channels2">{output15}</td>
                </tr>
                <tr className="ttable16">
                  <td className="Channels">CH 16:</td>
                  <td className="Channels2">{output16}</td>
                </tr>
                <tr className="ttable17">
                  <td className="Channels">CH 17:</td>
                  <td className="Channels2">{output17}</td>
                </tr>
                <tr className="ttable18">
                  <td className="Channels">CH 18:</td>
                  <td className="Channels2">{output18}</td>
                </tr>
                <tr className="ttable19">
                  <td className="Channels">CH 19:</td>
                  <td className="Channels2">{output19}</td>
                </tr>
                <tr className="ttable20">
                  <td className="Channels">CH 20:</td>
                  <td className="Channels2">{output20}</td>
                </tr>
                <tr className="ttable21">
                  <td className="Channels">CH 21:</td>
                  <td className="Channels2">{output21}</td>
                </tr>
                <tr className="ttable22">
                  <td className="Channels">CH 22:</td>
                  <td className="Channels2">{output22}</td>
                </tr>
                <tr className="ttable23">
                  <td className="Channels">CH 23:</td>
                  <td className="Channels2">{output23}</td>
                </tr>
                <tr className="ttable24">
                  <td className="Channels">CH 24:</td>
                  <td className="Channels2">{output24}</td>
                </tr>
                <tr className="ttable25">
                  <td className="Channels">CH 25:</td>
                  <td className="Channels2">{output25}</td>
                </tr>
                <tr className="ttable26">
                  <td className="Channels">CH 26:</td>
                  <td className="Channels2">{output26}</td>
                </tr>
                <tr className="ttable27">
                  <td className="Channels">CH 27:</td>
                  <td className="Channels2">{output27}</td>
                </tr>
                <tr className="ttable28">
                  <td className="Channels">CH 28:</td>
                  <td className="Channels2">{output28}</td>
                </tr>
                <tr className="ttable29">
                  <td className="Channels">CH 29:</td>
                  <td className="Channels2">{output29}</td>
                </tr>
                <tr className="ttable30">
                  <td className="Channels">CH 30:</td>
                  <td className="Channels2">{output30}</td>
                </tr>
                <tr className="ttable31">
                  <td className="Channels">CH 31:</td>
                  <td className="Channels2">{output31}</td>
                </tr>
                <tr className="ttable32">
                  <td className="Channels">CH 32:</td>
                  <td className="Channels2">{output32}</td>
                </tr>
                </tbody>
            </table>
            <a id="close" onClick={(e) => {InfoWindow()}} className="back1">BACK</a>
          </div>
      </div>
    );
  }
}
