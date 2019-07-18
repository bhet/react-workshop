////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the <Form>, <SubmitButton>, and <TextInput>
// components such that:
//
// - Clicking the <SubmitButton> calls the form's `onSubmit` handler
// - Hitting "Enter" while in a <TextInput> submits the form
// - Don't use a <form> element, we're intentionally recreating the
//   browser's built-in behavior
//
// Got extra time?
//
// - Send the values of all the <TextInput>s to the form's `onSubmit` handler
//   without using DOM traversal APIs
// - Implement a <ResetButton> that resets the <TextInput>s in the form
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const TextContext = React.createContext();

class Form extends React.Component {
  render() {

    return  (
      <TextContext.Provider value={{ submit:this.props.onSubmit}}>
    <div>{this.props.children}</div>
    </TextContext.Provider>
  )
  }
}

class SubmitButton extends React.Component {
  render() {
    return (
      <TextContext.Consumer>
      {value => (
        <button onClick={value.submit}>{this.props.children}</button>
      )}
    </TextContext.Consumer>
  )
  }
}

class TextInput extends React.Component {
  render() {

    return (
      <input
        type="text"
        name={this.props.name}
        placeholder={this.props.placeholder}
      />
    );
  }
}

class App extends React.Component {

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    alert("YOU WIN!");
  };

  render() {
    return (
      <div>
        <h1>
          This isn't even my final <code>&lt;Form/&gt;</code>!
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <p>
            <TextInput name="firstName" placeholder="First Name"/>
            <TextInput name="lastName" placeholder="Last Name" />
          </p>
          <p>
            <SubmitButton type="submit">Submit</SubmitButton>
          </p>
        </Form>

      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
