
/*eslint-env jquery*/
import React, { Component } from "react";
import "../css/styles.css";
import buttonData from '../../public/posts.json';
import { CONCURRENCY } from "builder-util/out/fs";
const {ipcRenderer} = window.require('electron');

var myVar = {};
var myVar2 = {};
var myVar3 = {};
var myVar4 = {};
var myVar5 = {};
var myVar6 = {};
var sendLeds = [];

var count = 0;
var count1 = 0;
var count2 = 0;

var buttonState = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, 
  false, false, false, false, false];

var number = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,];


var oldButtonPressValues = new Uint8Array(1);
var oldButtonPressValues1 = new Uint8Array(1);
var oldButton = new Uint8Array(1);
var oldButton1 = new Uint8Array(1);

var beepState = false;

export class HomeButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: buttonData
    };
  }

  componentDidMount(){
    ipcRenderer.on('asynchronous-serialData', (event, arg) => { this.handleButtonData(event, arg)});
    ipcRenderer.on('unmounted', (event, arg) => { this.isConnected(event, arg)});
    this.backgroundColors(this);
  }

  isConnected(event, arg){
    setInterval(function(){
      var data = 0;
      if(arg === 'dead'){
        data = 68
      }else{
        data = 76
      }
      ipcRenderer.send('unmount', data)
    }, 1000);
  }

  handleButtonData(event, arg) {
    //console.log(arg);
    const objects = this.state.buttons;
    var stringify = JSON.parse(objects);
    var buttonValues = new Uint8Array(1);
    var buttonValues1 = new Uint8Array(1);
    
    buttonValues[0] = parseInt(arg[2],10);
    buttonValues1[0] = parseInt(arg[3],10);

    //button pressed
    if(buttonValues1[0] === 254){
      console.log('button 1 is pressed')
      beepState = true;
      //gets the specific buttons information from object
      var seconds1btn1 = stringify.buttonOutputSettings[0].ButtonTimerValue;
      var moment1= stringify.buttonOutputSettings[0].ButtonType;
      if(number[0] === 0){
        number[0] = 1;
        if(moment1=== "OnOff"){
          this.changeState("0", "0");
        }
        else if(moment1 === 'Momentary'){
          ////////////////////////////change according to the lightbar sceme //////////////////////
          var checkLightbarbtn1 = stringify.buttonOutputSettings[0].LightBar;
          if((checkLightbarbtn1[0] === 0) && (checkLightbarbtn1[1] === 0) && (checkLightbarbtn1[2] === 1)){
            $('.circle').addClass('random');
          }
          else if((checkLightbarbtn1[0] === 1) && (checkLightbarbtn1[1] === 1) && (checkLightbarbtn1[2] === 0)){
            $('.circle').addClass('middle-out');
          }
          else if((checkLightbarbtn1[0] === 0) && (checkLightbarbtn1[1] === 1) && (checkLightbarbtn1[2] === 0)){
            $(".circle").addClass("right-left");
            //every 10 seconds add a class
            myVar4 = setTimeout(function () {
              $(".circle").removeClass("right-left");
            }, 8900);
            myVar5 = setInterval(function () {
              $(".circle").addClass("right-left");
              //every 9 seconds remove class
              myVar6 = setTimeout(function () {
                $(".circle").removeClass("right-left");
              }, 8900);
            }, 9000);
          }
          else if((checkLightbarbtn1[0] === 1) && (checkLightbarbtn1[1] === 0) && (checkLightbarbtn1[2] === 0)){
            $(".circle").addClass("left-right");
            //every 10 seconds add a class
            myVar = setTimeout(function () {
              $(".circle").removeClass("left-right");
            }, 8900);
            myVar2 = setInterval(function () {
              $(".circle").addClass("left-right");
              //every 9 seconds remove class
              myVar3 = setTimeout(function () {
                $(".circle").removeClass("left-right");
              }, 8900);
            }, 9000);
          }
          this.changeState("0", "0");
        }
        else if(seconds1btn1 !== '0'){
          number[0] = 1;
          var time1btn1 = seconds1btn1 + 100;
          this.changeState("0", time1btn1);
        }
      }
      else if(number[0] === 3){
        number[0] = 4;
      }
      oldButton1[0] = buttonValues1[0];
    }
    //button 2
    else if(buttonValues1[0] === 253){
      console.log('button 2 is pressed')
      beepState = true;
      //gets the specific buttons information from object
      var seconds1btn2 = stringify.buttonOutputSettings[1].ButtonTimerValue;
      var moment2= stringify.buttonOutputSettings[1].ButtonType;
      if(number[1] === 0){
        number[1] = 1;
        if(moment2=== "OnOff"){
          this.changeState("1", "0");
        }
        else if(moment2 === 'Momentary'){
          var checkLightbarbtn2 = stringify.buttonOutputSettings[1].LightBar;
          if((checkLightbarbtn2[0] === 0) && (checkLightbarbtn2[1] === 0) && (checkLightbarbtn2[2] === 1)){
            $('.circle').addClass('random');
          }
          else if((checkLightbarbtn2[0] === 1) && (checkLightbarbtn2[1] === 1) && (checkLightbarbtn2[2] === 0)){
            $('.circle').addClass('middle-out');
          }
          else if((checkLightbarbtn2[0] === 0) && (checkLightbarbtn2[1] === 1) && (checkLightbarbtn2[2] === 0)){
            $(".circle").addClass("right-left");
            //every 10 seconds add a class
            myVar4 = setTimeout(function () {
              $(".circle").removeClass("right-left");
            }, 8900);
            myVar5 = setInterval(function () {
              $(".circle").addClass("right-left");
              //every 9 seconds remove class
              myVar6 = setTimeout(function () {
                $(".circle").removeClass("right-left");
              }, 8900);
            }, 9000);
          }
          else if((checkLightbarbtn2[0] === 1) && (checkLightbarbtn2[1] === 0) && (checkLightbarbtn2[2] === 0)){
            $(".circle").addClass("left-right");
            //every 10 seconds add a class
            myVar = setTimeout(function () {
              $(".circle").removeClass("left-right");
            }, 8900);
            myVar2 = setInterval(function () {
              $(".circle").addClass("left-right");
              //every 9 seconds remove class
              myVar3 = setTimeout(function () {
                $(".circle").removeClass("left-right");
              }, 8900);
            }, 9000);
          }
          this.changeState("1", "0");
        }
        else if(seconds1btn2 !== '0'){
          number[1] = 1;
          var time1btn2 = seconds1btn2 + 100;
          this.changeState("1", time1btn2);
        }
      }
      else if(number[1] === 3){
        number[1] = 4;
      }
      oldButton1[0] = buttonValues1[0];
    }
    //button 3
    else if(buttonValues1[0] === 251){
      console.log('button 3 is pressed')
      beepState = true;
      //gets the specific buttons information from object
      var seconds1btn3 = stringify.buttonOutputSettings[2].ButtonTimerValue;
      var moment3= stringify.buttonOutputSettings[2].ButtonType;
      if(number[2] === 0){
        number[2] = 1;
        if(moment3 === "OnOff"){
          this.changeState("2", "0");
        }
        else if(moment3 === 'Momentary'){
          var checkLightbarbtn3 = stringify.buttonOutputSettings[2].LightBar;
          if((checkLightbarbtn3[0] === 0) && (checkLightbarbtn3[1] === 0) && (checkLightbarbtn3[2] === 1)){
            $('.circle').addClass('random');
          }
          else if((checkLightbarbtn3[0] === 1) && (checkLightbarbtn3[1] === 1) && (checkLightbarbtn3[2] === 0)){
            $('.circle').addClass('middle-out');
          }
          else if((checkLightbarbtn3[0] === 0) && (checkLightbarbtn3[1] === 1) && (checkLightbarbtn3[2] === 0)){
            $(".circle").addClass("right-left");
            //every 10 seconds add a class
            myVar4 = setTimeout(function () {
              $(".circle").removeClass("right-left");
            }, 8900);
            myVar5 = setInterval(function () {
              $(".circle").addClass("right-left");
              //every 9 seconds remove class
              myVar6 = setTimeout(function () {
                $(".circle").removeClass("right-left");
              }, 8900);
            }, 9000);
          }
          else if((checkLightbarbtn3[0] === 1) && (checkLightbarbtn3[1] === 0) && (checkLightbarbtn3[2] === 0)){
            $(".circle").addClass("left-right");
            //every 10 seconds add a class
            myVar = setTimeout(function () {
              $(".circle").removeClass("left-right");
            }, 8900);
            myVar2 = setInterval(function () {
              $(".circle").addClass("left-right");
              //every 9 seconds remove class
              myVar3 = setTimeout(function () {
                $(".circle").removeClass("left-right");
              }, 8900);
            }, 9000);
          }
          this.changeState("2", "0");
        }
        else if(seconds1btn3 !== '0'){
          number[2] = 1;
          var time1btn3 = seconds1btn3 + 100;
          this.changeState("2", time1btn3);
        }
      }
      else if(number[2] === 3){
        number[2] = 4;
      }
      oldButton1[0] = buttonValues1[0];
    }
    //button 4
    else if(buttonValues1[0] === 247){
      beepState = true;
      console.log('button 4 is pressed')
      //gets the specific buttons information from object
      var seconds1btn4 = stringify.buttonOutputSettings[3].ButtonTimerValue;
      var moment4= stringify.buttonOutputSettings[3].ButtonType;
      if(number[3] === 0){
        number[3] = 1;
        if(moment4 === "OnOff"){
          this.changeState("3", "0");
        }
        else if(moment4 === 'Momentary'){
          var checkLightbarbtn4 = stringify.buttonOutputSettings[3].LightBar;
          if((checkLightbarbtn4[0] === 0) && (checkLightbarbtn4[1] === 0) && (checkLightbarbtn4[2] === 1)){
            $('.circle').addClass('random');
          }
          else if((checkLightbarbtn4[0] === 1) && (checkLightbarbtn4[1] === 1) && (checkLightbarbtn4[2] === 0)){
            $('.circle').addClass('middle-out');
          }
          else if((checkLightbarbtn4[0] === 0) && (checkLightbarbtn4[1] === 1) && (checkLightbarbtn4[2] === 0)){
            $(".circle").addClass("right-left");
            //every 10 seconds add a class
            myVar4 = setTimeout(function () {
              $(".circle").removeClass("right-left");
            }, 8900);
            myVar5 = setInterval(function () {
              $(".circle").addClass("right-left");
              //every 9 seconds remove class
              myVar6 = setTimeout(function () {
                $(".circle").removeClass("right-left");
              }, 8900);
            }, 9000);
          }
          else if((checkLightbarbtn4[0] === 1) && (checkLightbarbtn4[1] === 0) && (checkLightbarbtn4[2] === 0)){
            $(".circle").addClass("left-right");
            //every 10 seconds add a class
            myVar = setTimeout(function () {
              $(".circle").removeClass("left-right");
            }, 8900);
            myVar2 = setInterval(function () {
              $(".circle").addClass("left-right");
              //every 9 seconds remove class
              myVar3 = setTimeout(function () {
                $(".circle").removeClass("left-right");
              }, 8900);
            }, 9000);
          }
          this.changeState("3", "0");
        }
        else if(seconds1btn4 !== '0'){
          number[3] = 1;
          var time1btn4 = seconds1btn4 + 100;
          this.changeState("3", time1btn4);
        }
      }
      else if(number[3] === 3){
        number[3] = 4;
      }
      oldButton1[0] = buttonValues1[0];
    }
    //button 5
    else if(buttonValues1[0] === 239){
      beepState = true;
      console.log('button 5 is pressed')
      //gets the specific buttons information from object
      var seconds1btn5 = stringify.buttonOutputSettings[4].ButtonTimerValue;
      var moment5= stringify.buttonOutputSettings[4].ButtonType;
      if(number[4] === 0){
        number[4] = 1;
        if(moment5 === "OnOff"){
          this.changeState("4", "0");
        }
        else if(moment5 === 'Momentary'){
          var checkLightbarbtn5 = stringify.buttonOutputSettings[4].LightBar;
          if((checkLightbarbtn5[0] === 0) && (checkLightbarbtn5[1] === 0) && (checkLightbarbtn5[2] === 1)){
            $('.circle').addClass('random');
          }
          else if((checkLightbarbtn5[0] === 1) && (checkLightbarbtn5[1] === 1) && (checkLightbarbtn5[2] === 0)){
            $('.circle').addClass('middle-out');
          }
          else if((checkLightbarbtn5[0] === 0) && (checkLightbarbtn5[1] === 1) && (checkLightbarbtn5[2] === 0)){
            $(".circle").addClass("right-left");
            //every 10 seconds add a class
            myVar4 = setTimeout(function () {
              $(".circle").removeClass("right-left");
            }, 8900);
            myVar5 = setInterval(function () {
              $(".circle").addClass("right-left");
              //every 9 seconds remove class
              myVar6 = setTimeout(function () {
                $(".circle").removeClass("right-left");
              }, 8900);
            }, 9000);
          }
          else if((checkLightbarbtn5[0] === 1) && (checkLightbarbtn5[1] === 0) && (checkLightbarbtn5[2] === 0)){
            $(".circle").addClass("left-right");
            //every 10 seconds add a class
            myVar = setTimeout(function () {
              $(".circle").removeClass("left-right");
            }, 8900);
            myVar2 = setInterval(function () {
              $(".circle").addClass("left-right");
              //every 9 seconds remove class
              myVar3 = setTimeout(function () {
                $(".circle").removeClass("left-right");
              }, 8900);
            }, 9000);
          }
          this.changeState("4", "0");
        }
        else if(seconds1btn5 !== '0'){
          number[4] = 1;
          var time1btn5 = seconds1btn5 + 100;
          this.changeState("4", time1btn5);
        }
      }
      else if(number[4] === 3){
        number[4] = 4;
      }
      oldButton1[0] = buttonValues1[0];
    }
    //button 6
    else if(buttonValues1[0] === 223){
      beepState = true;
      console.log('button 6 is pressed')
      //gets the specific buttons information from object
      var seconds1btn6 = stringify.buttonOutputSettings[5].ButtonTimerValue;
      var moment6= stringify.buttonOutputSettings[5].ButtonType;
      if(number[5] === 0){
        number[5] = 1;
        if(moment6 === "OnOff"){
          this.changeState("5", "0");
        }
        else if(moment6 === 'Momentary'){
          var checkLightbarbtn6 = stringify.buttonOutputSettings[5].LightBar;
          if((checkLightbarbtn6[0] === 0) && (checkLightbarbtn6[1] === 0) && (checkLightbarbtn6[2] === 1)){
            $('.circle').addClass('random');
          }
          else if((checkLightbarbtn6[0] === 1) && (checkLightbarbtn6[1] === 1) && (checkLightbarbtn6[2] === 0)){
            $('.circle').addClass('middle-out');
          }
          else if((checkLightbarbtn6[0] === 0) && (checkLightbarbtn6[1] === 1) && (checkLightbarbtn6[2] === 0)){
            $(".circle").addClass("right-left");
            //every 10 seconds add a class
            myVar4 = setTimeout(function () {
              $(".circle").removeClass("right-left");
            }, 8900);
            myVar5 = setInterval(function () {
              $(".circle").addClass("right-left");
              //every 9 seconds remove class
              myVar6 = setTimeout(function () {
                $(".circle").removeClass("right-left");
              }, 8900);
            }, 9000);
          }
          else if((checkLightbarbtn6[0] === 1) && (checkLightbarbtn6[1] === 0) && (checkLightbarbtn6[2] === 0)){
            $(".circle").addClass("left-right");
            //every 10 seconds add a class
            myVar = setTimeout(function () {
              $(".circle").removeClass("left-right");
            }, 8900);
            myVar2 = setInterval(function () {
              $(".circle").addClass("left-right");
              //every 9 seconds remove class
              myVar3 = setTimeout(function () {
                $(".circle").removeClass("left-right");
              }, 8900);
            }, 9000);
          }
          this.changeState("5", "0");
        }
        else if(seconds1btn6 !== '0'){
          number[5] = 1;
          var time1btn6 = seconds1btn6 + 100;
          this.changeState("5", time1btn6);
        }
      }
      else if(number[5] === 3){
        number[5] = 4;
      }
      oldButton1[0] = buttonValues1[0];
    }
    //button 7
    else if(buttonValues1[0] === 191){
      beepState = true;
      console.log('button 7 is pressed')
      //gets the specific buttons information from object
      var seconds1btn7 = stringify.buttonOutputSettings[6].ButtonTimerValue;
      var moment7= stringify.buttonOutputSettings[6].ButtonType;
      if(number[6] === 0){
        number[6] = 1;
        if(moment7 === "OnOff"){
          this.changeState("6", "0");
        }
        else if(moment7 === 'Momentary'){
          var checkLightbarbtn7 = stringify.buttonOutputSettings[6].LightBar;
          if((checkLightbarbtn7[0] === 0) && (checkLightbarbtn7[1] === 0) && (checkLightbarbtn7[2] === 1)){
            $('.circle').addClass('random');
          }
          else if((checkLightbarbtn7[0] === 1) && (checkLightbarbtn7[1] === 1) && (checkLightbarbtn7[2] === 0)){
            $('.circle').addClass('middle-out');
          }
          else if((checkLightbarbtn7[0] === 0) && (checkLightbarbtn7[1] === 1) && (checkLightbarbtn7[2] === 0)){
            $(".circle").addClass("right-left");
            //every 10 seconds add a class
            myVar4 = setTimeout(function () {
              $(".circle").removeClass("right-left");
            }, 8900);
            myVar5 = setInterval(function () {
              $(".circle").addClass("right-left");
              //every 9 seconds remove class
              myVar6 = setTimeout(function () {
                $(".circle").removeClass("right-left");
              }, 8900);
            }, 9000);
          }
          else if((checkLightbarbtn7[0] === 1) && (checkLightbarbtn7[1] === 0) && (checkLightbarbtn7[2] === 0)){
            $(".circle").addClass("left-right");
            //every 10 seconds add a class
            myVar = setTimeout(function () {
              $(".circle").removeClass("left-right");
            }, 8900);
            myVar2 = setInterval(function () {
              $(".circle").addClass("left-right");
              //every 9 seconds remove class
              myVar3 = setTimeout(function () {
                $(".circle").removeClass("left-right");
              }, 8900);
            }, 9000);
          }
          this.changeState("6", "0");
        }
        else if(seconds1btn7 !== '0'){
          number[6] = 1;
          var time1btn7 = seconds1btn7 + 100;
          this.changeState("6", time1btn7);
        }
      }
      else if(number[6] === 3){
        number[6] = 4;
      }
      oldButton1[0] = buttonValues1[0];
    }
    //button 8
    else if(buttonValues1[0] === 127){
      beepState = true;
      console.log('button 8 is pressed')
      //gets the specific buttons information from object
      var seconds1btn8 = stringify.buttonOutputSettings[7].ButtonTimerValue;
      var moment8= stringify.buttonOutputSettings[7].ButtonType;
      if(number[7] === 0){
        number[7] = 1;
        if(moment8 === "OnOff"){
          this.changeState("7", "0");
        }
        else if(moment8 === 'Momentary'){
          var checkLightbarbtn8 = stringify.buttonOutputSettings[7].LightBar;
          if((checkLightbarbtn8[0] === 0) && (checkLightbarbtn8[1] === 0) && (checkLightbarbtn8[2] === 1)){
            $('.circle').addClass('random');
          }
          else if((checkLightbarbtn8[0] === 1) && (checkLightbarbtn8[1] === 1) && (checkLightbarbtn8[2] === 0)){
            $('.circle').addClass('middle-out');
          }
          else if((checkLightbarbtn8[0] === 0) && (checkLightbarbtn8[1] === 1) && (checkLightbarbtn8[2] === 0)){
            $(".circle").addClass("right-left");
            //every 10 seconds add a class
            myVar4 = setTimeout(function () {
              $(".circle").removeClass("right-left");
            }, 8900);
            myVar5 = setInterval(function () {
              $(".circle").addClass("right-left");
              //every 9 seconds remove class
              myVar6 = setTimeout(function () {
                $(".circle").removeClass("right-left");
              }, 8900);
            }, 9000);
          }
          else if((checkLightbarbtn8[0] === 1) && (checkLightbarbtn8[1] === 0) && (checkLightbarbtn8[2] === 0)){
            $(".circle").addClass("left-right");
            //every 10 seconds add a class
            myVar = setTimeout(function () {
              $(".circle").removeClass("left-right");
            }, 8900);
            myVar2 = setInterval(function () {
              $(".circle").addClass("left-right");
              //every 9 seconds remove class
              myVar3 = setTimeout(function () {
                $(".circle").removeClass("left-right");
              }, 8900);
            }, 9000);
          }
          this.changeState("7", "0");
        }
        else if(seconds1btn8 !== '0'){
          number[7] = 1;
          var time1btn8 = seconds1btn8 + 100;
          this.changeState("7", time1btn8);
        }
      }
      else if(number[7] === 3){
        number[7] = 4;
      }
      oldButton1[0] = buttonValues1[0];
    }
    //button 9
    else if(buttonValues[0] === 254){
      beepState = true;
      console.log('button 9 is pressed')
      //gets the specific buttons information from object
      var seconds1btn9 = stringify.buttonOutputSettings[8].ButtonTimerValue;
      var moment9= stringify.buttonOutputSettings[8].ButtonType;
      if(number[8] === 0){
        number[8] = 1;
        if(moment9 === "OnOff"){
          this.changeState("8", "0");
        }
        else if(moment9 === 'Momentary'){
          var checkLightbarbtn9 = stringify.buttonOutputSettings[8].LightBar;
          if((checkLightbarbtn9[0] === 0) && (checkLightbarbtn9[1] === 0) && (checkLightbarbtn9[2] === 1)){
            $('.circle').addClass('random');
          }
          else if((checkLightbarbtn9[0] === 1) && (checkLightbarbtn9[1] === 1) && (checkLightbarbtn9[2] === 0)){
            $('.circle').addClass('middle-out');
          }
          else if((checkLightbarbtn9[0] === 0) && (checkLightbarbtn9[1] === 1) && (checkLightbarbtn9[2] === 0)){
            $(".circle").addClass("right-left");
            //every 10 seconds add a class
            myVar4 = setTimeout(function () {
              $(".circle").removeClass("right-left");
            }, 8900);
            myVar5 = setInterval(function () {
              $(".circle").addClass("right-left");
              //every 9 seconds remove class
              myVar6 = setTimeout(function () {
                $(".circle").removeClass("right-left");
              }, 8900);
            }, 9000);
          }
          else if((checkLightbarbtn9[0] === 1) && (checkLightbarbtn9[1] === 0) && (checkLightbarbtn9[2] === 0)){
            $(".circle").addClass("left-right");
            //every 10 seconds add a class
            myVar = setTimeout(function () {
              $(".circle").removeClass("left-right");
            }, 8900);
            myVar2 = setInterval(function () {
              $(".circle").addClass("left-right");
              //every 9 seconds remove class
              myVar3 = setTimeout(function () {
                $(".circle").removeClass("left-right");
              }, 8900);
            }, 9000);
          }
          this.changeState("8", "0");
        }
        else if(seconds1btn9 !== '0'){
          number[8] = 1;
          var time1btn9 = seconds1btn9 + 100;
          this.changeState("8", time1btn9);
        }
      }
      else if(number[8] === 3){
        number[8] = 4;
      }
      oldButton[0] = buttonValues[0];
    }
    //button 10
    else if(buttonValues[0] === 253){
      beepState = true;
      console.log('button 10 is pressed')
      //gets the specific buttons information from object
      var seconds1btn10 = stringify.buttonOutputSettings[9].ButtonTimerValue;
      var moment10= stringify.buttonOutputSettings[9].ButtonType;
      if(number[9] === 0){
        number[9] = 1;
        if(moment10 === "OnOff"){
          this.changeState("9", "0");
        }
        else if(moment10 === 'Momentary'){
          var checkLightbarbtn20 = stringify.buttonOutputSettings[9].LightBar;
          if((checkLightbarbtn20[0] === 0) && (checkLightbarbtn20[1] === 0) && (checkLightbarbtn20[2] === 1)){
            $('.circle').addClass('random');
          }
          else if((checkLightbarbtn20[0] === 1) && (checkLightbarbtn20[1] === 1) && (checkLightbarbtn20[2] === 0)){
            $('.circle').addClass('middle-out');
          }
          else if((checkLightbarbtn20[0] === 0) && (checkLightbarbtn20[1] === 1) && (checkLightbarbtn20[2] === 0)){
            $(".circle").addClass("right-left");
            //every 10 seconds add a class
            myVar4 = setTimeout(function () {
              $(".circle").removeClass("right-left");
            }, 8900);
            myVar5 = setInterval(function () {
              $(".circle").addClass("right-left");
              //every 9 seconds remove class
              myVar6 = setTimeout(function () {
                $(".circle").removeClass("right-left");
              }, 8900);
            }, 9000);
          }
          else if((checkLightbarbtn20[0] === 1) && (checkLightbarbtn20[1] === 0) && (checkLightbarbtn20[2] === 0)){
            $(".circle").addClass("left-right");
            //every 10 seconds add a class
            myVar = setTimeout(function () {
              $(".circle").removeClass("left-right");
            }, 8900);
            myVar2 = setInterval(function () {
              $(".circle").addClass("left-right");
              //every 9 seconds remove class
              myVar3 = setTimeout(function () {
                $(".circle").removeClass("left-right");
              }, 8900);
            }, 9000);
          }
          this.changeState("9", "0");
        }
        else if(seconds1btn10 !== '0'){
          number[9] = 1;
          var time1btn10 = seconds1btn10 + 100;
          this.changeState("9", time1btn10);
        }
      }
      else if(number[9] === 3){
        number[9] = 4;
      }
      oldButton[0] = buttonValues[0];
    }
    //button 11
    else if(buttonValues[0] === 251 ){
      beepState = true;
      console.log('button 11 is pressed')
      //gets the specific buttons information from object
      var seconds1btn11 = stringify.buttonOutputSettings[10].ButtonTimerValue;
      var moment11= stringify.buttonOutputSettings[10].ButtonType;
      if(number[10] === 0){
        number[10] = 1;
        if(moment11 === "OnOff"){
          this.changeState("10", "0");
        }
        else if(moment11 === 'Momentary'){
          var checkLightbarbtn21 = stringify.buttonOutputSettings[10].LightBar;
          if((checkLightbarbtn21[0] === 0) && (checkLightbarbtn21[1] === 0) && (checkLightbarbtn21[2] === 1)){
            $('.circle').addClass('random');
          }
          else if((checkLightbarbtn21[0] === 1) && (checkLightbarbtn21[1] === 1) && (checkLightbarbtn21[2] === 0)){
            $('.circle').addClass('middle-out');
          }
          else if((checkLightbarbtn21[0] === 0) && (checkLightbarbtn21[1] === 1) && (checkLightbarbtn21[2] === 0)){
            $(".circle").addClass("right-left");
            //every 10 seconds add a class
            myVar4 = setTimeout(function () {
              $(".circle").removeClass("right-left");
            }, 8900);
            myVar5 = setInterval(function () {
              $(".circle").addClass("right-left");
              //every 9 seconds remove class
              myVar6 = setTimeout(function () {
                $(".circle").removeClass("right-left");
              }, 8900);
            }, 9000);
          }
          else if((checkLightbarbtn21[0] === 1) && (checkLightbarbtn21[1] === 0) && (checkLightbarbtn21[2] === 0)){
            $(".circle").addClass("left-right");
            //every 10 seconds add a class
            myVar = setTimeout(function () {
              $(".circle").removeClass("left-right");
            }, 8900);
            myVar2 = setInterval(function () {
              $(".circle").addClass("left-right");
              //every 9 seconds remove class
              myVar3 = setTimeout(function () {
                $(".circle").removeClass("left-right");
              }, 8900);
            }, 9000);
          }
          this.changeState("10", "0");
        }
        else if(seconds1btn11 !== '0'){
          number[10] = 1;
          var time1btn11 = seconds1btn11 + 100;
          this.changeState("10", time1btn11);
        }
      }
      else if(number[10] === 3){
        number[10] = 4;
      }
      oldButton[0] = buttonValues[0];
    }
    //button 12
    else if(buttonValues[0] === 247){
      beepState = true;
      console.log('button 12 is pressed')
      //gets the specific buttons information from object
      var seconds1btn12 = stringify.buttonOutputSettings[11].ButtonTimerValue;
      var moment12= stringify.buttonOutputSettings[11].ButtonType;
      if(number[11] === 0){
        number[11] = 1;
        if(moment12 === "OnOff"){
          this.changeState("11", "0");
        }
        else if(moment12 === 'Momentary'){
          var checkLightbarbtn12 = stringify.buttonOutputSettings[11].LightBar;
          if((checkLightbarbtn12[0] === 0) && (checkLightbarbtn12[1] === 0) && (checkLightbarbtn12[2] === 1)){
            $('.circle').addClass('random');
          }
          else if((checkLightbarbtn12[0] === 1) && (checkLightbarbtn12[1] === 1) && (checkLightbarbtn12[2] === 0)){
            $('.circle').addClass('middle-out');
          }
          else if((checkLightbarbtn12[0] === 0) && (checkLightbarbtn12[1] === 1) && (checkLightbarbtn12[2] === 0)){
            $(".circle").addClass("right-left");
            //every 10 seconds add a class
            myVar4 = setTimeout(function () {
              $(".circle").removeClass("right-left");
            }, 8900);
            myVar5 = setInterval(function () {
              $(".circle").addClass("right-left");
              //every 9 seconds remove class
              myVar6 = setTimeout(function () {
                $(".circle").removeClass("right-left");
              }, 8900);
            }, 9000);
          }
          else if((checkLightbarbtn12[0] === 1) && (checkLightbarbtn12[1] === 0) && (checkLightbarbtn12[2] === 0)){
            $(".circle").addClass("left-right");
            //every 10 seconds add a class
            myVar = setTimeout(function () {
              $(".circle").removeClass("left-right");
            }, 8900);
            myVar2 = setInterval(function () {
              $(".circle").addClass("left-right");
              //every 9 seconds remove class
              myVar3 = setTimeout(function () {
                $(".circle").removeClass("left-right");
              }, 8900);
            }, 9000);
          }
          this.changeState("11", "0");
        }
        else if(seconds1btn12 !== '0'){
          number[11] = 1;
          var time1btn12 = seconds1btn12 + 100;
          this.changeState("11", time1btn12);
        }
      }
      else if(number[11] === 3){
        number[11] = 4;
      }
      oldButton[0] = buttonValues[0];
    }
    //button 13
    else if(buttonValues[0] === 239){
      beepState = true;
      console.log('button 13 is pressed')
      //gets the specific buttons information from object
      var seconds1btn13 = stringify.buttonOutputSettings[12].ButtonTimerValue;
      var moment13= stringify.buttonOutputSettings[12].ButtonType;
      if(number[12] === 0){
        number[12] = 1;
        if(moment13 === "OnOff"){
          this.changeState("12", "0");
        }
        else if(moment13 === 'Momentary'){
          var checkLightbarbtn13 = stringify.buttonOutputSettings[12].LightBar;
          if((checkLightbarbtn13[0] === 0) && (checkLightbarbtn13[1] === 0) && (checkLightbarbtn13[2] === 1)){
            $('.circle').addClass('random');
          }
          else if((checkLightbarbtn13[0] === 1) && (checkLightbarbtn13[1] === 1) && (checkLightbarbtn13[2] === 0)){
            $('.circle').addClass('middle-out');
          }
          else if((checkLightbarbtn13[0] === 0) && (checkLightbarbtn13[1] === 1) && (checkLightbarbtn13[2] === 0)){
            $(".circle").addClass("right-left");
            //every 10 seconds add a class
            myVar4 = setTimeout(function () {
              $(".circle").removeClass("right-left");
            }, 8900);
            myVar5 = setInterval(function () {
              $(".circle").addClass("right-left");
              //every 9 seconds remove class
              myVar6 = setTimeout(function () {
                $(".circle").removeClass("right-left");
              }, 8900);
            }, 9000);
          }
          else if((checkLightbarbtn13[0] === 1) && (checkLightbarbtn13[1] === 0) && (checkLightbarbtn13[2] === 0)){
            $(".circle").addClass("left-right");
            //every 10 seconds add a class
            myVar = setTimeout(function () {
              $(".circle").removeClass("left-right");
            }, 8900);
            myVar2 = setInterval(function () {
              $(".circle").addClass("left-right");
              //every 9 seconds remove class
              myVar3 = setTimeout(function () {
                $(".circle").removeClass("left-right");
              }, 8900);
            }, 9000);
          }
          this.changeState("12", "0");
        }
        else if(seconds1btn13 !== '0'){
          number[12] = 1;
          var time1btn13 = seconds1btn13 + 100;
          this.changeState("12", time1btn13);
        }
      }
      else if(number[12] === 3){
        number[12] = 4;
      }
      oldButton[0] = buttonValues[0];
    }
    //button 14
    else if(buttonValues[0] === 223){
      beepState = true;
      console.log('button 14 is pressed')
      //gets the specific buttons information from object
      var seconds1btn14 = stringify.buttonOutputSettings[13].ButtonTimerValue;
      var moment14= stringify.buttonOutputSettings[13].ButtonType;
      if(number[13] === 0){
        number[13] = 1;
        if(moment14 === "OnOff"){
          this.changeState("13", "0");
        }
        else if(moment14 === 'Momentary'){
          var checkLightbarbtn14 = stringify.buttonOutputSettings[13].LightBar;
          if((checkLightbarbtn14[0] === 0) && (checkLightbarbtn14[1] === 0) && (checkLightbarbtn14[2] === 1)){
            $('.circle').addClass('random');
          }
          else if((checkLightbarbtn14[0] === 1) && (checkLightbarbtn14[1] === 1) && (checkLightbarbtn14[2] === 0)){
            $('.circle').addClass('middle-out');
          }
          else if((checkLightbarbtn14[0] === 0) && (checkLightbarbtn14[1] === 1) && (checkLightbarbtn14[2] === 0)){
            $(".circle").addClass("right-left");
            //every 10 seconds add a class
            myVar4 = setTimeout(function () {
              $(".circle").removeClass("right-left");
            }, 8900);
            myVar5 = setInterval(function () {
              $(".circle").addClass("right-left");
              //every 9 seconds remove class
              myVar6 = setTimeout(function () {
                $(".circle").removeClass("right-left");
              }, 8900);
            }, 9000);
          }
          else if((checkLightbarbtn14[0] === 1) && (checkLightbarbtn14[1] === 0) && (checkLightbarbtn14[2] === 0)){
            $(".circle").addClass("left-right");
            //every 10 seconds add a class
            myVar = setTimeout(function () {
              $(".circle").removeClass("left-right");
            }, 8900);
            myVar2 = setInterval(function () {
              $(".circle").addClass("left-right");
              //every 9 seconds remove class
              myVar3 = setTimeout(function () {
                $(".circle").removeClass("left-right");
              }, 8900);
            }, 9000);
          }
          this.changeState("13", "0");
        }
        else if(seconds1btn14 !== '0'){
          number[13] = 1;
          var time1btn14 = seconds1btn14 + 100;
          this.changeState("13", time1btn14);
        }
      }
      else if(number[13] === 3){
        number[13] = 4;
      }
      oldButton[0] = buttonValues[0];
    }
    //button 15
    else if(buttonValues[0] === 191){
      beepState = true;
      console.log('button 15 is pressed')
      //gets the specific buttons information from object
      var seconds1btn15 = stringify.buttonOutputSettings[14].ButtonTimerValue;
      var moment15= stringify.buttonOutputSettings[14].ButtonType;
      if(number[14] === 0){
        number[14] = 1;
        if(moment15 === "OnOff"){
          this.changeState("14", "0");
        }
        else if(moment15 === 'Momentary'){
          var checkLightbarbtn15 = stringify.buttonOutputSettings[14].LightBar;
          if((checkLightbarbtn15[0] === 0) && (checkLightbarbtn15[1] === 0) && (checkLightbarbtn15[2] === 1)){
            $('.circle').addClass('random');
          }
          else if((checkLightbarbtn15[0] === 1) && (checkLightbarbtn15[1] === 1) && (checkLightbarbtn15[2] === 0)){
            $('.circle').addClass('middle-out');
          }
          else if((checkLightbarbtn15[0] === 0) && (checkLightbarbtn15[1] === 1) && (checkLightbarbtn15[2] === 0)){
            $(".circle").addClass("right-left");
            //every 10 seconds add a class
            myVar4 = setTimeout(function () {
              $(".circle").removeClass("right-left");
            }, 8900);
            myVar5 = setInterval(function () {
              $(".circle").addClass("right-left");
              //every 9 seconds remove class
              myVar6 = setTimeout(function () {
                $(".circle").removeClass("right-left");
              }, 8900);
            }, 9000);
          }
          else if((checkLightbarbtn15[0] === 1) && (checkLightbarbtn15[1] === 0) && (checkLightbarbtn15[2] === 0)){
            $(".circle").addClass("left-right");
            //every 10 seconds add a class
            myVar = setTimeout(function () {
              $(".circle").removeClass("left-right");
            }, 8900);
            myVar2 = setInterval(function () {
              $(".circle").addClass("left-right");
              //every 9 seconds remove class
              myVar3 = setTimeout(function () {
                $(".circle").removeClass("left-right");
              }, 8900);
            }, 9000);
          }
          this.changeState("14", "0");
        }
        else if(seconds1btn15 !== '0'){
          number[14] = 1;
          var time1btn15 = seconds1btn15 + 100;
          this.changeState("14", time1btn15);
        }
      }
      else if(number[14] === 3){
        number[14] = 4;
      }
      oldButton[0] = buttonValues[0];
    }
    //button 16
    else if(buttonValues[0] === 127){
      beepState = true;
      console.log('button 16 is pressed')
      //gets the specific buttons information from object
      var seconds1btn16 = stringify.buttonOutputSettings[15].ButtonTimerValue;
      var moment16= stringify.buttonOutputSettings[15].ButtonType;
      if(number[15] === 0){
        number[15] = 1;
        if(moment16 === "OnOff"){
          this.changeState("15", "0");
        }
        else if(moment16 === 'Momentary'){
          var checkLightbarbtn16 = stringify.buttonOutputSettings[15].LightBar;
          if((checkLightbarbtn16[0] === 0) && (checkLightbarbtn16[1] === 0) && (checkLightbarbtn16[2] === 1)){
            $('.circle').addClass('random');
          }
          else if((checkLightbarbtn16[0] === 1) && (checkLightbarbtn16[1] === 1) && (checkLightbarbtn16[2] === 0)){
            $('.circle').addClass('middle-out');
          }
          else if((checkLightbarbtn16[0] === 0) && (checkLightbarbtn16[1] === 1) && (checkLightbarbtn16[2] === 0)){
            $(".circle").addClass("right-left");
            //every 10 seconds add a class
            myVar4 = setTimeout(function () {
              $(".circle").removeClass("right-left");
            }, 8900);
            myVar5 = setInterval(function () {
              $(".circle").addClass("right-left");
              //every 9 seconds remove class
              myVar6 = setTimeout(function () {
                $(".circle").removeClass("right-left");
              }, 8900);
            }, 9000);
          }
          else if((checkLightbarbtn16[0] === 1) && (checkLightbarbtn16[1] === 0) && (checkLightbarbtn16[2] === 0)){
            $(".circle").addClass("left-right");
            //every 10 seconds add a class
            myVar = setTimeout(function () {
              $(".circle").removeClass("left-right");
            }, 8900);
            myVar2 = setInterval(function () {
              $(".circle").addClass("left-right");
              //every 9 seconds remove class
              myVar3 = setTimeout(function () {
                $(".circle").removeClass("left-right");
              }, 8900);
            }, 9000);
          }
          this.changeState("15", "0");
        }
        else if(seconds1btn16 !== '0'){
          number[15] = 1;
          var time1btn16 = seconds1btn16 + 100;
          this.changeState("15", time1btn16);
        }
      }
      else if(number[15] === 3){
        number[15] = 4;
      }
      oldButton[0] = buttonValues[0];
    }
    // no button pressed button
    else if((buttonValues[0] === 255) && (buttonValues1[0] === 255)){
      beepState = false;
      if(oldButton1[0] !== 0){
        //buttons 1-8
        if(oldButton1[0] !== buttonValues1[0]){
          var value = '';
          //button1
          if(oldButton1[0] === 254){
            value = 0;
          }
          //button2
          else if(oldButton1[0] === 253){
            value = 1;
          }
          //button3
          else if(oldButton1[0] === 251){
            value = 2;
          }
          //button4
          else if(oldButton1[0] === 247){
            value = 3;
          }
          //button5
          else if(oldButton1[0] === 239){
            value = 4;
          }
          //button6
          else if(oldButton1[0] === 223){
            value = 5;
          }
          //button7
          else if(oldButton1[0] === 191){
            value = 6;
          }
          //button8
          else if(oldButton1[0] === 127){
            value = 7;
          }
          var button = stringify.buttonOutputSettings[value]
          var secondsTimer1 = button.ButtonTimerValue;
          var momentaryMode10 = button.ButtonType;
          var checkLightbarbtn10 = button.LightBar;
          var secondsTimer = secondsTimer1.toString();
          //gets the specific buttons information from object
          if(number[value] === 2){
            if(momentaryMode10 === "OnOff"){
              number[value] = 3;
            }
            else if(momentaryMode10 === 'Momentary'){
              number[value] = 0;
              $('.circle').removeClass('random');
              $(".circle").removeClass("left-right");
              $(".circle").removeClass("right-left");
              $('.circle').removeClass('middle-out');
              this.clearTimer();
              this.changeState(value, "0");
            }
            else if(secondsTimer !== '0'){
              var time5 = secondsTimer + 100;
              if(oldButton1[0] === 254){
                // get lightbar activity
                if((checkLightbarbtn10[0] === 0) && (checkLightbarbtn10[1] === 0) && (checkLightbarbtn10[2] === 1)){
                  $('.circle').addClass('random');
                }
                else if((checkLightbarbtn10[0] === 1) && (checkLightbarbtn10[1] === 1) && (checkLightbarbtn10[2] === 0)){
                  $('.circle').addClass('middle-out');
                }
                else if((checkLightbarbtn10[0] === 0) && (checkLightbarbtn10[1] === 1) && (checkLightbarbtn10[2] === 0)){
                  $(".circle").addClass("right-left");
                  //every 10 seconds add a class
                  myVar4 = setTimeout(function () {
                    $(".circle").removeClass("right-left");
                  }, 8900);
                  myVar5 = setInterval(function () {
                    $(".circle").addClass("right-left");
                    //every 9 seconds remove class
                    myVar6 = setTimeout(function () {
                      $(".circle").removeClass("right-left");
                    }, 8900);
                  }, 9000);
                }
                else if((checkLightbarbtn10[0] === 1) && (checkLightbarbtn10[1] === 0) && (checkLightbarbtn10[2] === 0)){
                  $(".circle").addClass("left-right");
                  //every 10 seconds add a class
                  myVar = setTimeout(function () {
                    $(".circle").removeClass("left-right");
                  }, 8900);
                  myVar2 = setInterval(function () {
                    $(".circle").addClass("left-right");
                    //every 9 seconds remove class
                    myVar3 = setTimeout(function () {
                      $(".circle").removeClass("left-right");
                    }, 8900);
                  }, 9000);
                }
                console.log('this button1 is live')
                this.changeState(0, time5);
                setTimeout(function(){
                  buttonState[0] = false;
                  number[0] = 0;
                  this.deactivateButtons(0);
                  console.log('this button1 is dead')
                  this.activeOutputPorts(0, 1);
                }.bind(this), time5);
                oldButton1[0] = buttonValues1[0];
              }else if(oldButton1[0] === 253){
                // get lightbar activity
                if((checkLightbarbtn10[0] === 0) && (checkLightbarbtn10[1] === 0) && (checkLightbarbtn10[2] === 1)){
                  $('.circle').addClass('random');
                }
                else if((checkLightbarbtn10[0] === 1) && (checkLightbarbtn10[1] === 1) && (checkLightbarbtn10[2] === 0)){
                  $('.circle').addClass('middle-out');
                }
                else if((checkLightbarbtn10[0] === 0) && (checkLightbarbtn10[1] === 1) && (checkLightbarbtn10[2] === 0)){
                  $(".circle").addClass("right-left");
                  //every 10 seconds add a class
                  myVar4 = setTimeout(function () {
                    $(".circle").removeClass("right-left");
                  }, 8900);
                  myVar5 = setInterval(function () {
                    $(".circle").addClass("right-left");
                    //every 9 seconds remove class
                    myVar6 = setTimeout(function () {
                      $(".circle").removeClass("right-left");
                    }, 8900);
                  }, 9000);
                }
                else if((checkLightbarbtn10[0] === 1) && (checkLightbarbtn10[1] === 0) && (checkLightbarbtn10[2] === 0)){
                  $(".circle").addClass("left-right");
                  //every 10 seconds add a class
                  myVar = setTimeout(function () {
                    $(".circle").removeClass("left-right");
                  }, 8900);
                  myVar2 = setInterval(function () {
                    $(".circle").addClass("left-right");
                    //every 9 seconds remove class
                    myVar3 = setTimeout(function () {
                      $(".circle").removeClass("left-right");
                    }, 8900);
                  }, 9000);
                }
                console.log('this button2 is live')
                this.changeState(1, time5);
                setTimeout(function(){
                  buttonState[1] = false;
                  number[1] = 0;
                  this.deactivateButtons(1);
                  console.log('this button2 is dead')
                  this.activeOutputPorts(0, 1);
                }.bind(this), time5);
                oldButton1[0] = buttonValues1[0];
              }else if(oldButton1[0] === 251){
                // get lightbar activity
                if((checkLightbarbtn10[0] === 0) && (checkLightbarbtn10[1] === 0) && (checkLightbarbtn10[2] === 1)){
                  $('.circle').addClass('random');
                }
                else if((checkLightbarbtn10[0] === 1) && (checkLightbarbtn10[1] === 1) && (checkLightbarbtn10[2] === 0)){
                  $('.circle').addClass('middle-out');
                }
                else if((checkLightbarbtn10[0] === 0) && (checkLightbarbtn10[1] === 1) && (checkLightbarbtn10[2] === 0)){
                  $(".circle").addClass("right-left");
                  //every 10 seconds add a class
                  myVar4 = setTimeout(function () {
                    $(".circle").removeClass("right-left");
                  }, 8900);
                  myVar5 = setInterval(function () {
                    $(".circle").addClass("right-left");
                    //every 9 seconds remove class
                    myVar6 = setTimeout(function () {
                      $(".circle").removeClass("right-left");
                    }, 8900);
                  }, 9000);
                }
                else if((checkLightbarbtn10[0] === 1) && (checkLightbarbtn10[1] === 0) && (checkLightbarbtn10[2] === 0)){
                  $(".circle").addClass("left-right");
                  //every 10 seconds add a class
                  myVar = setTimeout(function () {
                    $(".circle").removeClass("left-right");
                  }, 8900);
                  myVar2 = setInterval(function () {
                    $(".circle").addClass("left-right");
                    //every 9 seconds remove class
                    myVar3 = setTimeout(function () {
                      $(".circle").removeClass("left-right");
                    }, 8900);
                  }, 9000);
                }
                console.log('this button3 is live')
                this.changeState(2, time5);
                setTimeout(function(){
                  buttonState[2] = false;
                  number[2] = 0;
                  this.deactivateButtons(2);
                  console.log('this button3 is dead')
                  this.activeOutputPorts(0, 1);
                }.bind(this), time5);
                oldButton1[0] = buttonValues1[0];
              }else if(oldButton1[0] === 247){
                // get lightbar activity
                if((checkLightbarbtn10[0] === 0) && (checkLightbarbtn10[1] === 0) && (checkLightbarbtn10[2] === 1)){
                  $('.circle').addClass('random');
                }
                else if((checkLightbarbtn10[0] === 1) && (checkLightbarbtn10[1] === 1) && (checkLightbarbtn10[2] === 0)){
                  $('.circle').addClass('middle-out');
                }
                else if((checkLightbarbtn10[0] === 0) && (checkLightbarbtn10[1] === 1) && (checkLightbarbtn10[2] === 0)){
                  $(".circle").addClass("right-left");
                  //every 10 seconds add a class
                  myVar4 = setTimeout(function () {
                    $(".circle").removeClass("right-left");
                  }, 8900);
                  myVar5 = setInterval(function () {
                    $(".circle").addClass("right-left");
                    //every 9 seconds remove class
                    myVar6 = setTimeout(function () {
                      $(".circle").removeClass("right-left");
                    }, 8900);
                  }, 9000);
                }
                else if((checkLightbarbtn10[0] === 1) && (checkLightbarbtn10[1] === 0) && (checkLightbarbtn10[2] === 0)){
                  $(".circle").addClass("left-right");
                  //every 10 seconds add a class
                  myVar = setTimeout(function () {
                    $(".circle").removeClass("left-right");
                  }, 8900);
                  myVar2 = setInterval(function () {
                    $(".circle").addClass("left-right");
                    //every 9 seconds remove class
                    myVar3 = setTimeout(function () {
                      $(".circle").removeClass("left-right");
                    }, 8900);
                  }, 9000);
                }
                console.log('this button4 is live')
                this.changeState(3, time5);
                setTimeout(function(){
                  buttonState[3] = false;
                  number[3] = 0;
                  this.deactivateButtons(3);
                  console.log('this button4 is dead')
                  this.activeOutputPorts(0, 1);
                }.bind(this), time5);
                oldButton1[0] = buttonValues1[0];
              }else if(oldButton1[0] === 239){
                // get lightbar activity
                if((checkLightbarbtn10[0] === 0) && (checkLightbarbtn10[1] === 0) && (checkLightbarbtn10[2] === 1)){
                  $('.circle').addClass('random');
                }
                else if((checkLightbarbtn10[0] === 1) && (checkLightbarbtn10[1] === 1) && (checkLightbarbtn10[2] === 0)){
                  $('.circle').addClass('middle-out');
                }
                else if((checkLightbarbtn10[0] === 0) && (checkLightbarbtn10[1] === 1) && (checkLightbarbtn10[2] === 0)){
                  $(".circle").addClass("right-left");
                  //every 10 seconds add a class
                  myVar4 = setTimeout(function () {
                    $(".circle").removeClass("right-left");
                  }, 8900);
                  myVar5 = setInterval(function () {
                    $(".circle").addClass("right-left");
                    //every 9 seconds remove class
                    myVar6 = setTimeout(function () {
                      $(".circle").removeClass("right-left");
                    }, 8900);
                  }, 9000);
                }
                else if((checkLightbarbtn10[0] === 1) && (checkLightbarbtn10[1] === 0) && (checkLightbarbtn10[2] === 0)){
                  $(".circle").addClass("left-right");
                  //every 10 seconds add a class
                  myVar = setTimeout(function () {
                    $(".circle").removeClass("left-right");
                  }, 8900);
                  myVar2 = setInterval(function () {
                    $(".circle").addClass("left-right");
                    //every 9 seconds remove class
                    myVar3 = setTimeout(function () {
                      $(".circle").removeClass("left-right");
                    }, 8900);
                  }, 9000);
                }
                console.log('this button5 is live')
                this.changeState(4, time5);
                setTimeout(function(){
                  buttonState[4] = false;
                  number[4] = 0;
                  this.deactivateButtons(4);
                  console.log('this button5 is dead')
                  this.activeOutputPorts(0, 1);
                }.bind(this), time5);
                oldButton1[0] = buttonValues1[0];
              }else if(oldButton1[0] === 223){
                // get lightbar activity
                if((checkLightbarbtn10[0] === 0) && (checkLightbarbtn10[1] === 0) && (checkLightbarbtn10[2] === 1)){
                  $('.circle').addClass('random');
                }
                else if((checkLightbarbtn10[0] === 1) && (checkLightbarbtn10[1] === 1) && (checkLightbarbtn10[2] === 0)){
                  $('.circle').addClass('middle-out');
                }
                else if((checkLightbarbtn10[0] === 0) && (checkLightbarbtn10[1] === 1) && (checkLightbarbtn10[2] === 0)){
                  $(".circle").addClass("right-left");
                  //every 10 seconds add a class
                  myVar4 = setTimeout(function () {
                    $(".circle").removeClass("right-left");
                  }, 8900);
                  myVar5 = setInterval(function () {
                    $(".circle").addClass("right-left");
                    //every 9 seconds remove class
                    myVar6 = setTimeout(function () {
                      $(".circle").removeClass("right-left");
                    }, 8900);
                  }, 9000);
                }
                else if((checkLightbarbtn10[0] === 1) && (checkLightbarbtn10[1] === 0) && (checkLightbarbtn10[2] === 0)){
                  $(".circle").addClass("left-right");
                  //every 10 seconds add a class
                  myVar = setTimeout(function () {
                    $(".circle").removeClass("left-right");
                  }, 8900);
                  myVar2 = setInterval(function () {
                    $(".circle").addClass("left-right");
                    //every 9 seconds remove class
                    myVar3 = setTimeout(function () {
                      $(".circle").removeClass("left-right");
                    }, 8900);
                  }, 9000);
                }
                console.log('this button6 is live')
                this.changeState(5, time5);
                setTimeout(function(){
                  buttonState[5] = false;
                  number[5] = 0;
                  this.deactivateButtons(5);
                  console.log('this button6 is dead')
                  this.activeOutputPorts(0, true);
                }.bind(this), time5);
                oldButton1[0] = buttonValues1[0];
              }else if(oldButton1[0] === 191){
                // get lightbar activity
                if((checkLightbarbtn10[0] === 0) && (checkLightbarbtn10[1] === 0) && (checkLightbarbtn10[2] === 1)){
                  $('.circle').addClass('random');
                }
                else if((checkLightbarbtn10[0] === 1) && (checkLightbarbtn10[1] === 1) && (checkLightbarbtn10[2] === 0)){
                  $('.circle').addClass('middle-out');
                }
                else if((checkLightbarbtn10[0] === 0) && (checkLightbarbtn10[1] === 1) && (checkLightbarbtn10[2] === 0)){
                  $(".circle").addClass("right-left");
                  //every 10 seconds add a class
                  myVar4 = setTimeout(function () {
                    $(".circle").removeClass("right-left");
                  }, 8900);
                  myVar5 = setInterval(function () {
                    $(".circle").addClass("right-left");
                    //every 9 seconds remove class
                    myVar6 = setTimeout(function () {
                      $(".circle").removeClass("right-left");
                    }, 8900);
                  }, 9000);
                }
                else if((checkLightbarbtn10[0] === 1) && (checkLightbarbtn10[1] === 0) && (checkLightbarbtn10[2] === 0)){
                  $(".circle").addClass("left-right");
                  //every 10 seconds add a class
                  myVar = setTimeout(function () {
                    $(".circle").removeClass("left-right");
                  }, 8900);
                  myVar2 = setInterval(function () {
                    $(".circle").addClass("left-right");
                    //every 9 seconds remove class
                    myVar3 = setTimeout(function () {
                      $(".circle").removeClass("left-right");
                    }, 8900);
                  }, 9000);
                }
                console.log('this button7 is live')
                this.changeState(6, time5);
                setTimeout(function(){
                  buttonState[6] = false;
                  number[6] = 0;
                  this.deactivateButtons(6);
                  console.log('this button7 is dead')
                  this.activeOutputPorts(0, true);
                }.bind(this), time5);
                oldButton1[0] = buttonValues1[0];
              }else if(oldButton1[0] === 127){
                // get lightbar activity
                if((checkLightbarbtn10[0] === 0) && (checkLightbarbtn10[1] === 0) && (checkLightbarbtn10[2] === 1)){
                  $('.circle').addClass('random');
                }
                else if((checkLightbarbtn10[0] === 1) && (checkLightbarbtn10[1] === 1) && (checkLightbarbtn10[2] === 0)){
                  $('.circle').addClass('middle-out');
                }
                else if((checkLightbarbtn10[0] === 0) && (checkLightbarbtn10[1] === 1) && (checkLightbarbtn10[2] === 0)){
                  $(".circle").addClass("right-left");
                  //every 10 seconds add a class
                  myVar4 = setTimeout(function () {
                    $(".circle").removeClass("right-left");
                  }, 8900);
                  myVar5 = setInterval(function () {
                    $(".circle").addClass("right-left");
                    //every 9 seconds remove class
                    myVar6 = setTimeout(function () {
                      $(".circle").removeClass("right-left");
                    }, 8900);
                  }, 9000);
                }
                else if((checkLightbarbtn10[0] === 1) && (checkLightbarbtn10[1] === 0) && (checkLightbarbtn10[2] === 0)){
                  $(".circle").addClass("left-right");
                  //every 10 seconds add a class
                  myVar = setTimeout(function () {
                    $(".circle").removeClass("left-right");
                  }, 8900);
                  myVar2 = setInterval(function () {
                    $(".circle").addClass("left-right");
                    //every 9 seconds remove class
                    myVar3 = setTimeout(function () {
                      $(".circle").removeClass("left-right");
                    }, 8900);
                  }, 9000);
                }
                console.log('this button8 is live')
                this.changeState(7, time5);
                setTimeout(function(){
                  buttonState[7] = false;
                  number[7] = 0;
                  this.deactivateButtons(7);
                  console.log('this button8 is dead')
                  this.activeOutputPorts(0, true);
                }.bind(this), time5);
                oldButton1[0] = buttonValues1[0];
              }
            }
          }
          else if(number[value] === 4){
            if(momentaryMode10 === "OnOff"){
              this.changeState(value, "0");
            }
          }
        }
        oldButton1[0] = 0;
      }

      else if(oldButton[0] !== 0){
        //buttons 9-16
        if(oldButton[0] !== buttonValues[0]){
          var value11 = '';
          //button9
          if(oldButton[0] === 254){
            value11 = 8;
          }
          //button10
          else if(oldButton[0] === 253){
            value11 = 9;
          }
          //button11
          else if(oldButton[0] === 251){
            value11 = 10;
          }
          //button12
          else if(oldButton[0] === 247){
            value11 = 11;
          }
          //button13
          else if(oldButton[0] === 239){
            value11 = 12;
          }
          //button14
          else if(oldButton[0] === 223){
            value11 = 13;
          }
          //button15
          else if(oldButton[0] === 191){
            value11 = 14;
          }
          //button16
          else if(oldButton[0] === 127){
            value11 = 15;
          }
          var button11 = stringify.buttonOutputSettings[value11]
          var secondsTimer12 = button11.ButtonTimerValue;
          var momentaryMode11 = button11.ButtonType;
          var checkLightbarbtn11 = button11.LightBar;
          var secondsTimer11 = secondsTimer12.toString();
          //gets the specific buttons information from object
          if(number[value11] === 2){
            if(momentaryMode11 === "OnOff"){
              number[value11] = 3;
            }
            else if(momentaryMode11 === 'Momentary'){
              number[value11] = 0;
              $('.circle').removeClass('random');
              $(".circle").removeClass("left-right");
              $(".circle").removeClass("right-left");
              $('.circle').removeClass('middle-out');
              this.clearTimer();
              this.changeState(value11, "0");
            }
            else if(secondsTimer11 !== '0'){
              var time6 = secondsTimer11 + 100;
              if(oldButton[0] === 254){
                // get lightbar activity
                if((checkLightbarbtn11[0] === 0) && (checkLightbarbtn11[1] === 0) && (checkLightbarbtn11[2] === 1)){
                  $('.circle').addClass('random');
                }
                else if((checkLightbarbtn11[0] === 1) && (checkLightbarbtn11[1] === 1) && (checkLightbarbtn11[2] === 0)){
                  $('.circle').addClass('middle-out');
                }
                else if((checkLightbarbtn11[0] === 0) && (checkLightbarbtn11[1] === 1) && (checkLightbarbtn11[2] === 0)){
                  $(".circle").addClass("right-left");
                  //every 10 seconds add a class
                  myVar4 = setTimeout(function () {
                    $(".circle").removeClass("right-left");
                  }, 8900);
                  myVar5 = setInterval(function () {
                    $(".circle").addClass("right-left");
                    //every 9 seconds remove class
                    myVar6 = setTimeout(function () {
                      $(".circle").removeClass("right-left");
                    }, 8900);
                  }, 9000);
                }
                else if((checkLightbarbtn11[0] === 1) && (checkLightbarbtn11[1] === 0) && (checkLightbarbtn11[2] === 0)){
                  $(".circle").addClass("left-right");
                  //every 10 seconds add a class
                  myVar = setTimeout(function () {
                    $(".circle").removeClass("left-right");
                  }, 8900);
                  myVar2 = setInterval(function () {
                    $(".circle").addClass("left-right");
                    //every 9 seconds remove class
                    myVar3 = setTimeout(function () {
                      $(".circle").removeClass("left-right");
                    }, 8900);
                  }, 9000);
                }
                console.log('this button9 is live')
                this.changeState(8, time6);
                setTimeout(function(){
                  buttonState[8] = false;
                  number[8] = 0;
                  this.deactivateButtons(8);
                  console.log('this button9 is dead')
                  this.activeOutputPorts(0, 1);
                }.bind(this), time6);
                oldButton[0] = buttonValues[0];
              }else if(oldButton[0] === 253){
                // get lightbar activity
                if((checkLightbarbtn11[0] === 0) && (checkLightbarbtn11[1] === 0) && (checkLightbarbtn11[2] === 1)){
                  $('.circle').addClass('random');
                }
                else if((checkLightbarbtn11[0] === 1) && (checkLightbarbtn11[1] === 1) && (checkLightbarbtn11[2] === 0)){
                  $('.circle').addClass('middle-out');
                }
                else if((checkLightbarbtn11[0] === 0) && (checkLightbarbtn11[1] === 1) && (checkLightbarbtn11[2] === 0)){
                  $(".circle").addClass("right-left");
                  //every 10 seconds add a class
                  myVar4 = setTimeout(function () {
                    $(".circle").removeClass("right-left");
                  }, 8900);
                  myVar5 = setInterval(function () {
                    $(".circle").addClass("right-left");
                    //every 9 seconds remove class
                    myVar6 = setTimeout(function () {
                      $(".circle").removeClass("right-left");
                    }, 8900);
                  }, 9000);
                }
                else if((checkLightbarbtn11[0] === 1) && (checkLightbarbtn11[1] === 0) && (checkLightbarbtn11[2] === 0)){
                  $(".circle").addClass("left-right");
                  //every 10 seconds add a class
                  myVar = setTimeout(function () {
                    $(".circle").removeClass("left-right");
                  }, 8900);
                  myVar2 = setInterval(function () {
                    $(".circle").addClass("left-right");
                    //every 9 seconds remove class
                    myVar3 = setTimeout(function () {
                      $(".circle").removeClass("left-right");
                    }, 8900);
                  }, 9000);
                }
                console.log('this button10 is live')
                this.changeState(9, time6);
                setTimeout(function(){
                  buttonState[9] = false;
                  number[9] = 0;
                  this.deactivateButtons(9);
                  console.log('this button10 is dead')
                  this.activeOutputPorts(0, 1);
                }.bind(this), time6);
                oldButton[0] = buttonValues[0];
              }else if(oldButton[0] === 251){
                // get lightbar activity
                if((checkLightbarbtn11[0] === 0) && (checkLightbarbtn11[1] === 0) && (checkLightbarbtn11[2] === 1)){
                  $('.circle').addClass('random');
                }
                else if((checkLightbarbtn11[0] === 1) && (checkLightbarbtn11[1] === 1) && (checkLightbarbtn11[2] === 0)){
                  $('.circle').addClass('middle-out');
                }
                else if((checkLightbarbtn11[0] === 0) && (checkLightbarbtn11[1] === 1) && (checkLightbarbtn11[2] === 0)){
                  $(".circle").addClass("right-left");
                  //every 10 seconds add a class
                  myVar4 = setTimeout(function () {
                    $(".circle").removeClass("right-left");
                  }, 8900);
                  myVar5 = setInterval(function () {
                    $(".circle").addClass("right-left");
                    //every 9 seconds remove class
                    myVar6 = setTimeout(function () {
                      $(".circle").removeClass("right-left");
                    }, 8900);
                  }, 9000);
                }
                else if((checkLightbarbtn11[0] === 1) && (checkLightbarbtn11[1] === 0) && (checkLightbarbtn11[2] === 0)){
                  $(".circle").addClass("left-right");
                  //every 10 seconds add a class
                  myVar = setTimeout(function () {
                    $(".circle").removeClass("left-right");
                  }, 8900);
                  myVar2 = setInterval(function () {
                    $(".circle").addClass("left-right");
                    //every 9 seconds remove class
                    myVar3 = setTimeout(function () {
                      $(".circle").removeClass("left-right");
                    }, 8900);
                  }, 9000);
                }
                console.log('this button11 is live')
                this.changeState(10, time6);
                setTimeout(function(){
                  buttonState[10] = false;
                  number[10] = 0;
                  this.deactivateButtons(10);
                  console.log('this button11 is dead')
                  this.activeOutputPorts(0, 1);
                }.bind(this), time6);
                oldButton[0] = buttonValues[0];
              }else if(oldButton[0] === 247){
                // get lightbar activity
                if((checkLightbarbtn11[0] === 0) && (checkLightbarbtn11[1] === 0) && (checkLightbarbtn11[2] === 1)){
                  $('.circle').addClass('random');
                }
                else if((checkLightbarbtn11[0] === 1) && (checkLightbarbtn11[1] === 1) && (checkLightbarbtn11[2] === 0)){
                  $('.circle').addClass('middle-out');
                }
                else if((checkLightbarbtn11[0] === 0) && (checkLightbarbtn11[1] === 1) && (checkLightbarbtn11[2] === 0)){
                  $(".circle").addClass("right-left");
                  //every 10 seconds add a class
                  myVar4 = setTimeout(function () {
                    $(".circle").removeClass("right-left");
                  }, 8900);
                  myVar5 = setInterval(function () {
                    $(".circle").addClass("right-left");
                    //every 9 seconds remove class
                    myVar6 = setTimeout(function () {
                      $(".circle").removeClass("right-left");
                    }, 8900);
                  }, 9000);
                }
                else if((checkLightbarbtn11[0] === 1) && (checkLightbarbtn11[1] === 0) && (checkLightbarbtn11[2] === 0)){
                  $(".circle").addClass("left-right");
                  //every 10 seconds add a class
                  myVar = setTimeout(function () {
                    $(".circle").removeClass("left-right");
                  }, 8900);
                  myVar2 = setInterval(function () {
                    $(".circle").addClass("left-right");
                    //every 9 seconds remove class
                    myVar3 = setTimeout(function () {
                      $(".circle").removeClass("left-right");
                    }, 8900);
                  }, 9000);
                }
                console.log('this button12 is live')
                this.changeState(11, time6);
                setTimeout(function(){
                  buttonState[11] = false;
                  number[11] = 0;
                  this.deactivateButtons(12);
                  console.log('this button12 is dead')
                  this.activeOutputPorts(0, 1);
                }.bind(this), time6);
                oldButton[0] = buttonValues[0];
              }else if(oldButton[0] === 239){
                // get lightbar activity
                if((checkLightbarbtn11[0] === 0) && (checkLightbarbtn11[1] === 0) && (checkLightbarbtn11[2] === 1)){
                  $('.circle').addClass('random');
                }
                else if((checkLightbarbtn11[0] === 1) && (checkLightbarbtn11[1] === 1) && (checkLightbarbtn11[2] === 0)){
                  $('.circle').addClass('middle-out');
                }
                else if((checkLightbarbtn11[0] === 0) && (checkLightbarbtn11[1] === 1) && (checkLightbarbtn11[2] === 0)){
                  $(".circle").addClass("right-left");
                  //every 10 seconds add a class
                  myVar4 = setTimeout(function () {
                    $(".circle").removeClass("right-left");
                  }, 8900);
                  myVar5 = setInterval(function () {
                    $(".circle").addClass("right-left");
                    //every 9 seconds remove class
                    myVar6 = setTimeout(function () {
                      $(".circle").removeClass("right-left");
                    }, 8900);
                  }, 9000);
                }
                else if((checkLightbarbtn11[0] === 1) && (checkLightbarbtn11[1] === 0) && (checkLightbarbtn11[2] === 0)){
                  $(".circle").addClass("left-right");
                  //every 10 seconds add a class
                  myVar = setTimeout(function () {
                    $(".circle").removeClass("left-right");
                  }, 8900);
                  myVar2 = setInterval(function () {
                    $(".circle").addClass("left-right");
                    //every 9 seconds remove class
                    myVar3 = setTimeout(function () {
                      $(".circle").removeClass("left-right");
                    }, 8900);
                  }, 9000);
                }
                console.log('this button13 is live')
                this.changeState(12, time6);
                setTimeout(function(){
                  buttonState[12] = false;
                  number[12] = 0;
                  this.deactivateButtons(12);
                  console.log('this button13 is dead')
                  this.activeOutputPorts(0, 1);
                }.bind(this), time6);
                oldButton[0] = buttonValues[0];
              }else if(oldButton[0] === 223){
                // get lightbar activity
                if((checkLightbarbtn11[0] === 0) && (checkLightbarbtn11[1] === 0) && (checkLightbarbtn11[2] === 1)){
                  $('.circle').addClass('random');
                }
                else if((checkLightbarbtn11[0] === 1) && (checkLightbarbtn11[1] === 1) && (checkLightbarbtn11[2] === 0)){
                  $('.circle').addClass('middle-out');
                }
                else if((checkLightbarbtn11[0] === 0) && (checkLightbarbtn11[1] === 1) && (checkLightbarbtn11[2] === 0)){
                  $(".circle").addClass("right-left");
                  //every 10 seconds add a class
                  myVar4 = setTimeout(function () {
                    $(".circle").removeClass("right-left");
                  }, 8900);
                  myVar5 = setInterval(function () {
                    $(".circle").addClass("right-left");
                    //every 9 seconds remove class
                    myVar6 = setTimeout(function () {
                      $(".circle").removeClass("right-left");
                    }, 8900);
                  }, 9000);
                }
                else if((checkLightbarbtn11[0] === 1) && (checkLightbarbtn11[1] === 0) && (checkLightbarbtn11[2] === 0)){
                  $(".circle").addClass("left-right");
                  //every 10 seconds add a class
                  myVar = setTimeout(function () {
                    $(".circle").removeClass("left-right");
                  }, 8900);
                  myVar2 = setInterval(function () {
                    $(".circle").addClass("left-right");
                    //every 9 seconds remove class
                    myVar3 = setTimeout(function () {
                      $(".circle").removeClass("left-right");
                    }, 8900);
                  }, 9000);
                }
                console.log('this button14 is live')
                this.changeState(13, time6);
                setTimeout(function(){
                  buttonState[13] = false;
                  number[13] = 0;
                  this.deactivateButtons(13);
                  console.log('this button14 is dead')
                  this.activeOutputPorts(0, true);
                }.bind(this), time6);
                oldButton[0] = buttonValues[0];
              }else if(oldButton[0] === 191){
                // get lightbar activity
                if((checkLightbarbtn11[0] === 0) && (checkLightbarbtn11[1] === 0) && (checkLightbarbtn11[2] === 1)){
                  $('.circle').addClass('random');
                }
                else if((checkLightbarbtn11[0] === 1) && (checkLightbarbtn11[1] === 1) && (checkLightbarbtn11[2] === 0)){
                  $('.circle').addClass('middle-out');
                }
                else if((checkLightbarbtn11[0] === 0) && (checkLightbarbtn11[1] === 1) && (checkLightbarbtn11[2] === 0)){
                  $(".circle").addClass("right-left");
                  //every 10 seconds add a class
                  myVar4 = setTimeout(function () {
                    $(".circle").removeClass("right-left");
                  }, 8900);
                  myVar5 = setInterval(function () {
                    $(".circle").addClass("right-left");
                    //every 9 seconds remove class
                    myVar6 = setTimeout(function () {
                      $(".circle").removeClass("right-left");
                    }, 8900);
                  }, 9000);
                }
                else if((checkLightbarbtn11[0] === 1) && (checkLightbarbtn11[1] === 0) && (checkLightbarbtn11[2] === 0)){
                  $(".circle").addClass("left-right");
                  //every 10 seconds add a class
                  myVar = setTimeout(function () {
                    $(".circle").removeClass("left-right");
                  }, 8900);
                  myVar2 = setInterval(function () {
                    $(".circle").addClass("left-right");
                    //every 9 seconds remove class
                    myVar3 = setTimeout(function () {
                      $(".circle").removeClass("left-right");
                    }, 8900);
                  }, 9000);
                }
                console.log('this button15 is live')
                this.changeState(14, time6);
                setTimeout(function(){
                  buttonState[14] = false;
                  number[14] = 0;
                  this.deactivateButtons(14);
                  console.log('this button15 is dead')
                  this.activeOutputPorts(0, true);
                }.bind(this), time6);
                oldButton[0] = buttonValues[0];
              }else if(oldButton[0] === 127){
                // get lightbar activity
                if((checkLightbarbtn11[0] === 0) && (checkLightbarbtn11[1] === 0) && (checkLightbarbtn11[2] === 1)){
                  $('.circle').addClass('random');
                }
                else if((checkLightbarbtn11[0] === 1) && (checkLightbarbtn11[1] === 1) && (checkLightbarbtn11[2] === 0)){
                  $('.circle').addClass('middle-out');
                }
                else if((checkLightbarbtn11[0] === 0) && (checkLightbarbtn11[1] === 1) && (checkLightbarbtn11[2] === 0)){
                  $(".circle").addClass("right-left");
                  //every 10 seconds add a class
                  myVar4 = setTimeout(function () {
                    $(".circle").removeClass("right-left");
                  }, 8900);
                  myVar5 = setInterval(function () {
                    $(".circle").addClass("right-left");
                    //every 9 seconds remove class
                    myVar6 = setTimeout(function () {
                      $(".circle").removeClass("right-left");
                    }, 8900);
                  }, 9000);
                }
                else if((checkLightbarbtn11[0] === 1) && (checkLightbarbtn11[1] === 0) && (checkLightbarbtn11[2] === 0)){
                  $(".circle").addClass("left-right");
                  //every 10 seconds add a class
                  myVar = setTimeout(function () {
                    $(".circle").removeClass("left-right");
                  }, 8900);
                  myVar2 = setInterval(function () {
                    $(".circle").addClass("left-right");
                    //every 9 seconds remove class
                    myVar3 = setTimeout(function () {
                      $(".circle").removeClass("left-right");
                    }, 8900);
                  }, 9000);
                }
                console.log('this button16 is live')
                this.changeState(15, time6);
                setTimeout(function(){
                  buttonState[15] = false;
                  number[15] = 0;
                  this.deactivateButtons(15);
                  console.log('this button16 is dead')
                  this.activeOutputPorts(0, true);
                }.bind(this), time6);
                oldButton[0] = buttonValues[0];
              }
            }
          }
          else if(number[value11] === 4){
            if(momentaryMode11 === "OnOff"){
              this.changeState(value11, "0");
            }
          }
        }
        oldButton[0] = 0;
      }
    }
    oldButtonPressValues1[0] = buttonValues1[0];
    oldButtonPressValues[0] = buttonValues[0];
  }

  changeState = (button, timout) => {
    console.log('change state function!!!!!!!!')
    console.log('the button is: ' + button)
    const objects = this.state.buttons;
    var stringify = JSON.parse(objects);
    var checkLightbar = stringify.buttonOutputSettings[button].LightBar;
    var checktimer = stringify.buttonOutputSettings[button].ButtonType;
    var speakerbtn1 = ['','','','','','','','','','','','','',''];
    var audiobtn1 = ['','','','','','','',''];
    var wigwagbtn1 = ['','','','',''];
    var lightBarActivaterbtn1 = ['','','','','','','','','','','','','','',''];
    var realColor;
    //lights up the button if pressed
    //if timer is off
    if(checktimer === 'OnOff'){
      for (var p = 0; p < buttonState.length; p++) {
        if(button == p){
          //software buttons 16-18
          if((button === '16') || (button === '17') || (button === '18')){
            if(button === '16'){
              realColor = stringify.ButtonBackgroundColor[16];
              var color = realColor.toString();
              $('.wail').toggleClass('litButton2');
              if(color === 'defalut'){
                if($('.wail').hasClass('litButton2')){
                  $('div.topWail').css({
                    'background-image': 'linear-gradient(to right,#c5c5c5, #fafffe)'
                  });
                  $('.wail').addClass('defalut')
                  $('p.stylingWail').css({
                    'color': 'white'
                  });
                }else{
                  $('div.topWail').css({
                    'background-image': 'unset'
                  });
                  $('.wail').removeClass('defalut')
                  $('p.stylingWail').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Red'){
                if($('.wail').hasClass('litButton2')){
                  $('div.topWail').css({
                    'background-image': 'linear-gradient(to right,#ef0101, #ff6d6d)'
                  });
                  $('.wail').addClass('red')
                  $('p.stylingWail').css({
                    'color': '#ff0000'
                  });
                }else{
                  $('div.topWail').css({
                    'background-image': 'unset'
                  });
                  $('.wail').removeClass('red')
                  $('p.stylingWail').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Yellow'){
                if($('.wail').hasClass('litButton2')){
                  $('div.topWail').css({
                    'background-image': 'linear-gradient(to right,#ecff9b, #ffeb00)'
                  });
                  $('.wail').addClass('yellow')
                  $('p.stylingWail').css({
                    'color': 'yellow'
                  });
                }else{
                  $('div.topWail').css({
                    'background-image': 'unset'
                  });
                  $('.wail').removeClass('yellow')
                  $('p.stylingWail').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Green'){
                if($('.wail').hasClass('litButton2')){
                  $('div.topWail').css({
                    'background-image': 'linear-gradient(to right,#01ef94, #56ff00)'
                  });
                  $('.wail').addClass('green')
                  $('p.stylingWail').css({
                    'color': '#08ff08'
                  });
                }else{
                  $('div.topWail').css({
                    'background-image': 'unset'
                  });
                  $('.wail').removeClass('green')
                  $('p.stylingWail').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Purple'){
                if($('.wail').hasClass('litButton2')){
                  $('div.topWail').css({
                    'background-image': 'linear-gradient(to right,#ef01a9, #b400ff)'
                  });
                  $('.wail').addClass('purple')
                  $('p.stylingWail').css({
                    'color': '#ff0cff'
                  });
                }else{
                  $('div.topWail').css({
                    'background-image': 'unset'
                  });
                  $('.wail').removeClass('purple')
                  $('p.stylingWail').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'White'){
                if($('.wail').hasClass('litButton2')){
                  $('div.topWail').css({
                    'background-image': 'linear-gradient(to right,#c5c5c5, #fafffe)'
                  });
                  $('.wail').addClass('white')
                  $('p.stylingWail').css({
                    'color': 'white'
                  });
                }else{
                  $('div.topWail').css({
                    'background-image': 'unset'
                  });
                  $('.wail').removeClass('white')
                  $('p.stylingWail').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Blue'){
                if($('.wail').hasClass('litButton2')){
                  $('div.topWail').css({
                    'background-image': 'linear-gradient(to right,#01c2ef, #00ffce)'
                  });
                }else{
                  $('div.topWail').css({
                    'background-image': 'unset'
                  });
                }
              }
            }else if(button === '17'){
              color = stringify.ButtonBackgroundColor[17];
              $('.siren').toggleClass('litButton3');
              if(color === 'defalut'){
                if($('.siren').hasClass('litButton3')){
                  $('div.topSiren').css({
                    'background-image': 'linear-gradient(to right,#c5c5c5, #fafffe)'
                  });
                  $('.siren').addClass('defalut')
                  $('p.stylingSiren').css({
                    'color': 'white'
                  });
                }else{
                  $('div.topSiren').css({
                    'background-image': 'unset'
                  });
                  $('.siren').removeClass('defalut')
                  $('p.stylingSiren').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Red'){
                if($('.siren').hasClass('litButton3')){
                  $('div.topSiren').css({
                    'background-image': 'linear-gradient(to right,#ef0101, #ff6d6d)'
                  });
                  $('.siren').addClass('red')
                  $('p.stylingSiren').css({
                    'color': '#ff0000'
                  });
                }else{
                  $('div.topSiren').css({
                    'background-image': 'unset'
                  });
                  $('.siren').removeClass('red')
                  $('p.stylingSiren').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Yellow'){
                if($('.siren').hasClass('litButton3')){
                  $('div.topSiren').css({
                    'background-image': 'linear-gradient(to right,#ecff9b, #ffeb00)'
                  });
                  $('.siren').addClass('yellow')
                  $('p.stylingSiren').css({
                    'color': 'yellow'
                  });
                }else{
                  $('div.topSiren').css({
                    'background-image': 'unset'
                  });
                  $('.siren').removeClass('yellow')
                  $('p.stylingSiren').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Green'){
                if($('.siren').hasClass('litButton3')){
                  $('div.topSiren').css({
                    'background-image': 'linear-gradient(to right,#01ef94, #56ff00)'
                  });
                  $('.siren').addClass('green')
                  $('p.stylingSiren').css({
                    'color': '#08ff08'
                  });
                }else{
                  $('div.topSiren').css({
                    'background-image': 'unset'
                  });
                  $('.siren').removeClass('green')
                  $('p.stylingSiren').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Purple'){
                if($('.siren').hasClass('litButton3')){
                  $('div.topSiren').css({
                    'background-image': 'linear-gradient(to right,#ef01a9, #b400ff)'
                  });
                  $('.siren').addClass('purple')
                  $('p.stylingSiren').css({
                    'color': '#ff0cff'
                  });
                }else{
                  $('div.topSiren').css({
                    'background-image': 'unset'
                  });
                  $('.siren').removeClass('purple')
                  $('p.stylingSiren').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'White'){
                if($('.siren').hasClass('litButton3')){
                  $('div.topSiren').css({
                    'background-image': 'linear-gradient(to right,#c5c5c5, #fafffe)'
                  });
                  $('.siren').addClass('white')
                  $('p.stylingSiren').css({
                    'color': 'white'
                  });
                }else{
                  $('div.topSiren').css({
                    'background-image': 'unset'
                  });
                  $('.siren').removeClass('white')
                  $('p.stylingSiren').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Blue'){
                if($('.siren').hasClass('litButton3')){
                  $('div.topSiren').css({
                    'background-image': 'linear-gradient(to right,#01c2ef, #00ffce)'
                  });
                }else{
                  $('div.topSiren').css({
                    'background-image': 'unset'
                  });
                }
              }
            }else if(button === '18'){
              color = stringify.ButtonBackgroundColor[18];
              $('.spotlight').toggleClass('litButton4');
              if(color === 'defalut'){
                if($('.spotlight').hasClass('litButton4')){
                  $('div.topSL').css({
                    'background-image': 'linear-gradient(to right,#c5c5c5, #fafffe)'
                  });
                  $('.spotlight').addClass('defalut')
                  $('p.stylingSL').css({
                    'color': 'white'
                  });
                }else{
                  $('div.topSL').css({
                    'background-image': 'unset'
                  });
                  $('.spotlight').removeClass('defalut')
                  $('p.stylingSL').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Red'){
                if($('.spotlight').hasClass('litButton4')){
                  $('div.topSL').css({
                    'background-image': 'linear-gradient(to right,#ef0101, #ff6d6d)'
                  });
                  $('.spotlight').addClass('red')
                  $('p.stylingSL').css({
                    'color': '#ff0000'
                  });
                }else{
                  $('div.topSL').css({
                    'background-image': 'unset'
                  });
                  $('.spotlight').removeClass('red')
                  $('p.stylingSL').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Yellow'){
                if($('.spotlight').hasClass('litButton4')){
                  $('div.topSL').css({
                    'background-image': 'linear-gradient(to right,#ecff9b, #ffeb00)'
                  });
                  $('.spotlight').addClass('yellow')
                  $('p.stylingSL').css({
                    'color': 'yellow'
                  });
                }else{
                  $('div.topSL').css({
                    'background-image': 'unset'
                  });
                  $('.spotlight').removeClass('yellow')
                  $('p.stylingSL').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Green'){
                if($('.spotlight').hasClass('litButton4')){
                  $('div.topSL').css({
                    'background-image': 'linear-gradient(to right,#01ef94, #56ff00)'
                  });
                  $('.spotlight').addClass('green')
                  $('p.stylingSL').css({
                    'color': '#08ff08'
                  });
                }else{
                  $('div.topSL').css({
                    'background-image': 'unset'
                  });
                  $('.spotlight').removeClass('green')
                  $('p.stylingSL').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Purple'){
                if($('.spotlight').hasClass('litButton4')){
                  $('div.topSL').css({
                    'background-image': 'linear-gradient(to right,#ef01a9, #b400ff)'
                  });
                  $('.spotlight').addClass('purple')
                  $('p.stylingSL').css({
                    'color': '#ff0cff'
                  });
                }else{
                  $('div.topSL').css({
                    'background-image': 'unset'
                  });
                  $('.spotlight').removeClass('purple')
                  $('p.stylingSL').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'White'){
                if($('.spotlight').hasClass('litButton4')){
                  $('div.topSL').css({
                    'background-image': 'linear-gradient(to right,#c5c5c5, #fafffe)'
                  });
                  $('.spotlight').addClass('white')
                  $('p.stylingSL').css({
                    'color': 'white'
                  });
                }else{
                  $('div.topSL').css({
                    'background-image': 'unset'
                  });
                  $('.spotlight').removeClass('white')
                  $('p.stylingSL').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Blue'){
                if($('.spotlight').hasClass('litButton4')){
                  $('div.topSL').css({
                    'background-image': 'linear-gradient(to right,#01c2ef, #00ffce)'
                  });
                }else{
                  $('div.topSL').css({
                    'background-image': 'unset'
                  });
                }
              }
            }
////////////////////////////change according to the lightbar sceme //////////////////////
            if((checkLightbar[0] === 0) && (checkLightbar[1] === 0) && (checkLightbar[2] === 1)){
              this.random();
            }
            else if((checkLightbar[0] === 1) && (checkLightbar[1] === 1) && (checkLightbar[2] === 0)){
              this.middle_out();
            }
            else if((checkLightbar[0] === 0) && (checkLightbar[1] === 1) && (checkLightbar[2] === 0)){
              this.right_left();
            }
            else if((checkLightbar[0] === 1) && (checkLightbar[1] === 0) && (checkLightbar[2] === 0)){
              this.left_right();
            }
            if(buttonState[p] === true){
              buttonState[p] = false;
            }else{
              buttonState[p] = true;
              speakerbtn1[p] = stringify.buttonOutputSettings[button].speaker;
              ipcRenderer.send('speaker', speakerbtn1[p])
    
              audiobtn1[p] = stringify.buttonOutputSettings[button].speaker.Audio;
              ipcRenderer.send('audio', audiobtn1[p])
    
              wigwagbtn1[p] = stringify.buttonOutputSettings[button].WigWag;
              ipcRenderer.send('wigwag', wigwagbtn1[p])
    
              lightBarActivaterbtn1[p] = stringify.buttonOutputSettings[button].LightBar;
              ipcRenderer.send('lightBarActivate', lightBarActivaterbtn1[p])
            }
            this.traverseBtns(button);
            break;
          }
          //hardware buttons 0-15
          else{
            if((checkLightbar[0] === 0) && (checkLightbar[1] === 0) && (checkLightbar[2] === 1)){
              this.random();
            }
            else if((checkLightbar[0] === 1) && (checkLightbar[1] === 1) && (checkLightbar[2] === 0)){
              this.middle_out();
            }
            else if((checkLightbar[0] === 0) && (checkLightbar[1] === 1) && (checkLightbar[2] === 0)){
              this.right_left();
            }
            else if((checkLightbar[0] === 1) && (checkLightbar[1] === 0) && (checkLightbar[2] === 0)){
              this.left_right();
            }
            if(buttonState[p] === true){
              if(number[p] === 4){
                number[p] = 0;
                buttonState[p] = false;
              }
            }else{
              if(number[p] === 1){
                buttonState[p] = true;
                number[p] = 2;
                speakerbtn1[p] = stringify.buttonOutputSettings[button].speaker;
                ipcRenderer.send('speaker', speakerbtn1[p])
      
                audiobtn1[p] = stringify.buttonOutputSettings[button].speaker.Audio;
                ipcRenderer.send('audio', audiobtn1[p])
      
                wigwagbtn1[p] = stringify.buttonOutputSettings[button].WigWag;
                ipcRenderer.send('wigwag', wigwagbtn1[p])
      
                lightBarActivaterbtn1[p] = stringify.buttonOutputSettings[button].LightBar;
                ipcRenderer.send('lightBarActivate', lightBarActivaterbtn1[p])
              }
            }
            this.traverseBtns(button);
            break;
          }
        }
      }
    }
    //if a timer
    if(timout !== '0'){
      console.log('timeout timer')
      for (var a = 0; a < 20; a++) {
        if(button == a){
          if((button === '16' || button === '17' || button === '18') && (buttonState[a] === false)){
            buttonState[a] = true;
            console.log(button)
            if(button === '16'){
              realColor = stringify.ButtonBackgroundColor[16];
              var color = realColor.toString();
              $('.wail').toggleClass('litButton2');
              if(color === 'defalut'){
                if($('.wail').hasClass('litButton2')){
                  this.traverseBtns(button);
                  $('div.topWail').css({
                    'background-image': 'linear-gradient(to right,#c5c5c5, #fafffe)'
                  });
                  $('.wail').addClass('defalut')
                  $('p.stylingWail').css({
                    'color': 'white'
                  });
                }else{
                  $('div.topWail').css({
                    'background-image': 'unset'
                  });
                  $('.wail').removeClass('defalut')
                  $('p.stylingWail').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Red'){
                if($('.wail').hasClass('litButton2')){
                  this.traverseBtns(button);
                  $('div.topWail').css({
                    'background-image': 'linear-gradient(to right,#ef0101, #ff6d6d)'
                  });
                  $('.wail').addClass('red')
                  $('p.stylingWail').css({
                    'color': '#ff0000'
                  });
                }else{
                  $('div.topWail').css({
                    'background-image': 'unset'
                  });
                  $('.wail').removeClass('red')
                  $('p.stylingWail').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Yellow'){
                if($('.wail').hasClass('litButton2')){
                  this.traverseBtns(button);
                  $('div.topWail').css({
                    'background-image': 'linear-gradient(to right,#ecff9b, #ffeb00)'
                  });
                  $('.wail').addClass('yellow')
                  $('p.stylingWail').css({
                    'color': 'yellow'
                  });
                }else{
                  $('div.topWail').css({
                    'background-image': 'unset'
                  });
                  $('.wail').removeClass('yellow')
                  $('p.stylingWail').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Green'){
                if($('.wail').hasClass('litButton2')){
                  this.traverseBtns(button);
                  $('div.topWail').css({
                    'background-image': 'linear-gradient(to right,#01ef94, #56ff00)'
                  });
                  $('.wail').addClass('green')
                  $('p.stylingWail').css({
                    'color': '#08ff08'
                  });
                }else{
                  $('div.topWail').css({
                    'background-image': 'unset'
                  });
                  $('.wail').removeClass('green')
                  $('p.stylingWail').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Purple'){
                if($('.wail').hasClass('litButton2')){
                  this.traverseBtns(button);
                  $('div.topWail').css({
                    'background-image': 'linear-gradient(to right,#ef01a9, #b400ff)'
                  });
                  $('.wail').addClass('purple')
                  $('p.stylingWail').css({
                    'color': '#ff0cff'
                  });
                }else{
                  $('div.topWail').css({
                    'background-image': 'unset'
                  });
                  $('.wail').removeClass('purple')
                  $('p.stylingWail').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'White'){
                if($('.wail').hasClass('litButton2')){
                  this.traverseBtns(button);
                  $('div.topWail').css({
                    'background-image': 'linear-gradient(to right,#c5c5c5, #fafffe)'
                  });
                  $('.wail').addClass('white')
                  $('p.stylingWail').css({
                    'color': 'white'
                  });
                }else{
                  $('div.topWail').css({
                    'background-image': 'unset'
                  });
                  $('.wail').removeClass('white')
                  $('p.stylingWail').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Blue'){
                if($('.wail').hasClass('litButton2')){
                  this.traverseBtns(button);
                  $('div.topWail').css({
                    'background-image': 'linear-gradient(to right,#01c2ef, #00ffce)'
                  });
                }else{
                  $('div.topWail').css({
                    'background-image': 'unset'
                  });
                }
              }
              setTimeout(function(){
                $('.wail').removeClass('litButton2');
                $('.wail').removeClass('green');
                $('.wail').removeClass('red');
                $('.wail').removeClass('defalut');
                $('.wail').removeClass('purple');
                $('.wail').removeClass('white');
                $('.wail').removeClass('yellow');
                $('div.topWail').css({
                  'background-image': 'unset'
                });
                $('.wail').removeClass('white')
                $('p.stylingWail').css({
                  'color': 'white'
                });
                document.getElementById("button1").disabled = true;
                buttonState[a] = false;
              }, timout);
              break;
            }else if(button === '17'){
              color = stringify.ButtonBackgroundColor[17];
              $('.siren').toggleClass('litButton3');
              if(color === 'defalut'){
                if($('.siren').hasClass('litButton3')){
                  this.traverseBtns(button);
                  $('div.topSiren').css({
                    'background-image': 'linear-gradient(to right,#c5c5c5, #fafffe)'
                  });
                  $('.siren').addClass('defalut')
                  $('p.stylingSiren').css({
                    'color': 'white'
                  });
                }else{
                  $('div.topSiren').css({
                    'background-image': 'unset'
                  });
                  $('.siren').removeClass('defalut')
                  $('p.stylingSiren').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Red'){
                if($('.siren').hasClass('litButton3')){
                  this.traverseBtns(button);
                  $('div.topSiren').css({
                    'background-image': 'linear-gradient(to right,#ef0101, #ff6d6d)'
                  });
                  $('.siren').addClass('red')
                  $('p.stylingSiren').css({
                    'color': '#ff0000'
                  });
                }else{
                  $('div.topSiren').css({
                    'background-image': 'unset'
                  });
                  $('.siren').removeClass('red')
                  $('p.stylingSiren').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Yellow'){
                if($('.siren').hasClass('litButton3')){
                  this.traverseBtns(button);
                  $('div.topSiren').css({
                    'background-image': 'linear-gradient(to right,#ecff9b, #ffeb00)'
                  });
                  $('.siren').addClass('yellow')
                  $('p.stylingSiren').css({
                    'color': 'yellow'
                  });
                }else{
                  $('div.topSiren').css({
                    'background-image': 'unset'
                  });
                  $('.siren').removeClass('yellow')
                  $('p.stylingSiren').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Green'){
                if($('.siren').hasClass('litButton3')){
                  this.traverseBtns(button);
                  $('div.topSiren').css({
                    'background-image': 'linear-gradient(to right,#01ef94, #56ff00)'
                  });
                  $('.siren').addClass('green')
                  $('p.stylingSiren').css({
                    'color': '#08ff08'
                  });
                }else{
                  $('div.topSiren').css({
                    'background-image': 'unset'
                  });
                  $('.siren').removeClass('green')
                  $('p.stylingSiren').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Purple'){
                if($('.siren').hasClass('litButton3')){
                  this.traverseBtns(button);
                  $('div.topSiren').css({
                    'background-image': 'linear-gradient(to right,#ef01a9, #b400ff)'
                  });
                  $('.siren').addClass('purple')
                  $('p.stylingSiren').css({
                    'color': '#ff0cff'
                  });
                }else{
                  $('div.topSiren').css({
                    'background-image': 'unset'
                  });
                  $('.siren').removeClass('purple')
                  $('p.stylingSiren').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'White'){
                if($('.siren').hasClass('litButton3')){
                  this.traverseBtns(button);
                  $('div.topSiren').css({
                    'background-image': 'linear-gradient(to right,#c5c5c5, #fafffe)'
                  });
                  $('.siren').addClass('white')
                  $('p.stylingSiren').css({
                    'color': 'white'
                  });
                }else{
                  $('div.topSiren').css({
                    'background-image': 'unset'
                  });
                  $('.siren').removeClass('white')
                  $('p.stylingSiren').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Blue'){
                if($('.siren').hasClass('litButton3')){
                  this.traverseBtns(button);
                  $('div.topSiren').css({
                    'background-image': 'linear-gradient(to right,#01c2ef, #00ffce)'
                  });
                }else{
                  $('div.topSiren').css({
                    'background-image': 'unset'
                  });
                }
              }
              setTimeout(function(){
                $('.siren').removeClass('litButton3');
                $('.siren').removeClass('green');
                $('.siren').removeClass('red');
                $('.siren').removeClass('defalut');
                $('.siren').removeClass('purple');
                $('.siren').removeClass('white');
                $('.siren').removeClass('yellow');
                $('div.topSiren').css({
                  'background-image': 'unset'
                });
                $('.siren').removeClass('white')
                $('p.stylingSiren').css({
                  'color': 'white'
                });
                document.getElementById("button2").disabled = true;
                buttonState[a] = false;
              }, timout);
              break;
            }else if(button === '18'){
              color = stringify.ButtonBackgroundColor[18];
              $('.spotlight').toggleClass('litButton4');
              if(color === 'defalut'){
                if($('.spotlight').hasClass('litButton4')){
                  this.traverseBtns(button);
                  $('div.topSL').css({
                    'background-image': 'linear-gradient(to right,#c5c5c5, #fafffe)'
                  });
                  $('.spotlight').addClass('defalut')
                  $('p.stylingSL').css({
                    'color': 'white'
                  });
                }else{
                  $('div.topSL').css({
                    'background-image': 'unset'
                  });
                  $('.spotlight').removeClass('defalut')
                  $('p.stylingSL').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Red'){
                if($('.spotlight').hasClass('litButton4')){
                  this.traverseBtns(button);
                  $('div.topSL').css({
                    'background-image': 'linear-gradient(to right,#ef0101, #ff6d6d)'
                  });
                  $('.spotlight').addClass('red')
                  $('p.stylingSL').css({
                    'color': '#ff0000'
                  });
                }else{
                  $('div.topSL').css({
                    'background-image': 'unset'
                  });
                  $('.spotlight').removeClass('red')
                  $('p.stylingSL').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Yellow'){
                if($('.spotlight').hasClass('litButton4')){
                  this.traverseBtns(button);
                  $('div.topSL').css({
                    'background-image': 'linear-gradient(to right,#ecff9b, #ffeb00)'
                  });
                  $('.spotlight').addClass('yellow')
                  $('p.stylingSL').css({
                    'color': 'yellow'
                  });
                }else{
                  $('div.topSL').css({
                    'background-image': 'unset'
                  });
                  $('.spotlight').removeClass('yellow')
                  $('p.stylingSL').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Green'){
                if($('.spotlight').hasClass('litButton4')){
                  this.traverseBtns(button);
                  $('div.topSL').css({
                    'background-image': 'linear-gradient(to right,#01ef94, #56ff00)'
                  });
                  $('.spotlight').addClass('green')
                  $('p.stylingSL').css({
                    'color': '#08ff08'
                  });
                }else{
                  $('div.topSL').css({
                    'background-image': 'unset'
                  });
                  $('.spotlight').removeClass('green')
                  $('p.stylingSL').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Purple'){
                if($('.spotlight').hasClass('litButton4')){
                  this.traverseBtns(button);
                  $('div.topSL').css({
                    'background-image': 'linear-gradient(to right,#ef01a9, #b400ff)'
                  });
                  $('.spotlight').addClass('purple')
                  $('p.stylingSL').css({
                    'color': '#ff0cff'
                  });
                }else{
                  $('div.topSL').css({
                    'background-image': 'unset'
                  });
                  $('.spotlight').removeClass('purple')
                  $('p.stylingSL').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'White'){
                if($('.spotlight').hasClass('litButton4')){
                  this.traverseBtns(button);
                  $('div.topSL').css({
                    'background-image': 'linear-gradient(to right,#c5c5c5, #fafffe)'
                  });
                  $('.spotlight').addClass('white')
                  $('p.stylingSL').css({
                    'color': 'white'
                  });
                }else{
                  $('div.topSL').css({
                    'background-image': 'unset'
                  });
                  $('.spotlight').removeClass('white')
                  $('p.stylingSL').css({
                    'color': 'white'
                  });
                }
              }else if (color === 'Blue'){
                if($('.spotlight').hasClass('litButton4')){
                  this.traverseBtns(button);
                  $('div.topSL').css({
                    'background-image': 'linear-gradient(to right,#01c2ef, #00ffce)'
                  });
                }else{
                  $('div.topSL').css({
                    'background-image': 'unset'
                  });
                }
              }
              setTimeout(function(){
                $('.spotlight').removeClass('litButton4');
                $('.spotlight').removeClass('green');
                $('.spotlight').removeClass('red');
                $('.spotlight').removeClass('defalut');
                $('.spotlight').removeClass('purple');
                $('.spotlight').removeClass('white');
                $('.spotlight').removeClass('yellow');
                $('div.topSL').css({
                  'background-image': 'unset'
                });
                $('.spotlight').removeClass('white')
                $('p.stylingSL').css({
                  'color': 'white'
                });
                document.getElementById("button3").disabled = true;
                buttonState[a] = false;
              }, timout);
              break;
            }
            if((checkLightbar[0] === 0) && (checkLightbar[1] === 0) && (checkLightbar[2] === 1)){
              this.random();
            }
            else if((checkLightbar[0] === 1) && (checkLightbar[1] === 1) && (checkLightbar[2] === 0)){
              this.middle_out();
            }
            else if((checkLightbar[0] === 0) && (checkLightbar[1] === 1) && (checkLightbar[2] === 0)){
              this.right_left();
            }
            else if((checkLightbar[0] === 1) && (checkLightbar[1] === 0) && (checkLightbar[2] === 0)){
              this.left_right();
            }
            speakerbtn1[p] = stringify.buttonOutputSettings[button].speaker;
            ipcRenderer.send('speaker', speakerbtn1[p])
  
            audiobtn1[p] = stringify.buttonOutputSettings[button].speaker.Audio;
            ipcRenderer.send('audio', audiobtn1[p])
  
            wigwagbtn1[p] = stringify.buttonOutputSettings[button].WigWag;
            ipcRenderer.send('wigwag', wigwagbtn1[p])
  
            lightBarActivaterbtn1[p] = stringify.buttonOutputSettings[button].LightBar;
            ipcRenderer.send('lightBarActivate', lightBarActivaterbtn1[p])
          }
          else{
            if(number[a] === 1){
              buttonState[a] = true;
              number[a] = 2;
              speakerbtn1[p] = stringify.buttonOutputSettings[button].speaker;
              ipcRenderer.send('speaker', speakerbtn1[p])
    
              audiobtn1[p] = stringify.buttonOutputSettings[button].speaker.Audio;
              ipcRenderer.send('audio', audiobtn1[p])
    
              wigwagbtn1[p] = stringify.buttonOutputSettings[button].WigWag;
              ipcRenderer.send('wigwag', wigwagbtn1[p])
    
              lightBarActivaterbtn1[p] = stringify.buttonOutputSettings[button].LightBar;
              ipcRenderer.send('lightBarActivate', lightBarActivaterbtn1[p])

              this.traverseBtns(button);
              break;
            }
          }
        }
      }
    }
    //if momentary
    if(checktimer === 'Momentary'){
      console.log('Momentary')
      for (var z = 0; z < 20; z++) {
        if(buttonState[z] === true){
          if(button == z){
            if(number[z] === 0){
              number[z] = 0;
              buttonState[z] = false;
              this.activeOutputPorts(0, true);
              break;
            }
          }
        }else{
          if(button == z){
            buttonState[z] = true;
            number[z] = 2;

            speakerbtn1[z] = stringify.buttonOutputSettings[button].speaker;
            ipcRenderer.send('speaker', speakerbtn1[z])
  
            audiobtn1[z] = stringify.buttonOutputSettings[button].speaker.Audio;
            ipcRenderer.send('audio', audiobtn1[z])
  
            wigwagbtn1[z] = stringify.buttonOutputSettings[button].WigWag;
            ipcRenderer.send('wigwag', wigwagbtn1[z])
  
            lightBarActivaterbtn1[z] = stringify.buttonOutputSettings[button].LightBar;
            ipcRenderer.send('lightBarActivate', lightBarActivaterbtn1[z])

            this.traverseBtns(button);
            break;
          }
        }
      }
    }
  }

  ///////////////Traffic Advisor////////////////////
    /* RANDOM */
    random(e) {
      $('.circle').toggleClass('random');
    }

    /* left-right */
    left_right(e) {
      $(".circle").toggleClass("left-right");
      if ($('.circle').hasClass("left-right") === true) {
        this.left_rightTimer();
      } 
      else {
        this.clearTimer();
      }
    }
    

    left_rightTimer() {
      //every 10 seconds add a class
      myVar = setTimeout(function () {
        $(".circle").removeClass("left-right");
      }, 8900);
      myVar2 = setInterval(function () {
        $(".circle").addClass("left-right");
        //every 9 seconds remove class
        myVar3 = setTimeout(function () {
          $(".circle").removeClass("left-right");
        }, 8900);
      }, 9000);
    }

    clearTimer() {
      clearTimeout(myVar);
      clearInterval(myVar2);
      clearTimeout(myVar3);
      clearTimeout(myVar4);
      clearTimeout(myVar6);
      clearInterval(myVar5);
    }

    /* RIGHT TO LEFT */
    right_left(e) {
      $(".circle").toggleClass("right-left");
      if ($('.circle').hasClass("right-left") === true) {
        this.right_leftTimer();
      } 
      else {
        this.clearTimer();
      }
    }

    right_leftTimer(){
      //every 10 seconds add a class
      myVar4 = setTimeout(function () {
        $(".circle").removeClass("right-left");
      }, 8900);
      myVar5 = setInterval(function () {
        $(".circle").addClass("right-left");
        //every 9 seconds remove class
        myVar6 = setTimeout(function () {
          $(".circle").removeClass("right-left");
        }, 8900);
      }, 9000);
    }


    /* MIDDLE TO OUT */
    middle_out(e) {
      $('.circle').toggleClass('middle-out');
    }
    ///////////////END of Traffic Advisor////////////////////

    //only for the touch screen buttons
    time = (buttonSelected) => {
      console.log("time function")
      console.log(buttonSelected)
      const objects = this.state.buttons;
      var stringify = JSON.parse(objects);
      var whichButton = stringify.buttonOutputSettings[buttonSelected];
      console.log(whichButton)

      //if the seconds is on
      if(whichButton.ButtonTimerValue !== 0){
        var time = whichButton.ButtonTimerValue * 1000;
        this.changeState(buttonSelected, time);
      }
      //if the momentary is on
      else if(whichButton.ButtonType === 'Momentary'){
        console.log('Momentary')
        var timer = "0";




        console.log(count)
        console.log(count1)
        console.log(count2)

        if(buttonSelected === '16'){
          if(count === 0){
            $('.wail').addClass('litButton2');
            this.changeState(buttonSelected, timer);
            count = 1;
          }else{
            $('button#button1').unbind('mousedown').mousedown(function(){
              $('.wail').addClass('litButton2');
              this.changeState(buttonSelected, timer);
            });
          }
        }
        
        
        
        
        
        else if(buttonSelected === '17'){
          if(count1 === 0){
            $('.siren').addClass('litButton3');
            this.changeState(buttonSelected, timer);
            count1 = 1;
          }else{
            $('button#button2').unbind('mousedown').mousedown(function(){
              $('.siren').addClass('litButton3');
              this.changeState(buttonSelected, timer);
            });
          }
        }
        
        
        
        
        
        else if(buttonSelected === '18'){
          if(count2 === 0){
            $('.spotlight').addClass('litButton4');
            this.changeState(buttonSelected, timer);
            count2 = 1;
          }else{
            $('button#button3').unbind('mousedown').mousedown(function(){
              $('.spotlight').addClass('litButton4');
              this.changeState(buttonSelected, timer);
            });
          }
        }
        //remove class when mouse up
        if((buttonSelected === '16') && (count !== 1)){
          $('.wail').removeClass('litButton2');
        }else if((buttonSelected === '17') && (count1 !== 1)){
          $('.siren').removeClass('litButton3');
        }else if((buttonSelected === '18') && (count2 !== 1)){
          $('.spotlight').removeClass('litButton4');
        }
        count = 2;
        count1 = 2;
        count2 = 2;
      }
      else{
        //if no time
        this.changeState(buttonSelected, "0");
      }
    }

    traverseBtns = (button) =>{
      console.log(buttonState)
      console.log('traverse buttons function');
      const objects = this.state.buttons;
      var stringify = JSON.parse(objects);
      var activeBtns = [];
      for (var q = 0; q < buttonState.length; q++) {
        //traverse buttons, get the ones turned on
        //if its turned on
        if(buttonState[q] == true){
          //check button and get deactivated states
          var deactivate = stringify.buttonOutputSettings[button].DeActivateButtons;
          var output = stringify.buttonOutputSettings[button].ActivePorts;
          //if number is not being deactivated
          if(deactivate[q] == false ){
            for (var e = 0; e < output.length -1; e++) {
              if(output[e] == true){
                //if array has the output already, ignore. 
                if(activeBtns.includes(e)){
                  //do nothing
                }
                else{
                  activeBtns.push(e)
                }
              }
            }
          }
          //deactivate button
          else{
            this.deactivateButtons(button);
            console.log('not adding ' + button)
            buttonState[q] = false;
          }
        }
      }
      //get the array on buttons that are turned on
      console.log(activeBtns)
      this.sort(activeBtns);
    }
    //bubble sort the outputs of all active btns
    sort = (values) =>{
    console.log('sorting output function');
      var origValues = values.slice();
      var length = origValues.length - 1;
      do {
        var swapped = false;
        for(var r = 0; r < length; ++r) {
          if (origValues[r] > origValues[r+1]) {
            var temp = origValues[r];
            origValues[r] = origValues[r+1];
            origValues[r+1] = temp;
            swapped = true;
          }
        }
      }
      while(swapped === true);
      console.log(origValues)
      this.activeOutputPorts(origValues);
    }

    //adding up ports and passing it to IPC MAIN to turn on
    activeOutputPorts = (outputs, moment) =>{
      console.log("active output ports");
      var bit1 = 0;
      var bit2 = 0;
      var bit3 = 0;
      if(moment!== true){
        for(var t = 0; t < outputs.length; ++t) {
          if(outputs[t] === 0){
            console.log('output 1')
            var one1 = 128
            var two1 = 0
            var three1 = 0
            bit1 = one1 + bit1;
            bit2 = two1 + bit2;
            bit3 = three1 + bit3;
            console.log(bit1, bit2, bit3)
          }else if(outputs[t] === 1){
            console.log('output 2')
            var one2 = 64
            var two2 = 0
            var three2 = 0
            bit1 = one2 + bit1;
            bit2 = two2 + bit2;
            bit3 = three2 + bit3;
            console.log(bit1, bit2, bit3)
          }else if(outputs[t] === 2){
            console.log('output 3')
            var one3 = 32
            var two3 = 0
            var three3 = 0
            bit1 = one3 + bit1;
            bit2 = two3 + bit2;
            bit3 = three3 + bit3;
            console.log(bit1, bit2, bit3)
          }else if(outputs[t] === 3){
            console.log('output 4')
            var one4 = 16
            var two4 = 0
            var three4 = 0
            bit1 = one4 + bit1;
            bit2 = two4 + bit2;
            bit3 = three4 + bit3;
            console.log(bit1, bit2, bit3)
          }else if(outputs[t] === 4){
            console.log('output 5')
            var one5 = 8
            var two5 = 0
            var three5 = 0
            bit1 = one5 + bit1;
            bit2 = two5 + bit2;
            bit3 = three5 + bit3;
            console.log(bit1, bit2, bit3)
          }else if(outputs[t] === 5){
            console.log('output 6')
            var one6 = 4
            var two6 = 0
            var three6 = 0
            bit1 = one6 + bit1;
            bit2 = two6 + bit2;
            bit3 = three6 + bit3;
            console.log(bit1, bit2, bit3)
          }else if(outputs[t] === 6){
            console.log('output 7')
            var one7 = 2
            var two7 = 0
            var three7 = 0
            bit1 = one7 + bit1;
            bit2 = two7 + bit2;
            bit3 = three7 + bit3;
            console.log(bit1, bit2, bit3)
          }else if(outputs[t] === 7){
            console.log('output 8')
            var one8 = 1
            var two8 = 0
            var three8 = 0
            bit1 = one8 + bit1;
            bit2 = two8 + bit2;
            bit3 = three8 + bit3;
            console.log(bit1, bit2, bit3)
          }else if(outputs[t] === 8){
            console.log('output 9')
            var one9 = 0
            var two9 = 128
            var three9 = 0
            bit1 = one9 + bit1;
            bit2 = two9 + bit2;
            bit3 = three9 + bit3;
            console.log(bit1, bit2, bit3)
          }else if(outputs[t] === 9){
            console.log('output 10')
            var one10 = 0
            var two10 = 64
            var three10 = 0
            bit1 = one10 + bit1;
            bit2 = two10 + bit2;
            bit3 = three10 + bit3;
            console.log(bit1, bit2, bit3)
          }else if(outputs[t] === 10){
            console.log('output 11')
            var one11 = 0
            var two11 = 32
            var three11 = 0
            bit1 = one11 + bit1;
            bit2 = two11 + bit2;
            bit3 = three11 + bit3;
            console.log(bit1, bit2, bit3)
          }else if(outputs[t] === 11){
            console.log('output 12')
            var one12 = 0
            var two12 = 16
            var three12 = 0
            bit1 = one12 + bit1;
            bit2 = two12 + bit2;
            bit3 = three12 + bit3;
            console.log(bit1, bit2, bit3)
          }else if(outputs[t] === 12){
            console.log('output 13')
            var one13 = 0
            var two13 = 8
            var three13 = 0
            bit1 = one13 + bit1;
            bit2 = two13 + bit2;
            bit3 = three13 + bit3;
            console.log(bit1, bit2, bit3)
          }else if(outputs[t] === 13){
            console.log('output 14')
            var one14 = 0
            var two14 = 4
            var three14 = 0
            bit1 = one14 + bit1;
            bit2 = two14 + bit2;
            bit3 = three14 + bit3;
            console.log(bit1, bit2, bit3)
          }else if(outputs[t] === 14){
            console.log('output 15')
            var one15 = 0
            var two15 = 2
            var three15 = 0
            bit1 = one15 + bit1;
            bit2 = two15 + bit2;
            bit3 = three15 + bit3;
            console.log(bit1, bit2, bit3)
          }else if(outputs[t] === 15){
            console.log('output 16')
            var one16 = 0
            var two16 = 1
            var three16 = 0
            bit1 = one16 + bit1;
            bit2 = two16 + bit2;
            bit3 = three16 + bit3;
            console.log(bit1, bit2, bit3)
          }else if(outputs[t] === 16){
            console.log('output 17')
            var one17 = 0
            var two17 = 0
            var three17 = 128
            bit1 = one17 + bit1;
            bit2 = two17 + bit2;
            bit3 = three17 + bit3;
            console.log(bit1, bit2, bit3)
          }else if(outputs[t] === 17){
            console.log('output 18')
            var one18 = 0
            var two18 = 0
            var three18 = 64
            bit1 = one18 + bit1;
            bit2 = two18 + bit2;
            bit3 = three18 + bit3;
            console.log(bit1, bit2, bit3)
          }else if(outputs[t] === 18){
            console.log('output 19')
            var one19 = 0
            var two19 = 0
            var three19 = 32
            bit1 = one19 + bit1;
            bit2 = two19 + bit2;
            bit3 = three19 + bit3;
            console.log(bit1, bit2, bit3)
          }else if(outputs[t] === 19){
            console.log('output 20')
            var one20 = 0
            var two20 = 0
            var three20 = 16
            bit1 = one20 + bit1;
            bit2 = two20 + bit2;
            bit3 = three20 + bit3;
            console.log(bit1, bit2, bit3)
          }else if(outputs[t] === 20){
            console.log('output 21')
            var one21 = 0
            var two21 = 0
            var three21 = 8
            bit1 = one21 + bit1;
            bit2 = two21 + bit2;
            bit3 = three21 + bit3;
            console.log(bit1, bit2, bit3)
          }else if(outputs[t] === 21){
            console.log('output 22')
            var one22 = 0
            var two22 = 0
            var three22 = 4
            bit1 = one22 + bit1;
            bit2 = two22 + bit2;
            bit3 = three22 + bit3;
            console.log(bit1, bit2, bit3)
          }else if(outputs[t] === 22){
            console.log('output 23')
            var one23 = 0
            var two23 = 0
            var three23 = 2
            bit1 = one23 + bit1;
            bit2 = two23 + bit2;
            bit3 = three23 + bit3;
            console.log(bit1, bit2, bit3)
          }else if(outputs[t] === 23){
            console.log('output 24')
            var one24 = 0
            var two24 = 0
            var three24 = 1
            bit1 = one24 + bit1;
            bit2 = two24 + bit2;
            bit3 = three24 + bit3;
            console.log(bit1, bit2, bit3)
          }
        }
      }
      console.log(bit1, bit2, bit3)
      console.log(buttonState);
      ipcRenderer.send('outputs', bit1, bit2, bit3)
    }


    //deactivates the buttons
    deactivateButtons = (button) => {
      console.log(button)
      const objects = this.state.buttons;
      var stringify = JSON.parse(objects);
      var deactivateButtons = stringify.buttonOutputSettings[button].DeActivateButtons;
      //deactivating button {?}
      if(button === "1"){
        console.log("button1")
        $('.wail').removeClass('litButton2');
        document.getElementById("button1").disabled = true;
        $('.circle').removeClass('random');
        $(".circle").removeClass("left-right");
        $(".circle").removeClass("right-left");
        $('.circle').removeClass('middle-out');
        this.clearTimer();
      }
      else if(button === "2"){
        console.log("button2")
        $('.siren').removeClass('litButton3');
        document.getElementById("button2").disabled = true;
        $('.circle').removeClass('random');
        $(".circle").removeClass("left-right");
        $(".circle").removeClass("right-left");
        $('.circle').removeClass('middle-out');
        this.clearTimer();
      }
      else if(button === "3"){
        console.log("button3")
        $('.spotlight').removeClass('litButton4');
        document.getElementById("button3").disabled = true;
        $('.circle').removeClass('random');
        $(".circle").removeClass("left-right");
        $(".circle").removeClass("right-left");
        $('.circle').removeClass('middle-out');
        this.clearTimer();
      }
      else{
        $('.circle').removeClass('random');
        $(".circle").removeClass("left-right");
        $(".circle").removeClass("right-left");
        $('.circle').removeClass('middle-out');
        this.clearTimer();
      }
      //get all oputputs of {?} when it's deactivated
      for (var i = 0; i < 35; i++) {
        if(deactivateButtons[i] === true){
          console.log(i)
          if(0 === i){
            console.log("button1")
            $('.wail').removeClass('litButton2');
            document.getElementById("button1").disabled = true;
            $('.circle').removeClass('random');
            $(".circle").removeClass("left-right");
            $(".circle").removeClass("right-left");
            $('.circle').removeClass('middle-out');
            this.clearTimer();
          }
          if(1 === i){
            console.log("button2")
            $('.siren').removeClass('litButton3');
            document.getElementById("button2").disabled = true;
            $('.circle').removeClass('random');
            $(".circle").removeClass("left-right");
            $(".circle").removeClass("right-left");
            $('.circle').removeClass('middle-out');
            this.clearTimer();
          }
          if(2 === i){
            console.log("button3")
            $('.spotlight').removeClass('litButton4');
            document.getElementById("button3").disabled = true;
            $('.circle').removeClass('random');
            $(".circle").removeClass("left-right");
            $(".circle").removeClass("right-left");
            $('.circle').removeClass('middle-out');
            this.clearTimer();
          }
          if(i > 2){
            $('.circle').removeClass('random');
            $(".circle").removeClass("left-right");
            $(".circle").removeClass("right-left");
            $('.circle').removeClass('middle-out');
            this.clearTimer();
          }
        } 
      }
    }
  //sending LED colors to firmware
  backgroundColors = (e) => {
    console.log('background colors')
    var  beep = 'no';
    setInterval(function(){
      var ledr = 0;
      var ledg = 0;
      var ledb = 0;
      var LEDOn = [];
      for (var n = 0; n < 16; n++) {
        const objects = e.state.buttons;
        var stringify = JSON.parse(objects);
        var button = stringify.ButtonBackgroundColor[n];
        if(buttonState[n] === true){
          if(number[n] !== 0){
            //get color of LED
            switch (button) {
              case "default":
                ledr = 0;
                ledg = 255;
                ledb = 255;
                LEDOn.push(ledb, ledg, ledr)
                break;
              case "Red":
                ledr = 255;
                ledg = 0;
                ledb = 0;
                LEDOn.push(ledb, ledg, ledr)
                break;
              case "Yellow":
                ledr = 255;
                ledg = 255;
                ledb = 0;
                LEDOn.push(ledb, ledg, ledr)
                break;
              case "Green":
                ledr = 0;
                ledg = 128;
                ledb = 0;
                LEDOn.push(ledb, ledg, ledr)
                break;
              case "Purple":
                ledr = 255;
                ledg = 0;
                ledb = 255;
                LEDOn.push(ledb, ledg, ledr)
                break;
              case "White":
                ledr  = 255;
                ledg = 255;
                ledb  = 255;
                LEDOn.push(ledb, ledg, ledr)
                break;
              case "Blue":
                ledr  = 0;
                ledg = 255;
                ledb  = 255;
                LEDOn.push(ledb, ledg, ledr)
                break;
              default:
                break;
            }
          }
        }
        else{
          ledr = 0;
          ledg = 0;
          ledb = 0;
          LEDOn.push(ledb, ledg, ledr)
        }

        if(LEDOn.length === 48){
          if(beepState){
          console.log('sending button press')
            beep = 'yes'
            sendLeds = LEDOn;

            ipcRenderer.send("packet-sending", sendLeds[47], sendLeds[46], sendLeds[45], sendLeds[44], sendLeds[43], sendLeds[42], sendLeds[41], sendLeds[40], sendLeds[39], sendLeds[38], sendLeds[37],
              sendLeds[36], sendLeds[35], sendLeds[34], sendLeds[33], sendLeds[32], sendLeds[31], sendLeds[30], sendLeds[29], sendLeds[28], sendLeds[27], sendLeds[26], sendLeds[25],
              sendLeds[24], sendLeds[23], sendLeds[22], sendLeds[21], sendLeds[20], sendLeds[19], sendLeds[18], sendLeds[17], sendLeds[16], sendLeds[15], sendLeds[14], sendLeds[13],
              sendLeds[12], sendLeds[11], sendLeds[10], sendLeds[9], sendLeds[8], sendLeds[7], sendLeds[6], sendLeds[5], sendLeds[4], sendLeds[3], sendLeds[2], sendLeds[1], sendLeds[0], beep);
          }
          else{
            console.log('sending NO button press')
            beep = 'no'
            sendLeds = LEDOn;
            ipcRenderer.send("packet-sending", sendLeds[47], sendLeds[46], sendLeds[45], sendLeds[44], sendLeds[43], sendLeds[42], sendLeds[41], sendLeds[40], sendLeds[39], sendLeds[38], sendLeds[37],
              sendLeds[36], sendLeds[35], sendLeds[34], sendLeds[33], sendLeds[32], sendLeds[31], sendLeds[30], sendLeds[29], sendLeds[28], sendLeds[27], sendLeds[26], sendLeds[25],
              sendLeds[24], sendLeds[23], sendLeds[22], sendLeds[21], sendLeds[20], sendLeds[19], sendLeds[18], sendLeds[17], sendLeds[16], sendLeds[15], sendLeds[14], sendLeds[13],
              sendLeds[12], sendLeds[11], sendLeds[10], sendLeds[9], sendLeds[8], sendLeds[7], sendLeds[6], sendLeds[5], sendLeds[4], sendLeds[3], sendLeds[2], sendLeds[1], sendLeds[0], beep);
          }
          LEDOn = [];
          }

      }
    }, 20);
  }


  render() {
    ///////////////////// RENDERER ///////////////////////////////
    const circleImg = require(`../images/box.png`);
    const objects = this.state.buttons;
    var stringify = JSON.parse(objects);

    //without this function the first click will not be taken for momentary mode.
    var that = this;
    // $( document ).ready(function(){
    //   if(stringify.buttonOutputSettings[16].ButtonType === 'Momentary'){
    //     $('button#button1').mousedown(function(){
    //       console.log('calling time function')
    //       that.time('16');
    //     });
    //   }else if(stringify.buttonOutputSettings[17].ButtonType === 'Momentary'){
    //     $('button#button2').mousedown(function(){
    //       that.time('17');
    //     });
    //   }else if(stringify.buttonOutputSettings[18].ButtonType === 'Momentary'){
    //     $('button#button3').mousedown(function(){
    //       that.time('18');
    //     });
    //   }
    // });

    //Get Title of Button on screen
    var btn1 = stringify.buttonOutputSettings[16].Name
    var btn2 = stringify.buttonOutputSettings[17].Name
    var btn3 = stringify.buttonOutputSettings[18].Name

    //Stringify the title
    var myJSON = JSON.stringify(btn1);
    var myJSON2 = JSON.stringify(btn2);
    var myJSON3 = JSON.stringify(btn3);

    // button 1 title longer than 7 characters
    if (myJSON.length > 7){
      // is it more than one word?
      if(myJSON.indexOf(" ") !== -1){
        $(document).ready(function(){
          $("button.wail div.restOfButon").addClass('longFont');
        })
      }
      else{
        $(document).ready(function(){
          $("p.stylingWail").addClass('smallFont');
        })
      }
    }
    // button 2 title longer than 7 characters
    if(myJSON2.length > 7){
      // is it more than one word?
      if(myJSON2.indexOf(" ") !== -1){
        $(document).ready(function(){
          $("button.siren div.restOfButon").addClass('longFont');
        })
      }
      else{
        $(document).ready(function(){
          $("p.stylingSiren").addClass('smallFont');
        })
      }
    }
    // button 3 title longer than 7 characters
    if(myJSON3.length > 7){
      // is it more than one word?
      if(myJSON3.indexOf(" ") !== -1){
        $(document).ready(function(){
          $("button.spotlight div.restOfButon").addClass('longFont');
        })
      }
      else{
        $(document).ready(function(){
          $("p.stylingSL").addClass('smallFont');
        })
      }
    }
    
    return (
      <div className="home show">
        <div className="blinker__container">
          <ul className='loading-frame'>
            <img className="circle" id="LED1" src={circleImg} alt="LED1" />
            <img className="circle" id="LED2" src={circleImg} alt="LED1" />
            <img className="circle" id="LED3" src={circleImg} alt="LED1" />
            <img className="circle" id="LED4" src={circleImg} alt="LED1" />
            <img className="circle" id="LED5" src={circleImg} alt="LED1" />
            <img className="circle" id="LED6" src={circleImg} alt="LED1" />
            <img className="circle" id="LED7" src={circleImg} alt="LED1" />
            <img className="circle" id="LED8" src={circleImg} alt="LED1" />
            <img className="circle" id="LED9" src={circleImg} alt="LED1" />
            <img className="circle" id="LED10" src={circleImg} alt="LED1" />
            <img className="circle" id="LED11" src={circleImg} alt="LED1" />
            <img className="circle" id="LED12" src={circleImg} alt="LED1" />
            <img className="circle" id="LED13" src={circleImg} alt="LED1" />
            <img className="circle" id="LED14" src={circleImg} alt="LED1" />
            <img className="circle" id="LED15" src={circleImg} alt="LED1" />
          </ul>
        </div>
        <div className='body'>
          <button className="wail" id="button1" onClick={(e) => {this.time("16");}}>
            <div className="topWail"></div>
            <div className="restOfButon">
              <p className="stylingWail">{stringify.buttonOutputSettings[16].UserName}</p>
            </div>
          </button>
          <button className="siren" id="button2" onClick={(e) => {this.time("17");}}>
            <div className="topSiren"></div>
            <div className="restOfButon">
              <p className="stylingSiren">{stringify.buttonOutputSettings[17].UserName}</p>
            </div>
          </button>
          <button className="spotlight" id="button3" onClick={(e) => {this.time("18");}}>
            <div className="topSL"></div>
            <div className="restOfButon">
              <p className="stylingSL">{stringify.buttonOutputSettings[18].UserName}</p>
            </div>
          </button>
        </div>
      </div>
    );
  }
}