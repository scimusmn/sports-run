import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Loading } from '../components/loading';
import { AbsoluteContainer } from '../components/AbsoluteContainer';
import { AthleteInfo } from '../components/AthleteInfo';
import { AttractLoop } from '../components/AttractLoop';
import { composeWithTracker } from 'react-komposer';
import { Races } from '../../api/races.js';

import Constants from '../../modules/constants';
import SubtleAlert from '../components/SubtleAlert';

import TweenMax from 'gsap';
import Draggable from '../../../node_modules/gsap/src/uncompressed/utils/Draggable.js';

export class Selection extends React.Component {

  constructor(props) {

    super(props);

    this.selectionClick = this.selectionClick.bind(this);
    this.attractClick = this.attractClick.bind(this);

  }

  componentDidMount() {

    // DOM is rendered and
    // ready for manipulation
    // and animations.
    this.setupEgg();

  }

  componentWillUnmount() {

    // DOM is about to become
    // inaccessible. Clean up
    // all timers ans tweens.

  }

  componentDidUpdate(prevProps, prevState) {

    // If on selection screen
    // init the easter egg.
    if (this.props.race.raceState == Constants.STATE_IDLE) {
      this.setupEgg();
    }

  }

  selectionClick(event) {

    const selectionId = event.target.id;
    this.arenaControl(selectionId);

  }

  attractClick(event) {

    this.arenaControl('attract');

  }

  setupEgg() {

    console.log('setupEgg', this.eggDraggable);

    // Destroy any current
    // incarnation of the egg.
    if (this.eggDraggable) {
      if (this.eggDraggable[0]) this.eggDraggable[0].kill();
      this.eggDraggable = {};
    }

    const _this = this;
    this.eggDraggable = Draggable.create('#drag-egg', {type:'x,y', edgeResistance:0.65, throwProps:true,

      onDrag:function() {

        // Update the mask position
        // on the static egg to align
        // with the dragged 'O'
        _this.updateEggPos(this.x, this.y);

      }, onDragEnd:function() {

        console.log('drag ended');

        if (_this.updateEggPos(this.x, this.y) < 80) {
          console.log('winner');

          TweenMax.to('#drag-egg', 0.25, { x: -839, y:933, onUpdate:_this.updateEggPos, onUpdateParams:[this.x,this.y] });

          _this.updateEggPos(-839, 933);

          // Happy animation
          TweenMax.fromTo('#drag-egg', 0.2,
            { scale: 0.9,},
            { scale: 1.2, ease:Power2.easeInOut, repeat: 9, yoyo: true });

        } else {

          // TweenMax.set('#drag-egg', { x: 0, y:0 });
          // _this.updateEggPos(0, 0);

          TweenMax.to('#drag-egg', 1.0, { x: 0, y:0 });

        }

      },

    });

    // Reset position of mask
    // and draggable
    this.updateEggPos(0, 0);

  }

  updateEggPos(offsetX, offsetY) {

    // Original pos + drag
    let mX = parseInt(offsetX) + 860;
    let mY = parseInt(offsetY) + 605;

    // Difference between static
    // and dragged 'O'.
    mX = mX - 21;
    mY = mY - 1538;

    const maskPos = mX + 'px '  + mY + 'px';
    TweenMax.set('#static-egg', { webkitMaskPosition: maskPos });

    // Offset sum
    const offsetSum = Math.abs(mX) + Math.abs(mY);
    return offsetSum;

  }

  disableEgg() {

    if (!this.eggDraggable) return;
    this.eggDraggable[0].kill();
    this.eggDraggable = {};

  }

  arenaControl(msg) {

    Meteor.apply('arenaUpdate', [{

      msg: msg,

    },], {

      onResultReceived: (error, response) => {
        if (error) console.warn(error.reason);
        if (response) console.log('arenaUpdate success:', response);
      },

    });

  }

  renderSelect() {

    return <div className='screen selection-screen'>

        <AbsoluteContainer lock={true} classParent='selection' reference='images/selection_ref.png'>

          <h1 ref='headline_en' >Who do <em>YOU</em> want to race?</h1>
          <h2 ref='headline_es' >¿Contra quién quieres competir?</h2>

          <img id='race-tc' ref='portrait_tc' src='images/tc.png' onClick={ this.selectionClick }/>
          <img id='race-braun' ref='portrait_braun' src='images/braun.png' onClick={ this.selectionClick }/>
          <img id='race-haula' ref='portrait_haula' src='images/haula.png' onClick={ this.selectionClick }/>
          <img id='race-press' ref='portrait_press' src='images/press.png' onClick={ this.selectionClick }/>
          <img id='race-wiggins' ref='portrait_wiggins' src='images/wiggins.png' onClick={ this.selectionClick }/>
          <img id='race-trex' ref='portrait_trex' src='images/trex.png' onClick={ this.selectionClick }/>
          <img id='race-thielen' ref='portrait_theilen' src='images/theilen.png' onClick={ this.selectionClick }/>

          <AthleteInfo ref='info_tc' name='TC Bear' team='Minnesota Twins' speed='6.1 mph'/>
          <AthleteInfo ref='info_braun' name='Mark Braun' team='U.S. Paralympics' speed='10.78 mph'/>
          <AthleteInfo ref='info_haula' name='Erik Haula' team='Minnesota Wild' speed='9.74 mph'/>
          <AthleteInfo ref='info_press' name='Christen Press' team='U.S. Women&#39;s National Soccer Team' speed='10.25 mph'/>
          <AthleteInfo ref='info_wiggins' name='Candice Wiggins' team='Minnesota Lynx (retired)' speed='8.8 mph'/>
          <AthleteInfo ref='info_trex' name='Tyrannosaurus Rex' team='Dinosaur' speed='9.88 mph'/>
          <AthleteInfo ref='info_thielen' name='Adam Thielen' team='Minnesota Vikings' speed='9.88 mph'/>

          <img ref='O_drag'  id='drag-egg' src='images/playbook_O.png' />
          <img ref='O_static' src='images/playbook_O.png' />

          <img ref='O_static_egg' id='static-egg' src='images/playbook_O_egg.png' />

        </AbsoluteContainer>

      </div>;

  }

  renderGetReady() {

    return <div className='centered'>
        <h1>Go to the starting line</h1>
        <h2>Ve a la linea de salida</h2>
      </div>;

  }

  renderPleaseWait() {

    return <div className='centered'>
        <h1>Please wait until<br/>race finishes</h1>
        <h2>Por favor espera hasta que<br/>la carrera termine</h2>
      </div>;

  }

  renderAlerts() {

    let jsx = '';
    const msg = Session.get('subtleAlertMessage');
    if (msg && msg != '') {
      jsx = <div>
            <SubtleAlert message={msg}></SubtleAlert>
          </div>;
    }

    return jsx;

  }

  renderAttract() {

    return <div onClick={this.attractClick}>
        <AttractLoop en='Touch the screen to start' es='Toca la pantalla para comenzar'></AttractLoop>
      </div>;

  }

  render() {

    let jsx = '';

    switch (this.props.race.raceState){
      case Constants.STATE_IDLE:
        jsx = this.renderSelect();
        break;
      case Constants.STATE_PRE_RACE:
        jsx = this.renderGetReady();
        break;
      case Constants.STATE_RACING:
      case Constants.STATE_POST_RACE:
        jsx = this.renderPleaseWait();
        break;
      case Constants.STATE_ATTRACT_LOOP:
        jsx = this.renderAttract();
        break;
    };

    return <div className='screen selection-screen'>
              { jsx }
              { this.renderAlerts() }
          </div>;

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
