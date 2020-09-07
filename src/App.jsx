import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import 'typeface-inter'
import './App.css'
import Layout from './layouts/Default'
import Dashboard from './components/Dashboard'

class App extends Component {
  render () {
    return (
      <Layout>
        <Dashboard />
      </Layout>
    )
  }
}

export default hot(module)(App)
