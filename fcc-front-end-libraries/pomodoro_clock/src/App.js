import React, { useState, Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        break_minutes: 1,
        break_seconds: 0,
        session_minutes: 3,
        session_seconds: 59, 
        stopFlag: false
      }
      this.m = 10;
      
      this.mflag = false; // Determines when to use break or timer  
      this.sflag = false;
      this.stopFlag = false;

      this.timer = this.timer.bind(this);
      this.stop = this.stop.bind(this);
      this.reset = this.reset.bind(this);
    }

    timer() {
      const myInterval = setInterval(() => {
  
        if (this.state.stopFlag == true) {
          clearInterval(myInterval);
          //this.stopFlag = false;
          
        }

        const { session_minutes, session_seconds } = this.state;

        if (session_seconds > 0) {
          this.setState({
            session_seconds: session_seconds - 1 
          })
        } 

      }, 1000);

    } 

    stop() {
        //this.stopFlag = true;
        this.setState({
          stopFlag: true
        })
    }

    reset() {
        

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
            </div>
            <div id="timer">
              Session Length {this.state.session_minutes}
            </div>
          </div>          
     
          <div id="display">
            <div>Session</div> 
            <div> {
                    (this.mflag == false) ? this.state.session_minutes : this.state.break_minutes
                  } :  
                  {
                    (this.sflag == false) ?  
                      ((this.state.session_seconds < 10) ? `0${this.state.session_seconds}` : this.state.session_seconds)
                      : 
                      ((this.state.break_seconds < 10) ? `0${this.state.break_seconds}` : this.state.break_seconds)
                  }
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

class timer extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  


}

export default App;
