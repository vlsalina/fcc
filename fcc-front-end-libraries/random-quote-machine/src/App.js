import React from 'react';
import logo from './logo.svg';
import './App.css';
import { quotes } from './quotes';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: 0,
      bgColor: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.changeColors = this.changeColors.bind(this);
  }

  handleClick() {
    let len = quotes.length;
    let id = Math.floor(Math.random() * len); 
    this.setState({
      idx: id
    })
  }

  changeColors() {
    let len = quotes.length;

    let red = Math.floor(Math.random() * len); 
    let green = Math.floor(Math.random() * len); 
    let blue = Math.floor(Math.random() * len); 

    let bg = document.getElementsByClassName("App");
    bg.style.background = "green";

  }

  
  render() {
    return (
      <div className="App">
        <div className="container">

          <div className="quote">
          <h1>"{quotes[this.state.idx].quote}"</h1>
          </div>

          <div className="author">
          <h4>--{quotes[this.state.idx].author}</h4>
          </div>

          <button onClick={() => { this.handleClick(); this.changeColors(); }}>New Quote</button>

        </div>
      </div>
    );
  }
}

export default App;
