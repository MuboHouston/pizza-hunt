const router = require('express').Router();
const pizzaRoute = require('./pizza-routes');
const commentRoute = require('./comment-routes')

router.use('/pizzas', pizzaRoute)
router.use('/comments', commentRoute)

module.exports = router;