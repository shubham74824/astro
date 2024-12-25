import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    gender: String,
    address: String,
    isProfileCompleted: {type: Boolean, default: false},
    otp: { type: String, default: null },
    otpCreatedAt: { type: Date, default: null },
});

export default mongoose.model('User', userSchema);
