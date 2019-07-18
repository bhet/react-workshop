import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class ContentToggle extends React.Component {
  static propTypes = {
    summary: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onToggle: PropTypes.func
  };

  state = { isOpen: false };

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen }, () => {
      console.log(this.state.isOpen);

      if (this.props.onToggle) {
        this.props.onToggle(this.state.isOpen);
      }
    }); // ASYNC!
  };

  render() {
    let summaryClassName = "content-toggle-summary";

    if (this.state.isOpen) {
      summaryClassName += " content-toggle-summary-open";
    }

    return (
      <div className="content-toggle">
        <button onClick={this.handleClick} className={summaryClassName}>
          {this.props.summary}
        </button>
        {this.state.isOpen && (
          <div className="content-toggle-details">
            {this.props.children}
          </div>
        )}
      </div>
    );
  }
}

class ToggleTracker extends React.Component {
  state = { numOpens: 0 };

  handleOpen = () => {
    this.setState({ numOpens: this.state.numOpens + 1 });
  };

  render() {
    return (
      <div>
        <p>Number of opens: {this.state.numOpens}</p>

        <ContentToggle
          summary="Tacos"
          onToggle={isOpen => {
            if (isOpen) this.handleOpen();
          }}
        >
          <p>
            A taco is a traditional Mexican dish composed of a corn or
            wheat tortilla folded or rolled around a filling.
          </p>
        </ContentToggle>
        <ContentToggle summary="Burritos" onToggle={this.handleToggle}>
          <p>Good food rolled up. Better value than tacos.</p>
        </ContentToggle>
      </div>
    );
  }
}

ReactDOM.render(<ToggleTracker />, document.getElementById("app"));

// function updateThePage() {
//   ReactDOM.render(<ContentToggle />, document.getElementById("app"));
// }

//updateThePage();

////////////////////////////////////////////////////////////////////////////////
// What happens when we want to render 2 <ContentToggle>s? Shared mutable state!

////////////////////////////////////////////////////////////////////////////////
// React gives us a component model we can use to encapsulate state at the
// instance level, so each component instance has its own state. Let's refactor
// this code to use a JavaScript class that extends React.Component.

//////////////////////////////////////////////////////////////////////////////////
// React gives us setState and automatically re-renders as the state changes.

////////////////////////////////////////////////////////////////////////////////
// Let's make <ContentToggle> re-usable and render a few of them. Title and
// children are properties we can pass in from the parent component.

////////////////////////////////////////////////////////////////////////////////
// Wrap a few <ContentToggle>s in a <ToggleTracker> that tracks the # of times
// it has been toggled and shows a counter. <ContentToggle> gets an onToggle
// handler. This is like a "custom event".

////////////////////////////////////////////////////////////////////////////////
// We can use propTypes to declare the name, type, and even default value of
// our props. These are like "runnable docs" for our code.
