import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Buffer from 'buffer';

import logo from './logo.svg';
import './App.css';


import React from 'react';
import Dropzone from 'react-dropzone';

import Buffer from 'buffer';
import webtorrent from 'webtorrent';

import Ipfs from 'ipfs';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      files: [],
      node:  new Ipfs({
        repo: String(Math.random() + Date.now())
      }),
      client: new webtorrent(),

    }
  }

  componentDidMount () {
        this.state.node.on('ready', () => {
          console.log('IPFS node is ready')
        })
      }

  onDrop(files) {
    this.setState({
      files
    });
  }

  handleClick = () => {
    console.log(this.state.files[0]);
    this.state.client.seed(this.state.files[0], (torrent) => {
      console.log('torrent', torrent);
      torrent.files[0].getBuffer((err, buffer) => {
        this.state.node.files.add(buffer, function(err, files) {
          alert('https://ipfs.io/ipfs/' + files[0].hash);
          console.log('https://ipfs.io/ipfs/' + files[0].hash);
      })
    })
    })
  }

  render() {
    return (
      <section>
      <h2>Decentralized Cloud 2.0</h2>
      <div className="dropzone">
      <Dropzone onDrop={this.onDrop.bind(this)}>
      </Dropzone>
      </div>
      <aside>
      <h2>Dropped files</h2>
      <ul>
      {
        this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
      }
      </ul>
      </aside>
      <button onClick={this.handleClick}>
      Upload Files!!
      </button>
      </section>
    );
  }
}

<App />

export default App;
