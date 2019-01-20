import React, { Component } from 'react';
import styled from 'styled-components';
import Markdown from 'markdown-to-jsx';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/markdown';
import 'brace/theme/chaos';
import './App.css';
const { ipcRenderer, dialog } = window.require('electron');
const settings = window.require('electron-settings');
const fs = window.require('fs');

class App extends Component {
  state = {
    loaded: false,
    directory: settings.get('directory') || null,
    loadedFile: ''
  };

  componentDidMount() {
    ipcRenderer.on('new-file', (e, fileContent) => {
      console.log(e, fileContent);
      this.setState({ loaded: true, loadedFile: fileContent });
    });

    ipcRenderer.on('new-dir', (e, filePaths, dir) => {
      console.log(e, filePaths, dir);
      this.setState({
        directory: dir,
        loaded: true
      });
      settings.set('directory', dir);
    });
  }

  render() {
    return (
      <div className='App'>
        <Header>
          <span>Noted</span>
        </Header>
        {this.state.loaded ? (
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
        ) : (
          <Container>
            <LoadingMessage>
              <OptionBox onClick={() => ipcRenderer.send('new-file')}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  class='icon-document-notes'
                >
                  <path
                    class='primary'
                    d='M6 2h6v6c0 1.1.9 2 2 2h6v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2zm2 11a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2H8zm0 4a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2H8z'
                  />
                  <polygon class='secondary' points='14 2 20 8 14 8' />
                </svg>
                <h2>Open FIle</h2>
              </OptionBox>
              <OptionBox>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  class='icon-folder'
                >
                  <path
                    class='secondary'
                    d='M4 4h7l2 2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2z'
                  />
                  <rect
                    width='20'
                    height='12'
                    x='2'
                    y='8'
                    class='primary'
                    rx='2'
                  />
                </svg>
                <h2>Open Folder</h2>
              </OptionBox>
            </LoadingMessage>
          </Container>
        )}
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
  padding: 5rem 5rem;
  border-left: 5px solid #627d98;
`;

const Paper = styled.div`
  overflow: scroll;
  background-color: #f0f4f8;
  border-radius: 5px;
  height: 100%;
  min-width: 500px;
  width: 700px;
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

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingMessage = styled.div`
  margin: 0 auto;
  width: 60vw;
  height: 60vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: #003e6b;
  box-shadow: 0 12px 15px 2px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  justify-content: center;
  align-content: center;
  grid-gap: 5rem;
  padding: 15rem 12rem;
`;

const OptionBox = styled.div`
  .primary {
    fill: #d9e2ec;
  }
  .secondary {
    fill: #829ab1;
  }
  h2 {
    color: #d9e2ec;
    text-align: center;
    font-weight: 400;
    font-size: 30px;
    &:hover {
      color: white;
      cursor: pointer;
    }
  }

  svg:hover {
    cursor: pointer;
    .primary {
      fill: white;
    }
    .secondary {
      fill: white;
    }
  }
`;
