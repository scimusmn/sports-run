import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { handleLogin } from '../../modules/login';

import { Meteor } from 'meteor/meteor';

export class Login extends React.Component {

  componentDidMount() {
    handleLogin({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  selectionClick(event) {

    let btnId = '' + event.target.id;

    Meteor.apply('arenaUpdate', [{
      msg: btnId,
    },], {
      onResultReceived: (error, response) => {
        if (error) console.warn(error.reason);
        if (response) console.log(response);
      },
    });

  }

  render() {
    return <Row>
      <Col xs={ 12 } sm={ 6 } md={ 4 }>
        <h4 className='page-header'>Login</h4>
        <form ref='login' className='login' onSubmit={ this.handleSubmit }>
          <FormGroup>
            <ControlLabel>Email Address</ControlLabel>
            <FormControl
              type='email'
              ref='emailAddress'
              name='emailAddress'
              placeholder='Email Address'
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>
              <span className='pull-left'>Password</span>
              <Link className='pull-right' to='/recover-password'>Forgot Password?</Link>
            </ControlLabel>
            <FormControl
              type='password'
              ref='password'
              name='password'
              placeholder='Password'
            />
          </FormGroup>
          <Button type='submit' bsStyle='success'>Login</Button>
        </form>
        <br/>
        <Button id='race-soccer' bsStyle='default' onClick={ this.selectionClick }>Race soccer</Button>
        <Button id='race-mascot' bsStyle='default' onClick={ this.selectionClick }>Race mascot</Button>
        <Button id='race-hockey' bsStyle='default' onClick={ this.selectionClick }>Race hockey</Button>
        <Button id='idle' bsStyle='default' onClick={ this.selectionClick }>Idle</Button>
      </Col>

    </Row>;
  }
}
