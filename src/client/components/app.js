import React from 'react'
import { playGame } from '../actions'
import { connect } from 'react-redux'

const App = ({ dispatch }) => {
  return (
    <button onClick={() => dispatch(playGame('test-opponent'))}>Play game</button>
  )
}

export default connect()(App)
