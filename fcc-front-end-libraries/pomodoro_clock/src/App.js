import React, { useState, Component } from 'react';
import logo from './logo.svg';
import './App.css';

let session_initial_m = 25;
let session_initial_s = 0;
let break_initial_m = 5;
let break_initial_s = 0;

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        break_minutes: 5,
        break_seconds: 0,
        break_display_m: break_initial_m, 
        break_display_s: break_initial_s,
        session_minutes: session_initial_m,
        session_seconds: session_initial_s, 
        session_display_m: session_initial_m,
        session_display_s: session_initial_s,
      }
      
      this.flag = true; // Determines when to use break or timer  

      this.timer = this.timer.bind(this);
      this.breakt = this.breakt.bind(this);
      this.stop = this.stop.bind(this);
      this.reset = this.reset.bind(this);
      this.iBreak = this.iBreak.bind(this);
      this.dBreak = this.dBreak.bind(this);
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

        if (session_display_s == 0) {
          if (session_display_m == 0) {
            //this.flag = true;
            this.flag = false;
            this.setState({
              session_display_m: this.state.session_minutes,
              session_display_s: this.state.session_seconds
            })
          } else {
            this.setState({
              session_display_m: session_display_m - 1,
              session_display_s: 59
            })
          }
        }

      }, 1000);

    } 

    breakt() {
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
              session_display_m: this.state.session_minutes,
              session_display_s: this.state.session_seconds,
              break_display_m: this.state.break_minutes,
              break_display_s: this.state.break_seconds
            })
          } else {
            this.setState({
              session_display_m: break_display_m - 1,
              session_display_s: break_display_s,
              break_display_m: break_display_m - 1,
              break_display_s: 59
            })
          }
        }


      }, 1000);
    }

    

    stop() {
      clearInterval(this.myInterval);
    }

    reset() {
      this.setState({
        session_display_m: this.state.session_minutes,
        session_display_s: this.state.session_seconds,
        break_display_m: this.state.break_minutes,
        break_display_s: this.state.break_seconds
      })
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

      this.setState({
        break_minutes: break_minutes - 1,
        break_display_m: break_minutes - 1,
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

      this.setState({
        session_minutes: session_minutes - 1,
        session_display_m: session_minutes - 1,
        session_display_s: 0
      })
    }

    render() {
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
            <div> {(this.flag == true) ? this.state.session_display_m : this.state.break_display_m} : 
                  {(this.flag == true) ?  
                    (this.state.session_display_s < 10) ? `0${this.state.session_display_s}` : this.state.session_display_s :
                    (this.state.break_display_s < 10) ? `0${this.state.break_display_s}` : this.state.break_display_s}
                    
            </div> 
          </div>

          <div id="buttons">
            <button onClick={(this.flag == true) ? this.timer : this.breakt}>Play</button>
            <button onClick={this.stop}>Pause</button>
            <button onClick={this.reset}>Reset</button> 
          </div>

        </div>

      )
    }
    
}

export default App;
