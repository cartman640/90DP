import React, { Component } from 'react';
import { load } from './Spreadsheet';
import './App.css';
import config from "./config";

class App extends Component {
  state = {
    data: [],
    error: null
  };

  initClient = () => {
    window.gapi.client.init({
      apiKey: config.apiKey,
      discoveryDocs: config.discoveryDocs
    }).then(() => {
      load(this.onLoad);
    });
  };
  onLoad = (spreadsheet, error) => {
    if (spreadsheet) {
      const data = spreadsheet.data;
      this.setState({ data });
    } else {
      this.setState({ error });
    }
  };
  componentDidMount() {
    window.gapi.load("client", this.initClient);
  }
  render() {
    const { data, error } = this.state;
    console.log(data);
    if (error) {
      console.log(this.state.error);
      return <div className="App">An error occurred.</div>
    }
    return (
      <div className="App">
        <ul>
          {data.map((row, i) => (
            <li key={i}>
              {row['Poster Titles']}
            </li>
          ))}
        </ul>
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
