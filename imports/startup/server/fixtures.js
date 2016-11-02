import { Meteor } from 'meteor/meteor';
import { Races } from '../../api/races';

var races = Races.find();

if (races.count()) {
  // Document already exists.
} else {
  console.log('No Races documents exists. Seeding...');
  Races.insert({lane1Ready:false, lane2Ready:false });
}
