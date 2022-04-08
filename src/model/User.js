import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: [true, 'id is required'],
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, 'firstName is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'firstName is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'phone is required'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'address is required'],
      trim: true,
      maxlength: [400, 'address is too long'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.User || model('User', UserSchema);
