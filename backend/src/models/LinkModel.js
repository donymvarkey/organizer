const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LinkSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
    urlType: {
      type: Number,
      enum: [0, 1], // 0 for video, 1 for link
      required: true,
    },
    collectionId: {
      type: Schema.Types.ObjectId,
      ref: 'Collection',
      required: true,
      autopopulate: true,
    },
  },
  { timestamps: true },
);

const LinkModel = mongoose.model('Link', LinkSchema);
LinkSchema.plugin(require('mongoose-autopopulate'));

module.exports = LinkModel;
