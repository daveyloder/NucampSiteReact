import React, { Component } from 'react';
import Main from './components/MainComponent';
import { CAMPSITES } from './shared/campsites';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      campsites: CAMPSITES
    };
  }
  render() {
    return (
      <div className="App">
        <Main />
      </div>
  );
}
}

export default App;
