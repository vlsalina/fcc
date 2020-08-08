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

    this.dash_token = false; // to control the number of "-" signs being pressed

    this.num1 = -1; // first operand
    this.num2 = -1; // second operand
    this.result = -1.0; // result
    this.op = -1; // 0 = add, 1 = subtract, 2 = multiply, 3 = divide

    // functions
    this.handleClick = this.handleClick.bind(this);
    this.reset = this.reset.bind(this);
    this.press = this.press.bind(this);
  }

  reset() {
    this.setState({
      input: "",
      result: "",
      num1: "",
      num2: ""
    });
    this.num1_flag = false; // to declare if # is pressed
    this.num2_flag = false;
    this.op_flag = false; // for operator
    this.eq_flag = false; // for reset (AC button)
    this.neg_flag = false; // for negative number
    this.decimal = false;
    this.dash_token = false;
    this.num_token = false;
  }

  press(param) {
    const key =  document.getElementById(param);
    if (!key) return;
    key.classList.add("pressed");

    setTimeout(function() {
      key.classList.remove("pressed");
    }, 100);
  }

  handleClick(e) {
    if (this.neg_flag === false && this.operations.includes(e) === true && this.op_flag === false && e === " - " && this.dash_token === false && this.num_token === false) {
      this.setState({
        input: this.state.input.concat("-"),
        num1: this.state.num1.concat("-")
      });
      this.neg_flag = true;
      this.dash_token = true;
    } else if (this.neg_flag === false && this.operations.includes(e) === true && this.op_flag === true && e === " - "  && this.dash_token === false && this.num_token === false) {
      this.setState({
        input: this.state.input.concat("-"),
        num2: this.state.num2.concat("-")
      });
      this.neg_flag = true;
      this.dash_token = true;
    } else if (e === ".") {
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
      this.dash_token = false;
      this.num_token = true;
    } else if (this.operations.includes(e) === true && this.op_flag === false && this.dash_token === false) {
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
      this.decimal = false;
      this.num1_flag = true;
      this.neg_flag = false;
      this.num_token = false;
      this.setState({
         input: this.state.input.concat(e)
      });
    } else if (this.decimals.includes(parseFloat(e)) === true && this.num1_flag === true && this.op_flag === true) {
      this.num2_flag = true;
      this.setState({
         input: this.state.input.concat(e),
         num2: this.state.num2.concat(e)
      });
      this.dash_token = true;
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
      this.dash_token = false;
      this.num_token = false;
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
          <button id="item1" className="item1" onClick={() => {this.reset(); this.press("item1");}}>
            AC
          </button>
          <button id="item2" className="item2" onClick={() => {this.handleClick(" + "); this.press("item2");}}>
            +
          </button>
          <button id="item3" className="item3" onClick={() => {this.handleClick(" - "); this.press("item3");}}>
            -
          </button>
          <button id="item4" className="item4" onClick={() => {this.handleClick(" / "); this.press("item4");}}>
            /
          </button>
          <button id="item5" className="item5" onClick={() => {this.handleClick(" * "); this.press("item5");}}>
            x
          </button>
          <button id="item6" className="item6" onClick={() => {this.handleClick(" = "); this.press("item6");}}>
            =
          </button>
          <button id="item7" className="item7" onClick={() => {this.handleClick("1"); this.press("item7");}}>
            1
          </button>
          <button id="item8" className="item8" onClick={() => {this.handleClick("2"); this.press("item8");}}>
            2
          </button>
          <button id="item9" className="item9" onClick={() => {this.handleClick("3"); this.press("item9");}}>
            3
          </button>
          <button id="item10" className="item10" onClick={() => {this.handleClick("4"); this.press("item10");}}>
            4
          </button>
          <button id="item11" className="item11" onClick={() => {this.handleClick("5"); this.press("item11");}}>
            5
          </button>
          <button id="item12" className="item12" onClick={() => {this.handleClick("6"); this.press("item12");}}>
            6
          </button>
          <button id="item13" className="item13" onClick={() => {this.handleClick("7"); this.press("item13");}}>
            7
          </button>
          <button id="item14" className="item14" onClick={() => {this.handleClick("8"); this.press("item14");}}>
            8
          </button>
          <button id="item15" className="item15" onClick={() => {this.handleClick("9"); this.press("item15");}}>
            9
          </button>
          <button id="item16" className="item16" onClick={() => {this.handleClick("0"); this.press("item16");}}>
            0
          </button>
          <button id="item17" className="item17" onClick={() => {this.handleClick("."); this.press("item17");}}>
            .
          </button>
        </div>
      </div>
    );
  }
}

export default App;
