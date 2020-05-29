import React from 'react';
import logo from './logo.svg';
import './App.css';
import { quotes } from './quotes';
import { hex } from './hex';
import $ from 'jquery';
import twitter from './images/twitter-removebg-preview.png';
import tumblr from './images/tumblr-removebg-preview.png';

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
      $("tweet-quote").addClass("trans_opac");
      setTimeout(function() {
        $("h1, h4").removeClass("trans_opac");
      }, 1500);
    });
  }

  render() {
   
    return (
      <div style={{backgroundColor: this.state.newColor }} className="App transition">
        <div className="container">

          <div style={{color: this.state.newColor }} className="quote trans_txt">
            <h1>"{quotes[this.state.idx].quote}"</h1>
          </div>

          <div style={{color: this.state.newColor }} className="author trans_txt">
            <h4>--{quotes[this.state.idx].author}</h4>
          </div>
  
          <div id="tweet-quote" className="button-pos trans_bg" style={{backgroundColor: this.state.newColor}} >     
            <a href="twitter.com/intent/tweet">
              <img src={twitter} alt="Twitter.com" />
            </a>
          </div>

          <div id="tumblr-quote" className="button-pos trans_bg" style={{backgroundColor: this.state.newColor}} >     
            <a href="twitter.com/intent/tweet">
              <img src={tumblr} alt="Tumblr.com" />
            </a>
          </div>

          <button id="newQuote" style={{background: this.state.newColor}} onClick={() => { this.handleClick(); this.getNewColor(); }}>New Quote</button>

        </div>
      </div>
    );
  }
}

export default App;
