import React, { Component } from 'react';
import axios from 'axios';
import Result from './Result';
class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: '',
      track:[],
      ids: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
    this.handleClickTrack = this.handleClickTrack.bind(this)
  }

  handleChange(e) {
    this.setState({value: e.target.value})
  }

  submit(e) {
    console.log('submit')
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
            var ids = [];
            for(let i=0; i<10 && i<keys.length; i++){
                // console.log(single[keys[i]]);
                data.push(single[keys[i]].name + ' - ' + single[keys[i]].artists[0].name);
                ids.push(single[keys[i]].id)
            }
        }
        
        this.setState({track: data, ids})
        console.log(this.state.ids);
    })
  }
  handleClickTrack(e){
    this.setState({
        idTrack: e.target.value
    })
    console.log(this.state.idTrack)
  }
  render() {
    const listitem = this.state.track.map((name, index) =>
        <li key={index}><a href={'/upload/?id='+ this.state.ids[Number(index)]} value={index} 
        onClick={this.handleClickTrack}>{name}</a></li>
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