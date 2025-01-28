const LinkModel = require('../models/LinkModel');

const createNewLinkService = async (data) => {
  try {
    const link = new LinkModel(data);

    const dbResponse = await link.save();

    if (!dbResponse) {
      throw new Error('Error creating link');
    }

    return dbResponse;
  } catch (error) {
    return error;
  }
};

const getAllLinksByCollectionId = async (collectionId) => {
  try {
    const data = await LinkModel.find({ collectionId });

    if (!data) {
      throw new Error('Failed to fetch links');
    }

    return data;
  } catch (error) {
    return error;
  }
};

const getLinkByIdService = async (linkId) => {
  try {
    const data = await LinkModel.findById(linkId);

    if (!data) {
      throw new Error('Failed to fetch link');
    }

    return data;
  } catch (error) {
    return error;
  }
};

const updateLinkById = async (linkId, update) => {
  try {
    const data = await LinkModel.findByIdAndUpdate(linkId, update);

    if (!data) {
      throw new Error('Failed to update link');
    }

    return data;
  } catch (error) {
    return error;
  }
};

const deleteLinkService = async (linkId) => {
  try {
    const data = await LinkModel.findByIdAndDelete(linkId);

    if (!data) {
      throw new Error('Failed to update link');
    }

    return data;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createNewLinkService,
  getAllLinksByCollectionId,
  getLinkByIdService,
  updateLinkById,
  deleteLinkService,
};
