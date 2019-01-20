import React, { Component } from 'react';
import styled from 'styled-components';
import Markdown from 'markdown-to-jsx';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/markdown';
import 'brace/theme/chaos';
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
        <Header>
          <span>Noted</span>
        </Header>
        <Split>
          <AceEditor
            mode='markdown'
            theme='monokai'
            onChange={newContent => {
              this.setState({ loadedFile: newContent });
            }}
            name='markdown_editor'
            value={this.state.loadedFile}
          />
          <RenderedWindow>
            <Paper>
              <Markdown>
                {this.state.loadedFile ||
                  'Load up a file to see it displayed here!'}
              </Markdown>
            </Paper>
          </RenderedWindow>
        </Split>
      </div>
    );
  }
}

export default App;

const Split = styled.div`
  display: flex;
  height: 100vh;
`;

const RenderedWindow = styled.div`
  background-color: #d9e2ec;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 20rem;
  border-left: 5px solid #627d98;
`;

const Paper = styled.div`
  overflow: scroll;
  background-color: #f0f4f8;
  border-radius: 5px;
  height: 100%;
  width: 100%;
  box-shadow: 0 7px 10px 3px rgba(51, 78, 104, 0.08);
  font-size: 20px;
  padding: 3rem 6rem;
  h1,
  h2 {
    color: #003e6b;
  }
  h3,
  h4 {
    color: #334e68;
  }

  h5,
  h6 {
    color: #829ab1;
  }

  h1 {
    border-bottom: solid 3px #486581;
    padding-bottom: 10px;
  }

  a {
    color: red;
  }
`;

const Header = styled.header`
  background-color: #003e6b;
  color: #f0f4f8;
  font-size: 0.8rem;
  height: 23px;
  position: fixed;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  margin: auto auto;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-app-region: drag;
  span {
    display: inline-block;
  }
`;
