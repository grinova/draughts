import React from 'react'
import { connect } from 'react-redux'
import { userNameChange } from '../actions'
import { playGame } from '../../common/actions'

const App = ({ dispatch, username }) => {
  return (
    <React.Fragment>
      <input
        type='text'
        placeholder='enter user name'
        defaultValue={username}
        onChange={e => dispatch(userNameChange(e.target.value))}/>
      <button onClick={() => dispatch(playGame(username))}>Play game</button>
    </React.Fragment>
  )
}

function mapStateToProps(state) {
  return { username: state.username }
}
export default connect(mapStateToProps)(App)
