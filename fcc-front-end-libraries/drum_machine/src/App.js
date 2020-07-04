import React from "react";
import logo from "./logo.svg";
import "./App.css";

import sound1 from "./sounds/203458__tesabob2001__a3.mp3";
import sound2 from "./sounds/203459__tesabob2001__a-5.mp3";
import sound3 from "./sounds/203460__tesabob2001__a-4.mp3";
import sound4 from "./sounds/203476__tesabob2001__e5.mp3";
import sound5 from "./sounds/203462__tesabob2001__b4.mp3";
import sound6 from "./sounds/203463__tesabob2001__b3.mp3";
import sound7 from "./sounds/203464__tesabob2001__a5.mp3";
import sound8 from "./sounds/203465__tesabob2001__a4.mp3";
import sound9 from "./sounds/203466__tesabob2001__c-3.mp3";

import sound10 from "./sounds/203467__tesabob2001__b5.mp3";
import sound11 from "./sounds/203468__tesabob2001__f3.mp3";
import sound12 from "./sounds/203476__tesabob2001__e5.mp3";
import sound13 from "./sounds/203470__tesabob2001__e3.mp3";
import sound14 from "./sounds/203471__tesabob2001__e4.mp3";
import sound15 from "./sounds/203472__tesabob2001__d4.mp3";
import sound16 from "./sounds/203473__tesabob2001__d5.mp3";
import sound17 from "./sounds/203479__tesabob2001__c3.mp3";
import sound18 from "./sounds/203478__tesabob2001__c4-middle-c.mp3";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      notes: true
    };
    this.notes = this.notes.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
  }

  handleKeyPress(e) {
    const audio = new Audio(this.notes(e.keyCode));
    if (!audio) return;

    audio.currentTime = 0;
    audio.play();
  }

  handleClick1() {
    if (this.state.power == true) {
      document.getElementById("s1").style.transform = "translate(-95%, -50%)";
      this.setState({
        power: false
      });
    } else {
      document.getElementById("s1").style.transform = "translate(-5%, -50%)";
      this.setState({
        power: true
      });
    }
  }

  notes(e) {
    if (this.state.notes == true) {
      switch (e) {
        case 81:
          return sound10;
        case 87:
          return sound11;
        case 69:
          return sound12;
        case 65:
          return sound13;
        case 83:
          return sound14;
        case 68:
          return sound15;
        case 90:
          return sound16;
        case 88:
          return sound17;
        case 67:
          return sound18;
        default:
          return;
      }
    } else {
      switch (e) {
        case 81:
          return sound1;
        case 87:
          return sound2;
        case 69:
          return sound3;
        case 65:
          return sound4;
        case 83:
          return sound5;
        case 68:
          return sound6;
        case 90:
          return sound7;
        case 88:
          return sound8;
        case 67:
          return sound9;
        default:
          return;
      }
    }
  }

  handleClick2() {
    if (this.state.notes == true) {
      document.getElementById("s2").style.transform = "translate(-95%, -50%)";
      this.setState({
        notes: false
      });
    } else {
      document.getElementById("s2").style.transform = "translate(-5%, -50%)";
      this.setState({
        notes: true
      });
    }
  }

  componentWillMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  render() {
    return (
      <div className="App">
        <div id="demo" />
        <div id="drum-machine">
          <div id="buttons" className="">
            <div className="row">
              <button id="Q" type="button">
                Q
              </button>
              <button id="W" type="button">
                W
              </button>
              <button id="E" type="button">
                E
              </button>
            </div>

            <div className="row">
              <button id="A" type="button">
                A
              </button>
              <button id="S" type="button">
                S
              </button>
              <button id="D" type="button">
                D
              </button>
            </div>

            <div className="row">
              <button id="Z" type="button">
                Z
              </button>
              <button id="X" type="button">
                X
              </button>
              <button id="C" type="button">
                C
              </button>
            </div>
          </div>

          <div className="controls">
            <div class="inner" onClick={() => this.handleClick1()}>
              <h3>Power</h3>
              <div class="switch">
                <div class="black">
                  <div id="s1" class="blue" />
                </div>
              </div>
            </div>

            <div class="inner" />

            <div class="inner" />

            <div class="inner" onClick={() => this.handleClick2()}>
              <h3>Notes</h3>
              <div class="switch">
                <div class="black">
                  <div id="s2" class="blue" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
