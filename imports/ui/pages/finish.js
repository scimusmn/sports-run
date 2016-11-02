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

  formatTime(s) {

    // Subtract start time from finishtime
    s = s - this.props.race.startTime;

    function padZ(n) {
      return (n < 10 ? '0' : '') + n;
    }

    let ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    ms = ms.toString();
    if (ms.length > 2) ms = ms.substr(0, 2);

    return padZ(hrs) + ':' + padZ(mins) + ':' + padZ(secs) + ':' + padZ(ms);

  }

  render() {

    return <Row>
      <Col xs={ 12 }>

        <h4 className='page-header'>Finish line</h4>

        <h3>Lane 1</h3>
        <h1>{ this.formatTime(this.props.race.lane1FinishTime) }</h1>

        <h3>Lane 2</h3>
        <h1>{ this.formatTime(this.props.race.lane2FinishTime) }</h1>

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
