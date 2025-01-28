const router = require('express').Router();
const {
  createNewLink,
  getAllLinks,
  getLinkById,
  updateLink,
  deleteLink,
} = require('../controllers/LinkController');
const AuthMiddleware = require('../middlewares/Auth.middleware');

router.post('/new/:collectionId', AuthMiddleware.isAuthorized, createNewLink);
router.get('/list/:collectionId', AuthMiddleware.isAuthorized, getAllLinks);
router.get('/:linkId', AuthMiddleware.isAuthorized, getLinkById);
router.put('/:linkId', AuthMiddleware.isAuthorized, updateLink);
router.delete('/:linkId', AuthMiddleware.isAuthorized, deleteLink);

module.exports = router;
