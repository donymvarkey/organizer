const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      autopopulate: false,
    },
  },
  {
    timestamps: true,
  },
);

collectionSchema.plugin(require('mongoose-autopopulate'));

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
