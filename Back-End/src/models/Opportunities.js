import mongoose from 'mongoose';

const OpportunitiesSchema = new mongoose.Schema({
  oppname: { type: String, required: true, unique: true },
  imageUrl: { type: String, required: true },
  duration: { type: String, required: true },
  role: { type: String, required: true },
  companyName: { type: String, required: true },
  details: { type: String, required: true },
  Email: { type: String, required: true },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});

export const opportunitiesModel = mongoose.model(
  'opportunities',
  OpportunitiesSchema
);
