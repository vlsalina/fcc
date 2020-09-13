import React, { useState, Component } from 'react';
import logo from './logo.svg';
import './App.css';

let initial_m = 3;
let initial_s = 59;

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        break_minutes: 1,
        break_seconds: 0,
        session_minutes: initial_m,
        session_seconds: initial_s, 
        session_display_m: initial_m,
        session_display_s: initial_s,
      }
      
      this.mflag = false; // Determines when to use break or timer  
      this.sflag = false;

      this.timer = this.timer.bind(this);
      this.stop = this.stop.bind(this);
      this.reset = this.reset.bind(this);
      this.iBreak = this.iBreak.bind(this);
      this.dbreak = this.dBreak.bind(this);
      this.iSession = this.iSession.bind(this);
      this.dSession = this.dSession.bind(this);
    }

    timer() {
      this.myInterval = setInterval(() => {
  
        const { session_display_m, session_display_s } = this.state;


        if (session_display_s > 0) {
          this.setState({
            session_display_s: session_display_s - 1
          })
        } 

      }, 1000);

    } 

    stop() {
      clearInterval(this.myInterval);
    }

    reset() {
      this.setState({
        session_display_m: this.state.session_minutes,
        session_display_s: this.state.session_seconds
      })
    }

    iBreak() {
      const { break_minutes } = this.state;

      this.setState({
        break_minutes: break_minutes + 1 
      })  
    }

    dBreak() {
      const { break_minutes } = this.state;

      this.setState({
        break_minutes: break_minutes - 1 
      })  
    }


    iSession() {
      const { session_minutes } = this.state;

      this.setState({
        session_minutes: session_minutes + 1,
        session_display_m: session_minutes + 1      
      })  

    }

    dSession() {
      const { session_minutes } = this.state;

      this.setState({
        session_minutes: session_minutes - 1,
        session_display_m: session_minutes - 1
      })
    }

    render() {
      const { minutes, seconds } = this.state
      return (
        <div id="App">
          <div id="title">
            Pomodoro Clock
          </div>

          <div id="timers">
            <div id="break">
              Break Length {this.state.break_minutes}  
              <span>
                <button onClick={this.iBreak}>+</button>
                <button onClick={this.dBreak}>-</button>
              </span>
            </div>
            <div id="timer">
              Session Length {this.state.session_minutes} 
              <span>
                <button onClick={this.iSession}>+</button>
                <button onClick={this.dSession}>-</button>
              </span> 
            </div>
          </div>          
     
          <div id="display">
            <div>Session</div> 
            <div> {this.state.session_display_m} :  
                  {(this.state.session_display_s < 10) ? `0${this.state.session_display_s}` : this.state.session_display_s}
            </div> 
          </div>

          <div id="buttons">
            <button onClick={this.timer}>Play</button>
            <button onClick={this.stop}>Pause</button>
            <button onClick={this.reset}>Reset</button> 
          </div>

        </div>

      )
    }
    
}

export default App;
