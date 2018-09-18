import React, { Component } from 'react';
import { load } from './Spreadsheet';
import './App.css';
import config from "./config";
import Circle from "./Circle";

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
        {data.map((row, i) => (
          <div key={i}>
            <Circle circleText={row['Poster Titles']} effortPoints={row['Est. Effort']} progressPercent={(row['%']*100)} />
          </div>
        ))}
      </div>
    );
  }
}

export default App;
