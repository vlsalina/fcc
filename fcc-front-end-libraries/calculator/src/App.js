import React from "react";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      num1_flag: false, // to declare if # is pressed
      num2_flag: false,
      op_flag: false, // for operator
      eq_flag: false, // for reset (AC button)
      neg_flag: false // for negative number
    };
    this.handleClick = this.handleClick.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.setState({
      input: ""
    });
  }

  handleClick(e) {
    this.setState({
      input: this.state.input.concat(e)
    });
  }

  render() {
    return (
      <div className="App">
        <div className="display">{this.state.input}</div>
        <div className="buttons">
          <button className="item1" onClick={() => this.reset()}>
            AC
          </button>
          <button className="item2" onClick={() => this.handleClick(" + ")}>
            +
          </button>
          <button className="item3" onClick={() => this.handleClick(" - ")}>
            -
          </button>
          <button className="item4" onClick={() => this.handleClick(" / ")}>
            /
          </button>
          <button className="item5" onClick={() => this.handleClick(" * ")}>
            x
          </button>
          <button className="item6" onClick={() => this.handleClick(" = ")}>
            =
          </button>
          <button className="item7" onClick={() => this.handleClick("1")}>
            1
          </button>
          <button className="item8" onClick={() => this.handleClick("2")}>
            2
          </button>
          <button className="item9" onClick={() => this.handleClick("3")}>
            3
          </button>
          <button className="item10" onClick={() => this.handleClick("4")}>
            4
          </button>
          <button className="item11" onClick={() => this.handleClick("5")}>
            5
          </button>
          <button className="item12" onClick={() => this.handleClick("6")}>
            6
          </button>
          <button className="item13" onClick={() => this.handleClick("7")}>
            7
          </button>
          <button className="item14" onClick={() => this.handleClick("8")}>
            8
          </button>
          <button className="item15" onClick={() => this.handleClick("9")}>
            9
          </button>
          <button className="item16" onClick={() => this.handleClick("0")}>
            0
          </button>
          <button className="item17" onClick={() => this.handleClick(".")}>
            .
          </button>
        </div>
      </div>
    );
  }
}

export default App;
