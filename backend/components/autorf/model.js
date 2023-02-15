const mongoose = require('mongoose')
const rfSchema = mongoose.Schema(
  {
    // _id: {
    //   type: mongoose.Schema.Types.ObjectId
    // },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true
    },
    projectName: {
      type: String,
      required: true
      // unique: true
    },
    subProjectName: {
      type: String,
      required: true,
      default: ''
    },
    caseId: {
      type: String,
      required: true,
      default: ''
    },
    priority: {
      type: String,
      required: true,
      default: ''

    },
    ver: {
      type: String,
      required: true,
      default: '1.0'
    },
    desc: {
      type: String,
      require: false
    },
    steps: [
      {
        type: String
      }
    ],
    expects: [
      {
        type: String
      }
    ],
    lstCli: [
      {
        type: String
      }
    ],
    expectShowCli: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
)
const rfTypeSchema = mongoose.Schema(
  {
    rfTypeName: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: false,
    versionKey: false
  }
)

const RFType = mongoose.model('RFTypeName', rfTypeSchema)
const RFScript = mongoose.model('RFScript', rfSchema)

module.exports = {
  RFType,
  RFScript
}
