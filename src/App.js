import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="outer-circle">
          <div className="progress-circle" data-start="0" data-value="180"></div>
          <div className="progress-circle" data-start="180" data-value="90"></div>
          <div className="progress-circle difference" data-start="270" data-value="50"></div>
          <hr/><hr/><hr/><hr/>
            <div className="circle">
              Elephant Microservices
            </div>
        </div>
      </div>
    );
  }
}

export default App;
