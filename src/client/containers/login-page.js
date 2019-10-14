import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { userNameChange } from '../actions'
import { playGame } from '../../common/actions'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  paper: {
    display: 'inline-block',
    padding: theme.spacing(4, 6)
  },
  userName: {
    width: '100%'
  }
}))

const LoginPage = (props) => {
  const handleUsernameChange = (e) => {
    props.onUserNameChange(e.target.value)
  }

  const handleLogin = () => {
    props.onPlay(props.username)
  }

  const classes = useStyles()

  return (
    <Grid
      className={classes.root}
      container
      justify='center'
      alignItems='center'
    >
      <Grid item>
        <Paper className={classes.paper}>
          <Grid
            container
            direction='column'
            spacing={2}
          >
            <Grid item>
              <Typography variant='h5'>
                Please, introduce yourself
              </Typography>
            </Grid>
            <Grid item>
              <Input
                className={classes.userName}
                placeholder='Your name'
                defaultValue={props.username}
                onChange={handleUsernameChange}
              />
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                onClick={handleLogin}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

function mapStateToProps(state) {
  const { username } = state
  return { username }
}

function mapDispatchToProps(dispatch) {
  return {
    onUserNameChange: (username) => dispatch(userNameChange(username)),
    onPlay: (username) => dispatch(playGame(username))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
