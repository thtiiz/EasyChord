import React, { Component } from 'react';
import queryString from 'query-string'
import Process from './Process';
import Search from './Search';
import './Upload.css'
class Upload extends Component {
  constructor(props){
    super(props)
    this.state = {
      imgUrl: "#",
      token:''
    }
    this.widget = this.widget.bind(this)
  }
  
  widget() {
    var that = this;
    var widget = window.cloudinary.createUploadWidget({ 
      cloudName: "del7hdvpw", uploadPreset: "xfjglucz", googleApiKey: '857615762462737' ,cropping:'server', cropping_coordinates_mode:'custom'}, (error, result) => {
        console.log(result);
        if(result.event === "success"){
          that.setState({
            imgUrl: result.info.url
          })
          console.log(that.state.imgUrl);
        }
      });
    widget.open();
  }

  // componentDidMount() {
  //   this.fetchToken()
  // }

  // fetchToken = async () => {
  //   const response = await fetch('http://localhost:3000/token')
  //   const getToken = await response.json()
  //   const token = getToken.token
  //   this.setState({ token })
  // }

  render() {
    const values = queryString.parse(this.props.location.search)
    // console.log(values)
    return (
      <div className="Upload">
          <div className="SearchUpload">
            <Search token={values.token}/>
            <button onClick={this.widget} className="btn">Upload</button>
            <p className="alert alert-info">Capture your screen with Chord and Upload</p>
          </div>
          <img src={this.state.imgUrl} alt="" className="img-fluid max-width: 100%"></img>
          <Process idTrack={values.id} token={values.token} name={values.name}/>
      </div>
    );
  }
}

export default Upload;
