const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  liveUrl: String,
  githubUrl: String,
});

const experienceSchema = new mongoose.Schema({
  jobTitle: String,
  company: String,
  startDate: String,
  endDate: String,
  bullets: [String],
});

const educationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  graduationYear: String,
  details: String,
});

const portfolioSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  professionalTitle: String,
  bio: String,
  profileImage: String,
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    blog: String,
  },
  skills: [String],
  projects: [projectSchema],
  experience: [experienceSchema],
  education: educationSchema,
  resumeUrl: String,
  brandColor: { type: String, default: '#3B82F6' },
  themePreference: { 
    type: String, 
    enum: ['Minimalist', 'Gradient', 'Glassmorphism', 'Neon', 'Terminal'],
    default: 'Minimalist'
  },
  githubRepo: String,
  liveUrl: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
