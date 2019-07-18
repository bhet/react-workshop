import React from "react";
import PropTypes from "prop-types";
import { createHashHistory } from "history";

/*
How to use the history library:

// read the current URL
history.location

// listen for changes to the URL
history.listen(() => {
  history.location // is now different
})

// change the URL
history.push('/something')
*/
const RouterContext = React.createContext();
class Router extends React.Component {
  history = createHashHistory();
  state = {
    location: this.history.location,
  }

componentDidMount(){
  this.history.listen(()=>{
    this.setState({location:this.history.location})
  })
}

  render() {
    return <RouterContext.Provider value={{
        location: this.state.location,
        push: this.history.push
      }}>
        {this.props.children}
      </RouterContext.Provider>
  }
}

class Route extends React.Component {
  render() {
    const { path, render, component: Component } = this.props;
    console.log(path)
    return null;
  }
}

class Link extends React.Component {
  handleClick = (router, event) => {

    event.preventDefault();
    router.push(this.props.to)
  };

  render() {
    console.log("props in Link",this.props.children)

    return (
      <RouterContext.Consumer>
        {router=>(
          <a href={`#${this.props.to}`} onClick={(event)=>this.handleClick(router, event)}>
            {this.props.children}
          </a>
        )}
      </RouterContext.Consumer>
    );
  }
}

export { Router, Route, Link };
