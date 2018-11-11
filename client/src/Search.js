import React, { Component } from 'react';
import axios from 'axios';
import './Search.css'
class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: '',
      track:[],
      ids: [],
      names: [],
      artists:[]
    }
    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
    this.handleClickTrack = this.handleClickTrack.bind(this)
  }

  handleChange(e) {
    this.setState({value: e.target.value},()=>this.submit())
  }

  submit(e) {
    // console.log('submit')
    if(e) e.preventDefault();
    var url = 'https://api.spotify.com/v1/search?q=' + this.state.value + '&type=track'
    axios.get(url,{
        headers:{
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + this.props.token
        }
    }).then(res => {
        // console.log(this.state.value)
        let tracks = res.data.tracks
        // console.log(tracks)
        if(tracks.total!==0){
            let single =tracks.items
            // console.log(single);
            let keys = Object.keys(single);
            var names = [];
            var data = [];
            var ids = [];
            var artists=[];
            var total = 10;
            for(let i=0; i<total && i<keys.length; i++){
                // console.log(single[keys[i]]);
                data.push(single[keys[i]].name + ' - ' + single[keys[i]].artists[0].name);
                artists.push(single[keys[i]].artists[0].name)
                ids.push(single[keys[i]].id)
                names.push(single[keys[i]].name)
            }
            this.setState({track: data, ids, names, artists})
            // console.log(this.state.names)
        }
        // this.setState({track: data, ids})
        // console.log('Ids:'+this.state.ids);
    })
  }
  handleClickTrack(e){
    this.setState({
        idTrack: e.target.value
    })
  }
  render() {
    // const listitem = this.state.track.map((name, index) =>
    //     <li key={index}><a href={'/upload/?id='+ this.state.ids[Number(index)]+ '&name='+this.state.names[Number(index)]+'&token=' +this.props.token} 
    //     onClick={this.handleClickTrack}>{name}</a></li>
    // )
    const items = this.state.track.map((name, index) =>
      <tr key={index}>
        <th scope="row" >{index}</th>
        <td><a href={'/upload/?id='+ this.state.ids[Number(index)]+ '&name='+this.state.names[Number(index)]+'&token=' +this.props.token} 
        onClick={this.handleClickTrack}>{name}</a></td>
        <td>{'@'+this.state.artists[Number(index)]}</td>
      </tr>
    )
    return (
      <div className="Search">
        <form className="searchBar ">
          <img src={require('./img/search-icon.png')} alt='' id="search-icon" onClick={this.submit}/>
            <input type="text" onChange={this.handleChange} value={this.state.value} 
            placeholder="Type a song..."></input>
        </form>
        {this.state.value?<div className="result">
          <table className="table">
            <caption>Top 10 of Search result...</caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Song</th>
                <th scope="col">Artists</th>
              </tr>
            </thead>
              <tbody>
                {items}
              </tbody>
          </table>
        </div>:<h3>Type your song & Fun!!</h3>}
      </div>
    );
  }
}

export default Search;