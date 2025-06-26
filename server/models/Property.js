import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['hotel', 'chalet', 'hall', 'apartment', 'camp'],
    required: true
  },
  titleAr: {
    type: String,
    required: true,
    trim: true
  },
  titleEn: {
    type: String,
    required: true,
    trim: true
  },
  descriptionAr: {
    type: String,
    required: true
  },
  descriptionEn: {
    type: String,
    required: true
  },
  locationAr: {
    type: String,
    required: true
  },
  locationEn: {
    type: String,
    required: true
  },
  addressAr: {
    type: String,
    required: true
  },
  addressEn: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    enum: ['YER', 'SAR', 'USD'],
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    default: []
  },
  features: {
    type: [String],
    default: []
  },
  amenities: {
    type: [String],
    default: []
  },
  capacity: {
    type: Number
  },
  bedrooms: {
    type: Number
  },
  bathrooms: {
    type: Number
  },
  size: {
    type: Number
  },
  rentalType: {
    type: String,
    enum: ['daily', 'monthly'],
    default: 'daily'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Property = mongoose.model('Property', propertySchema);

export default Property;