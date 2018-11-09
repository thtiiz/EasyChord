import React, { Component } from 'react';
import queryString from 'query-string'

class Upload extends Component {
  constructor(props){
    super(props)
    this.state = {
      imgUrl: ""
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

  componentDidMount() {
    const values = queryString.parse(this.props.location.search)
    console.log(values.id);
    // console.log(this.props.location.search) // "?filter=top&origin=im"
  }

  render() {
    return (
      <div className="Upload">
          {this.props.params}
          <button onClick={this.widget}>Upload</button>
          <img src={this.state.imgUrl} alt="imgUpload"></img>
      </div>
    );
  }
}

export default Upload;
