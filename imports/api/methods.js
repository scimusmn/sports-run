import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { arenaControl } from '../startup/server/media-controller';
import { startTimer, lane1Finish, lane2Finish } from '../startup/server/race-timer';
import { Races } from './races';

Meteor.methods({

  arenaUpdate(data) {

    check(data, {

      msg: String,

    });

    arenaControl(data);

    return true;

  },

  beamBreak(data) {

    check(data, {

      msg: String,

    });

    switch (data.msg) {
      case 'ln1_start':
      case 'ln2_start':
        let startTime = startTimer();
        Races.update(Races.findOne()._id, {$set: {startTime}});
        return startTime;
        break;
      case 'ln1_finish':
        var lane1FinishTime = lane1Finish();
        Races.update(Races.findOne()._id, {$set: {lane1FinishTime}});
        return lane1FinishTime;
        break;
      case 'ln2_finish':
        var lane2FinishTime = lane2Finish();
        Races.update(Races.findOne()._id, {$set: {lane2FinishTime}});
        return lane2FinishTime;
        break;
      default:
        console.log('beamBreak: data.msg ' + data.msg + ' not recognized');
    }

    console.log('media-methods::beam-break:', data.msg);

    return true;

  },

});
