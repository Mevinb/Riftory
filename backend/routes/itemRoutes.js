const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getNormalProducts,
    getBlackMarketProducts,
    getCategories,
    getBrands,
    searchProducts
} = require('../controllers/itemController');

// Special routes for marketplace types and filters
router.get('/normal', getNormalProducts);
router.get('/blackmarket', getBlackMarketProducts);
router.get('/categories', getCategories);
router.get('/brands', getBrands);
router.get('/search/:query', searchProducts);

router.route('/')
    .get(getProducts)
    .post(createProduct);

router.route('/:id')
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = router;
