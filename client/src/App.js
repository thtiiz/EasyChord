import React, { Component } from 'react'
import './App.css'

class App extends Component {
  state = {
    token: '-'
  }

componentDidMount() {
    this.fetchToken()
  }

fetchToken = async () => {
    const response = await fetch(`/api/cow`)
    const gettoken = await response.json()
    const token = gettoken.token
    this.setState({ token })
  }

// customCow = async evt => {
//     evt.preventDefault()
//     const text = this.state.text
//     const response = await fetch(`/api/cow/${text}`)
//     const custom = await response.json()
//     const cow = custom.moo
//     this.setState({ cow, text: '' })
//   }

// handleChange = evt => {
//     this.setState({ [evt.target.name]: evt.target.value })
//     console.log(this.state.text)
//   }

render() {
    return (
      <div className="App">
        <h1>{this.state.token}</h1>
        {/* <button onClick={this.fetchToken}>Get token</button> */}
      </div>
    )
  }
}

export default App
