const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
      index: true, // Adding an index for better query performance
    },
    description: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
      validate: {
        validator: function (value) {
          return value >= this.startDate;
        },
        message: 'End date must be after start date',
      },
    },
    status: {
      type: String,
      enum: ['Planning', 'In Progress', 'On Hold', 'Canceled', 'Completed'],
      default: 'Planning',
    },
    skillsRequired: {
      type: [String],
    },
    teamMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Talent',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for project duration
projectSchema.virtual('duration').get(function () {
  return (this.endDate - this.startDate) / (1000 * 60 * 60 * 24); // Duration in days
});

// Pre-save hook to log when a project is created
projectSchema.pre('save', function (next) {
  console.log(`Project ${this.name} is being saved`);
  next();
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
