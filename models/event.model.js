const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {type: String, require: true},
  date: {type: Date, require: true},
  type: {type: String, require: true},
  location: {
    name: {type: String, require: true},
    houseNumber: {type: Number , require: false},
    street: {type: String , require: true},
    city: {type: String , require: true}
    },
  max: {type: Number},
  description: {type: String, require: true},
  password: {type: String},
  food: [{type: String}],
  activities: [{type: String}],
  responses: [{type: String}],
}, {
  timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
