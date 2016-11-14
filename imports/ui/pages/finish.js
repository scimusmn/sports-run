import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

import { Loading } from '../components/loading';
import { composeWithTracker } from 'react-komposer';
import { Races } from '../../api/races.js';
import { LaneTimer } from '../components/LaneTimer';
import TransitionGroup from 'react-addons-transition-group';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export class Finish extends React.Component {

  constructor(props) {

    super(props);

  }

  formatTime(s) {

    // Subtract start time from finishtime
    s = s - this.props.race.startTime;
    if (s < 0) s = 0;

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

  renderLaneTime(laneNum) {

    let element = '';

    if (this.props.race['lane' + laneNum + 'Started'] == true) {

      element = (
        <LaneTimer laneTitle={'Lane ' + laneNum} falseStart={this.props.race['lane' + laneNum + 'FalseStart']} displayTime={this.formatTime(this.props.race['lane' + laneNum + 'FinishTime'])} ></LaneTimer>
      );

    }

    return element;

  }

  render() {

    return <Row>
      <Col xs={ 12 }>

        <h4 className='page-header'>Finish line <span className='faded-text'>(Race state: {this.props.race.raceState})</span></h4>
        <TransitionGroup>
          { this.renderLaneTime(1) }
        </TransitionGroup>
        <TransitionGroup>
          { this.renderLaneTime(2) }
        </TransitionGroup>

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
    onData(null, { race });

  }

}, Loading)(Finish);
