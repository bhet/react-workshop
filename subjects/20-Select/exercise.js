////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make this work like a normal <select> box!
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Select extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    defaultValue: PropTypes.any
  };
  state = {
    isOpen: false,
    value: this.props.defaultValue
  };

    toggleShow = () =>{
      this.setState({isOpen : !this.state.isOpen})
    }

    isControlled = () => this.props.value !==null;
  render() {
    let label;
    React.Children.forEach(this.props.children, child=>{
      if(child.props.value === this.state.value){
        label = child.props.children
      }
    })
    return (
      <div className="select">
        <div className="label">
        {label} <span className="arrow">▾</span>
        </div>
        {this.state.isOpen && (React.Children.map(this.props.children, child=>{
          return React.cloneElement(child, {
            select: child.props.value === this.state.value
          })
        }))}

      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    console.log(this.props.children)
    return <div className="option">{this.props.children}</div>;
  }
}

class App extends React.Component {
  state = {
    selectValue: "dosa"
  };

  setToMintChutney = () => {
    this.setState({ selectValue: "mint-chutney" });
  };


  render() {
    return (
      <div>
        <h1>Select</h1>

        <h2>Uncontrolled</h2>

        <Select defaultValue="tikka-masala" select={this.toggleShow}>
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>

        <h2>Controlled</h2>

        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <p>
          <button onClick={this.setToMintChutney}>
            Set to Mint Chutney
          </button>
        </p>

        <Select
          value={this.state.selectValue}
          onChange={value => this.setState({ selectValue: value })}
        >
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
