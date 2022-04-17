const router = require('express').Router();
const pizzaRoute = require('./pizza-routes');

router.use('/pizzas', pizzaRoute)

module.exports = router;