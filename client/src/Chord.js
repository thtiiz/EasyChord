import React, { Component } from 'react';
import Image from './Image';
import * as Key from "tonal-key";
import * as Chromatic from 'chromatic';
import axios from 'axios';
class Chord extends Component {
    constructor(props){
        super(props)
        this.state={
            apikey:'fcd3213085f145532bf742ab9b437361c0160dfb',
            listOfChord:[], 
            listOfUrlChord:[''],//{name:"Em", url:""}
            listOfName:[''],
            keyTrack:'',
            mode:'',
            trackProgress:[],
            res:'',
            test:{listOfUrlChord:[],
                listOfName:[]
            }
        }
        this.getImage = this.getImage.bind(this)
        this.getDataTrack = this.getDataTrack.bind(this)
        console.log('idtrackInchord:'+this.props.idTrack, 'Token:'+this.props.token)
    }

    getImage(listOfChord){
        var listOfUrlChord=[]
        var listOfName=[]
        for(var i in listOfChord){
            var url = 'http://api.guitarparty.com/v2/chords/?query=' + listOfChord[i]
            axios.get(url,{
            headers:{
                'Content-Type' : 'application/json',
                'Guitarparty-Api-Key' : this.state.apikey
            }
            }).then(res => {
                listOfUrlChord.push(res.data.objects[0].image_url)
                listOfName.push(res.data.objects[0].name)
            })
        }
        // console.log(listOfUrlChord);
        this.setState({listOfUrlChord, listOfName})
    }

    getDataTrack(){
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
            this.setState({keyTrack, mode})
            // console.log(this.state.keyTrack, this.state.mode);
        }).then(()=>{
            var track = this.state
            // console.log(Key.triads(track.keyTrack + track.mode))
            var listOfChord=Key.triads(track.keyTrack + track.mode)
            this.setState({trackProgress: listOfChord})
            // console.log(this.state.trackProgress);
            this.getImage(listOfChord)
            // this.getChords(track.keyTrack+track.mode[0])
        })
        
    }
    componentDidUpdate(){
    }
    componentDidMount(){
        this.getDataTrack()
    }
    render() {
        return (
        <div className="Chord">
            <h1>Home</h1>
            {console.log(this.state.trackProgress)}
        </div>
        );
    }
}

export default Chord;