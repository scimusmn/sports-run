import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

import { Loading } from '../components/loading';
import { composeWithTracker } from 'react-komposer';
import { Races } from '../../api/races.js';
import { LaneTimer } from '../components/LaneTimer';
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

  renderHeader() {

    let jsx = <div className='centered'>
                <h1>&nbsp;</h1>
                <h2>&nbsp;</h2>
              </div>;
/*
    if (this.props.race.raceState == Constants.STATE_POST_RACE) {
      jsx = <div className='centered'>
              <h1>How did you do? Check your time</h1>
              <h2>¿Cómo te fue? Revisa tu tiempo</h2>
            </div>;
    }
*/
    return jsx;

  }

  renderFooter() {

    let jsx = '';

    if (this.props.race.raceState == Constants.STATE_POST_RACE) {

      jsx = <div className='centered'>
              <br/><br/>
              <h1>Thanks for racing! Please exit to your right</h1>
              <h2>¡Gracias por competir! Por favor salir por la derecha</h2>
            </div>;
    }

    return jsx;

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
              <h1>&nbsp;{displaySecs}&nbsp;</h1>
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

    let jsx = <div className='centered'>
                <h1>&nbsp;</h1>
                <h2>&nbsp;</h2>
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

    if (this.props.race['lane' + laneNum + 'Started'] == true) {

      jsx = (
        <LaneTimer laneTitle={'Lane ' + laneNum} falseStart={this.props.race['lane' + laneNum + 'FalseStart']} displayTime={this.formatTime(this.props.race['lane' + laneNum + 'FinishTime'])} ></LaneTimer>
      );

    }

    return jsx;

  }

  render() {

    return <div className='screen finish-screen'>
            <Row>
              <Col xs={ 12 }>

                { this.renderHeader() }
                { this.renderCountdown() }

                <Row>

                  <Col xs={ 4 } xsOffset={4}>
                    <TransitionGroup>
                      { this.renderAthleteTime() }
                    </TransitionGroup>
                  </Col>

                </Row>

                <Row>
                  <Col xs={ 4 } xsOffset={2}>
                    <TransitionGroup>
                      { this.renderLaneTime(1) }
                    </TransitionGroup>
                  </Col>

                  <Col xs={ 4 }>
                    <TransitionGroup>
                      { this.renderLaneTime(2) }
                    </TransitionGroup>
                  </Col>

                </Row>

                { this.renderFooter() }

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
