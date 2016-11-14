import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { OnBeamBreak } from '../../startup/client/beam-breaks';
import { Loading } from '../components/loading';
import { composeWithTracker } from 'react-komposer';
import { Races } from '../../api/races.js';
import Constants from '../../modules/constants';

export class Selection extends React.Component {

  constructor(props) {

    super(props);

  }

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

  renderSelect() {

    return <div>
        <p>Start a race:</p>
        <Button id='race-press' bsStyle='default' onClick={ this.selectionClick }>Press</Button>
        <Button id='race-wiggins' bsStyle='default' onClick={ this.selectionClick }>Wiggins</Button>
        <Button id='race-tc' bsStyle='default' onClick={ this.selectionClick }>TC</Button>
        <Button id='race-haula' bsStyle='default' onClick={ this.selectionClick }>Haula</Button>
        <Button id='race-braun' bsStyle='default' onClick={ this.selectionClick }>Braun</Button>
        <Button id='race-trex' bsStyle='default' onClick={ this.selectionClick }>T Rex</Button>
        <Button id='race-thielen' bsStyle='default' onClick={ this.selectionClick }>Thielen</Button>
      </div>;

  }

  renderGetReady() {

    return <div>
        <h2>Go to the starting line.</h2>
        <br/>
        {this.renderBeamButtons()}
      </div>;

  }

  renderPleaseWait() {

    return <div>
        <h2>Please wait until race finishes.</h2>
        <br/>
        {this.renderBeamButtons()}
      </div>;

  }

  renderBeamButtons() {

    return <div>
        <p>Simulate beam break:</p>
        <Button id='ln1_start' bsStyle='success' onClick={ this.beamBreak }>Lane 1 Start</Button>
        <Button id='ln1_finish' bsStyle='danger' onClick={ this.beamBreak }>Finish</Button>
        <br/>
        <Button id='ln2_start' bsStyle='success' onClick={ this.beamBreak }>Lane 2 Start</Button>
        <Button id='ln2_finish' bsStyle='danger' onClick={ this.beamBreak }>Finish</Button>
      </div>;

  }

  render() {

    let rHtml = '';

    switch (this.props.race.raceState){
      case Constants.STATE_IDLE:
        rHtml = this.renderSelect();
        break;
      case Constants.STATE_PRE_RACE:
        rHtml = this.renderGetReady();
        break;
      case Constants.STATE_RACING:
      case Constants.STATE_POST_RACE:
        rHtml = this.renderPleaseWait();
        break;
    };

    return <Row>
      <Col xs={ 12 }>

        <h4 className='page-header'>Selection Screen<span className='faded-text'> (Race state: {this.props.race.raceState})</span></h4>

        {rHtml}

      </Col>
    </Row>;

  }
}

/*
 * Data Container
 */
export const SelectionContainer = composeWithTracker(function({params}, onData) {

  const subscription = Meteor.subscribe('races');

  if (subscription.ready()) {

    const race = Races.findOne();
    onData(null, { race });

  }

}, Loading)(Selection);