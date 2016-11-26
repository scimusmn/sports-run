import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import TweenMax from 'gsap';

export class LaneTimer extends React.Component {

  constructor(props) {

    super(props);

  }

  componentWillEnter(callback) {
    const el = ReactDOM.findDOMNode(this);
    TweenMax.fromTo(el, 0.3, {x: -100, opacity: 0}, {x: 0, opacity: 1, onComplete: callback});
  }

  componentWillLeave(callback) {
    const el = ReactDOM.findDOMNode(this);
    TweenMax.fromTo(el, 0.3, {x: 0, opacity: 1}, {x: 200, opacity: 0, ease: Power2.easeIn, onComplete: callback});
  }

  render() {

    return <div>
      <h1>{ this.props.laneTitle}{ this.props.falseStart ? <span className='false-start'> (FALSE START)</span> : '' }</h1>
      <h2>Time: { this.props.displayTime }</h2>
    </div>;

  }
}
