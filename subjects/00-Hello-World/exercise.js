////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - change the contents of the render function and save the file
// - see the updates automatically in your browser without refreshing!
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";


function App(){
  return <div> Hello World </div>
}
// function App() {
//   return <div>Helloo world!</div>;
// }

ReactDOM.render(<App />, document.getElementById("app"));