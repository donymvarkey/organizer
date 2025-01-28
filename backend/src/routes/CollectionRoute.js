const express = require('express');
const AuthMiddleware = require('../middlewares/Auth.middleware');
const {
  createNewCollection,
  listAllCollections,
  listCollectionById,
  updateCollectionController,
  deleteCollectionController,
} = require('../controllers/CollectionController');

const router = express.Router();

router.post('/', AuthMiddleware.isAuthorized, createNewCollection);
router.get('/', AuthMiddleware.isAuthorized, listAllCollections);
router.get('/:collectionId', AuthMiddleware.isAuthorized, listCollectionById);
router.put(
  '/:collectionId',
  AuthMiddleware.isAuthorized,
  updateCollectionController,
);
router.delete(
  '/:collectionId',
  AuthMiddleware.isAuthorized,
  deleteCollectionController,
);

module.exports = router;
