import Router from 'next/router'

import Session from '../../components/session'
import Layout from '../../components/layout'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { Flex, Box, Grid } from 'reflexbox'

export default class AdminLogin extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      error: null
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
  }

  onUsernameChange(username) {
    this.setState({username})
  }
  onPasswordChange(password) {
    this.setState({password})
  }

  async onSubmit(event) {
    event.preventDefault()
    const session = new Session()
    session.login(this.state.username, this.state.password)
      .then(() => {
        let redirectPath = '/'
        this.setState({
          error: null
        })
        if (Router.query.from !== null) {
          redirectPath = Router.query['from']
        }
        Router.push(redirectPath)
      })
      .catch(err => {
        this.setState({
          error: {
            'message': 'Failed to login',
            'debug_error': err
          }
        })
      })
  }

  render() {
    const {
      error
    } = this.state

    return (
      <Layout>
        <div className='container'>
          {error !== null && <p>{error.message}</p>}
          <Grid col={3} px={2}>
            <TextField
              hintText={`your username`}
              floatingLabelText='Username'
              value={this.state.username}
              onChange={(event, value) => this.onUsernameChange(value)}
            />
          </Grid>
          <br/>
          <Grid col={3} px={2}>
            <TextField
              hintText={`your username`}
              floatingLabelText='Password'
              type="password"
              value={this.state.password}
              onChange={(event, value) => this.onPasswordChange(value)}
            />
          </Grid>
          <br/>
          <RaisedButton
            onTouchTap={this.onSubmit}
            label='Login' style={{marginLeft: 20}}/>
          <style jsx>{`
            .container {
              max-width: 1024px;
              padding-left: 20px;
              padding-right: 20px;
              margin: auto;
            }
          `}</style>
        </div>
      </Layout>
    )
  }
}
