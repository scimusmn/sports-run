import { Meteor } from 'meteor/meteor';

import { Races } from '../races';

Meteor.publish('races', () => Races.find());
