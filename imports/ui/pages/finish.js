import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

import { Loading } from '../components/loading.js';
import { composeWithTracker } from 'react-komposer';
import { Races } from '../../api/races.js';

export class Finish extends React.Component {

  constructor(props) {

    super(props);

  }

  getLaneTime(lane) {

    var laneTime = 'x';

    if (lane == 1) {

      lanetime = this.props.lane1FinishTime - this.props.startTime;

    } else {

      laneTime = '00:00:00 S';

    }

    return laneTime;

  }

  render() {

    return <Row>
      <Col xs={ 12 }>

        <h4 className='page-header'>Finish line</h4>

        <h3>Lane 1</h3>
        <h1>{ this.props.race.lane1FinishTime }</h1>

        <h3>Lane 2</h3>
        <h1>{ this.props.race.lane2FinishTime }</h1>

      </Col>
    </Row>;

  }
}

/*
 * Data Container
 */
export const FinishContainer = composeWithTracker(function({params}, onData) {

  const subscription = Meteor.subscribe('races');

  if (subscription.ready()) {

    const race = Races.findOne();
    console.log(race);
    onData(null, { race });

  }

}, Loading)(Finish);
