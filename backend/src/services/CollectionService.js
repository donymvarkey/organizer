const { default: mongoose } = require('mongoose');
const CollectionModel = require('../models/CollectionModel');

const createCollection = async (collectionData) => {
  try {
    const collection = new CollectionModel(collectionData);
    const dbResponse = await collection.save();

    if (!dbResponse) {
      throw new Error('Error creating collection');
    }
    return dbResponse;
  } catch (error) {
    return error;
  }
};

const getAllCollections = async (userId) => {
  try {
    const data = await CollectionModel.aggregate([
      {
        $match: {
          user_id: new mongoose.Types.ObjectId(userId), // Match collections for a specific user
        },
      },
      {
        $lookup: {
          from: 'links', // The name of the links collection
          localField: '_id',
          foreignField: 'collectionId',
          as: 'links',
        },
      },
      {
        $unwind: {
          path: '$links',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: {
            collectionId: '$_id',
            name: '$name',
            description: '$description',
            createdAt: '$createdAt',
            type: '$links.urlType',
          },
          linkCount: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id.collectionId',
          name: { $first: '$_id.name' },
          description: { $first: '$_id.description' },
          createdAt: { $first: '$_id.createdAt' },
          counts: {
            $push: {
              type: '$_id.type',
              count: '$linkCount',
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          createdAt: 1,
          videoLinks: {
            $ifNull: [
              {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: '$counts',
                      as: 'count',
                      cond: { $eq: ['$$count.type', 0] },
                    },
                  },
                  0,
                ],
              },
              { count: 0 },
            ],
          },
          websiteLinks: {
            $ifNull: [
              {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: '$counts',
                      as: 'count',
                      cond: { $eq: ['$$count.type', 1] },
                    },
                  },
                  0,
                ],
              },
              { count: 0 },
            ],
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          createdAt: 1,
          videoLinkCount: '$videoLinks.count',
          websiteLinkCount: '$websiteLinks.count',
        },
      },
    ]);

    if (!data) {
      throw new Error('Error fetching collections');
    }

    return data;
  } catch (error) {
    return error;
  }
};

const getCollectionById = async (collectionID) => {
  try {
    const data = await CollectionModel.findById(collectionID);

    if (!data) {
      throw new Error('Error fetching collection');
    }

    return data;
  } catch (error) {
    return error;
  }
};

const updateCollection = async (collectionID, collectionData) => {
  try {
    const data = await CollectionModel.findByIdAndUpdate(
      collectionID,
      collectionData,
      { new: true },
    );

    if (!data) {
      throw new Error('Error updating collection');
    }

    return data;
  } catch (error) {
    return error;
  }
};

const deleteCollection = async (collectionID) => {
  try {
    const data = await CollectionModel.findByIdAndDelete(collectionID);
    if (!data) {
      throw new Error('Error deleting collection');
    }
    return data;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createCollection,
  getAllCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
};
