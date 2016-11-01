import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

export class Selection extends React.Component {

  selectionClick(event) {

    let selectionId = event.target.id;

    Meteor.apply('arenaUpdate', [{
      msg: selectionId,
    },], {

      onResultReceived: (error, response) => {
        if (error) console.warn(error.reason);
        if (response) console.log('arenaUpdate success:', response);
      },

    });

  }

  beamBreak(event) {

    let msg = event.target.id;

    Meteor.apply('beamBreak', [{

      msg: msg,

    },], {

      onResultReceived: (error, response) => {
        if (error) console.warn(error.reason);
        if (response) console.log('beamBreak success:', response);
      },

    });

  }

  render() {

    return <Row>
      <Col xs={ 12 }>

        <h4 className='page-header'>Selection Screen</h4>

        <p>Start a race:</p>
        <Button id='race-press' bsStyle='default' onClick={ this.selectionClick }>Soccer - Press</Button>
        <Button id='race-wiggins' bsStyle='default' onClick={ this.selectionClick }>Basketball - Wiggins</Button>
        <Button id='race-tc' bsStyle='default' onClick={ this.selectionClick }>Mascot - TC</Button>
        <Button id='race-haula' bsStyle='default' onClick={ this.selectionClick }>Hockey - Haula</Button>
        <Button id='race-braun' bsStyle='default' onClick={ this.selectionClick }>Racer - Braun</Button>
        <Button id='race-trex' bsStyle='default' onClick={ this.selectionClick }>Dino - T Rex</Button>
        <br/><br/>
        <p>Beam break:</p>
        <Button id='ln1_start' bsStyle='success' onClick={ this.beamBreak }>Lane 1 Start</Button>
        <Button id='ln1_finish' bsStyle='danger' onClick={ this.beamBreak }>Finish</Button>
        <br/>
        <Button id='ln2_start' bsStyle='success' onClick={ this.beamBreak }>Lane 2 Start</Button>
        <Button id='ln2_finish' bsStyle='danger' onClick={ this.beamBreak }>Finish</Button>
        <br/><br/>
      </Col>
    </Row>

  }
}

