import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data: 0
    }
    this.updateState = this.updateState.bind(this);
  };

  updateState() {
    Example();  
  }

  render() {
    return (
      <div>
        <button onClick={this.updateState}>CLICK ME!</button>
        <div id="myDiv">{this.state.data}</div>
      </div>
    );
  }

}

function Example() {
  const [counter, setCounter] = useState(0);
  setInterval(function() {
    setCounter(counter + 1);
    document.getElementById("myDiv");
  }, 1000);
}



export default App;
