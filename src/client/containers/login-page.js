import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Button from '../components/button'
import Panel from '../components/panel'
import ProgressBorder from '../components/progress-border'
import TextInput from '../components/text-input'
import { userNameChange } from '../actions'
import { playGame } from '../../common/actions'
import { STAND_BY } from '../../common/state'

const LoginPageGrid = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: auto auto auto;
  grid-template-columns: auto auto auto;
  grid-template-areas:
      'title title title'
      '. login-form .'
      '. . .';
  justify-content: stretch;
  align-content: stretch;
`

const LoginPageTitle = styled.h1`
  margin: 0;
  grid-area: title;
`

const LoginFormGrid = styled.div`
  display: grid;
  margin: 25px 25px;
  grid-template-rows: auto auto;
  grid-gap: 10px;
  justify-items: center;
`

const LoginFormPanel = styled(Panel)`
  grid-area: login-form;
  justify-self: center;
  align-self: center;
`

const LoginFormTitle = styled.h3`
  margin: 0;
  margin-bottom: 15px;
  white-space: nowrap;
`

const LoginFormTextInput = styled(TextInput)`
  text-align: center;
`

const LoginPage = (props) => {
  const handleUsernameChange = (e) => {
    props.onUserNameChange(e.target.value)
  }

  const handleLogin = () => {
    props.onPlay(props.username)
  }

  return (
    <LoginPageGrid>
      <LoginPageTitle>Draughts</LoginPageTitle>
      <LoginFormPanel>
        <LoginFormGrid>
          <LoginFormTitle>Please, introduce yourself</LoginFormTitle>
          <LoginFormTextInput
            autoFocus
            placeholder='Your name'
            defaultValue={props.username}
            onChange={handleUsernameChange}
          />
          <ProgressBorder active={props.standby}>
            <Button defaultValue='Submit' onClick={handleLogin}/>
          </ProgressBorder>
        </LoginFormGrid>
      </LoginFormPanel>
    </LoginPageGrid>
  )
}

function mapStateToProps(state) {
  const { username } = state
  const standby = state.state == STAND_BY
  return { username, standby }
}

function mapDispatchToProps(dispatch) {
  return {
    onUserNameChange: (username) => dispatch(userNameChange(username)),
    onPlay: (username) => dispatch(playGame(username))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
