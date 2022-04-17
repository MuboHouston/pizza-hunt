const router = require('express').Router();
//instead of importing the entire object and having to do pizzaController.getAllPizza(), we can simply destruct the method names out of the imported object
const { getAllPizza, getPizzaById, createPizza, updatePizza, deletePizza } = require('../../controllers/pizza-controller')

// Set up GET all and POST at /api/pizzas
// the route we are using is the same as this:
// router.get('/', getCallbackFunction);
// router.post('/' postCallbackFunction);
router
    .route('/')
    .get(getAllPizza)
    .post(createPizza);

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
router
    .route('/:id')
    .get(getPizzaById)
    .put(updatePizza)
    .delete(deletePizza);

module.exports = router;