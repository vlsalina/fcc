import React from "react";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      result: "",
      num1: "",
      num2: ""
     };

    this.decimals = [0,1,2,3,4,5,6,7,8,9];
    this.operations = [" + ", " - ", " * ", " / "];

    this.num1_flag = false; // to declare if # is pressed
    this.num2_flag = false;
    this.op_flag = false; // for operator
    this.eq_flag = false; // for reset (AC button)
    this.neg_flag = false; // for negative number
    this.decimal = false;

    this.num1 = -1; // first operand
    this.num2 = -1; // second operand
    this.result = -1.0; // result
    this.op = -1; // 0 = add, 1 = subtract, 2 = multiply, 3 = divide

    this.handleClick = this.handleClick.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.setState({
      input: "",
      num1: "",
      num2: ""
    });
    this.num1_flag = false; // to declare if # is pressed
    this.num2_flag = false;
    this.op_flag = false; // for operator
    this.eq_flag = false; // for reset (AC button)
    this.neg_flag = false; // for negative number
    this.decimal = false;


  }

  handleClick(e) {
    if (e === ".") {
      if (this.num1_flag === false && this.decimal === false) {
        this.setState({
          input: this.state.input.concat(e),
          num1: this.state.num1.concat(e),
        });
        this.decimal = true;
      } 

      if (this.num1_flag === true && this.decimal === false) {
        this.setState({
          input: this.state.input.concat(e),
          num2: this.state.num2.concat(e),
        });
        this.decimal = true;
      };
      
    } else if (this.decimals.includes(parseFloat(e)) === true && this.op_flag === false) {
      this.setState({
        input: this.state.input.concat(e),
        num1: this.state.num1.concat(e)
      });

    } else if (this.operations.includes(e) === true && this.op_flag === false) {
      switch(e) {
        case this.operations[0]:
          this.op = 0;
          break;
        case this.operations[1]: 
          this.op = 1;
          break;
        case this.operations[2]:
          this.op = 2;
          break;
        case this.operations[3]:
          this.op = 3;
          break;
        default:
      }       

      this.op_flag = true;
      this.num1_flag = true;
      this.decimal = false;
      this.setState({
         input: this.state.input.concat(e)
      });
    } else if (this.decimals.includes(parseFloat(e)) === true && this.num1_flag === true && this.op_flag === true) {
      this.num2_flag = true;
      this.setState({
         input: this.state.input.concat(e),
         num2: this.state.num2.concat(e)
      });
    } else if (e === " = ") {
      
      switch(this.op) {
        case 0:  this.result = parseFloat(this.state.num1) + parseFloat(this.state.num2); break;
        case 1:  this.result = parseFloat(this.state.num1) - parseFloat(this.state.num2); break;
        case 2:  this.result = parseFloat(this.state.num1) * parseFloat(this.state.num2); break;
        case 3:  this.result = parseFloat(this.state.num1) / parseFloat(this.state.num2); break;
        default:  
      }   

      this.setState({
        input: "",
        result: this.state.input + " = " + this.result,
        num1: "",
        num2: ""
      });


      this.num1_flag = false; // to declare if # is pressed
      this.num2_flag = false;
      this.op_flag = false; // for operator
      this.eq_flag = false; // for reset (AC button)
      this.neg_flag = false; // for negative number
      this.decimal = false;
    }
   }


  render() {
    return (
      <div className="App">
        <div className="display">
          <div className="last">
            {this.state.result}
          </div>
          <div className="current">
            {this.state.input}
          </div>
        </div>
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
