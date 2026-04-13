const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
  passengerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  pickupLocation: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    },
    address: String
  },
  dropLocation: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
    address: String
  },
  status: {
    type: String,
    enum: ['REQUESTED', 'ACCEPTED', 'ARRIVED', 'ONGOING', 'COMPLETED', 'CANCELLED'],
    default: 'REQUESTED',
  },
  fare: {
    type: Number,
  },
  distance: {
    type: Number, // in kilometers
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  feedback: {
    type: String,
  }
}, {
  timestamps: true,
});

RideSchema.index({ pickupLocation: '2dsphere' });
RideSchema.index({ dropLocation: '2dsphere' });

module.exports = mongoose.model('Ride', RideSchema);
