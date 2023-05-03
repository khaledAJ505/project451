const patient = require('./patient');
const mongoose = require('mongoose');

const appointmentSchema2 = new mongoose.Schema({
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

const Appointment2 = mongoose.model('Appointment2', appointmentSchema2);

module.exports = Appointment2;