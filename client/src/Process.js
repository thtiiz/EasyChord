import React, { Component } from 'react';
import * as Key from "tonal-key";
import * as Distance from "tonal-distance";
import * as Chromatic from 'chromatic';
import axios from 'axios';
import './Process.css';
class Process extends Component {
    constructor(props){
        super(props)
        this.state={
            listOfChord:[], 
            listOfChangeChord:[],
            idKey:'0',
            keyTrack:'Click Get Chord..',
            mode:'',
            changeKeyTrack:'Click Get Chord..',
            same:true,
            click:false
        }
        this.getDataTrack = this.getDataTrack.bind(this)
        this.upperkey = this.upperkey.bind(this)
        this.lowerkey = this.lowerkey.bind(this)
        console.log('idtrackInchord:'+this.props.idTrack, 'Token:'+this.props.token)
    }

    getDataTrack(){
        this.setState({click:true})
        var url = 'https://api.spotify.com/v1/audio-features/' + this.props.idTrack
        axios.get(url,{
        headers:{
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + this.props.token
        }
        }).then(res => {
            var mode=res.data.mode?' major':'minor' //mode==1 is major
            var keyTrack = Chromatic('C')[1][res.data.key]
            this.setState({keyTrack, mode, changeKeyTrack:keyTrack, idKey: res.data.key})
        }).then(()=>{
            var track = this.state
            var listOfChord=Key.triads(track.keyTrack + track.mode)
            this.setState({listOfChord})
        })
    }

    upperkey(){
        if(!this.state.mode) return ;
        var {idKey} = this.state
        idKey = idKey===11? 0:idKey+1;
        var changeKeyTrack = Chromatic('C')[1][idKey]
        this.setState({idKey, changeKeyTrack}, ()=>{
            var track = this.state
            var listOfChangeChord=Key.triads(track.changeKeyTrack + track.mode)
            var same = track.keyTrack===track.changeKeyTrack? true:false
            this.setState({listOfChangeChord, same})
        })
        
    }
    lowerkey(){
        if(!this.state.mode) return ;
        var {idKey} = this.state
        idKey = idKey===0? 11:idKey-1;
        var changeKeyTrack = Chromatic('C')[1][idKey]
        this.setState({idKey, changeKeyTrack}, ()=>{
            var track = this.state
            var listOfChangeChord=Key.triads(track.changeKeyTrack + track.mode)
            var same = track.keyTrack===track.changeKeyTrack? true:false
            this.setState({listOfChangeChord, same})
        })
    }

    render() {
        const renderData = this.state.listOfChord.map((name, index)=>
            <li key={index}><h4>{this.state.same? name:(name+'     <__>     '+ this.state.listOfChangeChord[index])}</h4></li>
        )
        return (
        <div className="Process">
            <div className="songName ">
            <h2 >Song : {this.props.name}</h2>
            </div>
            
            <div className="buttonOption">
                <button onClick={this.getDataTrack}>Get Chord</button>
                <button onClick={this.upperkey}>+</button>
                <button onClick={this.lowerkey}>-</button>
            </div>
            <h3>Key: {this.state.keyTrack +' '+ this.state.mode}</h3>
            {this.state.click? <div class="alert alert-success">{renderData}</div>:''}
        </div>
        );
    }
}

export default Process;