import mongoose from 'mongoose'
import { getTime } from 'date-fns'

const skillsSubSchema = new mongoose.Schema({
  skill: { type: String, required: true },
  level: { type: String, required: true }
})

const socialsSubSchema = new mongoose.Schema({
  social: { type: String, required: true },
  link: { type: String, required: true }
})

const portfoliosSubSchema = new mongoose.Schema({
  image: { type: String, required: true },
  link: { type: String, required: true },
  highlight: { type: String, required: true }
})

const workExperienceSubSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  position: { type: String, required: true },
  startMonth: { type: String, required: true },
  startYear: { type: Number, required: true },
  endMonth: { type: String, required: true },
  endYear: { type: Number, default: 0 },
  country: { type: String, required: true },
  description: { type: String, required: false }
})

const educationSubSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  course: { type: String, required: true },
  qualification: { type: String, required: true },
  startMonth: { type: String, required: true },
  startYear: { type: Number, required: true },
  endMonth: { type: String, required: true },
  endYear: { type: Number, default: 0 },
  country: { type: String, required: true },
  description: { type: String, required: false }
})

const certificationSubSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  course: { type: String, required: true },
  qualification: { type: String, required: true },
  startMonth: { type: String, required: true },
  startYear: { type: Number, required: true },
  endMonth: { type: String, required: true },
  endYear: { type: Number, default: 0 },
  country: { type: String, required: true },
  description: { type: String, required: false }
})

const languagesSubSchema = new mongoose.Schema({
  lang: { type: String, required: true },
  level: { type: String, required: true }
})

const questionsAnsSubSchema = new mongoose.Schema({
  question: { type: String },
  candidateAnswer: { type: String }
})

const testimonialSubSchema = new mongoose.Schema({
  salutation: { type: String },
  fullName: { type: String },
  position: { type: String },
  organization: { type: String },
  testimonial: { type: String },
})

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String },
  salt: { type: String },
  salutation: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  role: { type: String, required: true, default: 'candidate' },
  gender: { type: String },
  areaCode: { type: Number },
  mobile: { type: Number },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  postal: { type: String },
  location: { type: String },
  industry: { type: String },
  title: { type: String },
  aboutMe: { type: String },
  availability: { type: Number },
  status: { type: Number },
  lastLogin: { type: Number },
  avatar: { type: String },
  template: { type: String, default: 'template3'  },
  resume: {
    fileName: { type: String },
    fileSize: { type: String },
    resumeUrl: { type: String }
  },
  video: {
    fileName: { type: String },
    fileSize: { type: String },
    videoUrl: { type: String }
  },
  workExperiences: [workExperienceSubSchema],
  educations: [educationSubSchema],
  certifications: [certificationSubSchema],
  languages: [languagesSubSchema],
  skills: [skillsSubSchema],
  socials: [socialsSubSchema],
  portfolios: [portfoliosSubSchema],
  savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'jobs' }],
  appliedJobs: [
    {
      job: { type: mongoose.Schema.Types.ObjectId, ref: 'jobs' },
      status: { type: String, default: 'Applied' },
      appliedDate: { type: Number, default: getTime(new Date()) },
      interviewDate: { type: Number },
      interviewLink: { type: String },
      questionsAns: [questionsAnsSubSchema],
    }
  ],
  testimonial: [testimonialSubSchema],
  psychometric: { type: mongoose.Schema.Types.ObjectId, ref: 'psychometricresults' },
  publicId: { type: String },
  updatedDate: { type: Number },
  updatedBy: { type: String },
  createdDate: { type: Number },
  createdBy: { type: String },
  currentFriendInviteClaimCount: { type: Number, default: 0 },
  availableFriendInviteClaimCount: { type: Number, default: 0 },
  opptyReferrerCount: { type: Number, default: 0 },
  opptyProfileScore: { type: Number, default: 1 },
  isClaimProfileCredit: { type: Number, default: 0 },
})

userSchema.pre('save', function (next) {
  if (!this.publicId || this.publicId.trim() === '') {
    const random8DigitNumber = Math.floor(10000000 + Math.random() * 90000000);
    const firstName = this.firstName.replace(/\s+/g, '-').toLowerCase();
    const lastName = this.lastName.replace(/\s+/g, '-').toLowerCase();
    this.publicId = `${firstName}-${lastName}-${random8DigitNumber}`;
  }
  next();
});

userSchema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
  const update = this.getUpdate();
  if (update.$set) {
    update.$set.updatedDate = getTime(new Date());
  } else {
    update.$set = { updatedDate: getTime(new Date()) };
  }
  this.setUpdate(update);
  next();
});

const User = mongoose.model('users', userSchema)

export default User
