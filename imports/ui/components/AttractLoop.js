import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import TweenMax from 'gsap';
import {TimelineMax} from 'gsap';

export class AttractLoop extends React.Component {

  constructor(props) {

    super(props);

    this.tl = new TimelineMax({repeat:-1, delay:1});

  }

  componentDidMount() {

    // DOM is rendered and
    // ready for manipulation
    // and animations.

    this.tl.from(this.refs.bg, 0.5, {left:-500, autoAlpha:0.0,});
    this.tl.from(this.refs.en, 0.5, {x:-500, autoAlpha:0.0}, '-=0.4');
    this.tl.from(this.refs.es, 0.5, {x:-500, autoAlpha:0.0}, '-=0.8');

    this.tl.to(this.refs.bg, 0.5, {left:500, autoAlpha:0.0, ease: Power2.easeIn, }, '+=5.0');
    this.tl.to(this.refs.en, 0.5, {x:500, autoAlpha:0.0, ease: Power2.easeIn}, '-=0.4');
    this.tl.to(this.refs.es, 0.5, {x:500, autoAlpha:0.0, ease: Power2.easeIn}, '-=0.4');

    // Rotate dashed ring
    this.tl.to(this.refs.bg, 6.5, {rotation: 220, ease:Power2.easeOut}, 0.01);

    // Subtle hinty movement
    // for Os easter egg
    this.tl.to(this.refs.O_static, 3.14, {x:-8, y:5, rotation: 2, ease: Power2.easeInOut, yoyo:true, repeat:1}, 0.1);
    this.tl.to(this.refs.O_drag, 3.14, {x:5, y:-8, rotation: -2, ease: Power2.easeInOut, yoyo:true, repeat:1}, 0.2);

    this.tl.from(this.refs.fader, 0.5, { backgroundColor: 'rgba(0,0,0,1.0)' }, 0.0);
    this.tl.to(this.refs.fader, 0.5, { backgroundColor: 'rgba(0,0,0,1.0)' }, '-=0.5');

    this.tl.play();

  }

  componentWillUnmount() {

    // DOM is about to become
    // inaccessible. Clean up
    // all timers and tweens.

    this.tl.stop();
    this.tl.clear();

  }

  render() {

    return <div className='attract-loop centered'>

      <img ref='O_drag' className='O_drag' src='images/playbook_O.png' />
      <img ref='O_static' className='O_static' src='images/playbook_O.png' />
      <div ref='fader' className='fader'></div>
      <div ref='bg' className='bg'></div>
      <h1 ref='en'>{this.props.en}</h1>
      <h2 ref='es'>{this.props.es}</h2>

    </div>;

  }

}
