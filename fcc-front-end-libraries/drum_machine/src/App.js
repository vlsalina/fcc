import React from "react";
import logo from "./logo.svg";
import "./App.css";
import sounds from "./sounds";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      
    }
  }

  render() {
    return (
      <div className="App">
        <div id="demo"></div>
        <div id="drum-machine">
          <div id="buttons" className="justify-left">
            <div className="row">
              <input
                id="Q"
                type="button"
                onKeyPress={this.handleKeyPress}
              />
             
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

          <div id="controls" className="justify-left" />
        </div>
      </div>
    )
  }
}

export default App;
