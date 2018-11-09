import React, { Component } from 'react'
import './App.css'
import Search from './Search'
import { Route } from 'react-router-dom'
import Upload from './Upload'
import Home from './Home'
class App extends Component {
  state = {
    token: '-'
  }

componentDidMount() {
    this.fetchToken()
  }

fetchToken = async () => {
    const response = await fetch('/token')
    // console.log(response)
    const gettoken = await response.json()
    const token = gettoken.token
    this.setState({ token })
    console.log(token);
  }

render() {
    // const queryString = require('query-string');
    // const parsed = queryString.parse(this.props.location.search)
    return (
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route path="/search" component={()=><Search token={this.state.token}/>} />
        <Route path="/upload" component={Upload} />
      </div>
    )
  }
}

export default App
