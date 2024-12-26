import mongoose from 'mongoose';

const astroSchema = new mongoose.Schema({
    fullName: String,
    number: String,
    gender: String,
    email: String,
    experience: String,
    city: String,
    shortBio: String,
    imageUrl:String,
    specialties:[],
    languages:[],
    pricePerMin:Number,
    followers:Number,
    isVerified:{type:Boolean,default: false},
    isProfileCompleted: {type: Boolean, default: false},
    otp: { type: String, default: null },
    otpCreatedAt: { type: Date, default: null },
});

export default mongoose.model('Astro', astroSchema);
