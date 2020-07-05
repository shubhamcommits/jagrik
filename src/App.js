import React, {Component} from 'react';
import Video from "./Video";
import "@opentok/client";
import { SAMPLE_SERVER_BASE_URL } from "./config";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      API_KEY: null,
      SESSION_KEY: null,
      TOKEN: null,
    };
    this.getCredential = this.getCredential.bind(this);
  }

  getCredential(){
    
    fetch(SAMPLE_SERVER_BASE_URL + "/session")
    .then((data) => data.json())
    .then(data=>{
      this.setState({
        API_KEY: data.API_KEY,
        SESSION_KEY: data.SESSION_KEY,
        TOKEN: data.TOKEN,
      })
      console.log(data)
    },
      )
    .catch((err) => {
      console.error("Failed to get session credentials", err);
      alert(
        "Failed to get opentok sessionId and token. Make sure you have updated the config.js file."
      );
    });
  }

    

  render() {
    
    let ans=null;
    if(this.state.API_KEY && this.state.SESSION_KEY && this.state.TOKEN){
      let credentials={
        API_KEY: this.state.API_KEY,
        API_KEY: this.state.SESSION_KEY,
        API_KEY: this.state.TOKEN,
      }
      ans=<Video credentials={credentials} />
    }else{
      ans = <button onClick={this.getCredential}>Join Meeting</button>
    }

    return (
      <div>
        {ans}
      </div>
    );
  }
}
export default App
