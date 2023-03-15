const mongoose = require('mongoose')
const RFScriptSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    topName: {
      type: String,
      required: true,
      unique: true
    },
    RFType: {
      type: String,
      required: true
    },
    cli: {
      type: String,
      required: true,
      default: ''
    },
    desc: {
      type: String,
      require: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
const RFCaseSchema = mongoose.Schema(
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
const RFTypeSchema = mongoose.Schema(
  {
    RFTypeName: {
      type: String,
      required: true,
      index: true,
      unique: true
    }
  },
  {
    timestamps: false,
    versionKey: false
  }
)

const RFType = mongoose.model('RFTypeName', RFTypeSchema)
// create index explicitly, 'cause the 'uinque' property alone does not work
// for there's old column was removed, replacing with RFTypeName
RFType.createIndexes()
const RFScript = mongoose.model('RFScript', RFScriptSchema)

module.exports = {
  RFType,
  RFScript
}
