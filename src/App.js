import React, { Component } from 'react';
import Markdown from 'markdown-to-jsx';
import logo from './logo.svg';
import './App.css';

const { ipcRenderer } = window.require('electron');

class App extends Component {
  state = {
    loadedFile: ''
  };

  componentDidMount() {
    ipcRenderer.on('new-file', (e, fileContent) => {
      console.log(e, fileContent);
      this.setState({ loadedFile: fileContent });
    });
  }

  render() {
    return (
      <div className='App'>
        <Markdown>
          {this.state.loadedFile || 'Load up a file to see it displayed here!'}
        </Markdown>
      </div>
    );
  }
}

export default App;
