import React, { Component } from 'react';
import { load } from './Spreadsheet';
import './App.css';
import config from "./config";
import Circle from "./Circle";
import Spinner from './Spinner';


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
    if (error) {
      console.log(this.state.error);
      return <div className="App">An error occurred.</div>
    }
    if(data.length === 0) {
      return <div className="App"><div className='loading'><Spinner /></div></div>
    }
    const coordinates21 = [
      [15,15], [680, 550], [500, 270], [15, 750], [15, 1000], [15, 1180],
      [220,15], [470, 800], [670, 285], [220, 750], [220, 1000],
      [470,15], [15, 500], [470, 500], [220, 255], [500, 1100],
      [680,15], [270, 550], [30, 280], [680, 800], [750, 1050],
    ];
    const circleCoordinates = coordinates21.map(coord => (
      { position: 'absolute', top: coord[0]+'px', left: coord[1]+'px',
      }
    ));
    return (
      <div className="App">
        {data.map((row, i) => (
          <div style={circleCoordinates[i]} key={i}>
            <Circle circleText={row['Poster Titles']} effortPoints={row['Est. Effort']} progressPercent={(row['%']*100)} />
          </div>
        ))}
      </div>
    );
  }
}

export default App;
