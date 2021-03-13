import React from 'react';
import logo from './logo.svg';
import './App.css';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }
  
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.ra[this.props.loc] === null) {

      let copy = this.props.ra.slice();
      copy[this.props.loc] = (this.props.xIsNext) ? "X" : "O";
      this.props.update(copy);

      this.props.uStep(this.props.curr + 1);

      if (this.props.history.length <= 10) {
        let hCopy = this.props.history.slice(0, this.props.curr+1 );
        hCopy.push(copy);
        this.props.uHistory(hCopy);
      }

      this.setState({
        value: (this.props.xIsNext) ? "X" : "O" 
      });

      this.props.next();
    }
  } 

  render() {
    return (
      <div className="square">
        <button onClick={this.handleClick}>
          { this.props.ra[this.props.loc] } 
        </button>
      </div>
    );
  }
}

class Board extends React.Component {

  constructor(props) {
    super(props);
   
    this.renderClick = this.renderClick.bind(this);
 
  }

  renderClick(loc) {
  
    return (
        <Square loc={loc} ra={this.props.ra} update={this.props.update} xIsNext={this.props.xIsNext} next={this.props.next} history={this.props.history} uHistory={this.props.uHistory} curr={this.props.curr} uStep={this.props.uStep} />
    );
  }

  render() {
    return (
      <div className="board">
        <div className="board-col">
          { this.renderClick('0') }   
          { this.renderClick('3') }
          { this.renderClick('6') }
        </div>
        <div className="board-col">
          { this.renderClick('1') }
          { this.renderClick('4') }
          { this.renderClick('7') }
        </div>
        <div className="board-col">
          { this.renderClick('2') }
          { this.renderClick('5') }
          { this.renderClick('8') }
        </div>
      </div>
    );
  }
}

class History extends React.Component {
  constructor(props) {
    super(props);
    this.helper = this.helper.bind(this);   
    
  }

  helper(step, idx) {
    this.props.returnToStep(step, idx);
    this.props.sStep(idx);
  } 

  render() {
    return (
      <div className="history">
        <ol>
          { this.props.data.map((step, idx) => (
              <li key={idx} ><button onClick={() => { this.helper(step, idx) }} >Step { idx }</button></li> 
            ))
          } 
        </ol>
      </div>
    );
  }

}


class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      array: Array(9).fill(null),
      xIsNext: true,
      history: [Array(9).fill(null)],
      current: 0
    }
  
    this.handleClick = this.handleClick.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.updateHistory = this.updateHistory.bind(this);
    this.returnToStep = this.returnToStep.bind(this);
    this.setStep = this.setStep.bind(this);
    this.updateStep = this.updateStep.bind(this);
  }

  handleClick(ra) {
    this.setState({
      array: ra
    }); 
  } 

  handleNext() {
    this.setState({
      xIsNext: !this.state.xIsNext
    });  
  }

  updateHistory(update) {
    this.setState({
      history: update
    });
  }

  returnToStep(step, idx) {
    this.setState({
      array: step,
      xIsNext: (idx % 2 == 0) ? true : false 
    });
  } 

  setStep(step) {
    this.setState({
      current: step 
    });
  }

  updateStep(curr){
    this.setState({
      current: curr
    });
  } 

  render() {
    return (
      <div className="App">
        <Board ra={this.state.array} update={this.handleClick} xIsNext={this.state.xIsNext} next={this.handleNext} history={this.state.history} uHistory={this.updateHistory} curr={this.state.current} uStep={this.updateStep} />
        <History data={this.state.history} returnToStep={this.returnToStep} sStep={this.setStep} />
      </div>
    );
  }
}

export default Game;
