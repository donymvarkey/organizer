const { body, validationResult } = require('express-validator');
const httpResponse = require('../utils/httpResponse');
const {
  createCollection,
  getAllCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
} = require('../services/CollectionService');

const createNewCollection = async (req, res, next) => {
  try {
    await body('name').notEmpty().run(req);
    await body('description').notEmpty().run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return httpResponse(req, res, 400, 'Validation Error', errors.array());
    }

    const collectionData = {
      name: req.body.name,
      description: req.body.description,
      user_id: req.user.id,
    };

    const data = await createCollection(collectionData);

    if (!data) {
      return httpResponse(req, res, 400, 'Error creating collection', null);
    }

    return httpResponse(req, res, 201, 'Collection created successfully', data);
  } catch (error) {
    next(error);
  }
};

const listAllCollections = async (req, res, next) => {
  try {
    const data = await getAllCollections(req.user.id);

    if (!data) {
      return httpResponse(req, res, 400, 'Error fetching collections', null);
    }

    return httpResponse(
      req,
      res,
      200,
      'Collections fetched successfully',
      data,
    );
  } catch (error) {
    next(error);
  }
};

const listCollectionById = async (req, res, next) => {
  try {
    const data = await getCollectionById(req.params.collectionId);

    if (!data) {
      return httpResponse(req, res, 400, 'Error fetching collection', null);
    }

    return httpResponse(req, res, 200, 'Collection fetched successfully', data);
  } catch (error) {
    next(error);
  }
};

const updateCollectionController = async (req, res, next) => {
  try {
    const data = await updateCollection(req.params.collectionId, req.body);

    if (!data) {
      return httpResponse(req, res, 400, 'Error updating collection', null);
    }

    return httpResponse(req, res, 200, 'Collection updated successfully', data);
  } catch (error) {
    next(error);
  }
};

const deleteCollectionController = async (req, res, next) => {
  try {
    const data = await deleteCollection(req.params.collectionId);

    if (!data) {
      return httpResponse(req, res, 400, 'Error deleting collection', null);
    }

    return httpResponse(req, res, 200, 'Collection deleted successfully', data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewCollection,
  listAllCollections,
  listCollectionById,
  updateCollectionController,
  deleteCollectionController,
};
