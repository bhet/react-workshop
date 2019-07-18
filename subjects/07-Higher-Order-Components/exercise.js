////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Make `withMouse` a "higher-order component" that sends the mouse position
//   to the component as props (hint: use `event.clientX` and `event.clientY`).
//
// Got extra time?
//
// - Make a `withCat` HOC that shows a cat chasing the mouse around the screen!
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

function withMouse(Component) {

  return class AppWithMouse extends React.Component{
    state={x:0, y:0}

  render(){
    return <Component
      mouse={this.state}
      onMouseMove={e=>this.setState({x:e.clientX, y:e.clientY})}/>
  }
}
}

function withCat(Component){
  return class extends React.Component{

    render(){
      return <Component />
    }
  }
}

class App extends React.Component {
  static propTypes = {
    mouse: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    })
  };

  render() {
    const { mouse } = this.props;

    return (
      <div className="container" onMouseMove={this.props.onMouseMove}>
        {mouse ? (
          <h1>
            The mouse position is ({mouse.x}, {mouse.y})
          </h1>
        ) : (
          <h1>We don't know the mouse position yet :(</h1>
        )}
      </div>
    );
  }
}

const AppWithMouse = withMouse(App);

ReactDOM.render(<AppWithMouse />, document.getElementById("app"));
