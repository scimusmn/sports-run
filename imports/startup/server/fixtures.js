import { Meteor } from 'meteor/meteor';
import { Races } from '../../api/races';
import Constants from '../../modules/constants';

var races = Races.find();

if (races.count()) {
  // Document already exists.
} else {
  console.log('Seeding default Race...');
  Races.insert(Constants.DEFAULT_RACE_STATE);
}
