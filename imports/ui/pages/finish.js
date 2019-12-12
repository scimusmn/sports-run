import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

import { Loading } from '../components/loading';
import { composeWithTracker } from 'react-komposer';
import { Races } from '../../api/races.js';
import { LaneTimer } from '../components/LaneTimer';
import { AttractLoop } from '../components/AttractLoop';
import Constants from '../../modules/constants';
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

    // Convert to seconds
    const secs = s / 1000.0;

    // Trim to two decimal points
    return secs.toFixed(2);

  }

  renderCountdown() {

    let jsx = '';

    if (this.props.race.raceState == Constants.STATE_PRE_RACE) {

      const timeUntilGo = Constants.PRE_RACE_DELAY - this.props.race.preRaceTime;
      let displaySecs = '';
      if (timeUntilGo <= 3000 && timeUntilGo > 0) {
        displaySecs = '3';
        if (timeUntilGo <= 2000) {
          displaySecs = '2';
          if (timeUntilGo <= 1000) {
            displaySecs = '1';
          }
        }
      }

      jsx = <div className='countdown'>
              <h1> {displaySecs} </h1>
            </div>;

    } else if (this.props.race.raceState == Constants.STATE_RACING && !this.props.race.lane1Started && !this.props.race.lane2Started) {

      jsx = <div className='countdown go'>
              <h1>GO!</h1>
              <h2>¡Ya!</h2>
            </div>;
    }

    return jsx;

  }

  renderAthleteTime() {

    let jsx = <div>
                <h1> </h1>
                <h2> </h2>
              </div>;

    if (this.props.race.raceState == Constants.STATE_POST_RACE && this.props.race.athlete != '') {

      const athleteName = this.props.race.athlete;
      const displayTime = Constants.TIMES[athleteName];
      const displayName = Constants.DISPLAY_NAMES[athleteName];

      jsx = (
        <LaneTimer laneTitle={displayName} falseStart={false} displayTime={displayTime}></LaneTimer>
      );

    }

    return jsx;

  }

  renderLaneTime(laneNum) {

    let jsx = '';

    if (this.props.race.raceState != Constants.STATE_PRE_RACE && this.props.race['lane' + laneNum + 'Started'] == true) {

      jsx = (
        <LaneTimer laneTitle={'Lane ' + laneNum} falseStart={this.props.race['lane' + laneNum + 'FalseStart']} displayTime={this.formatTime(this.props.race['lane' + laneNum + 'FinishTime'])} ></LaneTimer>
      );

    }

    return jsx;

  }

  renderAttract() {

    let jsx = '';

    if (this.props.race.raceState == Constants.STATE_ATTRACT_LOOP) {

      jsx = <AttractLoop en='Want to race?' es='¿Quieres competir?'></AttractLoop>;

    }

    return jsx;

  }

  render() {

    return <div className="screen finish-screen">

      {this.renderAttract()}

      <Row>

        <Col xs={12}>

          {this.renderCountdown()}

          <Row className="athlete-time">

            <Col xs={4} xsOffset={4}>
              {this.renderAthleteTime()}
            </Col>

          </Row>

          <Row>

            <Col xs={4} xsOffset={4}>
              {this.renderLaneTime(1)}
            </Col>

            {/*<Col xs={ 4 }>*/}
            {/*  { this.renderLaneTime(2) }*/}
            {/*</Col>*/}

          </Row>

        </Col>

      </Row>

    </div>;

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
