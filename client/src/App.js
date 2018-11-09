import React, { Component } from 'react'
import './App.css'
import Search from './Search'
class App extends Component {
  state = {
    token: '-'
  }

componentDidMount() {
    this.fetchToken()
  }

fetchToken = async () => {
    const response = await fetch('/token')
    console.log(response)
    const gettoken = await response.json()
    // const gettoken = await JSON.parse(response)
    const token = gettoken.token
    this.setState({ token })
  }

render() {
    return (
      <div className="App">
        <h1>{this.state.token}</h1>
        <Search token={this.state.token}/>
        {/* <button onClick={this.fetchToken}>Get token</button> */}
      </div>
    )
  }
}

export default App
