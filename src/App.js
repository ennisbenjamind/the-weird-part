import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: ""
    }
  }

  getRandomInt() {
    let min = Math.ceil(0);
    let max = Math.floor(24);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  componentDidMount () {
    fetch(`https://www.reddit.com/r/DeepIntoYouTube/new.json`, {
      credentials: 'same-origin'
    })
    .then (response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let link = body.data.children[this.getRandomInt()].data.url
      this.setState({link: link})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  render() {
    return (
      <div className="App">
        <h1> THE WEIRD PART </h1>
        <button onClick={this.componentDidMount()}><a target= "_blank" href= {this.state.link}>Get weird</a></button>
      </div>
    );
  }
}

export default App;
