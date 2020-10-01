import React, { useState, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import alarm from './analog-watch-alarm_daniel-simion1.mp3';

let session_initial_m = 1;
let session_initial_s = 0;
let break_initial_m = 1;
let break_initial_s = 0;

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        break_minutes: break_initial_m,
        break_seconds: break_initial_s,
        break_display_m: break_initial_m, 
        break_display_s: break_initial_s,
        session_minutes: session_initial_m,
        session_seconds: session_initial_s, 
        session_display_m: session_initial_m,
        session_display_s: session_initial_s,
      }
      
      this.flag = true; // Determines when to use break or timer  
      this.keep_going = false;
      this.playPressed = false;

      this.timer = this.timer.bind(this);
      this.breakt = this.breakt.bind(this);
      this.stop = this.stop.bind(this);
      this.reset = this.reset.bind(this);
      this.iBreak = this.iBreak.bind(this);
      this.dBreak = this.dBreak.bind(this);
      this.iSession = this.iSession.bind(this);
      this.dSession = this.dSession.bind(this);
      this.play = this.play.bind(this);
      this.audio = this.audio.bind(this);
  
      this.color = this.color.bind(this);
    }

    play() {
      if (this.playPressed == false) {
        this.playPressed = true;
        if (this.flag == true) {
          this.timer(); 
        } else {
          this.breakt();
        } 
      }
    }
  
    audio() {
      let audioBeep = document.getElementById("beep");
      audioBeep.volume = 1;
      audioBeep.currentTime = 0;
      audioBeep.play();
    }

    timer() {
      this.keep_going = true;
      this.color();

      this.myInterval = setInterval(() => {
  
        const { session_display_m, session_display_s } = this.state;


        if (session_display_s > 0) {
          this.setState({
            session_display_s: session_display_s - 1
          })
        } 

        if (session_display_s == 0) {
          if (session_display_m == 0) {
            //this.flag = true;
            this.flag = false;
            this.setState({
              session_display_m: this.state.session_minutes,
              session_display_s: this.state.session_seconds
            })
            this.audio();
            if (this.keep_going == true) {
              clearInterval(this.myInterval); 
              this.breakt();
            } 
          } else {
            this.setState({
              session_display_m: session_display_m - 1,
              session_display_s: 59
            })
          }
        }

      }, 100);
      
    } 

    breakt() {
      this.keep_going = true;
      this.color();
      this.myInterval = setInterval(() => {
  
        const { break_display_m, break_display_s, session_display_m, session_display_s } = this.state;


        if (break_display_s > 0) {
          this.setState({
            break_display_s: break_display_s - 1 
          })
        } 

        if (break_display_s == 0) {
          if (break_display_m == 0) {
            this.flag = true;
            this.setState({
              break_display_m: this.state.break_minutes,
              break_display_s: this.state.break_seconds
            })
            this.audio();
            if (this.keep_going == true) {
              clearInterval(this.myInterval);
              this.timer();
            }
          } else {
            this.setState({
              break_display_m: break_display_m - 1,
              break_display_s: 59
            })
          }
        }


      }, 100);
      
    }

    stop() {
      this.playPressed = false;
      this.keep_going = false;
      clearInterval(this.myInterval);
    }

    reset() {
      clearInterval(this.myInterval);
      this.setState({
        session_display_m: this.state.session_minutes,
        session_display_s: this.state.session_seconds,
        break_display_m: this.state.break_minutes,
        break_display_s: this.state.break_seconds
      })
      document.getElementById("display").style.color = "white";
      document.getElementById("grid").style.borderColor = "white";
      document.getElementById("title").style.color = "white";
      this.flag = true;
    }

    iBreak() {
      const { break_minutes } = this.state;

      this.setState({
        break_minutes: break_minutes + 1,
        break_display_m: break_minutes + 1,
        break_display_s: 0,
        break_seconds: 0 
      })  
    }

    dBreak() {
      const { break_minutes } = this.state;

      let bdec = break_minutes - 1;

      this.setState({
        break_minutes: (bdec >= 0) ? bdec : 0,
        break_display_m: (bdec >= 0) ? bdec: 0,
        break_display_s: 0,
        break_seconds: 0 
      })
    }


    iSession() {
      const { session_minutes } = this.state;

      this.setState({
        session_minutes: session_minutes + 1,
        session_display_m: session_minutes + 1,
        session_display_s: 0
      })  

    }

    dSession() {
      const { session_minutes } = this.state;

      let sdec = session_minutes - 1;

      this.setState({
        session_minutes: (sdec >= 0) ? sdec : 0,
        session_display_m: (sdec >= 0) ? sdec : 0,
        session_display_s: 0
      })
    }

    color() {
      let display = document.getElementById("display");
      let grid = document.getElementById("grid");
      let ttl = document.getElementById("title");
      if (this.flag == true) {
        display.style.color = "white";
        grid.style.borderColor = "white";
        ttl.style.color = "white";
      } else {
        display.style.color = "red";
        grid.style.borderColor = "red";
        ttl.style.color = "red";
      }
    }

    render() {
      return (
        <div id="App">
          <audio id="beep">
            <source src={alarm} type="audio/mpeg" />
          </audio>
          <div id="grid" className="grid-container">
          <div id="title" className="item1">
            Pomodoro Clock
          </div>

            <div id="break" className="item2">
              <div id="break_header">Break Length</div> 
              <div>{this.state.break_minutes}</div>  
              <div>
                <button onClick={this.iBreak}>+</button>
                <button onClick={this.dBreak}>-</button>
              </div>
            </div>
            <div id="timer" className="item3">
              <div id="session_header">Session Length</div> 
              <div>{this.state.session_minutes}</div> 
              <div>
                <button onClick={this.iSession}>+</button>
                <button onClick={this.dSession}>-</button>
              </div> 
            </div>
     
          <div id="display" className="item4">
            <div>{(this.flag == true) ? "Session" : "Break"}</div> 


            <div id="nums"> {(this.flag == true) ? 
                    this.state.session_display_m : 
                    this.state.break_display_m}:  
                  {(this.flag == true) ?  
                    (this.state.session_display_s < 10) ? `0${this.state.session_display_s}` : this.state.session_display_s :
                    (this.state.break_display_s < 10) ? `0${this.state.break_display_s}` : this.state.break_display_s}
                    
            </div> 
            <div className="btn">
              <button onClick={this.play}>Start</button>
              <button onClick={this.stop}>Stop</button>
              <button onClick={this.reset}>Reset</button> 
            </div>
          </div>
          </div>
        </div>

      )
    }
    
}

export default App;
