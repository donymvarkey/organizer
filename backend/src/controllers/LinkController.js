const httpResponse = require('../utils/httpResponse');
const {
  createNewLinkService,
  getAllLinksByCollectionId,
  updateLinkById,
  deleteLinkService,
  getLinkByIdService,
} = require('../services/LinkService');

const createNewLink = async (req, res, next) => {
  try {
    // await body('name').notEmpty('Name is required').run(req);
    // await body('url').notEmpty('An URL is required').run(req);
    // await body('urlType').notEmpty('Choose a URL type').run(req);

    // const errors = validationResult(req);
    // console.log('🚀 ~ createNewLink ~ errors:', errors);

    // if (!errors.isEmpty()) {
    //   return httpResponse(req, res, 400, 'Validation Error', errors.array());
    // }

    req.body['collectionId'] = req.params.collectionId;

    const data = await createNewLinkService(req.body);

    if (!data) {
      return httpResponse(req, res, 400, 'Failed to save link', {});
    }

    return httpResponse(req, res, 200, 'Link saved to collection', {});
  } catch (error) {
    next(error);
  }
};

const getAllLinks = async (req, res, next) => {
  try {
    const data = await getAllLinksByCollectionId(req.params.collectionId);

    if (!data) {
      return httpResponse(req, res, 400, 'Failed to fetch all links', {});
    }

    return httpResponse(req, res, 200, 'Links fetched', data);
  } catch (error) {
    next(error);
  }
};

const getLinkById = async (req, res, next) => {
  try {
    const data = await getLinkByIdService(req.params.linkId);

    if (!data) {
      return httpResponse(req, res, 400, 'Failed to fetch link', {});
    }

    return httpResponse(req, res, 200, 'Link fetched', data);
  } catch (error) {
    next(error);
  }
};

const updateLink = async (req, res, next) => {
  try {
    const data = await updateLinkById(req.params.linkId, req.body);

    if (!data) {
      return httpResponse(req, res, 400, 'Failed to update link', {});
    }

    return httpResponse(req, res, 200, 'Link updated', data);
  } catch (error) {
    next(error);
  }
};

const deleteLink = async (req, res, next) => {
  try {
    const data = await deleteLinkService(req.params.linkId);

    if (!data) {
      return httpResponse(req, res, 400, 'Failed delete link', {});
    }

    return httpResponse(req, res, 200, 'Link Deleted', data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewLink,
  getAllLinks,
  updateLink,
  deleteLink,
  getLinkById,
};
