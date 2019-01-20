import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const { ipcRenderer } = window.require('electron');

class App extends Component {
  state = {
    newFile: ''
  };

  componentDidMount() {
    ipcRenderer.on('new-file', (e, fileContent) => {
      console.log(e, fileContent);
      this.setState({ newFile: fileContent });
    });
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.js</code>.
          </p>
          <p>
            {this.state.newFile || 'Load up a file to see it displayed here!'}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
