import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { OnBeamBreak } from '../../startup/client/beam-breaks';

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
    OnBeamBreak(msg);

  }

  render() {

    return <Row>
      <Col xs={ 12 }>

        <h4 className='page-header'>Selection Screen</h4>

        <p>Start a race:</p>
        <Button id='race-press' bsStyle='default' onClick={ this.selectionClick }>Press</Button>
        <Button id='race-wiggins' bsStyle='default' onClick={ this.selectionClick }>Wiggins</Button>
        <Button id='race-tc' bsStyle='default' onClick={ this.selectionClick }>TC</Button>
        <Button id='race-haula' bsStyle='default' onClick={ this.selectionClick }>Haula</Button>
        <Button id='race-braun' bsStyle='default' onClick={ this.selectionClick }>Braun</Button>
        <Button id='race-trex' bsStyle='default' onClick={ this.selectionClick }>T Rex</Button>
        <Button id='race-thielen' bsStyle='default' onClick={ this.selectionClick }>Thielen</Button>
        <br/><br/>
        <p>Simulate beam break:</p>
        <Button id='ln1_start' bsStyle='success' onClick={ this.beamBreak }>Lane 1 Start</Button>
        <Button id='ln1_finish' bsStyle='danger' onClick={ this.beamBreak }>Finish</Button>
        <br/>
        <Button id='ln2_start' bsStyle='success' onClick={ this.beamBreak }>Lane 2 Start</Button>
        <Button id='ln2_finish' bsStyle='danger' onClick={ this.beamBreak }>Finish</Button>
        <br/><br/>

      </Col>
    </Row>;

  }
}

