const patient = require('./patient');
const mongoose = require('mongoose');

const appointmentSchema1 = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patient',
    required: true,
  },
  timeSlot: {
    type: Date,
    required: true,
  }
});

const Appointment1 = mongoose.model('Appointment1', appointmentSchema1);

module.exports = Appointment1;