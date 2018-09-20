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
      [15, 50], [680, 550], [500, 270], [15, 750], [15, 1000], [15, 1180],
      [233, 15], [470, 800], [670, 285], [220, 750], [220, 1000],
      [470, 15], [680, 45], [450, 535], [220, 255], [500, 1100],
      [680, 800], [750, 1050], [30, 280], [15, 500], [285, 575],
    ];
    const circleCoordinates = coordinates21.map(coord => (
      { position: 'absolute', top: coord[0]+'px', left: coord[1]+'px',
      }
    ));
    console.log(data);
    return (
      <div className="App">
        <div className="greyRings1"></div><div className="greyRings2"></div><div className="greyRings3"></div>
        {data.map((row, i) => (
          <div style={circleCoordinates[i]} key={i}>
            <Circle circleText={row['Poster Titles']}
                    effortPoints={row['Est. Effort']}
                    owner={row['R']}
                    sheetIndex={row['sheetIndex']}
                    progressPercent={(row['%']*100)} />
          </div>
        ))}
      </div>
    );
  }
}

export default App;
