import React from 'react';
import logo from './logo.svg';
import './App.css';
import { quotes } from './quotes';
import { hex } from './hex';
import $ from 'jquery';

const LEN = hex.length;

var randomColor = require('randomcolor');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: Math.floor(Math.random() * quotes.length),
      newColor: "#4F0AD1",
    }
    this.handleClick = this.handleClick.bind(this);
    this.getNewColor = this.getNewColor.bind(this);
  }

  handleClick() {
    let len = quotes.length;
    let id = Math.floor(Math.random() * len); 
    this.setState({
      idx: id
    })
  }

  getNewColor() {
    let c = randomColor();
    this.setState({
      newColor: c
    }) 
  }

  componentDidMount() {
    $("button").click(function() {
      $("h1, h4").addClass("trans_opac");
      setTimeout(function() {
        $("h1, h4").removeClass("trans_opac");
      }, 1500);
    });
  }

  render() {
   
    return (
      <div style={{backgroundColor: this.state.newColor }} className="App transition">
        <div className="container">

          <div style={{color: this.state.newColor }} className="quote trans_txt disabl">
          <h1>"{quotes[this.state.idx].quote}"</h1>
          </div>

          <div style={{color: this.state.newColor }} className="author trans_txt disabl">
          <h4>--{quotes[this.state.idx].author}</h4>
          </div>

          <button style={{background: this.state.newColor}} onClick={() => { this.handleClick(); this.getNewColor(); }}>New Quote</button>

        </div>
      </div>
    );
  }
}

export default App;
