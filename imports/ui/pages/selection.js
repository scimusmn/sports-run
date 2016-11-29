import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { OnBeamBreak } from '../../startup/client/beam-breaks';
import { Loading } from '../components/loading';
import { AbsoluteContainer } from '../components/AbsoluteContainer';
import { AthleteInfo } from '../components/AthleteInfo';
import { composeWithTracker } from 'react-komposer';
import { Races } from '../../api/races.js';
import Constants from '../../modules/constants';

export class Selection extends React.Component {

  constructor(props) {

    super(props);

  }

  selectionClick(event) {

    let selectionId = event.target.id;

    console.log('selectionClick', selectionId);

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
          <img id='race-theilen' ref='portrait_theilen' src='images/theilen.png' onClick={ this.selectionClick }/>

          <AthleteInfo ref='info_tc' name='TC Bear' team='Minnesota Twins' speed='6.1 mph'/>
          <AthleteInfo ref='info_braun' name='Mark Braun' team='U.S. Paralympics' speed='10.78 mph'/>
          <AthleteInfo ref='info_haula' name='Erik Haula' team='Minnesota Wild' speed='9.74 mph'/>
          <AthleteInfo ref='info_press' name='Christen Press' team="U.S. Women's National Soccer Team" speed='10.25 mph'/>
          <AthleteInfo ref='info_wiggins' name='Candice Wiggins' team='Minnesota Lynx (retired)' speed='8.8 mph'/>
          <AthleteInfo ref='info_trex' name='Tyrannosaurus Rex' team='Dinosaur' speed='9.88 mph'/>
          <AthleteInfo ref='info_theilen' name='Adam Thielen' team='Minnesota Vikings' speed='9.88 mph'/>

          <img ref='O_drag' src='images/playbook_O.png' />
          <img ref='O_static' src='images/playbook_O.png' />

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
    };

    return <div className='screen selection-screen'>
              {jsx}
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
