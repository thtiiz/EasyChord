import React, { Component } from 'react';
import axios from 'axios';
import Result from './Result';
class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: '',
      track:[],
    }
    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
  }

  handleChange(e) {
    // this.setState({value: e.target.value});
    // console.log(this.state.value)
    this.setState({value: e.target.value})

    console.log(this.state.value)
    // console.log(this.state.track);
  }
  submit(e) {
    e.preventDefault();
    var url = 'https://api.spotify.com/v1/search?q=' + this.state.value + '&type=track'
    axios.get(url,{
        headers:{
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + this.props.token
        }
    }).then(res => {
        // this.setState({track:[]})
        console.log(this.state.value)
        let tracks = res.data.tracks
        if(tracks.items){
            let single =tracks.items
            // console.log(single);
            let keys = Object.keys(single);
            var data = [];
            for(let i=0; i<10 && i<keys.length; i++){
                console.log(single[keys[i]]);
                data.push(single[keys[i]].name + ' - ' + single[keys[i]].artists[0].name);
            }
        }
        console.log(data);
        this.setState({track: data})
    })
  }

  render() {
    const listitem = this.state.track.map((name, index) => 
        <li key={index}>{name}</li>
    )
    return (
      <div className="Search">
        <form className="searchBar">
            <input type="text" onChange={this.handleChange} value={this.state.value} 
            placeholder="Type a song..."></input>
            <button onClick={this.submit} type="submit">Search</button>    
        </form>
        <div className="result">
            {listitem}
            {/* <Result tracks={this.state.track}/> */}
        </div>
      </div>
    );
  }
}

export default Search;