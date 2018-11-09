import React, { Component } from 'react';
import axios from 'axios';

class Result extends Component {
  // constructor(props){
  //   super(props)
  //   // var tracks = this.props.tracks;
  //   // list = () => {
      
  //   // }
  // }
  
  render() {
    var tracks = this.props.tracks
    console.log(tracks);
    return (
      <ul>
        {/* {tracks.map(name => (
          <li>{name}</li>
        ))} */}
      </ul>
    );
  }
}

export default Result;