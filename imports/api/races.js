import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const Races = new Mongo.Collection('races');

// Races.allow({
//   insert: () => false,
//   update: () => false,
//   remove: () => false,
// });

// Races.deny({
//   insert: () => true,
//   update: () => true,
//   remove: () => true,
// });

// Races.schema = new SimpleSchema({
//   startTime: {
//     type: Number,
//     label: 'Start Time.',
//   },
// });

// Races.attachSchema(Races.schema);

// Factory.define('race', Races, {
//   startTime: () => 0,
// });
